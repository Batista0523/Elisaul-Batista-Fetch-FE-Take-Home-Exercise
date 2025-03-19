import { useState } from "react";
import axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";

function LoginPage({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const fetchUrl = import.meta.env.VITE_BASE_FETCH_URL;
const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        `${fetchUrl}/auth/login`,
        { name, email },
        { withCredentials: true }
      );
      if (response.status === 200) {
        onLogin();
        navigate("/search") //the user is redirected to the search page after log in

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
