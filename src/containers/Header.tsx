import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import HeaderAvatarButton from '../containers/HeaderAvatarButton';

import { RootState } from '../state';

type HeaderProps = ReturnType<typeof mapStateToProps>;

const Header: React.SFC<HeaderProps> = (props: HeaderProps) => {
  const { loggedIn, currentUser } = props.auth;
  return (
    <header className="sticky-top d-flex justify-content-left px-4 py-2 light-green">
      <div className="py-0">
        <Link to="/" className="white-text">
          <h4 className="py-0 my-0">Qiiiita</h4>
        </Link>
      </div>
      { loggedIn ? (
          <div className="w-100 m-0 p-0 d-flex justify-content-end">
            <Link
              to={`/${currentUser.name}/articles/new`}
              className="white-text px-2"
            >
              投稿する
            </Link>
            <HeaderAvatarButton currentUser={currentUser} />
          </div>
          ) : (
          <div className="w-100 m-0 p-0 d-flex justify-content-end">
            <Link to="/login" className="white-text">
              ログイン
            </Link>
          </div>
          )
        }
    </header>
  );
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps,
)(Header);
