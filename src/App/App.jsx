import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {initializeApplication} from "../redux/reducers/app-reducer";
import {Spin} from "antd";
import 'antd/dist/antd.css';
import {Header} from "../Components/Header/Header";
import Routes from "../routes/Routes";
import './App.scss';

export const App = () => {
    const initialized = useSelector(state => state.app.applicationInitialized);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeApplication(isLoggedIn))
    }, [dispatch,isLoggedIn])

    return !initialized
        ? <Spin style={{position: 'absolute', top: '50%', left: '50%'}} size='large'/>
        : <div className='app'>
            <Header/>
            <Routes/>
        </div>
}