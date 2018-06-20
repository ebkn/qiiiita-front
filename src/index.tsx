import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';

import { store } from './store';
import App from './containers/App';
import { config } from '../firebase/config';

export const firebaseApp = firebase.initializeApp(config);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
