import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import * as firebase from 'firebase';
import axios from 'axios';

import Auth from './Auth';
import User from './User';
import ArticleList from './ArticleList';
import Article from './Article';
import ArticlePost from './ArticlePost';
import ArticleEdit from './ArticleEdit';
import Header from './Header';
import FooterBar from '../components/FooterBar';

import { RootState } from '../state';
import { authAsyncActions } from '../actions/auth';

import { API_URLS } from '../config';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class App extends React.Component<Props> {
  public componentDidMount() {
    this.props.login();
  }

  public render() {
    const { loggedIn } = this.props.auth;
    return (
      <BrowserRouter>
        <div className="w-100 px-0 grey lighten-4">
          <Header />
          <div className="py-4">
            <Switch>
              <Route exact={true} path="/" component={ArticleList} />
              <Route exact={true} path="/login" component={Auth} />
              <Route exact={true} path="/:username" component={User} />
              <Route
                exact={true}
                path="/:username/articles/new"
                render={() => (
                  loggedIn ? <ArticlePost /> : <Redirect to="/login" />
                )}
              />
              <Route exact={true} path="/:username/:identifier" component={Article} />
              <Route
                path="/:username/:identifier/edit"
                render={() => (
                  loggedIn ? <ArticleEdit /> : <Redirect to="/login" />
                )}
              />
              <Route>
                <h2>Page Not Found</h2>
              </Route>
            </Switch>
          </div>
          <FooterBar />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});
const mapDispatchToProps = (dispatch: Dispatch<any, RootState>) => ({
  login: () => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        return;
      }
      dispatch(authAsyncActions.startedLogin({}));
      axios.post(API_URLS.auth(), { user: currentUser })
        .then(res =>
          dispatch(authAsyncActions.doneLogin({
            params: {}, result: { currentUser: res.data },
          })),
        ).catch(error =>
          dispatch(authAsyncActions.failedLogin({
            params: {}, error: { error },
          })),
        );
    });
  },
});
export default connect(
  mapStateToProps, mapDispatchToProps,
)(App);
