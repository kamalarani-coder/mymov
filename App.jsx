import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import initialMovies from "./data/movies.js";

import Home from "./modules/user/Home.jsx";
import Details from "./modules/user/Details.jsx";

import Dashboard from "./modules/admin/Dashboard.jsx";
import AddMovie from "./modules/admin/AddMovie.jsx";
import EditMovie from "./modules/admin/EditMovie.jsx";

import Login from "./modules/auth/Login.jsx";

export default function App() {
  const [movies, setMovies] = useState(initialMovies);
  const [user, setUser] = useState(null);

  // login state localStorage నుండి load
  useEffect(() => {
    const saved = localStorage.getItem("srUser");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  // movies save (optional – కావాలంటే ఉండనివ్వండి)
  useEffect(() => {
    localStorage.setItem("srMovies", JSON.stringify(movies));
  }, [movies]);

  const handleAddMovie = (movieData) => {
    const newMovie = {
      id: Date.now(),
      ...movieData,
    };
    setMovies((prev) => [...prev, newMovie]);
  };

  const handleUpdateMovie = (id, updated) => {
    setMovies((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updated } : m))
    );
  };

  const handleDeleteMovie = (id) => {
    setMovies((prev) => prev.filter((m) => m.id !== id));
  };

  const handleLogin = (email, role) => {
    const userData = { email, role };
    setUser(userData);
    localStorage.setItem("srUser", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("srUser");
  };

  const isLoggedIn = !!user;
  const isAdmin = user?.role === "admin";

  return (
    <div className="app">
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home movies={movies} />} />
        <Route path="/movie/:id" element={<Details movies={movies} />} />

        {/* Login route */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* Admin protected routes */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn && isAdmin ? (
              <Dashboard movies={movies} onDeleteMovie={handleDeleteMovie} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/admin/add"
          element={
            isLoggedIn && isAdmin ? (
              <AddMovie onAddMovie={handleAddMovie} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/admin/edit/:id"
          element={
            isLoggedIn && isAdmin ? (
              <EditMovie movies={movies} onUpdateMovie={handleUpdateMovie} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}