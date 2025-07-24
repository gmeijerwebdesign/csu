import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function Notes({ notifications, OnDelete }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    setNotes(notifications);
  }, [notifications]);

  const handleDeleteMessage = async (noteId) => {
    const res = await fetch("/api/message/delete-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: noteId }),
    });

    if (res.ok) {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
      OnDelete(noteId);
    } else {
      console.error("Verwijderen mislukt");
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="py-4 font-bold text-xl text-slate-800">
          Organiesatiebeheer
        </h1>
      </div>
      {notes.length !== 0
        ? notes.map((note, index) => (
            <div key={index} className="flex items-center gap-11">
              <h1 className="font-semibold">{note.title}</h1>
              <p className="text-gray-600">{note.message}</p>

              <FaTrash
                onClick={() => handleDeleteMessage(note.id)}
                className="text-red-500 cursor-pointer"
              />
            </div>
          ))
        : null}
    </div>
  );
}
