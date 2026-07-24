import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="nf-page">
      <div className="nf-container">
        <div className="nf-content">
          <h1 className="nf-code">404</h1>
          <h2 className="nf-title">Page Not Found</h2>
          <p className="nf-message">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="nf-actions">
            <Link to="/" className="btn btn-primary btn-lg">
              <span className="material-symbols-outlined">home</span>
              Return Home
            </Link>
            <Link to="/login" className="btn btn-outline btn-lg">
              <span className="material-symbols-outlined">login</span>
              Sign In
            </Link>
          </div>
        </div>
        <div className="nf-illustration">
          <span className="material-symbols-outlined nf-icon">search_off</span>
        </div>
      </div>
    </div>
  );
}
