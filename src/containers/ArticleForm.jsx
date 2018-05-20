import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-dom';

import { editTitle, editContent } from '../actions/editArticle';
import addArticle from '../actions/addArticle';
import postArticle from '../lib/postArticle';
import ArticlePreview from './ArticlePreview';

class ArticleForm extends Component {
  postArticle() {
    const data = {};
    postArticle(data)
      .then(() => {
        push('/');
        this.props.addArticle(data);
      });
  }

  render() {
    return (
      <form
        onSubmit={() => this.postArticle()}
      >
        <div className="container">
          <input
            type="text"
            onChange={e => this.props.editTitle(e.target.value)}
            value={this.props.title}
          />
          <textArea
            type="text"
            onChange={e => this.props.editContent(e.target.value)}
            value={this.props.content}
          />
          <ArticlePreview />
        </div>
      </form>
    );
  }
}
ArticleForm.propTypes = {
  editTitle: PropTypes.func.isRequired,
  editContent: PropTypes.func.isRequired,
  addArticle: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  title: state.editingArticle.title,
  content: state.editingArticle.content,
});
const mapDispatchToProps = dispatch => ({
  editTitle: title => dispatch(editTitle(title)),
  editContent: content => dispatch(editContent(content)),
  addArticle: data => dispatch(addArticle(data)),
});
export default connect(
  mapStateToProps, mapDispatchToProps,
)(ArticleForm);

