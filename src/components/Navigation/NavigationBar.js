import React from 'react';
import "./NavigationBar.css";
import { useNavigate } from 'react-router-dom';

function NavigationBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/Login');
  }

  return (
    <nav className="navbar">
      <a href="/homepage" className="nav-brand">RentalApplication</a>
      <ul className="nav-menu">
        <li><a href="/homepage">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/report">Report</a></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
