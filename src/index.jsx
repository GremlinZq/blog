import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from "./redux/store";
import {BrowserRouter as Router} from 'react-router-dom';
import {App} from "./App/App";

render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    document.querySelector('#root')
)