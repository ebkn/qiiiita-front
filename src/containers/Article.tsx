import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as ReactMarkdown from 'react-markdown';
import axios from 'axios';
import styled from 'styled-components';

import { RootState } from '../state';
import { ArticleState } from '../reducers/article';
import { articleAsyncActions } from '../actions/article';
import { editingArticleActions } from '../actions/editingArticle';

import { API_URLS } from '../config';

interface OwnProps {
  match: {
    params: {
      username: string;
      identifier: string;
    };
  };
  history: {
    push(path: string): void;
  };
}
interface PathTypes {
  username: string;
  identifier: string;
}
type Props = OwnProps & RouteComponentProps<PathTypes> &
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class Article extends React.Component<Props> {
  public componentDidMount(): void {
    const { identifier } = this.props.match.params;
    this.props.fetchArticle(identifier);
  }

  public editable(): boolean {
    const { username } = this.props.match.params;
    const { currentUser } = this.props.auth;
    return currentUser.name === username;
  }

  public moveToEditPage(e: React.FormEvent<HTMLButtonElement>): void {
    e.preventDefault();
    const { title, content } = this.props.article.article;
    this.props.setArticle(title, content);
    this.props.history.push(this.editArticleURL());
  }

  public render() {
    const { article } = this.props.article;
    return (
      <div className="container bg-white">
        { this.editable() ?
          <StyledButton onClick={e => this.moveToEditPage(e)}>
            編集
          </StyledButton>
        : null }
        <h1 className="black-text font-weight-bold py-4">
          {article.title}
        </h1>
        <ContentWrapper>
          <ReactMarkdown source={article.content} />
        </ContentWrapper>
      </div>
    );
  }

  private editArticleURL(): string {
    const { username, identifier } = this.props.match.params;
    return `/${username}/${identifier}/edit`;
  }
}

const StyledButton = styled.button.attrs({
  className: 'px-3 py-1 light-green text-white',
})`
  border: 1px solid #E0E0E0;
  border-radius: 2px;
`;
const ContentWrapper = styled.div.attrs({
  className: 'py-2 pb-4',
})`
  overflow-x: scroll;
`;

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  article: state.article,
});
const mapDispatchToProps = (dispatch: Dispatch<any, RootState>) => ({
  fetchArticle: (identifier: string) => {
    dispatch(articleAsyncActions.startedFetch({}));
    axios.get(API_URLS.fetchArticle(identifier))
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
)(Article));
