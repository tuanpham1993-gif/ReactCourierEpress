import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import CustomerLayout from "../layouts/CustomerLayout";
import AdminLayout from "../layouts/AdminLayout";

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
import ShipmentTracking from "../pages/admin/ShipmentTracking";
import Branches from "../pages/admin/Branches";
import Agents from "../pages/admin/Agents";
import AssignOrders from "../pages/admin/AssignOrders";
import Customers from "../pages/admin/Customers";
import Invoices from "../pages/admin/Invoices";
import Reports from "../pages/admin/Reports";
import Settings from "../pages/admin/Settings";

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

      {/* CUSTOMER */}
      <Route
        path="/customer"
        element={
          <ProtectedRoute user={user}>
            <RoleRoute user={user} role={3}>
              <CustomerLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<CustomerDashboard />} />
        <Route path="my-shipments" element={<MyShipmentsPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="create-shipment" element={<CreateShipmentPage />} />
        <Route path="tracking" element={<CustomerTrackShipment />} />
        <Route path="profile" element={<CustomerProfile />} />
      </Route>

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute user={user}>
            <RoleRoute user={user} role={1}>
              <AdminLayout />
            </RoleRoute>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="shipments" replace />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="customers" element={<Customers />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />

        <Route path="shipments" element={<Dashboard />} />
        <Route path="shipments/create" element={<ShipmentCreate />} />
        <Route path="shipments/edit/:id" element={<ShipmentEdit />} />
        <Route path="shipments/detail/:id" element={<ShipmentDetail />} />

        <Route path="shipment-tracking" element={<ShipmentTracking />} />
        <Route path="assign-orders" element={<AssignOrders />} />
        <Route path="branches" element={<Branches />} />
        <Route path="agents" element={<Agents />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
}