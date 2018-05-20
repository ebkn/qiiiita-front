import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ArticlePreview = props => (
  <div>
    <h3>{props.title}</h3>
    <p>{props.content}</p>
  </div>
);

ArticlePreview.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  title: state.editingArticle.title,
  content: state.editingArticle.content,
});
export default connect(
  mapStateToProps,
)(ArticlePreview);

