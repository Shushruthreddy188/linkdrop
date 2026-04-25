import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

type Note = {
  id: string;
  content: string;
  created_at: string;
  expires_at: string;
};

function NoteView() {
  const { id } = useParams();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorType, setErrorType] = useState<
    "not-found" | "expired" | "already-viewed" | "server" | ""
  >("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);

        // http://127.0.0.1:8000
        const res = await axios.get(`/api/notes/${id}`);

        const fetchedNote = res.data;
        const isExpired =
          new Date(fetchedNote.expires_at).getTime() <= Date.now();

        if (isExpired) {
          setErrorType("expired");
          setNote(null);
          return;
        }

        setNote(fetchedNote);
        setErrorType("");
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 404) {
            setErrorType("not-found");
          } else if (err.response?.status === 410) {
            const detail = err.response.data?.detail;

            if (detail === "This note has already been viewed") {
              setErrorType("already-viewed");
            } else {
              setErrorType("expired");
            }
          } else {
            setErrorType("server");
          }
        } else {
          setErrorType("server");
        }

        setNote(null);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <section className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 p-8 shadow-xl">
        <p className="text-sm text-cyan-400 mb-2">LinkDrop 🔗</p>

        {loading && (
          <>
            <h1 className="text-3xl font-bold mb-4">Loading note...</h1>
            <p className="text-slate-400">
              Fetching your secret little note from the vault.
            </p>
          </>
        )}

        {!loading && errorType === "expired" && (
          <>
            <h1 className="text-3xl font-bold mb-4">
              This note has expired ⏳
            </h1>
            <p className="text-slate-400">
              The link existed, but its time window has closed.
            </p>
          </>
        )}

        {!loading && errorType === "not-found" && (
          <>
            <h1 className="text-3xl font-bold mb-4">Note not found</h1>
            <p className="text-slate-400">
              This link may be invalid, deleted, or never existed.
            </p>
          </>
        )}

        {!loading && errorType === "already-viewed" && (
          <>
            <h1 className="text-3xl font-bold mb-4">
              This note has already been viewed 👁️
            </h1>
            <p className="text-slate-400">
              This was a view-once note, so it disappeared after the first open.
            </p>
          </>
        )}

        {!loading && errorType === "server" && (
          <>
            <h1 className="text-3xl font-bold mb-4">
              Link expired or unavailable
            </h1>
            <p className="text-slate-400">
              This note may have expired, been deleted, or the link may be
              invalid.
            </p>
          </>
        )}
        {!loading && note && (
          <>
            <h1 className="text-3xl font-bold mb-4">Shared note</h1>

            <div className="rounded-xl border border-slate-700 bg-slate-950 p-5 shadow-inner">
              <p className="whitespace-pre-wrap text-slate-200 leading-relaxed">
                {note.content}
              </p>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Expires at: {new Date(note.expires_at).toLocaleString()}
            </p>
          </>
        )}
      </section>
    </main>
  );
}

export default NoteView;
