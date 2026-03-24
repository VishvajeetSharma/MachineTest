import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context.jsx";

const Navbar = () => {

  const { token } = useContext(AuthContext);

  const menuItems = token
    ? [
        { path: "/view-task", text: "View Tasks" },
        { path: "/create-task", text: "Create Task" },
        { path: "/logout", text: "Logout" },
      ]
    : [
        { path: "/", text: "Login" },
        { path: "/register", text: "Register" },
      ];

  return (
    <nav className="navbar navbar-expand-lg glass-navbar sticky-top py-3">
      <div className="container">
        <NavLink className="navbar-brand fs-2 fw-bold text-white" to="/">
          Task<span className="text-warning">Master</span>
        </NavLink>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" style={{ filter: "invert(1)" }}></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3">
            {menuItems.map((link, index) => (
              <li className="nav-item" key={index}>
                <NavLink
                  className={({ isActive }) =>
                    `nav-link fw-bold px-3 rounded-pill text-white transition-all ${isActive ? "bg-white bg-opacity-25 shadow-sm" : "opacity-75 hover-opacity-100"}`
                  }
                  to={link.path}
                >
                  {link.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
