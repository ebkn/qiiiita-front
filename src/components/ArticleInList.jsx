import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const styles = {
  border: {
    borderTop: '1px solid #E0E0E0',
    borderBottom: '1px solid #E0E0E0',
  },
  userImage: {
    width: '40px',
    height: '40px',
    border: 'none',
    borderRadius: '3px',
  },
};

const ArticleInList = ({ article }) => {
  const userLink = `/users/${article.user.identifier}`;
  const articleLink = `${userLink}/articles/${article.identifier}`;

  return (
    <div
      className="px-1 py-3 d-flex justify-content-start"
      style={styles.border}
    >
      <Link to={userLink} className="mr-4">
        <img
          src={article.user.photoURL}
          className="d-block"
          style={styles.userImage}
        />
      </Link>
      <Link to={articleLink}>
        <p className="black-text font-weight-bold">{article.title}</p>
      </Link>
    </div>
  );
};
ArticleInList.propTypes = {
  article: PropTypes.shape({
    identifier: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    user: PropTypes.shape({
      identifier: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ArticleInList;

