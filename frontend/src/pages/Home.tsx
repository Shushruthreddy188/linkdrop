import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [lastCreatedContent, setLastCreatedContent] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(60);
  const [viewOnce, setViewOnce] = useState(false);
  const [viewOnceMessage, setViewOnceMessage] = useState(false);

  const handleCreate = async () => {
    try {
      const finalExpiry = hours * 60 + minutes;
      // http://127.0.0.1:8000
      const res = await axios.post("/api/notes", {
        content,
        expiry_minutes: finalExpiry,
        view_once: viewOnce,
      });

      const id = res.data.id;
      //   http://localhost:5173
      setLink(`${window.location.origin}/note/${id}`);
      setExpiresAt(res.data.expires_at);
      setLastCreatedContent(content);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("FULL ERROR:", err);
      console.error("BACKEND RESPONSE:", err.response?.data);
      alert(err.response?.data?.detail || "Failed to create note");
    }
  };

  const handleCopyLink = async () => {
    if (!link) return;

    await navigator.clipboard.writeText(link);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  function handleViewOnceToggle() {
    setViewOnce((prev) => !prev);
    setViewOnceMessage(true);

    setTimeout(() => {
      setViewOnceMessage(false);
    }, 2000);
  }

  const linkIsOutdated = link && content !== lastCreatedContent;

  useEffect(() => {
    if (!expiresAt) return;

    const intervalId = setInterval(() => {
      const expiryTime = new Date(expiresAt + "Z").getTime();
      const now = new Date().getTime();
      const difference = expiryTime - now;

      if (difference <= 0) {
        setTimeLeft("Expired");
        clearInterval(intervalId);
        return;
      }

      const totalSeconds = Math.floor(difference / 1000);

      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const formatted = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

      setTimeLeft(`Expires in ${formatted}`);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [expiresAt]);

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <section className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 p-8 shadow-xl">
        <p className="text-sm text-cyan-400 mb-2">LinkDrop 🔗</p>

        <h1 className="text-4xl font-bold mb-4">
          Create a note. Share it instantly.
        </h1>

        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setCopied(false);
          }}
          className="w-full h-44 rounded-xl bg-slate-950 border border-slate-700 p-6 text-xl text-white placeholder:text-slate-600 outline-none focus:border-cyan-400"
          placeholder="Write something worth sharing..."
        />

        <div className="mt-5 flex flex-wrap items-end gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-400">
              Expires in
            </label>

            <div className="flex items-center gap-3">
              <input
                type="number"
                min="0"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-20 rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-center text-lg text-cyan-300 outline-none focus:border-cyan-400"
              />
              <span className="text-sm text-slate-500">hr</span>

              <input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
                className="w-20 rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-center text-lg text-cyan-300 outline-none focus:border-cyan-400"
              />
              <span className="text-sm text-slate-500">min</span>
            </div>
          </div>

          <div className="relative group">
            <button
              type="button"
              onClick={handleViewOnceToggle}
              className={`h-11 w-11 rounded-lg border flex items-center justify-center text-lg transition
      ${
        viewOnce
          ? "bg-cyan-500/15 border-cyan-400 text-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.18)]"
          : "bg-slate-950 border-slate-700 text-slate-400 hover:border-cyan-500 hover:text-cyan-300"
      }`}
            >
              👁️
            </button>

            <span className="absolute -top-9 left-1/2 -translate-x-1/2 scale-0 rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-200 opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100 whitespace-nowrap">
              View once
            </span>

            {viewOnceMessage && (
              <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 animate-pulse whitespace-nowrap text-xs text-cyan-300">
                View once enabled
              </span>
            )}
          </div>
          <button
            onClick={handleCreate}
            disabled={!content.trim() || (hours === 0 && minutes === 0)}
            className="ml-auto rounded-lg bg-cyan-500 px-6 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
          >
            Create Link
          </button>
        </div>

        {link && (
          <div className="mt-6 rounded-xl border border-slate-700 bg-slate-950 p-4 shadow-inner">
            <p className="mb-2 text-sm font-medium text-slate-300">
              {linkIsOutdated ? "Previous link:" : "Your shareable link:"}
            </p>

            <div className="flex items-center gap-2">
              <input
                value={link}
                readOnly
                className="flex-1 rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-cyan-300 outline-none"
              />

              <button
                onClick={handleCopyLink}
                className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400 transition"
              >
                Copy
              </button>
            </div>

            {copied && <p className="mt-2 text-sm text-cyan-400">Copied! 🚀</p>}

            {timeLeft && (
              <p className="mt-2 text-sm text-slate-400">{timeLeft}</p>
            )}

            {linkIsOutdated && (
              <p className="mt-2 text-sm text-yellow-400">
                Note changed. Create a new link to share the latest version.
              </p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
