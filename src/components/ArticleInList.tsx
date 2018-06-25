import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Article } from '../actions/article';

interface Props {
  article: Article;
}

const ArticleInList: React.StatelessComponent<Props> = ({ article }) => {
  const userLink = `/users/${article.user.identifier}`;
  const articleLink = `${userLink}/articles/${article.identifier}`;

  return (
    <BorderedComponent>
      <Link to={userLink} className="mr-4">
        <UserImage
          src={article.user.photoURL}
          className="d-block"
        />
      </Link>
      <Link to={articleLink}>
        <p className="black-text font-weight-bold">{article.title}</p>
      </Link>
    </BorderedComponent>
  );
};

const BorderedComponent = styled.div.attrs({
  className: 'px-1 py-3 d-flex justify-content-start',
})`
  border-top: 1px solid #E0E0E0;
  border-bottom: 1px solid #E0E0E0;
`;
const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 3px;
`;

export default ArticleInList;
