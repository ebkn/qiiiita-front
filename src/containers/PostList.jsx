import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import fetchPostList from '../actions/fetchPostList';

class PostList extends Component {
  componentDidMount() {
    this.props.fetchPostList();
  }

  render() {
    return (
      <div className="container">
        <p>投稿リスト</p>
        { this.props.posts.map(post => (
          <div key={post.identifier}>
            <Link to={`/posts/${post.identifier}`}>
              <p>{post.title}</p>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}
PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      identifier: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  fetchPostList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const postListStates = state.posts;
  const latestState = postListStates.length > 0 ? postListStates[postListStates.length - 1] : postListStates;
  return {
    posts: latestState.posts,
    isFetching: state.isFetching,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchPostList: () => dispatch(fetchPostList()),
});
export default connect(
  mapStateToProps, mapDispatchToProps,
)(PostList);

