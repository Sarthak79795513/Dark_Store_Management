// src/components/Sidebar.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaTruck,
  FaChartLine,
  FaSignOutAlt,
} from "react-icons/fa";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar open by default

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? "" : "collapsed"}`}>
        <div className="sidebar-header">
          {isOpen && "DarkStore"}
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isOpen ? <FaAngleLeft /> : <FaAngleRight />}
          </button>
        </div>
        <ul className="sidebar-menu">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              <FaHome /> {isOpen && "Home"}
            </NavLink>
          </li>
          <li>
            <NavLink to="/inventory" className={({ isActive }) => (isActive ? "active" : "")}>
              <FaBoxOpen /> {isOpen && "Inventory"}
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" className={({ isActive }) => (isActive ? "active" : "")}>
              <FaShoppingCart /> {isOpen && "Orders"}
            </NavLink>
          </li>
         
         
         
          <li className="logout">
            <NavLink to="/login">
              <FaSignOutAlt /> {isOpen && "Logout"}
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
