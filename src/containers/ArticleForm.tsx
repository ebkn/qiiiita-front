import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { editTitle, editContent } from '../actions/editArticle';
import addArticle from '../actions/addArticle';
import ArticlePreview from './ArticlePreview';

import { API_URL } from '../config';

interface Article {
  title: string;
  content: string;
}
interface Props {
  match: {
    params: {
      identifier: string;
      userIdentifier: string;
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
  title: string;
  content: string;
  formType: string;
  editTitle(title: string): void;
  editContent(content: string): void;
  addArticle(article: Article): void;
}
class ArticleForm extends React.Component<Props> {
  parameters() {
    return ({
      article: {
        title: this.props.title,
        content: this.props.content,
      },
    });
  }

  postArticle() {
    axios.post(this.postURL(), this.parameters())
      .then((res) => {
        this.backToHome();
        this.props.addArticle(res.data);
      }).catch(error =>
        alert(error)
      );
  }

  updateArticle() {
    axios.patch(this.articleURL(), this.parameters())
      .then(() =>
        this.props.history.push(this.articleURL()),
      ).catch(error =>
        alert(error)
      );
  }

  submitArticle(e: React.FormEvent<HTMLInputElement>) {
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

  postURL() {
    const userIdentifier = this.props.auth.user.identifier;
    return `${API_URL}/users/${userIdentifier}/articles`;
  }

  articleURL() {
    const userIdentifier = this.props.auth.user.identifier;
    const articleIdentifier = this.props.match.params.identifier;
    return `${API_URL}/users/${userIdentifier}/articles/${articleIdentifier}`;
  }

  backToHome() {
    this.props.history.push('/');
  }

  submitText() {
    switch (this.props.formType) {
      case 'create':
        return '投稿';
      case 'update':
        return '更新';
      default:
        return 'エラー';
    }
  }

  formSubmitable() {
    return (this.props.title !== '' && this.props.content !== '');
  }

  render() {
    const style = {
      titleInput: {
        border: '1px solid #E0E0E0',
        fontSize: '24px',
        outline: 0,
      },
      contentTextarea: {
        height: '70vh',
        border: '1px solid #E0E0E0',
        outline: 0,
      },
    };
    return (
      <form
        onSubmit={e => this.submitArticle(e)}
      >
        <div className="container-fluid p-0">
          <input
            type="text"
            onChange={e => this.props.editTitle(e.target.value)}
            value={this.props.title}
            placeholder="タイトル"
            className="w-100 px-1 py-2"
            style={style.titleInput}
          />
        </div>
        <div className="container-fluid px-0 py-1">
          <div className="row w-100 mx-0">
            <div className="col s-12 m-6 px-0">
              <textarea
                onChange={e => this.props.editContent(e.target.value)}
                value={this.props.content}
                placeholder="記事"
                className="w-100 px-1 py-2"
                style={style.contentTextarea}
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
const mapStateToProps = state => ({
  auth: state.auth,
  title: state.editingArticle.title,
  content: state.editingArticle.content,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  editTitle: (title: string) => dispatch(editTitle(title)),
  editContent: (content: string) => dispatch(editContent(content)),
  addArticle: (data: Article) => dispatch(addArticle(data)),
});
export default withRouter(connect(
  mapStateToProps, mapDispatchToProps,
)(ArticleForm));
