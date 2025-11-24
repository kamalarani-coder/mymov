import { Link, useLocation } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  const location = useLocation();

  const linkClass = (path) =>
    location.pathname === path ? "nav-link active" : "nav-link";
  // Login page lo Navbar chupinchakunda hide cheyyali
if (location.pathname === "/login") {
  return null;
}

  return (
    <nav className="nav">
      <div className="nav-left">
        <span className="logo">🎬 SR Movie Admin</span>
        <Link to="/" className={linkClass("/")}>
          Home
        </Link>
        <Link to="/dashboard" className={linkClass("/dashboard")}>
          Dashboard
        </Link>
      </div>

      <div className="nav-right">
        {user ? (
          <>
            <span className="nav-email">
              {user.email} ({user.role})
            </span>
            <button className="btn-secondary small" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn-secondary small">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}