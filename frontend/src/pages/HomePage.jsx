// HomePage.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import adminImg from "../assets/adminImg.png";
import warehouseImg from "../assets/warehouseImg.jpg"; 
import shopImg from "../assets/shopImg.jpg";
import deliveryImg from "../assets/deliveryImg.jpg";
import "../styles/HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    console.log("Loaded role on HomePage:", role);
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // if no role, show login prompt only
  if (!userRole) {
    return (
      <div className="homepage-container">
        <h1>Welcome to DarkStore Management</h1>
        <p>Please <Link to="/login">login</Link> to continue.</p>

        <section className="features-section">
          <h2>Features of DarkStore Management</h2>
          <ul className="features-list">
            <li><strong>Manage Warehouses</strong></li>
            <li><strong>Oversee Inventory</strong></li>
            <li><strong>Monitor Orders</strong></li>
            <li><strong>Analyze Predictions</strong></li>
          </ul>
        </section>
        

        <section className="roles-section">
          <h2>How You Can Use It</h2>
          <div className="role-cards">
            <article className="role-card">
              <img src={adminImg} alt="Admin" />
              <h3>Admin</h3>
              <p>Manage warehouses, inventory, orders, and view analytics.</p>
            </article>
            <article className="role-card">
              <img src={warehouseImg} alt="Warehouse Manager" />
              <h3>Warehouse Manager</h3>
              <p>Update stock levels, process shipments, and report issues.</p>
            </article>
            <article className="role-card">
              <img src={shopImg} alt="Shop Manager" />
              <h3>Shop Manager</h3>
              <p>View inventory, place orders, and access sales reports.</p>
            </article>
            <article className="role-card">
              <img src={deliveryImg} alt="Delivery Personnel" />
              <h3>Delivery Personnel</h3>
              <p>Manage delivery assignments and update delivery statuses.</p>
            </article>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="homepage-bg-wrapper">
    <div className="homepage-container">
      <h1>Welcome to DarkStore Management</h1>
      <p>Manage your role-specific operations all in one place.</p>

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>

      <div className="features-grid">
        {userRole === "admin" && (
          <>
            <Link to="/warehouseDashboard" className="feature-card">
              Manage Warehouses
            </Link>
            <Link to="/inventory" className="feature-card">
              Oversee Inventory
            </Link>
            <Link to="/orders" className="feature-card">
              Monitor Orders
            </Link>
            <Link to="/stockprediction" className="feature-card">
              Analyze Predictions
            </Link>
          </>
        )}

        {userRole === "warehouse" && (
          <>
            <Link to="/inventory" className="feature-card">
              Update Stock Levels
            </Link>
            <Link to="/logistics" className="feature-card">
              Process Shipments
            </Link>
            <Link to="/report-issues" className="feature-card">
              Report Issues
            </Link>
          </>
        )}

        {userRole === "shop" && (
          <>
            <Link to="/inventory" className="feature-card">
              View Inventory
            </Link>
            <Link to="/restock-orders" className="feature-card">
              Place Restock Orders
            </Link>
            <Link to="/sales-reports" className="feature-card">
              Access Sales Reports
            </Link>
          </>
        )}

        {userRole === "delivery" && (
          <>
            <Link to="/delivery-dashboard" className="feature-card">
              Delivery Assignments
            </Link>
            <Link to="/update-delivery" className="feature-card">
              Update Delivery Status
            </Link>
            <Link to="/report-delivery-issue" className="feature-card">
              Report Delivery Issues
            </Link>
          </>
        )}
      </div>
    </div>
    </div>
  );
} 