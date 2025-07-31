import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Delivery.css";

const Delivery = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  // Redirect if not delivery personnel
  React.useEffect(() => {
    if (role !== "delivery") {
      navigate("/login");
    }
  }, [role, navigate]);

  return (
    <div className="delivery-dashboard">
      <h2>Delivery Personnel Dashboard</h2>
      <div className="delivery-options">
        <button onClick={() => navigate("/delivery-dashboard")}>View Delivery Assignments</button>
        <button onClick={() => navigate("/update-delivery")}>Update Delivery Status</button>
        <button onClick={() => navigate("/report-delivery-issue")}>Report Delivery Issues</button>
      </div>
    </div>
  );
};

export default Delivery;
