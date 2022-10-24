import {createReducer} from '@reduxjs/toolkit';
import {isDark} from 'native-base/lib/typescript/theme/tools';
import {userAction} from '../action';
export interface UserState {
  username: string;
  at: string;
  rt: string;
}
export const initialState = {} as UserState;

const userReducer = createReducer(initialState, builder => {
  builder.addCase(userAction.mutate, (state, action) => {
    console.log('action.payload', action.payload);
    const payload = action.payload;
    const {username, at, rt} = payload;
    state.username = username;
    state.at = at;
    state.rt = rt;
  });
});
export {userReducer};
