import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import fetchPost from '../actions/fetchPost';

class Post extends Component {
  componentDidMount() {
    const { identifier } = this.props.match.params;
    this.props.fetchPost(identifier);
  }

  render() {
    const { post } = this.props;
    return (
      <div className="container">
        <p>{post.title}</p>
      </div>
    );
  }
}
Post.propTypes = {
  post: PropTypes.shape({
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
  fetchPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const postStates = state.post;
  const latestState = postStates.length > 0 ? postStates[postStates.length - 1] : postStates;
  return {
    post: latestState.post,
    isFetching: state.isFetching,
  };
};
const mapDispatchToProps = dispatch => ({
  fetchPost: identifier => dispatch(fetchPost(identifier)),
});
export default connect(
  mapStateToProps, mapDispatchToProps,
)(Post);

