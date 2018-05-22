import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Button } from 'mdbreact';
import axios from 'axios';

import { editTitle, editContent } from '../actions/editArticle';
import addArticle from '../actions/addArticle';
// import postArticle from '../lib/postArticle';
import ArticlePreview from './ArticlePreview';

import { API_URL } from '../config';


class ArticleForm extends Component {
  postArticle(e) {
    e.preventDefault();
    const data = {
      title: this.props.title,
      content: this.props.content,
    };
    axios.post(this.postURL(), { article: data })
      .then((res) => {
        this.backToHome();
        this.props.addArticle(res.data);
      })
      .catch(err =>
        alert(err)
      )
  }

  postURL() {
    const userIdentifier = this.props.auth.user.identifier;
    return `${API_URL}/users/${userIdentifier}/articles`;
  }

  backToHome() {
    this.props.history.push('/');
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
        onSubmit={e => this.postArticle(e)}
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
              disabled={(this.props.title === '' || this.props.content === '')}
              className="py-1"
              color="light-green"
            >
              投稿
            </Button>
          </div>
        </Container>
      </form>
    );
  }
}
ArticleForm.propTypes = {
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

