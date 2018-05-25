import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import HeaderAvatarButton from '../containers/HeaderAvatarButton';

interface User {
  uid: string;
  identifier: string;
  name: string;
}
interface Props {
  auth: {
    loggedIn: boolean;
    user: User;
  };
}
const Header: React.StatelessComponent<Props> = (props) => {
  const { loggedIn, user } = props.auth;
  return (
    <header className="d-flex justify-content-left py-0 bg-green">
      <div className="py-1">
        <Link to="/" className="white-text">Qiiiita</Link>
      </div>
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
    </header>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps,
)(Header);
