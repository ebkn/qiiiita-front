import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import firebase from 'firebase';
import 'normalize.css';

import Auth from '../containers/Auth';
import User from '../containers/User';
import Header from '../containers/Header';
import FooterBar from '../components/FooterBar';
import ArticleList from '../containers/ArticleList';
import Article from '../containers/Article';
import ArticlePost from '../containers/ArticlePost';
import { login, loginFailure } from '../actions/auth';

class App extends Component {
  componentDidMount() {
    this.props.refLogin();
  }

  render() {
    return (
      <Router>
        <div className="w-100 px-0 grey lighten-4">
          <Header />
          <div className="py-4">
            <Switch>
              <Route exact path="/" component={ArticleList} />
              <Route path="/login" component={Auth} />
              <Route
                path="/users/:userIdentifier/articles/new"
                render={() => (
                  this.props.auth.loggedIn ? (
                    <ArticlePost />
                  ) : (
                    <Redirect to="/" />
                  ))}
              />
              <Route path="/users/:userIdentifier/articles/:identifier" component={Article} />
              <Route path="/users/:identifier" component={User} />
              <Route>
                <h2>Page Not Found</h2>
              </Route>
            </Switch>
          </div>
          <FooterBar />
        </div>
      </Router>
    );
  }
}
App.propTypes = {
  refLogin: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});
const mapDispatchToProps = dispatch => ({
  refLogin: () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        dispatch(loginFailure({ error: 'login failed' }));
      } else {
        dispatch(login(user));
      }
    });
  },
});
export default connect(
  mapStateToProps, mapDispatchToProps,
)(App);
