import React from 'react';
import { NavLink } from 'react-router-dom';
import './Authentication.scss';

const Authentication = () => {
    return (
        <div className='authentication'>
            <div className='d-flex'>
                <NavLink
                    to='/signin'
                    activeClassName='active'
                    className='auth-btn authentication_btn_sign-in d-flex justify-content-center align-items-center'
                    type='button'>
                    Sign In
                </NavLink>
                <NavLink
                    to='/signup'
                    className='auth-btn authentication_btn_sign-up d-flex justify-content-center align-items-center'
                    type='button'>
                    Sign Up
                </NavLink>
            </div>
        </div>
    )
}

export default Authentication;