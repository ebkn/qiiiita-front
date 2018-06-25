import * as React from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import styled from 'styled-components';

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

  public toggleUserMenu(e: React.MouseEvent<HTMLDivElement>) {
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
        <div
          onClick={e => this.toggleUserMenu(e)}
          className="white-text d-block w-100 h-100 px-2"
          style={imageWrapperStyle}
        >
          <StyledImg src={currentUser.photoURL} />
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
          : null }
        </div>
      </div>
    );
  }
}

const imageWrapperStyle: React.CSSProperties = {
  position: 'relative',
};
const StyledImg = styled.img.attrs({
  className: 'd-block',
})`
  width: 30px;
  height: 30px;
  border: 1px solid white;
  border-radius: 3px;
`;
const Menu = styled.div`
  position: absolute;
  top: 40px;
  left: -80px;
  width: 120px;
  padding: 0 10px;
  border: 1px solid #E0E0E0;
  border-radius: 3px;
  color: grey;
  background-color: white;
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
