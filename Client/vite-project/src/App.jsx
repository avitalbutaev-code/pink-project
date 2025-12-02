import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import LoginPage from "./pages/Login";
import Home from "./pages/Home";
import "./App.css";
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("currentUser");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

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
            user ? <Home logout={handleLogout} /> : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<Navigate to={user ? "/home" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
