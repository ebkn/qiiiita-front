import * as React from 'react';
import * as firebase from 'firebase';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { RootState } from '../state';
import { authActions } from '../actions/auth';

interface PathTypes {}
type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const Auth: React.SFC<Props> = (props: Props) => (
  <div className="container bg-white">
    <button
      onClick={props.login}
      disabled={props.auth.loggedIn}
    >
      Login
    </button>
    <button
      onClick={props.logout}
      disabled={!props.auth.loggedIn}
    >
      Logout
    </button>
  </div>
);

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});
const mapDispatchToProps = (dispatch: Dispatch<any, RootState>) => ({
  login: () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  },
  logout: () => {
    firebase.auth().signOut()
      .then(() =>
        dispatch(authActions.logout({}))
      );
  },
});
export default connect(
  mapStateToProps, mapDispatchToProps,
)(Auth);
