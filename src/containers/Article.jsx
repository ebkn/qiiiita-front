import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import fetchArticle from '../actions/fetchArticle';

class Article extends Component {
  componentDidMount() {
    const { identifier } = this.props.match.params;
    this.props.fetchArticle(identifier);
  }

  render() {
    const { article } = this.props;
    return (
      <div className="container">
        <p>{article.title}</p>
      </div>
    );
  }
}
Article.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.number.isRequired,
    identifier: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      identifier: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  fetchArticle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const articleStates = state.article;
  const latestState = articleStates.length > 0 ? articleStates[articleStates.length - 1] : articleStates;
  return {
    article: latestState.article,
    isFetching: state.isFetching,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchArticle: identifier => dispatch(fetchArticle(identifier)),
});
export default connect(
  mapStateToProps, mapDispatchToProps,
)(Article);
