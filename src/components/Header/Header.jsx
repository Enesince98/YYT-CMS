import React from "react";
import "./Header.js";
import "./Header.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import lightMode from "../../assets/icons/01d.svg";
import darkMode from "../../assets/icons/01n.svg";
import { useTheme } from "../../context/ThemeContext";
import { Button } from "react-bootstrap";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  function toggle() {
    setIsActive((prev) => !prev);
  }

  const { theme, setTheme } = useTheme();
  console.log(theme);

  function changeTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <header>
      <nav className={`${theme === "dark" ? "navBarDark" : "navBarLight"}`}>
        <Link
          to="/"
          className={`${theme === "dark" ? "nav-LogoDark" : "nav-LogoLight"}`}
        >
          YYT ADMIN DASHBOARD
        </Link>
        <ul
          className={`nav-menu ${isActive ? "active" : ""} `}
          onClick={toggle}
        >
          <li className="nav-item">
            <Link to="/" className="nav-linkk" activeClassName="active-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/content-type-manager" className="nav-linkk">
              Content Type Manager
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/users" className="nav-linkk">
              Users
            </Link>
          </li>
          <li>
            <Button
              type="button"
              onClick={changeTheme}
              className="btnTheme"
              variant={`${
                theme === "dark" ? "outline-warning" : "outline-primary"
              }`}
            >
              {theme === "dark" ? (
                <img alt="light" src={darkMode} x width="25"></img>
              ) : (
                <img alt="dark" src={lightMode} width="25"></img>
              )}
            </Button>
          </li>
        </ul>
        <div
          className={`hamburger ${isActive ? "active" : ""} `}
          onClick={toggle}
        ></div>
      </nav>
    </header>
  );
};

export default Header;
