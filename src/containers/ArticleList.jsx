import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'mdbreact';

import fetchArticleList from '../actions/fetchArticleList';
import ArticleInList from '../components/ArticleInList';

class ArticleList extends Component {
  componentDidMount() {
    this.props.fetchArticleList();
  }

  render() {
    return (
      <Container className="white">
        <h4 className="px-1 pt-3">投稿リスト</h4>
        <div className="w-100 px-0 py-3">
          { this.props.articleList.map(article => (
            <ArticleInList article={article} key={article.identifier} />
          ))}
        </div>
      </Container>
    );
  }
}
ArticleList.propTypes = {
  articleList: PropTypes.arrayOf(
    PropTypes.shape({
      identifier: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired,
      user: PropTypes.shape({
        identifier: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
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
