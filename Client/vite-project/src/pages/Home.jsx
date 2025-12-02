import { Routes, Route, Link, Navigate } from "react-router";
import Info from "./Info";
import Todos from "./Todos";
import Posts from "./Posts";

export default function Home({ logout }) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome, {user.username}</h1>
        <nav>
          <Link to="/home/info">Info</Link>
          <Link to="/home/todos">Todos</Link>
          <Link to="/home/posts">Posts</Link>
          <button onClick={logout}>Logout</button>
        </nav>
      </header>

      <main className="home-content">
        <Routes>
          <Route path="info" element={<Info />} />
          <Route path="todos" element={<Todos />} />
          <Route path="posts" element={<Posts />} />
          <Route path="" element={<Navigate to="info" />} />
          <Route path="*" element={<Navigate to="info" />} />
        </Routes>
      </main>
    </div>
  );
}
