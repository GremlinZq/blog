import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Profile } from './Profile/Profile';
import { Authentication } from './ Authentication/ Authentication';
import { getUserAuthorization } from '../../redux/selectors/selectors';
import './Header.scss';

export const Header = () => {
  const isLoggedIn = useSelector(getUserAuthorization);

  return (
    <header className='header'>
      <div className='d-flex justify-content-between align-items-center'>
        <Link to='/' className='header_logo'>Realworld Blog</Link>
        {isLoggedIn
          ? <Profile />
          : <Authentication />
        }
      </div>
    </header>
  );
};