import React from 'react'
import './Header.js'
import "./Header.css"
import {Link} from 'react-router-dom'
import { useState } from 'react'
const Header = () => {
    const [isActive, setIsActive]= useState(false);
    function toggle(){
            setIsActive(prev => !prev);
    }

  return (
    <header className="header">
        <nav className="navbar">
          <Link to='/' className='nav-logo'>YYT ADMIN DASHBOARD</Link>
            <ul className={ `nav-menu ${isActive ? 'active' : ''} `} onClick={toggle} >
                <li className="nav-item">
                <Link to="/" className='nav-link'>Home</Link>

                </li>
                <li className="nav-item">
                <Link to="/content-type-manager" className='nav-link'>Content Type Manager</Link>

                </li>
                <li className="nav-item">
                 <Link to="/content-type-builder" className='nav-link'>Content Type Builder</Link>

                </li>
                <li className="nav-item">
                 <Link to="/users" className='nav-link'>Users</Link>
                </li>
            </ul>
            <div className={ `hamburger ${isActive ? 'active' : ''} `} onClick={toggle}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
</header>

  )
}

export default Header