// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";


export default function Login() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // map role → route
  const getRoleRoute = (role) => {
    switch (role) {
      case "admin":
        return "/";
      case "warehouse":
        return "/staff";
      case "shop":
        return "/shop-dashboard";
      case "delivery":
        return "/delivery-dashboard";
      default:
        return "/";
    }
  };

  const handleLogin = async () => {
    if (!name || !password) {
      setError("Please fill all fields.");
      return;
    }

    // 📤 Log what we’re about to send
    console.log("Login payload:", { name, role, password });

    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, password }),
      });
      const data = await res.json();

      // If backend says “not ok,” show its message
      if (!res.ok) {
        setError(data.message || "Login failed.");
        return;
      }

      // 📥 Log the full JSON response
      console.log("Login response:", data);

      // ✅ Pull out the nested user object
      const user = data.user;
      if (!user || !user.role) {
        setError("Malformed response from server.");
        return;
      }

      // 🔑 Store exactly what your HomePage is expecting
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);
      console.log("Stored to localStorage →", {
        user: JSON.parse(localStorage.getItem("user")),
        role: localStorage.getItem("role"),
      });

      // 🚀 Navigate to the right place
      navigate(getRoleRoute(user.role));
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login to DarkStore</h2>
      {error && <p className="error">{error}</p>}

      <label>Username:</label>
      <input
        type="text"
        placeholder="Enter your username"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Password:</label>
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <label>Select Role:</label>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="admin">Admin</option>
        <option value="warehouse">Warehouse Staff</option>
        <option value="shop">Retail Shop Owner</option>
        <option value="delivery">Delivery Personnel</option>
      </select>

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
