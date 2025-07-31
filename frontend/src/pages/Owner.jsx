import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Owner.css";

const Owner = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  // Redirect if not shop owner
  React.useEffect(() => {
    if (role !== "shop") {
      navigate("/login");
    }
  }, [role, navigate]);

  return (
    <div className="owner-dashboard">
      <h2>Retail Shop Owner Dashboard</h2>
      <div className="owner-options">
        <button onClick={() => navigate("/inventory")}>View Inventory</button>
        <button onClick={() => navigate("/restock-orders")}>Place Restock Orders</button>
        <button onClick={() => navigate("/sales-reports")}>Access Sales Reports</button>
      </div>
    </div>
  );
};

export default Owner;
