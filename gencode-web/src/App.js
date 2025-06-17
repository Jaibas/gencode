import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import authService from './services/auth';

const App = () => {
  const [user, setUser] = useState({
    name: "Test User",
    email: "Test@gmail.com",
    password: "password"
  });

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <Router>
      {/* <Navbar user={user} onLogout={handleLogout} /> */}
      <Routes>
        {/* <Route
          path="/"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        /> */}
        <Route
          path="/"
          element={<Dashboard />}
        />
      </Routes>
    </Router>
  );
};

export default App;