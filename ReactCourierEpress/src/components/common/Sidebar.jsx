import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo-box">
    
        <img src="/images/logo1.png"alt="CourierXpress Logo"className="logo-img" />

        <div className="logo-text">
          Courier<span>Xpress</span>
        </div>
      </div>

      <nav className="sidebar-menu">
        <Link to="/" className="menu-item active">
          🏠 Dashboard
        </Link>
        <hr></hr>
        <div className="menu-title">MANAGE SHIPMENTS</div>

        <Link to="/shipments" className="menu-item">
          📦 Shipments
        </Link>

        <Link to="/shipments" className="menu-item">
          ➕ Add order
        </Link>

         <Link to="/shipments" className="menu-item">
          👤 Assign orders
        </Link>

        <Link to="/shipment-tracking" className="menu-item">
          <span>🕘</span>
          <span>Shipment Tracking</span>
        </Link>
        <hr></hr>
        <div className="menu-title">MANAGE SYSTEM</div>

        <Link to="/agents" className="menu-item">
          🧾 Invoices
        </Link>

        <Link to="/agents" className="menu-item">
          👥 Agents
        </Link>

        <Link to="/agents" className="menu-item">
          👤 Customer
        </Link>

        <Link to="/branches" className="menu-item">
          <span>🏢</span>
          <span>Branches</span>
        </Link>

        <div className="menu-title">REPORTS</div>
        <hr></hr>
        <Link to="/reports" className="menu-item">
          📊 Reports
        </Link>

        <Link to="/reports" className="menu-item">
          📈 Statistical data
        </Link>

        <hr></hr>
        <div className="menu-title">OTHER</div>
        <Link to="/notifications" className="menu-item">
          <span>🔔</span>
          <span>Notifications</span>
        </Link>

        <Link to="/settings" className="menu-item">
          <span>⚙️</span>
          <span>Configuration</span>
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;