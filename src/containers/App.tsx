import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import * as firebase from 'firebase';

import Routes from './Routes';
import Header from './Header';
import FooterBar from '../components/FooterBar';

import { login } from '../actions/auth';

interface AppProps {
  refLogin(): void;
}
class App extends React.Component<AppProps> {
  public componentDidMount() {
    this.props.refLogin();
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

interface DispatchProps {
  refLogin(): void;
}
const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
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
