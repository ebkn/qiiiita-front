import { actionCreatorFactory, Success, Failure } from 'typescript-fsa';

export interface User {
  uid: string;
  identifier: string;
  name: string;
  email: string;
  photoURL: string;
}

const actionCreator = actionCreatorFactory();
const fetchUser =
  actionCreator.async<{}, {user: User}, {error: string}>('FETCH_USER');

export const userAsyncActions = {
  startedFetch: fetchUser.started,
  failedFetch: fetchUser.failed,
  doneFetch: fetchUser.done,
};
