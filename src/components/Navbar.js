import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-4">
      <Link className="navbar-brand" to="/" style={{ fontWeight: '700', letterSpacing: '0.5px' }}>
        TopGuns Bank
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="navbar-nav ms-auto">
          <Link className="nav-link nav-animated" to="/">Home</Link>
          <Link className="nav-link nav-animated" to="/customers">Customers</Link>
          <Link className="nav-link nav-animated" to="/about">About</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
