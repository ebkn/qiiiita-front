import * as React from 'react';
import { Link } from 'react-router-dom';
import styledComponents from 'styled-components';

interface Article {
  identifier: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  user: {
    identifier: string;
    name: string;
    photoURL: string;
  };
}
interface Props {
  article: Article;
}
const ArticleInList: React.StatelessComponent<Props> = ({ article }) => {
  const userLink = `/users/${article.user.identifier}`;
  const articleLink = `${userLink}/articles/${article.identifier}`;

  return (
    <BorderedComponent
      className="px-1 py-3 d-flex justify-content-start"
    >
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

const BorderedComponent = styledComponents.div`
  borderTop: '1px solid #E0E0E0';
  borderBottom: '1px solid #E0E0E0';
`;
const UserImage = styledComponents.img`
  width: '40px';
  height: '40px';
  border: 'none';
  borderRadius: '3px';
`;

export default ArticleInList;
