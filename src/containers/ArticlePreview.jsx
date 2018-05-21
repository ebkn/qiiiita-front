import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

const style = {
  box: {
    height: '70vh',
    border: '1px solid #E0E0E0',
  },
};
const ArticlePreview = props => (
  <div className="w-100 px-1 py-2 white" style={style.box}>
    <h2>{props.title}</h2>
    <ReactMarkdown source={props.content} />
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

