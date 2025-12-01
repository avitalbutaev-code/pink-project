import { Routes, Route, Link } from "react-router";
import Info from "./Info";
import Todos from "./Todos";
import Posts from "./Posts";

export default function Home({ user, logout }) {
  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <nav>
        <Link to="info">Info</Link> | <Link to="todos">Todos</Link> |{" "}
        <Link to="posts">Posts</Link> | <button onClick={logout}>Logout</button>
      </nav>
      <Routes>
        <Route path="info" element={<Info user={user} />} />
        <Route path="todos" element={<Todos user={user} />} />
        <Route path="posts" element={<Posts user={user} />} />
      </Routes>
    </div>
  );
}
