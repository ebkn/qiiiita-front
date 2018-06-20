import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import styledComponents from 'styled-components';

import ArticlePreview from './ArticlePreview';

import { RootState } from '../state';
import { editingArticleActions } from '../actions/editingArticle';

import { API_URL } from '../config';

interface OwnProps {
  formType: string;
  match: {
    params: {
      identifier: string;
      userIdentifier: string;
    };
  };
  history: {
    push(path: string): void;
  };
}
interface PathTypes {
  identifier: string;
  userIdentifier: string;
}
type Props = OwnProps & RouteComponentProps<PathTypes> &
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class ArticleForm extends React.Component<Props> {
  public parameters() {
    return ({
      article: {
        title: this.props.title,
        content: this.props.content,
      },
    });
  }

  public postArticle() {
    const { title, content } = this.props;
    axios.post(this.postURL(), this.parameters())
      .then((res) => {
        this.backToHome();
        this.props.setArticle(title, content);
      }).catch(error =>
        alert(error)
      );
  }

  public updateArticle() {
    axios.patch(this.articleURL(), this.parameters())
      .then(() =>
        this.props.history.push(this.articleURL()),
      ).catch(error =>
        alert(error)
      );
  }

  public submitArticle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    switch (this.props.formType) {
      case 'create':
        this.postArticle();
        break;
      case 'update':
        this.updateArticle();
        break;
      default:
        alert('invalid submit type');
    }
  }

  public postURL() {
    const userIdentifier = this.props.auth.currentUser.identifier;
    return `${API_URL}/users/${userIdentifier}/articles`;
  }

  public articleURL() {
    const userIdentifier = this.props.auth.currentUser.identifier;
    const articleIdentifier = this.props.match.params.identifier;
    return `${API_URL}/users/${userIdentifier}/articles/${articleIdentifier}`;
  }

  public backToHome() {
    this.props.history.push('/');
  }

  public submitText() {
    switch (this.props.formType) {
      case 'create':
        return '投稿';
      case 'update':
        return '更新';
      default:
        return 'エラー';
    }
  }

  public formSubmitable() {
    return (this.props.title !== '' && this.props.content !== '');
  }

  public render() {
    return (
      <form
        onSubmit={e => this.submitArticle(e)}
      >
        <div className="container-fluid p-0">
          <TitleInput
            type="text"
            onChange={e => this.props.updateTitle(e.target.value)}
            value={this.props.title}
            placeholder="タイトル"
            className="w-100 px-1 py-2"
          />
        </div>
        <div className="container-fluid px-0 py-1">
          <div className="row w-100 mx-0">
            <div className="col s-12 m-6 px-0">
              <ContentTextarea
                onChange={e => this.props.updateContent(e.target.value)}
                value={this.props.content}
                placeholder="記事"
                className="w-100 px-1 py-2"
              />
            </div>
            <div className="col s-12 m-6 px-0">
              <ArticlePreview />
            </div>
          </div>
        </div>
        <div className="container-fluid px-0 py-0">
          <div className="d-flex py-0 w-100 justify-content-end">
            <button
              type="submit"
              disabled={!this.formSubmitable()}
              className="py-1"
              color="light-green"
            >
              {this.submitText()}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const TitleInput = styledComponents.input`
  border: '1px solid #E0E0E0';
  fontSize: '24px';
  outline: 0;
`;
const ContentTextarea = styledComponents.textarea`
  height: '70vh';
  border: '1px solid #E0E0E0';
  outline: 0;
`;

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  title: state.editingArticle.title,
  content: state.editingArticle.content,
});
const mapDispatchToProps = (dispatch: Dispatch<any, RootState>) => ({
  updateTitle: (title: string) => dispatch(editingArticleActions.updateTitle({ title })),
  updateContent: (content: string) => dispatch(editingArticleActions.updateContent({ content })),
  setArticle: (title: string, content: string) => dispatch(editingArticleActions.setArticle({ title, content })),
});
export default withRouter(connect(
  mapStateToProps, mapDispatchToProps,
)(ArticleForm));
