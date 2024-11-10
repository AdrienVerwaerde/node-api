import React, { useEffect, useState } from "react";
import ProductManager from "./components/ProductManager";
import { Button, CssBaseline, Typography } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import UserManager from "./components/UserManager";
import OrderManager from "./components/OrderManager";
import CategoryManager from "./components/CategoryManager";
import Login from "./components/Login";
import "./App.css";
import Home from "./pages/Home";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem('role');

        if (token) {
            setIsAuthenticated(true);
            setUserRole(role);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsAuthenticated(false);
        Navigate('/login');
    };

    const isAdmin = userRole === 'admin';

    return (
        <Router>
            <CssBaseline />
            {isAuthenticated && (
                <nav className="nav-container">
                    <div className="links-container">
                        <Link style={{ color: "white", textDecoration: "none" }} to="/">Home</Link>
                        <Link style={{ color: "white", textDecoration: "none" }} to="/users">Users</Link>
                        <Link style={{ color: "white", textDecoration: "none" }} to="/products">Products</Link>
                        <Link style={{ color: "white", textDecoration: "none" }} to="/categories">Categories</Link>
                        <Link style={{ color: "white", textDecoration: "none" }} to="/orders">Orders</Link>
                    </div>
                    <h1 className="nav-title">Dashboard</h1>
                    <Link className="logout-link" onClick={handleLogout}>Logout</Link>
                </nav>
            )}
            <Routes>
                <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
                <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
                <Route path="/users" element={isAuthenticated ? <UserManager /> : <Navigate to="/login" />} />
                <Route path="/products" element={isAuthenticated ? <ProductManager /> : <Navigate to="/login" />} />
                <Route path="/categories" element={isAuthenticated ? <CategoryManager /> : <Navigate to="/login" />} />
                <Route path="/orders" element={isAuthenticated ? <OrderManager /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
