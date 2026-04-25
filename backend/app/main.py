import os
import secrets
from datetime import datetime, timedelta

from dotenv import load_dotenv
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine, SessionLocal
from .models import Note
from .schemas import NoteCreate, NoteCreateResponse, NoteResponse
load_dotenv()

Base.metadata.create_all(bind=engine)

app = FastAPI(title="LinkDrop API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_URL = os.getenv("BASE_URL", "")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/api/health")
def health():
    return {"status": "ok", "service": "LinkDrop API"}

@app.post("/api/notes", response_model=NoteCreateResponse)
def create_note(payload: NoteCreate, db: Session = Depends(get_db)):
    note_id = secrets.token_urlsafe(5)
    now = datetime.utcnow()
    expires_at = now + timedelta(minutes=payload.expiry_minutes)

    note = Note(
        id=note_id,
        content=payload.content,
        created_at=now,
        expires_at=expires_at,
        is_expired=False,
        view_once=payload.view_once,
        viewed=False
    )

    db.add(note)
    db.commit()
    db.refresh(note)

    return {
    "id": note.id,
    "expires_at": note.expires_at
}

@app.get("/api/notes/{note_id}", response_model=NoteResponse)
def get_note(note_id: str, db: Session = Depends(get_db)):
    note = db.query(Note).filter(Note.id == note_id).first()

    if not note:
        raise HTTPException(status_code=404, detail="Note not found")

    now = datetime.utcnow()

    if note.is_expired or note.expires_at < now:
        note.is_expired = True
        db.commit()
        raise HTTPException(status_code=410, detail="This note has expired")

    if note.view_once and note.viewed:
        raise HTTPException(status_code=410, detail="This note has already been viewed")

    if note.view_once:
        note.viewed = True
        db.commit()
        db.refresh(note)

    return note