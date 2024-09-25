import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from localStorage and navigate to login
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <header className="header">
      <Link
        to="/"
        style={{
          fontWeight: 500,
          color: "white",
        }}
      >
        Logo
      </Link>
      <nav className="nav">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
