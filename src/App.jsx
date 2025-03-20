import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import LoginPage from "./Pages/LoginPage";
import SearchPage from "./Pages/SearchPage";
import FavoritePages from "./Pages/FavoritePages";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const fetchUrl = import.meta.env.VITE_BASE_FETCH_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${fetchUrl}/auth/status`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error("Error authenticating user:", err.response?.data || err.message);
      }
    };
    checkAuth();
  }, [fetchUrl]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <NavBar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/search" /> : <LoginPage onLogin={handleLogin} />
          }
        />
        <Route
          path="/search"
          element={isAuthenticated ? <SearchPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/favorites"
          element={isAuthenticated ? <FavoritePages /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
