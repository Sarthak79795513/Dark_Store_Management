import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/HomePage";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Orders";
import Staff from "./pages/Staff";
import Logistics from "./pages/Logistics";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import "./App.css";
import Navbar from "./components/Navbar";
import SessionDashboard from "./pages/SessionDashboard";
import StockPrediction from "./pages/StockPrediction";
import WarehouseDashboard from "./pages/warehouseDashboard";
import ContactPage from "./pages/contect";
import SignUp from "./pages/signup";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/logistics" element={<Logistics />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/warehouseDashboard" element={<WarehouseDashboard  />} />
            <Route path="/SessionDashboard" element={<SessionDashboard />} />
            <Route path="/stockprediction" element={<StockPrediction />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
