import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import fetchArticleList from '../actions/fetchArticleList';

class ArticleList extends Component {
  componentDidMount() {
    this.props.fetchArticleList();
  }

  render() {
    return (
      <div className="container">
        <p>投稿リスト</p>
        { this.props.articleList.map(article => (
          <div key={article.identifier}>
            <Link to={`/articles/${article.identifier}`}>
              <p>{article.title}</p>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}
ArticleList.propTypes = {
  articleList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      identifier: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  fetchArticleList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const articleListStates = state.articleList;
  const latestState = articleListStates.length > 0 ? articleListStates[articleListStates.length - 1] : articleListStates;
  return {
    articleList: latestState.articleList,
    isFetching: state.isFetching,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchArticleList: () => dispatch(fetchArticleList()),
});
export default connect(
  mapStateToProps, mapDispatchToProps,
)(ArticleList);
