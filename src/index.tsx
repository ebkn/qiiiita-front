import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import * as thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as firebase from 'firebase';

import App from './containers/App';
import rootReducer from './reducers/rootReducer';
import { config } from '../firebase/config';

export const firebaseApp = firebase.initializeApp(config);

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk.default)),
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
