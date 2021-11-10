import React from 'react';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../constants/constants';
import './Authentication.scss';

export const Authentication = () => (
  <div className='authentication'>
    <div className='d-flex'>
      <NavLink
        to={LOGIN_ROUTE}
        activeClassName='active'
        className='auth-btn authentication_btn_sign-in d-flex justify-content-center align-items-center'
        type='button'>
        Sign In
      </NavLink>
      <NavLink
        to={REGISTRATION_ROUTE}
        className='auth-btn authentication_btn_sign-up d-flex justify-content-center align-items-center'
        type='button'>
        Sign Up
      </NavLink>
    </div>
  </div>
);