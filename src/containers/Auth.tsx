import * as React from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';

import { logout } from '../actions/auth';

interface Props {
  auth: {
    loggedIn: boolean;
  };
  doLogin(): void;
  doLogout(): void;
}
const Auth: React.StatelessComponent<Props> = props => (
  <div className="container bg-white">
    <button
      onClick={props.doLogin}
      disabled={props.auth.loggedIn}
    >
      Login
    </button>
    <button
      onClick={props.doLogout}
      disabled={!props.auth.loggedIn}
    >
      Logout
    </button>
  </div>
);

const mapStateToProps = state => ({
  auth: state.auth,
});
const mapDispatchToProps = dispatch => ({
  doLogin: () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  },
  doLogout: () => {
    firebase.auth().signOut()
      .then(() =>
        dispatch(logout())
      );
  },
});
export default connect(
  mapStateToProps, mapDispatchToProps,
)(Auth);
