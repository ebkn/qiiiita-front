import React from 'react';
import { Container } from 'mdbreact';

import ArticleForm from '../containers/ArticleForm';

const ArticleEdit = () => (
  <Container fluid>
    <ArticleForm formType="update" />
  </Container>
);

export default ArticleEdit;
