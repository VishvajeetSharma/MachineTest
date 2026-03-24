
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const menuItems = [
  { path: "/", text: "Login" },
  { path: "/register", text: "Register" },
  { path: "/create-task", text: "Create Task" },
  { path: "/view-task", text: "View Tasks" },
  { path: "/update-task", text: "Update Task" }
];

  return (
    <nav className="navbar navbar-expand-lg bg-dark my-second-bg-dark">
      <div className="container">
        <NavLink className="navbar-brand text-light fs-3 fw-bold" to="/">
          Task
        </NavLink>

        <button
          className="navbar-toggler text-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" style={{ lineHeight: 1 }}>
            ☰
          </span>
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