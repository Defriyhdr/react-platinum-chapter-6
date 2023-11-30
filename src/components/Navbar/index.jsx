import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accesToken");

  const handleLogout = () => {
    localStorage.removeItem("accesToken");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link to={"/"}>
            <a className="navbar-brand" href="#">
              Home
            </a>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to={"/login"}>
                  <a className="nav-link" aria-current="page" href="#">
                    {accessToken ? (
                      <button onClick={handleLogout} className="btn btn-danger">
                        Logout
                      </button>
                    ) : (
                      <Link to={"/login"}>
                        <button className="btn btn-success">Login</button>
                      </Link>
                    )}
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
