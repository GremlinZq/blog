import React from 'react';
import Authentication from "./ Authentication/ Authentication";
import './Header.scss';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header className='header'>
            <div className='d-flex justify-content-between align-items-center'>
                <Link to='/' className='header_logo'>Realworld Blog</Link>
                <Authentication />
            </div>
        </header>
    )
}

export default Header;