import * as React from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import * as styled from 'styled-components';

import { logout } from '../actions/auth';

interface User {
  identifier: string;
  name: string;
  photoURL: string;
}
interface Props {
  history: {
    push(path: string): void;
  };
  user: User;
  logout(): void;
}
interface State {
  collapse: boolean;
}

const UserImage = styled.img`
  width: '30px';
  height: '30px';
  border: 'none';
  borderRadius: '3px';
`;
const Button = styled.div`
  position: 'absolute';
`;
const Menu = styled.div`
  position: 'relative';
  top: '10px';
  left: '-80px';
  width: '120px';
  border: '1px solid #E0E0E0';
  borderRadius: '3px';
`;

class HeaderAvatarButton extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { collapse: false };
  }

  toggleUserMenu(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();
    this.setState({ collapse: !this.state.collapse });
  }

  logout(e: React.FormEvent<HTMLInputElement>) {
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
          <UserImage src={user.photoURL} className="d-block" />
        </a>
        <Button isOpen={this.state.collapse}>
          <Menu className="white grey-text px-2">
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
          </Menu>
        </Button>
      </div>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => {
    firebase.auth().signOut()
      .then(() =>
        dispatch(logout())
      );
  },
});
export default withRouter(connect(
  mapStateToProps, mapDispatchToProps,
)(HeaderAvatarButton));
