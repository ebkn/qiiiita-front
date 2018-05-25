import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import fetchUser from '../actions/fetchUser';

interface User {
  uid: string;
  name: string;
  identifier: string;
  email: string;
  photoURL: string;
}
interface Props {
  auth: {
    user: {
      uid: string;
    };
  };
  user: User;
  match: {
    params: {
      identifier: string;
    };
  };
  fetchUser(identifier: string): void;
}

class User extends React.Component<Props> {
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
      <div className="container bg-white">
        <h1>{user.name}</h1>
      </div>
    );
  }
}

interface StateProps {
  auth: Props.auth;
  user: Props.user;
  isFetching: Props.isFetching;
}
interface DispatchProps {
  fetchUser: Props.fetchUser;
}
const mapStateToProps = (state): StateProps  => {
  const userStates = state.user;
  const latestState = userStates.length > 0 ? userStates[userStates.length - 1] : userStates;
  return {
    auth: state.auth,
    user: latestState.user,
    isFetching: state.isFetching,
  };
};
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  fetchUser: (identifier: string) => dispatch(fetchUser(identifier)),
});
export default connect(
  mapStateToProps, mapDispatchToProps,
)(User);
