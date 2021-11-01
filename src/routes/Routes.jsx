import {Redirect, Route, Switch} from "react-router-dom";
import Login from "../Components/AuthorizationForm/AuthorizationForm";
import {
    ARTICLE_LIST_ROUTE,
    ARTICLE_ROUTE,
    LOGIN_ROUTE,
    PROFILE_ROUTE,
    REGISTRATION_ROUTE,
    CREATE_ARTICLE_ROUTE,
    EDIT_ROUTE
} from "../utils/consts";
import {ProfileSettingsForm} from "../Components/Header/ProfieSettings/ProfileSettings";
import {ArticleList} from "../Components/ArticleList/ArticleList";
import {ArticleListItemContainer} from "../Components/ArticleList/ArticleListItem/ArticleListItemContainer";
import {ArticleFormContainer} from "../Components/ArticleForm/ArticleFormContainer";
import {ArticleForm} from "../Components/ArticleForm/ArticleForm";


const Routes = () => (
    <Switch>
        <Route exact path={ARTICLE_LIST_ROUTE} component={ArticleList}/>
        <Route path={CREATE_ARTICLE_ROUTE} component={ArticleForm} />
        <Route exact path={EDIT_ROUTE} component={ArticleFormContainer} />
        <Route path={ARTICLE_ROUTE} component={ArticleListItemContainer}/>
        <Route path={PROFILE_ROUTE} component={ProfileSettingsForm}/>
        <Route path={LOGIN_ROUTE} component={Login}/>
        <Route path={REGISTRATION_ROUTE} component={Login}/>
        <Redirect to={ARTICLE_LIST_ROUTE}/>
    </Switch>
)

export default Routes;