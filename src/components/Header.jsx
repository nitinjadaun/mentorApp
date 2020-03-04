import React from 'react';
import {Link } from "react-router-dom";

const Header = () => {
    return (
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/">Mentor App</Link>
        </nav>
    );
}

export default Header;