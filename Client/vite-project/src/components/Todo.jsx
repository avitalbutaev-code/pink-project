export default function Todo({ todo, onUpdate, onDelete }) {
  return (
    <li className="todo-item">
      <label className="todo-label">
        <input
          type="checkbox"
          checked={!!todo.checked}
          onChange={(e) =>
            onUpdate(todo.todo_id, { checked: e.target.checked ? 1 : 0 })
          }
        />
        <span className={todo.checked ? "checked" : ""}>{todo.content}</span>
      </label>
      <button onClick={() => onDelete(todo.todo_id)}>Delete</button>
    </li>
  );
}
