import { Link } from "react-router-dom";

export default function Navbar() {
  const isLoggedIn = false;

  return (
    <nav className="navbar navbar-expand-lg px-4 bg-white">
      <Link className="navbar-brand fw-bold text-primary" to="/">
        📦 CourierXpress
      </Link>

      <div className="ms-auto d-flex gap-3 align-items-center">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/order" className="nav-link">Order</Link>
        <Link to="/tracking" className="nav-link">Tracking</Link>

        {!isLoggedIn ? (
          <>
            <Link to="/login" className="btn btn-outline-primary">Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </>
        ) : (
          <button className="btn btn-danger">Logout</button>
        )}
      </div>
    </nav>
  );
}