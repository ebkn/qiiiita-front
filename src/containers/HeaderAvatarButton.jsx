import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Collapse } from 'mdbreact';

import { logout } from '../actions/auth';

const styles = {
  userImage: {
    width: '30px',
    height: '30px',
    border: 'none',
    borderRadius: '3px',
  },
  button: {
    position: 'absolute',
  },
  menu: {
    position: 'relative',
    top: '10px',
    left: '-80px',
    width: '120px',
    border: '1px solid #E0E0E0',
    borderRadius: '3px',
  },
};

class HeaderAvatarButton extends Component {
  constructor(props) {
    super(props);
    this.state = { collapse: false };
  }

  toggleUserMenu(e) {
    e.preventDefault();
    this.setState({ collapse: !this.state.collapse });
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/');
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <a
          onClick={e => this.toggleUserMenu(e)}
          className="white-text d-block px-2"
        >
          <img
            src={user.photoURL}
            className="d-block"
            style={styles.userImage}
          />
        </a>
        <Collapse
          isOpen={this.state.collapse}
          style={styles.button}
        >
          <div
            className="white grey-text px-2"
            style={styles.menu}
          >
            <Link
              to={`/users/${user.identifier}`}
              className="d-block py-2 grey-text"
            >
              <p className="m-0">マイページ</p>
            </Link>
            <a
              onClick={e => this.logout(e)}
              className="d-block py-2 grey-text"
            >
              <p className="m-0">ログアウト</p>
            </a>
          </div>
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  logout: () => {
    firebase.auth().signOut()
      .then(() =>
        dispatch(logout())
      )
  },
});
export default withRouter(connect(
  mapStateToProps, mapDispatchToProps,
)(HeaderAvatarButton));

