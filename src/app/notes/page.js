import { useEffect, useState } from "react";

export default function Notes(notifications) {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    console.log(notes);
    setNotes(notifications.notifications);
  }, [notes]);
  return (
    <div>
      {notes.length !== 0
        ? notes.map((note, index) => (
            <div key={index}>
              <h1>{note.title}</h1>
              <p>{note.message}</p>
            </div>
          ))
        : null}
    </div>
  );
}
