import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase';
import 'normalize.css';

import Routes from './Routes';
import Header from './Header';
import FooterBar from '../components/FooterBar';

import { login } from '../actions/auth';

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
            <Routes />
          </div>
          <FooterBar />
        </div>
      </Router>
    );
  }
}
App.propTypes = {
  refLogin: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  refLogin: () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(login(user));
      }
    });
  },
});
export default connect(
  mapStateToProps, mapDispatchToProps,
)(App);
