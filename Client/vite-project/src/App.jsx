import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import LoginPage from "./pages/Login";
import Home from "./pages/Home";

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            !user ? <LoginPage setUser={setUser} /> : <Navigate to="/home" />
          }
        />
        <Route
          path="/home/*"
          element={
            user ? (
              <Home user={user} logout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to={user ? "/app" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
