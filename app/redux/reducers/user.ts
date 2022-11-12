import {createReducer} from '@reduxjs/toolkit';
import {isDark} from 'native-base/lib/typescript/theme/tools';
import {userAction} from '../action';
import {createAction} from '@reduxjs/toolkit';

export interface UserState {
  username: string;
  onboarding: boolean;
  at: string;
  rt: string;
  id: string;
}
export const initialState = {} as UserState;

const userReducer = createReducer(initialState, builder => {
  builder.addCase(userAction.mutate, (state, action) => {
    // console.log('action.payload', action.payload);
    const payload = action.payload;
    const {username, at, rt, onboarding} = payload;
    state.username = username;
    state.at = at;
    state.rt = rt;
    state.onboarding = onboarding;
    state.id = payload.id;
  });
});
export {userReducer};
