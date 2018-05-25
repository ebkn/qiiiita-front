import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import Auth from '../containers/Auth';
import User from '../containers/User';
import ArticleList from '../containers/ArticleList';
import Article from '../containers/Article';
import ArticlePost from '../components/ArticlePost';
import ArticleEdit from '../components/ArticleEdit';

interface Props {
  auth: {
    loggedIn: boolean;
  };
}
const Routes: React.StatelessComponent<Props> = props => (
  <Switch>
    <Route exact={true} path="/" component={ArticleList} />
    <Route path="/login" component={Auth} />
    <Route exact={true} path="/users/:identifier" component={User} />
    <Route
      exact={true}
      path="/users/:userIdentifier/articles/new"
      render={() => (
        props.auth.loggedIn ? (<ArticlePost />) : (<Redirect to="/login" />)
      )}
    />
    <Route
      path="/users/:userIdentifier/articles/:identifier/edit"
      render={() => (
        props.auth.loggedIn ? (<ArticleEdit />) : (<Redirect to="/login" />)
      )}
    />
    <Route path="/users/:userIdentifier/articles/:identifier" component={Article} />
    <Route>
      <h2>Page Not Found</h2>
    </Route>
  </Switch>
);

const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps,
)(Routes);
