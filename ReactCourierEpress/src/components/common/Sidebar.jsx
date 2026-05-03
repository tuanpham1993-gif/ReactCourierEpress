import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Đăng xuất thành công");
    window.location.href = "/login";
  };
  return (
    <aside className="sidebar">
      <div className="logo-box">
        <img src="/images/logo1.png" alt="CourierXpress Logo" className="logo-img" />
        <div className="logo-text">
          Courier<span>Xpress</span>
        </div>
      </div>

      <nav className="sidebar-menu">
        <Link
          to="/admin/dashboard"
          className={`menu-item ${isActive("/admin/dashboard") ? "active" : ""}`}
        >
          🏠 Dashboard
        </Link>

        <hr />

        <div className="menu-title">MANAGE SHIPMENTS</div>

        <Link
          to="/admin/shipments"
          className={`menu-item ${isActive("/admin/shipments") ? "active" : ""}`}
        >
          📦 Shipments
        </Link>

        <Link
          to="/admin/shipments/create"
          className={`menu-item ${isActive("/admin/shipments/create") ? "active" : ""}`}
        >
          ➕ Add order
        </Link>

        <Link
          to="/admin/assign-orders"
          className={`menu-item ${isActive("/admin/assign-orders") ? "active" : ""}`}
        >
          👤 Assign orders
        </Link>

        <Link
          to="/admin/shipment-tracking"
          className={`menu-item ${isActive("/admin/shipment-tracking") ? "active" : ""}`}
        >
          🕘 Shipment Tracking
        </Link>

        <hr />

        <div className="menu-title">MANAGE SYSTEM</div>

        <Link to="/admin/invoices" className="menu-item">
          🧾 Invoices
        </Link>

        <Link
          to="/admin/agents"
          className={`menu-item ${isActive("/admin/agents") ? "active" : ""}`}
        >
          👥 Agents
        </Link>

        <Link to="/admin/customers" className="menu-item">
          👤 Customer
        </Link>

        <Link to="/admin/branches"
          className={`menu-item ${isActive("/admin/branches") ? "active" : ""}`} >
          🏢 Branches
        </Link>

        <hr />

        <div className="menu-title">REPORTS</div>

        <Link to="/admin/reports"
          className={`menu-item ${isActive("/admin/reports") ? "active" : ""}`} >
          📊 Reports & Analytics
        </Link>

        <div className="menu-title">REPORTS</div>

        <Link to="/admin/notifications" className="menu-item">
          🔔 Notifications
        </Link>

        <Link to="/admin/settings" className="menu-item">
          ⚙️ Settings
        </Link>

        <li className="nav-item mt-3">
          <button
            onClick={handleLogout}
            className="btn btn-warning w-100"
          >
            Logout
          </button>
        </li>
      </nav>
    </aside>
  );
}

export default Sidebar;