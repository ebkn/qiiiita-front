import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Button } from 'mdbreact';
import axios from 'axios';

import { editTitle, editContent } from '../actions/editArticle';
import addArticle from '../actions/addArticle';
import ArticlePreview from './ArticlePreview';

import { API_URL } from '../config';

class ArticleForm extends Component {
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
      )
  }

  updateArticle() {
    axios.patch(this.articleURL(), this.parameters())
      .then(() =>
        this.props.history.push(this.articleURL()),
      ).catch(error =>
        alert(error)
      )
  }

  submitArticle(e) {
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
        <Container fluid className="p-0">
          <input
            type="text"
            onChange={e => this.props.editTitle(e.target.value)}
            value={this.props.title}
            placeholder="タイトル"
            className="w-100 px-1 py-2"
            style={style.titleInput}
          />
        </Container>
        <Container fluid className="px-0 py-1">
          <Row className="w-100 mx-0">
            <Col sm="12" md="6" className="px-0">
              <textarea
                type="text"
                onChange={e => this.props.editContent(e.target.value)}
                value={this.props.content}
                placeholder="記事"
                className="w-100 px-1 py-2"
                style={style.contentTextarea}
              />
            </Col>
            <Col sm="12" md="6" className="px-0">
              <ArticlePreview />
            </Col>
          </Row>
        </Container>
        <Container fluid className="px-0 py-0">
          <div className="d-flex py-0 w-100 justify-content-end">
            <Button
              type="submit"
              disabled={!this.formSubmitable()}
              className="py-1"
              color="light-green"
            >
              {this.submitText()}
            </Button>
          </div>
        </Container>
      </form>
    );
  }
}
ArticleForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      identifier: PropTypes.string.isRequired,
      userIdentifier: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  auth: PropTypes.shape({
    user: PropTypes.shape({
      identifier: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  editTitle: PropTypes.func.isRequired,
  editContent: PropTypes.func.isRequired,
  addArticle: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  formType: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  title: state.editingArticle.title,
  content: state.editingArticle.content,
});
const mapDispatchToProps = dispatch => ({
  editTitle: title => dispatch(editTitle(title)),
  editContent: content => dispatch(editContent(content)),
  addArticle: data => dispatch(addArticle(data)),
});
export default withRouter(connect(
  mapStateToProps, mapDispatchToProps,
)(ArticleForm));

