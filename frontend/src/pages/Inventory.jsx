// src/pages/Inventory.jsx
import React, { useEffect, useState } from "react"
import "../styles/Inventory.css"

export default function Inventory() {
  const [items, setItems]     = useState([])
  const [form, setForm]       = useState({ name: "", type: "", quantity: "", price: "", status: "in stock" })
  const [error, setError]     = useState("")

  // Fetch items on mount
  useEffect(() => {
    fetchItems()
  }, [])

  async function fetchItems() {
    try {
      const res  = await fetch("http://localhost:8000/api/inventory")
      const data = await res.json()
      setItems(data)
    } catch (err) {
      console.error(err)
    }
  }

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    // basic validation
    if (!form.name || !form.type || !form.quantity || !form.price) {
      setError("Please fill in all required fields.")
      return
    }

    try {
      const res = await fetch("http://localhost:8000/api/inventory", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          name:     form.name,
          type:     form.type,
          quantity: Number(form.quantity),
          price:    Number(form.price),
          status:   form.status
        })
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || "Failed to add item")
      }
      // clear form and reload table
      setForm({ name: "", type: "", quantity: "", price: "", status: "in stock" })
      fetchItems()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="inventory-page">
      <h1>Inventory Management</h1>

      {/* Add‐item form */}
      <form className="add-item-form" onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Item Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Type"
          value={form.type}
          onChange={e => setForm({ ...form, type: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={e => setForm({ ...form, quantity: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
        />
        <select
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
        >
          <option value="in stock">In Stock</option>
          <option value="low stock">Low Stock</option>
          <option value="out of stock">Out of Stock</option>
        </select>

        <button type="submit">Add Item</button>
      </form>

      {/* Items table */}
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Price (₹)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.status}</td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No items in inventory.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
