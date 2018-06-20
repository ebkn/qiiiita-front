import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import HeaderAvatarButton from '../containers/HeaderAvatarButton';

import { RootState } from '../state';

type HeaderProps = ReturnType<typeof mapStateToProps>;

const Header: React.SFC<HeaderProps> = (props: HeaderProps) => {
  const { loggedIn, currentUser } = props.auth;
  return (
    <header className="d-flex justify-content-left py-0 bg-green">
      <div className="py-1">
        <Link to="/" className="white-text">Qiiiita</Link>
      </div>
      {(() => (
        loggedIn ? (
          <div className="m-0 p-0 d-flex justify-content-end">
            <Link
              to={`/users/${currentUser.identifier}/articles/new`}
              className="white-text px-2"
            >
              投稿する
            </Link>
            <HeaderAvatarButton currentUser={currentUser} />
          </div>
        ) : (
          <Link to="/login" className="white-text">
            ログイン
          </Link>
        )
      ))()}
    </header>
  );
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps,
)(Header);
