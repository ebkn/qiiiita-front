import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withRouter } from 'react-router-dom';
import * as ReactMarkdown from 'react-markdown';

import fetchArticle from '../actions/fetchArticle';
import setArticle from '../actions/setArticle';

interface Article {
  identifier: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}
interface Props {
  match: {
    params: {
      userIdentifier: string;
      identifier: string;
    };
  };
  history: {
    push(path: string): void;
  };
  auth: {
    user: {
      identifier: string;
    };
  };
  article: Article;
  fetchArticle(userIdentifier: string, identifier: string): void;
  setArticle(article: Article): void;
}
class Article extends React.Component<Props> {
  componentDidMount() {
    const { userIdentifier, identifier } = this.props.match.params;
    this.props.fetchArticle(userIdentifier, identifier);
  }

  editable() {
    const { userIdentifier } = this.props.match.params;
    const { identifier } = this.props.auth.user;
    return userIdentifier === identifier;
  }

  editArticleURL() {
    const { userIdentifier, identifier } = this.props.match.params;
    return `/users/${userIdentifier}/articles/${identifier}/edit`;
  }

  moveToEditPage(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();
    this.props.setArticle(this.props.article);
    this.props.history.push(this.editArticleURL());
  }

  render() {
    const { article } = this.props;
    return (
      <div className="container bg-white">
        {(() => (
          this.editable() ? (
            <button
              color="green"
              onClick={e => this.moveToEditPage(e)}
            >
              編集
            </button>
          ) : ('')
        ))()}
        <h1 className="black-text font-weight-bold py-4">{article.title}</h1>
        <div className="py-2 pb-4">
          <ReactMarkdown source={article.content} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const articleStates = state.article;
  const latestState = articleStates.length > 0 ? articleStates[articleStates.length - 1] : articleStates;
  return {
    auth: state.auth,
    article: latestState.article,
    isFetching: state.isFetching,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchArticle: (userIdentifier: string, identifier: string) => (
    dispatch(fetchArticle(userIdentifier, identifier))
  ),
  setArticle: (article: Article) => dispatch(setArticle(article)),
});
export default withRouter(connect(
  mapStateToProps, mapDispatchToProps,
)(Article));
