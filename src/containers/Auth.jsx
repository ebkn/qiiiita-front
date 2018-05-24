import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Container, Button } from 'mdbreact';

import { logout } from '../actions/auth';

const Auth = props => (
  <Container className="white">
    <Button
      onClick={props.doLogin}
      disabled={props.auth.loggedIn}
    >
      Login
    </Button>
    <Button
      onClick={props.doLogout}
      disabled={!props.auth.loggedIn}
    >
      Logout
    </Button>
  </Container>
);
Auth.propTypes = {
  auth: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
  }).isRequired,
  doLogin: PropTypes.func.isRequired,
  doLogout: PropTypes.func.isRequired,
};

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
      )
  },
});
export default connect(
  mapStateToProps, mapDispatchToProps,
)(Auth);

