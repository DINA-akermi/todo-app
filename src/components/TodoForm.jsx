
import { useRef, useState } from "react";

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();

    const title = text.trim();

    if (!title) {
      inputRef.current?.focus();
      return;
    }

    onAdd(title);
    setText("");
    inputRef.current?.focus();
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Nouvelle tâche..."
        aria-label="Nouvelle tâche"
      />

      <button type="submit">Ajouter</button>
    </form>
  );
}
