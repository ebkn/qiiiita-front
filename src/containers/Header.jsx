import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavLink } from 'mdbreact';

const Header = (props) => {
  const { loggedIn, user } = props.auth;
  const userLink = {
    to: loggedIn ? `/users/${user.identifier}` : '/login',
    text: loggedIn ? user.name : 'ログイン',
  };
  return (
    <Navbar color="green" light className="py-0">
      <NavbarBrand>
        <NavLink to="/" className="white-text">Qiiiita</NavLink>
      </NavbarBrand>
      <div className="d-flex justify-content-end">
        <Link to={`/users/${user.identifier}/articles/new`} className="white-text px-2">
            投稿する
        </Link>
        <Link to={userLink.to} className="white-text px-2">
          {userLink.text}
        </Link>
      </div>
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
