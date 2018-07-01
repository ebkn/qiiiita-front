import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Action } from 'typescript-fsa';
import axios from 'axios';

import { RootState } from '../state';
import { userAsyncActions } from '../actions/user';

import { API_URLS } from '../config';

interface OwnProps {
  match: {
    params: {
      username: string;
    };
  };
}
interface PathTypes {
  username: string;
}
type Props = OwnProps & RouteComponentProps<PathTypes> &
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class User extends React.Component<Props> {
  public componentDidMount() {
    const { username } = this.props.match.params;
    this.props.doFetchUser(username);
  }

  public isLoggedInUser() {
    const { auth, user } = this.props;
    return auth.currentUser.uid === user.user.uid;
  }

  public render() {
    const { user } = this.props.user;
    return (
      <div className="container bg-white">
        <h1>{user.name}</h1>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  user: state.user,
});
const mapDispatchToProps = (dispatch: Dispatch<any, RootState>) => ({
  doFetchUser: (name: string) => {
    dispatch(userAsyncActions.startedFetch({}));
    axios.get(API_URLS.fetchUser(name))
      .then(res =>
        dispatch(userAsyncActions.doneFetch({
          params: {}, result: { user: res.data },
        })),
      ).catch(error =>
        dispatch(userAsyncActions.failedFetch({
          params: {}, error: { error },
        })),
      );
  },
});
export default withRouter(connect(
  mapStateToProps, mapDispatchToProps,
)(User)) as typeof User;
