import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as ReactMarkdown from 'react-markdown';
import { Action } from 'typescript-fsa';
import axios from 'axios';

import { RootState } from '../state';
import { ArticleState } from '../reducers/article';
import { articleAsyncActions } from '../actions/article';
import { editingArticleActions } from '../actions/editingArticle';

import { API_URL } from '../config';

interface OwnProps {
  match: {
    params: {
      userIdentifier: string;
      identifier: string;
    };
  };
  history: {
    push(path: string): void;
  };
}
interface PathTypes {
  userIdentifier: string;
  identifier: string;
}
type Props = OwnProps & RouteComponentProps<PathTypes> &
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class Article extends React.Component<Props> {
  public componentDidMount() {
    const { userIdentifier, identifier } = this.props.match.params;
    this.props.fetchArticle(userIdentifier, identifier);
  }

  public editable() {
    const { userIdentifier } = this.props.match.params;
    const { identifier } = this.props.auth.currentUser;
    return userIdentifier === identifier;
  }

  public editArticleURL() {
    const { userIdentifier, identifier } = this.props.match.params;
    return `/users/${userIdentifier}/articles/${identifier}/edit`;
  }

  public moveToEditPage(e: React.FormEvent<HTMLButtonElement>) {
    const { title, content } = this.props.article.article;
    e.preventDefault();
    this.props.setArticle(title, content);
    this.props.history.push(this.editArticleURL());
  }

  public render() {
    const { title, content } = this.props.article.article;
    return (
      <div className="container bg-white">
        {(() => (
          this.editable() ? (
            <button
              onClick={e => this.moveToEditPage(e)}
            >
              編集
            </button>
          ) : ('')
        ))()}
        <h1 className="black-text font-weight-bold py-4">{title}</h1>
        <div className="py-2 pb-4">
          <ReactMarkdown source={content} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  article: state.article,
});
const mapDispatchToProps = (dispatch: Dispatch<any, RootState>) => ({
  fetchArticle: (userIdentifier: string, identifier: string) => {
    const FETCH_ARTICLE_URL = `${API_URL}/users/${userIdentifier}/articles/${identifier}`;
    dispatch(articleAsyncActions.startedFetch({}));
    axios.get(FETCH_ARTICLE_URL)
      .then(res =>
        dispatch(articleAsyncActions.doneFetch({
          params: {}, result: { article: res.data },
        })),
      ).catch(error =>
        dispatch(articleAsyncActions.failedFetch({
          params: {}, error: { error },
        })),
      );
  },
  setArticle: (title: string, content: string) => {
    dispatch(editingArticleActions.setArticle({ title, content }));
  },
});
export default withRouter(connect(
  mapStateToProps, mapDispatchToProps,
)(Article)) as React.ComponentClass<Props>;
