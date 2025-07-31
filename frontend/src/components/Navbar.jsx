import React from "react";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <h1>DarkStore</h1>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
          <li><a href="/signup">SignUp</a></li>
        
        <li><a href="/contact">Contact</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/SessionDashboard">Stock</a></li>
      </ul>
    </div>
  );
};

export default Navbar;
