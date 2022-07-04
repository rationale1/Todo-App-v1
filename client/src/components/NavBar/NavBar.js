import React from "react";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a href="/" className="navbar-brand">
        TodoApp
      </a>
      <button
        type="button"
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-expanded="false"
        aria-label="Toggle"
        aria-controls="navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="navbar-nav ml-auto">
          <a href="/" className="nav-item nav-link">
            Home
          </a>

          <a href="/" className="nav-item nav-link">
            Register
          </a>

          <a href="/" className="nav-item nav-link">
            Login
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
