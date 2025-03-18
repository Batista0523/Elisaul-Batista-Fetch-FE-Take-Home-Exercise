import { useState } from "react";
import axios from "axios";

function LoginPage({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const fetchUrl = import.meta.env.VITE_BASE_FETCH_URL;

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
        onLogin(); // Updates the state in App.jsx to indicate user is authenticated
      } else {
        setError("Failed to log in . Please check your credential");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error ocurred during login");
    }
  };

  return (
    <div>
      <h1>Log in</h1>

      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
