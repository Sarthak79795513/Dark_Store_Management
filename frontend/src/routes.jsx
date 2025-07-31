// src/routes.js
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/WarehouseDashboard';
import WarehouseDashboard from './pages/WarehouseDashboard';
import ShopDashboard from './pages/ShopDashboard';
import DeliveryDashboard from './pages/DeliveryDashboard';
import HomePage from './pages/HomePage';

const RoutesComponent = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/warehouse" element={<WarehouseDashboard />} />
    <Route path="/shop" element={<ShopDashboard />} />
    <Route path="/delivery" element={<DeliveryDashboard />} />
    <Route path="/home" element={<HomePage />} />
  </Routes>
);

export default RoutesComponent;
