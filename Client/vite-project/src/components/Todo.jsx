export default function Todo({ todo, onUpdate, onDelete }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.checked}
        onChange={(e) => onUpdate(todo.todo_id, { checked: e.target.checked })}
      />
      {todo.content}
      <button onClick={() => onDelete(todo.todo_id)}>Delete</button>
    </li>
  );
}
