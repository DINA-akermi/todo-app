
export default function TodoItem({ task, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${task.completed ? "done" : ""}`}>
      <label className="task-label">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        <span>{task.title}</span>
      </label>

      <button
        type="button"
        className="delete-button"
        onClick={() => onDelete(task.id)}
        aria-label={`Supprimer ${task.title}`}
      >
        Supprimer
      </button>
    </li>
  );
}
