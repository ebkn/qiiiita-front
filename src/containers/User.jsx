import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'mdbreact';

import fetchUser from '../actions/fetchUser';

class User extends Component {
  componentDidMount() {
    const { identifier } = this.props.match.params;
    this.props.fetchUser(identifier);
  }

  isLoggedInUser() {
    const { auth, user } = this.props;
    return auth.user.uid === user.uid;
  }

  render() {
    const { user } = this.props;
    return (
      <Container className="white">
        <h1>{user.name}</h1>
      </Container>
    );
  }
}
User.propTypes = {
  auth: PropTypes.shape({
    user: PropTypes.shape({
      uid: PropTypes.string,
    }).isRequired,
  }).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    identifier: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    photoURL: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      identifier: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  fetchUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const userStates = state.user;
  const latestState = userStates.length > 0 ? userStates[userStates.length - 1] : userStates;
  return {
    auth: state.auth,
    user: latestState.user,
    isFetching: state.isFetching,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchUser: identifier => dispatch(fetchUser(identifier)),
});
export default connect(
  mapStateToProps, mapDispatchToProps,
)(User);

