import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container } from 'mdbreact';

import fetchArticleList from '../actions/fetchArticleList';

class ArticleList extends Component {
  componentDidMount() {
    this.props.fetchArticleList();
  }

  render() {
    const listBorder = {
      borderTop: '1px solid #E0E0E0',
      borderBottom: '1px solid #E0E0E0',
    };
    return (
      <Container className="white">
        <h4 className="px-1 py-3">投稿リスト</h4>
        <div className="w-100 px-0 py-3">
          { this.props.articleList.map(article => (
            <div key={article.identifier} className="p-1" style={listBorder}>
              <Link to={`/articles/${article.identifier}`}>
                <p className="black-text">{article.title}</p>
              </Link>
            </div>
          ))}
        </div>
      </Container>
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
