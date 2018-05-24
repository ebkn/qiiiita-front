import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavLink, Collapse, Button } from 'mdbreact';

import HeaderAvatarButton from '../containers/HeaderAvatarButton';

const Header = (props) => {
  const { loggedIn, user } = props.auth;
  return (
    <Navbar color="green" light className="py-0">
      <NavbarBrand className="py-1">
        <NavLink to="/" className="white-text">Qiiiita</NavLink>
      </NavbarBrand>
      {(() => (
        loggedIn ? (
          <div className="m-0 p-0 d-flex justify-content-end">
            <Link
              to={`/users/${user.identifier}/articles/new`}
              className="white-text px-2"
            >
              投稿する
            </Link>
            <HeaderAvatarButton user={user} />
          </div>
        ) : (
          <Link to="/login" className="white-text">
            ログイン
          </Link>
        )
      ))()}
    </Navbar>
  );
};
Header.propTypes = {
  auth: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      uid: PropTypes.string,
      identifier: PropTypes.string,
      name: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps,
)(Header);
