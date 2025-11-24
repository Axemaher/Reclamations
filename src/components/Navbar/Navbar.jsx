import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./Navbar.scss";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuHide = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${menuOpen ? "navbar--active" : ""}`}>
      <div className="logo">🧩Reklamacje</div>
      <div className="hamburger" onClick={handleMenuOpen}>
        <span className="hamburger__line"></span>
        <span className="hamburger__line"></span>
        <span className="hamburger__line"></span>
      </div>
      <div className="menu">
        <NavLink
          onClick={handleMenuHide}
          className={({ isActive }) =>
            `menu__link ${isActive ? "menu__link--active" : ""}`
          }
          to="/"
        >
          {" "}
          Home{" "}
        </NavLink>
        <NavLink
          onClick={handleMenuHide}
          className={({ isActive }) =>
            `menu__link ${isActive ? "menu__link--active" : ""}`
          }
          to="/login"
        >
          {" "}
          Zaloguj{" "}
        </NavLink>
        <NavLink
          onClick={handleMenuHide}
          className={({ isActive }) =>
            `menu__link ${isActive ? "menu__link--active" : ""}`
          }
          to="/register"
        >
          {" "}
          Zarejestruj{" "}
        </NavLink>
        <NavLink
          onClick={handleMenuHide}
          className={({ isActive }) =>
            `menu__link ${isActive ? "menu__link--active" : ""}`
          }
          to="/resetPassword"
        >
          {" "}
          Zresetuj hasło{" "}
        </NavLink>
        <NavLink
          onClick={handleMenuHide}
          className={({ isActive }) =>
            `menu__link ${isActive ? "menu__link--active" : ""}`
          }
          to="/addReclamation"
        >
          ➕Dodaj{" "}
        </NavLink>
        <NavLink
          onClick={handleMenuHide}
          className={({ isActive }) =>
            `menu__link ${isActive ? "menu__link--active" : ""}`
          }
          to="/dashboard"
        >
          📋Zlecenia{" "}
        </NavLink>
        <NavLink
          onClick={handleMenuHide}
          className={({ isActive }) =>
            `menu__link ${isActive ? "menu__link--active" : ""}`
          }
          to="/settings"
        >
          ⚙️Ustawienia{" "}
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
