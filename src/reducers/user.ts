import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { User, userAsyncActions } from '../actions/user';

export interface UserState {
  isFetching: boolean;
  user: User;
}

const initialState: UserState = {
  isFetching: false,
  user: {
    uid: '',
    identifier: '',
    name: '',
    email: '',
    photoURL: '',
  },
};

export const userReducer = reducerWithInitialState(initialState)
  .case(userAsyncActions.startedFetch, (state, {}) => {
    return (Object as any).assign({}, state, {
      isFetching: true,
    });
  })
  .case(userAsyncActions.doneFetch, (state, payload) => {
    return (Object as any).assign({}, state, {
      user: payload.result.user,
      isFetching: false,
    });
  })
  .case(userAsyncActions.failedFetch, (state, payload) => {
    return (Object as any).assign({}, state, {
      error: payload.error.error,
      isFetching: false,
    });
  });
