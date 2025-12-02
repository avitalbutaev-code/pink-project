const API_BASE = "http://localhost:3000";

async function handleResponse(res) {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || "Request failed");
  }
  return res.json();
}

export async function loginUser(username, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return handleResponse(res);
}

// Todos
export async function fetchTodos(userId) {
  return handleResponse(await fetch(`${API_BASE}/todos/${userId}`));
}
export async function createTodo(userId, content) {
  const res = await fetch(`${API_BASE}/todos/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  return handleResponse(res);
}
export async function updateTodo(userId, todoId, updates) {
  const res = await fetch(`${API_BASE}/todos/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ todoId, ...updates }),
  });
  return handleResponse(res);
}
export async function deleteTodo(todoId) {
  const res = await fetch(`${API_BASE}/todos/${todoId}`, { method: "DELETE" });
  return handleResponse(res);
}

// Posts
export async function fetchPosts(userId) {
  const url = userId ? `${API_BASE}/posts/${userId}` : `${API_BASE}/posts`;
  return handleResponse(await fetch(url));
}
export async function createPost(userId, title, content) {
  const res = await fetch(`${API_BASE}/posts/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });
  return handleResponse(res);
}

export async function deletePost(postId) {
  const res = await fetch(`${API_BASE}/posts/${postId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  return handleResponse(res);
}

// Comments
export async function fetchComments(postId) {
  return handleResponse(await fetch(`${API_BASE}/comments/${postId}`));
}
export async function createComment(userId, postId, content) {
  const res = await fetch(`${API_BASE}/comments/${userId}/${postId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  return handleResponse(res);
}
export async function updateComment(commentId, content) {
  const res = await fetch(`${API_BASE}/comments/${commentId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  return handleResponse(res);
}
export async function deleteComment(commentId) {
  const res = await fetch(`${API_BASE}/comments/${commentId}`, {
    method: "DELETE",
  });
  return handleResponse(res);
}
