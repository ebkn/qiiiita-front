import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'normalize.css';

import PostList from '../containers/PostList';
import Post from '../containers/Post';

const App = () => (
  <Router>
    <div>
      <h2>Qiiiita</h2>
      {/*
      <Header />
      */}
      <Switch>
        <Route exact path="/" component={PostList} />
        <Route path="/posts/:identifier" component={Post} />
        <Route>
          <h2>Page Not Found</h2>
        </Route>
      </Switch>
      {/*
      <FooterBar />
      */}
    </div>
  </Router>
);

export default App;

