const API_BASE = "http://localhost:3000";

export async function loginUser(username, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Login failed");
  }
  return res.json();
}

export async function fetchTodos(userId) {
  const res = await fetch(`${API_BASE}/todos/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}

export async function createTodo(userId, content) {
  const res = await fetch(`${API_BASE}/todos/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error("Failed to create todo");
  return res.json();
}

export async function updateTodo(userId, todoId, updates) {
  const res = await fetch(`${API_BASE}/todos/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ todoId, ...updates }),
  });
  if (!res.ok) throw new Error("Failed to update todo");
  return res.json();
}

export async function deleteTodo(todoId) {
  const res = await fetch(`${API_BASE}/todos/${todoId}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete todo");
  return res.json();
}

export async function fetchPosts(userId) {
  const url = userId ? `${API_BASE}/posts/${userId}` : `${API_BASE}/posts`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export async function createPost(userId, title, content) {
  const res = await fetch(`${API_BASE}/posts/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });
  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
}

export async function fetchComments(postId) {
  const res = await fetch(`${API_BASE}/comments/${postId}`);
  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
}

export async function createComment(userId, postId, content) {
  const res = await fetch(`${API_BASE}/comments/${userId}/${postId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error("Failed to create comment");
  return res.json();
}
export async function updateComment(userId, commentId, content) {
  const res = await fetch(`${API_BASE}/comments/${userId}/${commentId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error("Failed to update comment");
  return res.json();
}

export async function deleteComment(userId, commentId) {
  const res = await fetch(`${API_BASE}/comments/${userId}/${commentId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete comment");
  return res.json();
}
