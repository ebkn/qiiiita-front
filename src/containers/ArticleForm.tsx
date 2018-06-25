import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import styledComponents from 'styled-components';

import ArticlePreview from '../components/ArticlePreview';
import FormSubmitButton from '../components/FormSubmitButton';

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
  public submitArticle(e: React.FormEvent<HTMLFormElement>): void {
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

  public submitButtonText(): string {
    switch (this.props.formType) {
      case 'create':
        return '投稿';
      case 'update':
        return '更新';
      default:
        return 'エラー';
    }
  }

  public formSubmitable(): boolean {
    return (this.props.title !== '' && this.props.content !== '');
  }

  public render() {
    const { title, content } = this.props;
    return (
      <form onSubmit={e => this.submitArticle(e)}>
        <div className="container-fluid p-0">
          <TitleInput
            type="text"
            onChange={e => this.props.updateTitle(e.target.value)}
            value={title}
            placeholder="タイトル"
          />
        </div>
        <div className="container-fluid px-0 py-1">
          <div className="row w-100 mx-0">
            <div className="col-6 px-0">
              <ContentTextarea
                onChange={e => this.props.updateContent(e.target.value)}
                value={content}
                placeholder="記事を書く"
              />
            </div>
            <div className="col-6 px-0">
              <ArticlePreview title={title} content={content} />
            </div>
          </div>
        </div>
        <FormSubmitButton
          disabled={!this.formSubmitable()}
          text={this.submitButtonText()}
        />
      </form>
    );
  }

  private postArticle(): void {
    const { title, content } = this.props;
    axios.post(this.postURL(), this.parameters())
      .then((res) => {
        this.backToHome();
        this.props.setArticle(title, content);
      }).catch(error =>
        alert(error)
      );
  }

  private updateArticle(): void {
    axios.patch(this.articleURL(), this.parameters())
      .then(() =>
        this.props.history.push(this.articleURL()),
      ).catch(error =>
        alert(error)
      );
  }

  private postURL(): string {
    const userIdentifier = this.props.auth.currentUser.identifier;
    return `${API_URL}/users/${userIdentifier}/articles`;
  }

  private articleURL(): string {
    const userIdentifier = this.props.auth.currentUser.identifier;
    const articleIdentifier = this.props.match.params.identifier;
    return `${API_URL}/users/${userIdentifier}/articles/${articleIdentifier}`;
  }

  private parameters(): any {
    return ({
      article: {
        title: this.props.title,
        content: this.props.content,
      },
    });
  }

  private backToHome() {
    this.props.history.push('/');
  }
}

const TitleInput = styledComponents.input.attrs({
  className: 'w-100 px-1 py-2',
})`
  border: 1px solid #E0E0E0;
  font-size: 24px;
  outline: 0;
`;
const ContentTextarea = styledComponents.textarea.attrs({
  className: 'w-100 px-1 py-2',
})`
  height: 70vh;
  border: 1px solid #E0E0E0;
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
