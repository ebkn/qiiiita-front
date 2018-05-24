import React from 'react';
import { Container } from 'mdbreact';

import ArticleForm from '../containers/ArticleForm';

const ArticlePost = () => (
  <Container fluid>
    <ArticleForm formType="create" />
  </Container>
);
export default ArticlePost;

