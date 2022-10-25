import {createAction} from '@reduxjs/toolkit';
import {UserState} from '../reducers/user';

export interface UserSigninPayload {
  username: string;
  at: string;
  rt: string;
}
export const mutate = createAction<UserSigninPayload>('user/signin');
