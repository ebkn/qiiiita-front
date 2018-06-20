import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { CurrentUser, authAsyncActions, authActions } from '../actions/auth';

export interface AuthState {
  loggedIn: boolean;
  currentUser: CurrentUser | null;
}

const initialState: AuthState = {
  loggedIn: false,
  currentUser: null,
};

export const authReducer = reducerWithInitialState(initialState)
  .case(authAsyncActions.startedLogin, (state, {}) => {
    return (Object as any).assign({}, state, {
      loggedIn: false,
    });
  })
  .case(authAsyncActions.doneLogin, (state, payload) => {
    return (Object as any).assign({}, state, {
      currentUser: payload.result.currentUser,
      loggedIn: true,
    });
  })
  .case(authAsyncActions.failedLogin, (state, payload) => {
    return (Object as any).assign({}, state, {
      error: payload.error.error,
      loggedIn: false,
    });
  })
  .case(authActions.logout, (state) => {
    return (Object as any).assign({}, state, {
      loggedIn: false,
      currentUser: null,
    });
  });
