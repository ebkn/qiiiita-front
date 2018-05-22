import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container } from 'mdbreact';

import ArticleForm from './ArticleForm';

class ArticlePost extends Component {
  render() {
    return (
      <Container fluid>
        <ArticleForm />
      </Container>
    );
  }
}
ArticlePost.propTypes = {
  auth: PropTypes.shape({
    user: PropTypes.shape({
      uid: PropTypes.string,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});
export default withRouter(connect(
  mapStateToProps,
)(ArticlePost));

