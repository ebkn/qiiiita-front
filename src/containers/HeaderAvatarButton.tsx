import * as React from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import styledComponents from 'styled-components';

import { RootState } from '../state';
import { authActions, CurrentUser } from '../actions/auth';

interface OwnProps {
  currentUser: CurrentUser;
  history: {
    push(path: string): void;
  };
}
interface PathTypes {}
type Props = OwnProps & RouteComponentProps<PathTypes> &
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;
interface State {
  collapse: boolean;
}

class HeaderAvatarButton extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { collapse: false };
  }

  public toggleUserMenu(e: React.FormEvent<HTMLAnchorElement>) {
    e.preventDefault();
    this.setState({ collapse: !this.state.collapse });
  }

  public logout(e: React.FormEvent<HTMLAnchorElement>) {
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/');
  }

  public render() {
    const { currentUser } = this.props.auth;
    return (
      <div>
        <a
          onClick={e => this.toggleUserMenu(e)}
          className="white-text d-block w-100 h-100 px-2"
        >
          <img src={currentUser.photoURL} className="d-block" style={imageStyle} />
        </a>
        { this.state.collapse ?
          <Menu>
            <Link
              to={`/users/${currentUser.identifier}`}
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
        : '' }
      </div>
    );
  }
}

const imageStyle: React.CSSProperties = {
  position: 'relative',
  width: '30px',
  height: '30px',
  border: '1px solid white',
  borderRadius: '3px',
};
const Menu = styledComponents.div`
  position: 'absolute';
  top: '10px';
  left: '-80px';
  width: '120px';
  padding: '0 10px';
  border: '1px solid #E0E0E0';
  borderRadius: '3px';
  color: 'grey';
  backgroundColor: 'white';
`;

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});
const mapDispatchToProps = (dispatch: Dispatch<any, RootState>) => ({
  logout: () => {
    firebase.auth().signOut()
      .then(() =>
        dispatch(authActions.logout({}))
      );
  },
});
export default withRouter(connect(
  mapStateToProps, mapDispatchToProps,
)(HeaderAvatarButton));
