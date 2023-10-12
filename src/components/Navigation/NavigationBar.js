import React from 'react';
import "./NavigationBar.css";
function NavigationBar() {
  return (
    <nav className="navbar">
      <a href="/homepage" className="nav-brand">RentalApplication</a>
      <ul className="nav-menu">
        <li><a href="/homepage">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/Login">Login</a></li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
