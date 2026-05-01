import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      style={{
        background: "#1E40AF",
        color: "#fff",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h5 className="fw-bold mb-3">👤 Customer</h5>
      <hr style={{ borderColor: "#fff" }} />

      <ul className="nav flex-column">

        <li className="nav-item mb-2">
          <Link to="/customer/dashboard" className="nav-link text-white fw-bold">
            Dashboard
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link to="/customer/create-shipment" className="nav-link text-white">
            Create Shipment
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link to="/customer/my-shipments" className="nav-link text-white">
            My Shipments
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link to="/customer/tracking" className="nav-link text-white">
            Track Shipment
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link to="/customer/notifications" className="nav-link text-white">
            Notifications
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link to="/customer/profile" className="nav-link text-white">
            Profile
          </Link>
        </li>

        <li className="nav-item mt-3">
          <Link to="/login" className="nav-link text-warning">
            Logout
          </Link>
        </li>

      </ul>
    </div>
  );
}