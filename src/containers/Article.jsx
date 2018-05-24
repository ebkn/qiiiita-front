import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Container, Button } from 'mdbreact';

import fetchArticle from '../actions/fetchArticle';
import setArticle from '../actions/setArticle';

class Article extends Component {
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

  moveToEditPage(e) {
    e.preventDefault();
    this.props.setArticle(this.props.article);
    this.props.history.push(this.editArticleURL());
  }

  render() {
    const { article } = this.props;
    return (
      <Container className="white">
        {(() => (
          this.editable() ? (
            <Button
              color="green"
              onClick={e => this.moveToEditPage(e)}
            >
              編集
            </Button>
          ) : ('')
        ))()}
        <h1 className="black-text font-weight-bold py-4">{article.title}</h1>
        <div className="py-2 pb-4">
          <ReactMarkdown source={article.content} />
        </div>
      </Container>
    );
  }
}
Article.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userIdentifier: PropTypes.string.isRequired,
      identifier: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  auth: PropTypes.shape({
    user: PropTypes.shape({
      identifier: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  article: PropTypes.shape({
    identifier: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  }).isRequired,
  fetchArticle: PropTypes.func.isRequired,
  setArticle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const articleStates = state.article;
  const latestState = articleStates.length > 0 ? articleStates[articleStates.length - 1] : articleStates;
  return {
    auth: state.auth,
    article: latestState.article,
    isFetching: state.isFetching,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchArticle: (userIdentifier, identifier) => dispatch(fetchArticle(userIdentifier, identifier)),
  setArticle: article => dispatch(setArticle(article)),
});
export default withRouter(connect(
  mapStateToProps, mapDispatchToProps,
)(Article));
