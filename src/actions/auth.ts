import { actionCreatorFactory, Success, Failure } from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export interface CurrentUser {
  accessToken: string;
  name: string;
  uid: string;
  email: string;
  photoURL: string;
}

const login =
  actionCreator.async<{}, {currentUser: CurrentUser}, {error: string}>('LOGIN');

export const authAsyncActions = {
  startedLogin: login.started,
  failedLogin: login.failed,
  doneLogin: login.done,
};
export const authActions = {
  logout: actionCreator<{}>('LOGOUT'),
};
