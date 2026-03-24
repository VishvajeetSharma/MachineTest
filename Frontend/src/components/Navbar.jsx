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
    <nav className="navbar navbar-expand-lg my-first-bg">
      <div className="container">
        <NavLink className="navbar-brand text-light fs-3 fw-bold" to="/">
          TaskMaster
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-5">
            {menuItems.map((link, index) => (
              <li className="nav-item" key={index}>
                <NavLink
                  className={({ isActive }) =>
                    `nav-link text-light ${isActive ? "active" : ""}`
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
