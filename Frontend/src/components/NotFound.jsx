
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="d-flex align-items-center justify-content-center bg-light" style={{height:"90vh"}}>
      <div className="text-center">
        <h1 className="display-1 fw-bold text-dark">404</h1>
        <h2 className="mb-3">Page Not Found</h2>
        <p className="text-muted mb-4">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>
        <NavLink to="/" className="btn btn-primary">
          Go Back Home
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;