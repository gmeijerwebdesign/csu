import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function Notes(notifications) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    setNotes(notifications.notifications);
  }, [notifications]);

  const handleDeleteMessage = async (noteId) => {
    const res = await fetch("/api/message/delete-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: noteId }),
    });

    if (res.ok) {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
      alert("succes");
    } else {
      console.error("Verwijderen mislukt");
    }
  };

  return (
    <div>
      {notes.length !== 0
        ? notes.map((note, index) => (
            <div key={index} className="flex items-center gap-11">
              <h1>{note.title}</h1>
              <p>{note.message}</p>

              <FaTrash onClick={() => handleDeleteMessage(note.id)} />
            </div>
          ))
        : null}
    </div>
  );
}
