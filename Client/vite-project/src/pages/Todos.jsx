import { useEffect, useState } from "react";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "../api";
import Todo from "../components/Todo";

export default function Todos() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos(user.user_id).then(setTodos).catch(console.error);
  }, [user.user_id]);

  const handleAdd = async () => {
    if (!newTodo) return;
    const created = await createTodo(user.user_id, newTodo);
    setTodos((prev) => [...prev, created]);
    setNewTodo("");
  };

  const handleUpdate = async (todoId, updates) => {
    await updateTodo(user.user_id, todoId, updates);
    setTodos((prev) =>
      prev.map((t) => (t.todo_id === todoId ? { ...t, ...updates } : t))
    );
  };

  const handleDelete = async (todoId) => {
    await deleteTodo(todoId);
    setTodos((prev) => prev.filter((t) => t.todo_id !== todoId));
  };

  return (
    <div>
      <h2>Todos</h2>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New todo"
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {todos.map((todo) => (
          <Todo
            key={todo.todo_id}
            todo={todo}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}
