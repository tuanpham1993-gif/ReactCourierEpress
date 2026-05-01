import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import CustomerLayout from "../layouts/CustomerLayout";

// PUBLIC
import HomePage from "../pages/public/HomePage";
import RegisterPage from "../pages/public/RegisterPage";
import LoginPage from "../pages/public/LoginPage";
import ForgotPasswordPage from "../pages/public/ForgotPasswordPage";
import ResetPasswordPage from "../pages/public/ResetPasswordPage";
import OrderPage from "../pages/public/OrderPage";
import TrackingPage from "../pages/public/TrackingPage";


// CUSTOMER
import CustomerDashboard from "../pages/customer/Dashboard";
import MyShipmentsPage from "../pages/customer/MyShipmentsPage";
import NotificationsPage from "../pages/customer/NotificationsPage";
import CreateShipmentPage from "../pages/customer/CustomerCreateShipment";
import CustomerTrackShipment from "../pages/customer/CustomerTrackShipment";
import CustomerProfile from "../pages/customer/CustomerProfile";

// ADMIN
import Dashboard from "../pages/admin/Dashboard";
import ShipmentDetail from "../pages/admin/ShipmentDetail";
import ShipmentCreate from "../pages/admin/ShipmentCreate";
import ShipmentEdit from "../pages/admin/ShipmentEdit";
import AdminLayout from "../layouts/AdminLayout";
import ShipmentTracking from "../pages/admin/ShipmentTracking";
import Branches from "../pages/admin/Branches";
import Agents from "../pages/admin/Agents";

// PROTECT
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

export default function AppRoutes({ user }) {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/tracking" element={<TrackingPage />} />
      </Route>

      {/* CUSTOMER (PROTECTED + ROLE) */}
      <Route
        element={
          <ProtectedRoute user={user}>
            <RoleRoute user={user} role={3}>
              <CustomerLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/my-shipments" element={<MyShipmentsPage />} />
        <Route path="/customer/notifications" element={<NotificationsPage />} />
        <Route path="/customer/create-shipment" element={<CreateShipmentPage />} />
        <Route path="/customer/tracking" element={<CustomerTrackShipment />} />
        <Route path="/customer/profile" element={<CustomerProfile />} />
      </Route>

      {/* ADMIN (PROTECTED + ROLE) */}
      {/* ADMIN (PROTECTED + ROLE) */}
      <Route
        element={
          <ProtectedRoute user={user}>
            <RoleRoute user={user} role={1}>
              <AdminLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route path="/admin/dashboard" element={<Dashboard />} />

        <Route path="/admin/shipments" element={<Dashboard />} />

        <Route path="/admin/shipment-tracking" element={<ShipmentTracking />} />

        <Route path="/admin/branches" element={<Branches />} />

        <Route path="/admin/agents" element={<Agents />} />

        <Route path="/admin/reports" element={<Dashboard />} />

        <Route path="/admin/shipments/create" element={<ShipmentCreate />} />

        <Route path="/admin/shipments/edit/:id" element={<ShipmentEdit />} />

        <Route path="/admin/shipments/detail/:id" element={<ShipmentDetail />} />
      </Route>

    </Routes>
  );
}