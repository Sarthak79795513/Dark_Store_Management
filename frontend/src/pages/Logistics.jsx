// src/pages/Logistics.jsx
import React, { useState, useEffect } from "react";
import "../styles/Logistics.css";

export default function Logistics() {
  const [deliveries, setDeliveries] = useState([]);
  const [form, setForm]             = useState({
    deliveryId: "",
    orderId: "",
    address: "",
    status: "pending",
  });
  const [error, setError]           = useState("");

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const res  = await fetch("http://localhost:8000/api/logistics");
      const data = await res.json();
      setDeliveries(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const { deliveryId, orderId, address } = form;
    if (!deliveryId || !orderId || !address) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/logistics", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to add delivery");
      }
      setForm({ deliveryId: "", orderId: "", address: "", status: "pending" });
      fetchDeliveries();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="logistics-page">
      <h1>🚚 Logistics & Deliveries</h1>

      <form className="logistics-form" onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="Delivery ID"
          value={form.deliveryId}
          onChange={e => setForm({ ...form, deliveryId: e.target.value })}
        />
        <input
          type="text"
          placeholder="Order ID"
          value={form.orderId}
          onChange={e => setForm({ ...form, orderId: e.target.value })}
        />
        <input
          type="text"
          placeholder="Delivery Address"
          value={form.address}
          onChange={e => setForm({ ...form, address: e.target.value })}
        />
        <select
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="in transit">In Transit</option>
          <option value="delivered">Delivered</option>
          <option value="issue">Issue</option>
        </select>
        <button type="submit">Add Delivery</button>
      </form>

      <table className="logistics-table">
        <thead>
          <tr>
            <th>Delivery ID</th>
            <th>Order ID</th>
            <th>Address</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map(d => (
            <tr key={d._id}>
              <td>{d.deliveryId}</td>
              <td>{d.orderId}</td>
              <td>{d.address}</td>
              <td>{d.status}</td>
              <td>
                {/* You could wire up edit/delete here */}
                <button onClick={() => {/* update status… */}}>Edit</button>
                <button onClick={() => {/* delete… */}}>Delete</button>
              </td>
            </tr>
          ))}
          {deliveries.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No deliveries found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
