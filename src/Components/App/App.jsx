import React, { useEffect } from 'react';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux';
import { initializeApplication } from '../../redux/reducers/app-reducer';
import { getApplicationInitialized } from '../../redux/selectors/selectors';
import { Header } from '../Header/Header';
import Routes from '../Routes/Routes';
import './App.scss';

export const App = () => {
  const initialized = useSelector(getApplicationInitialized);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeApplication());
  }, [dispatch]);

  return !initialized
    ? <Spin style={{ position: 'absolute', top: '50%', left: '50%' }} size='large' />
    : <div className='app'>
      <Header />
      <Routes />
    </div>;
};