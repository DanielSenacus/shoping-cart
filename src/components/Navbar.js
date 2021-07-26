import React from 'react'
import { Link } from "react-router-dom";
import Logo from '../assets/images/Logo'

const Navbar = () => {
    return (
        <header>
            <nav className="nav">
                <a href="/" className="nav_logo">
                    <Logo />
                </a>

                <div className="nav_menu">
                    <ul className="nav_list">
                        <li className="nav_list_item">
                            <Link to="/" className="item_link">HOME</Link>
                        </li>
                        <li className="nav_item">
                            <Link to="/cart" className="item_link">CART</Link>
                        </li>
                        <li className="nav_item">
                            <Link to="/inventory" className="item_link">INVENTORY</Link>
                        </li>
                        <li className="nav_item">
                            <Link to="/sales" className="item_link">SALES</Link>
                        </li>
                    </ul>
                </div>


            </nav>
        </header>
    )
}

export default Navbar
