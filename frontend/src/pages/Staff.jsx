import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Staff.css";

const Staff = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  // Redirect if not warehouse role
  React.useEffect(() => {
    if (role !== "warehouse") {
      navigate("/login");
    }
  }, [role, navigate]);

  return (
    <div className="staff-dashboard">
      <h2>Warehouse Staff Dashboard</h2>
      <div className="staff-options">
        <button onClick={() => navigate("/inventory")}>Update Stock Levels</button>
        <button onClick={() => navigate("/logistics")}>Process Shipments</button>
        <button onClick={() => navigate("/report-issues")}>Report Issues</button>
      </div>
    </div>
  );
};

export default Staff;
