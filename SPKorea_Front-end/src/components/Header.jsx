import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.css';
import Logo from './Logo';
import { useAuth } from '../contexts/AuthContext';
import { FiMenu, FiX } from 'react-icons/fi'; 

function Header() {
  const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    const confirmLogout = window.confirm('로그아웃 하시겠습니까?');
    if (confirmLogout) {
      logout();
      navigate('/');
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="header">
      <div className="header-inner">
        <Logo />
        <button className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <nav
          className={`nav ${menuOpen ? 'open' : ''}`}
          onClick={(e) => {
            if (
              e.target.classList.contains('nav-item')
            ) {
              setMenuOpen(false);
            }
          }}
        >
          <div className="nav-left">
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              HOME
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              ABOUT
            </NavLink>
            <NavLink to="/work" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              WORKS
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              CONTACT
            </NavLink>
          </div>
          <div className="nav-right">
            {isLoggedIn ? (
              <>
                {user?.roles.includes('ROLE_ADMIN') && (
                  <NavLink to="/admin/work/add" className="nav-item">Admin</NavLink>
                )}
                <button onClick={handleLogout} className="nav-item nav-button">Logout</button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="nav-item">Login</NavLink>
                <NavLink to="/signup" className="nav-item">SignUp</NavLink>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
