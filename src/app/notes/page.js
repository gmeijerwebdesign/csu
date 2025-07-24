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
    <div className="w-full p-4 bg-[#f9fafb] rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-2xl text-slate-800">Berichten</h1>
      </div>

      {notes.length !== 0 ? (
        <div className="flex flex-col gap-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 bg-white p-4 rounded shadow-md"
            >
              <div className="flex flex-col">
                <h2 className="font-semibold text-base text-slate-700">
                  {note.title}
                </h2>
                <p className="text-gray-600 text-sm">{note.message}</p>
              </div>

              <FaTrash
                onClick={() => handleDeleteMessage(note.id)}
                className="text-red-500 hover:text-red-700 cursor-pointer self-start sm:self-center"
                title="Verwijder bericht"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm italic">
          Geen meldingen beschikbaar.
        </p>
      )}
    </div>
  );
}
