import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import 'antd/dist/antd.css';
import Header from "../Components/Header/Header";
import ArticleList from "../Components/ArticleList/ArticleList";
import Login from "../Components/AuthorizationForm/AuthorizationForm";
import ArticleListItem from "../Components/ArticleList/ArticleListItem/ArticleListItem";

import './App.scss';

const App = () => {
    return (
        <div className='app'>
            <Router>
                <Header />

                <Switch>
                    <Route exact path='/' component={ArticleList}/>
                    <Route path='/articles/:userId' component={ArticleListItem}/>
                    <Route path='/signin' component={Login}/>
                    <Route path='/signup' component={Login}/>
                </Switch>

            </Router>
        </div>
    )
}

export default App;