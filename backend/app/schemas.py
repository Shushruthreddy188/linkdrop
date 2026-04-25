from pydantic import BaseModel
from datetime import datetime

class NoteCreate(BaseModel):
    content: str
    expiry_minutes: int
    view_once: bool = False

class NoteCreateResponse(BaseModel):
    id: str
    share_url: str
    expires_at: datetime

class NoteResponse(BaseModel):
    id: str
    content: str
    created_at: datetime
    expires_at: datetime