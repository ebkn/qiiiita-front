import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import * as firebase from 'firebase';
import axios from 'axios';

import Routes from './Routes';
import Header from './Header';
import FooterBar from '../components/FooterBar';

import { RootState } from '../state';
import { authAsyncActions } from '../actions/auth';

import { API_URL } from '../config';

const AUTH_URL = `${API_URL}/auth`;

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class App extends React.Component<Props> {
  public componentDidMount() {
    this.props.login();
  }

  public render() {
    return (
      <Router>
        <div className="w-100 px-0 grey lighten-4">
          <Header />
          <div className="py-4">
            <Routes />
          </div>
          <FooterBar />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: Dispatch<any, RootState>) => ({
  login: () => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        return;
      }
      dispatch(authAsyncActions.startedLogin({}));
      axios.post(AUTH_URL, { user: currentUser })
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
