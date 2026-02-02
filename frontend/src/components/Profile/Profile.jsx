import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile({ close }) {
  const navigate = useNavigate();

  const [name, setName] = useState(
    localStorage.getItem("userName") || "Student"
  );

  const [dark, setDark] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const saveName = () => {
    localStorage.setItem("userName", name);
    window.location.reload();
  };

  const toggleDark = () => {
    const newMode = !dark;
    setDark(newMode);
    localStorage.setItem("darkMode", newMode);
    document.body.classList.toggle("dark", newMode);
  };

  // ✅ FIXED: clears ONLY todos
  const clearTodos = () => {
    localStorage.removeItem("todos");
    alert("Todos cleared");
  };

  // ✅ Logout works
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="profile-dropdown">
      <label>Name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={saveName}>Save</button>

      <div className="profile-row">
        <span>Dark Mode</span>
        <input type="checkbox" checked={dark} onChange={toggleDark} />
      </div>

      <button className="danger" onClick={clearTodos}>
        Clear Todos
      </button>

      <button className="logout" onClick={handleLogout}>
         Logout
      </button>
    </div>
  );
}
