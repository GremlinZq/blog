import { Redirect, Route, Switch } from 'react-router-dom';

import { ArticleList } from '../ArticleList/ArticleList';
import { ArticleListItemContainer } from '../ArticleList/ArticleListItem/ArticleListItemContainer';
import { ArticleFormContainer } from '../ArticleForm/ArticleFormContainer';
import { ArticleForm } from '../ArticleForm/ArticleForm';
import { Login } from '../AuthorizationForm/AuthorizationForm';
import { ProfileSettingsContainer } from '../Header/ProfieSettings/ProfileSettingsContainer';
import {
  ARTICLE_LIST_ROUTE,
  ARTICLE_ROUTE,
  CREATE_ARTICLE_ROUTE,
  EDIT_ROUTE, LOGIN_ROUTE,
  PROFILE_ROUTE, REGISTRATION_ROUTE,
} from '../constants/constants';

const Routes = () => (
  <Switch>
    <Route exact path={ARTICLE_LIST_ROUTE} component={ArticleList} />
    <Route path={CREATE_ARTICLE_ROUTE} component={ArticleForm} />
    <Route exact path={EDIT_ROUTE} component={ArticleFormContainer} />
    <Route path={ARTICLE_ROUTE} component={ArticleListItemContainer} />
    <Route path={PROFILE_ROUTE} component={ProfileSettingsContainer} />
    <Route path={LOGIN_ROUTE} component={Login} />
    <Route path={REGISTRATION_ROUTE} component={Login} />
    <Redirect to={ARTICLE_LIST_ROUTE} />
  </Switch>
);

export default Routes;