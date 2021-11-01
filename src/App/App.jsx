import React, { useEffect } from 'react';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux';
import { initializeApplication } from '../redux/reducers/app-reducer';
import { getApplicationInitialized, getUserAuthorization } from '../redux/selectors/selectors';
import { Header } from '../Components/Header/Header';
import Routes from '../routes/Routes';
import './App.scss';

export const App = () => {
  const initialized = useSelector(getApplicationInitialized);
  const isLoggedIn = useSelector(getUserAuthorization);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeApplication(isLoggedIn));
  }, [dispatch, isLoggedIn]);

  return !initialized
    ? <Spin style={{ position: 'absolute', top: '50%', left: '50%' }} size='large' />
    : <div className='app'>
      <Header />
      <Routes />
    </div>;
};