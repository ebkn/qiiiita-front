import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Container, Button } from 'mdbreact';

import { login, logout } from '../actions/auth';

class Auth extends Component {
  componentDidUpdate() {
    this.props.refLogin();
  }

  render() {
    return (
      <Container>
        <Button
          onClick={this.props.doLogin}
          disabled={!this.props.auth.loggedIn}
        >
          Login
        </Button>
        <Button
          onClick={this.props.doLogout}
          disabled={this.props.auth.loggedIn}
        >
          Logout
        </Button>
      </Container>
    );
  }
}
Auth.propTypes = {
  auth: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
  }).isRequired,
  doLogin: PropTypes.func.isRequired,
  refLogin: PropTypes.func.isRequired,
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
  refLogin: () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(login(user));
      }
    });
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

