import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoteView from "./pages/NoteView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/note/:id" element={<NoteView />} />
    </Routes>
  );
}

export default App;
