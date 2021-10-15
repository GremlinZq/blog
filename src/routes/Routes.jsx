import {Route, Switch} from "react-router-dom";
import ArticleListContainer from "../Components/ArticleList/ArticleListContainer";
import Login from "../Components/AuthorizationForm/AuthorizationForm";
import OpenArticleContainer from "../Components/OpenArticle/OpenArticleContainer";

const Routes = () => {
    return (
        <Switch>
            <Route exact path='/' component={ArticleListContainer}/>
            <Route path='/articles/:slug' component={OpenArticleContainer}/>
            <Route path='/signin' component={Login}/>
            <Route path='/signup' component={Login}/>
        </Switch>
    )
}

export default Routes;