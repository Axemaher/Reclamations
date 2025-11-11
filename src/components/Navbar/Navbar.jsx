import { NavLink } from 'react-router-dom';
import { useState } from "react";
import './Navbar.scss';


function Navbar() {

const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuHide = () => {
    setMenuOpen(false);
  }


  return (
    <nav className={`navbar ${menuOpen ? "active" : ""}`}>
      <div className="logo">🧩Reklamacje</div>
      <div 
        className="hamburger" 
        onClick={handleMenuOpen}
        >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="menu">
        <NavLink onClick={handleMenuHide} className={`menu-link ${({ isActive }) => isActive ? "active" : ""}`} to="/"> Home </NavLink>
        <NavLink onClick={handleMenuHide} className={`menu-link ${({ isActive }) => isActive ? "active" : ""}`} to="/login"> Login </NavLink>
        <NavLink onClick={handleMenuHide} className={`menu-link ${({ isActive }) => isActive ? "active" : ""}`} to="/register"> Register </NavLink>
        <NavLink onClick={handleMenuHide} className={`menu-link ${({ isActive }) => isActive ? "active" : ""}`} to="/resetPassword"> Reset password </NavLink>
        <NavLink onClick={handleMenuHide} className={`menu-link ${({ isActive }) => isActive ? "active" : ""}`} to="/addReclamation">➕Dodaj </NavLink>
        <NavLink onClick={handleMenuHide} className={`menu-link ${({ isActive }) => isActive ? "active" : ""}`} to="/dashboard">📋Zlecenia </NavLink>
        <NavLink onClick={handleMenuHide} className={`menu-link ${({ isActive }) => isActive ? "active" : ""}`} to="/settings">⚙️Ustawienia </NavLink>
      </div>
    </nav>
  )
}

export default Navbar;
