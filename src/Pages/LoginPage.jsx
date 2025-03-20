

import { useState } from "react";
import axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";

/**
 * LoginPage Component
 * This component handles the user login functionality, where users provide their name and email to log in.
 * Upon successful login, the user is redirected to the search page.
 * Error messages are displayed if the login attempt fails.
 */

function LoginPage({ onLogin }) {
  // State hooks to handle user inputs and errors
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null); // Stores potential error messages
  const fetchUrl = import.meta.env.VITE_BASE_FETCH_URL;
  const navigate = useNavigate();

  /**
   * Handles form submission for login.
   * Makes an HTTP POST request to the login endpoint with user details.
   * Redirects user to the search page upon successful login.
   * Displays error message if login fails.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous error messages

    try {
      const response = await axios.post(
        `${fetchUrl}/auth/login`,
        { name, email },
        { withCredentials: true }
      );

      if (response.status === 200) {
        onLogin(); // Calls parent component's onLogin handler
        navigate("/search"); // After a successful login, we redirect the user to the search page.
        // (I personally think redirecting to the home page might be better, but I'm following the current instructions.)
        
      } else {
        setError("Failed to log in. Please check your credentials.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during login.");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Log in</h1>

      {/* Display error message if it exists */}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
