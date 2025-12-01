import { useEffect, useState } from "react";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "../api";
import Todo from "../components/Todo";

export default function Todos({ user }) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  async function loadTodos() {
    const data = await fetchTodos(user.user_id);
    setTodos(data);
  }

  useEffect(() => {
    loadTodos();
  }, []);

  async function handleAdd() {
    if (!newTodo) return;
    await createTodo(user.user_id, newTodo);
    setNewTodo("");
    loadTodos();
  }

  async function handleUpdate(todoId, updates) {
    await updateTodo(user.user_id, todoId, updates);
    loadTodos();
  }

  async function handleDelete(todoId) {
    await deleteTodo(todoId);
    loadTodos();
  }

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
