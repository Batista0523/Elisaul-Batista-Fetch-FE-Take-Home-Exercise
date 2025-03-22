import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./navbar.css";
import Fetchrewards from './Fetchrewards';

function NavBar({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();
  const fetchUrl = import.meta.env.VITE_BASE_FETCH_URL;

  const handleLogout = async () => {
    try {
      await axios.post(`${fetchUrl}/auth/logout`, {}, { withCredentials: true });
      onLogout();
      navigate("/");
    } catch (err) {
      console.error("Failed to logout", err);
    }
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <h1 className="navbar-title">Fetch🐕Buddies</h1>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          {isAuthenticated && (
            <>
              <Link to="/search" className="nav-link">Search</Link>
              <Link to="/favorites" className="nav-link">Favorites</Link>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </>
          )}
          {!isAuthenticated && (
            <Link to="/login" className="nav-link">Login</Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
