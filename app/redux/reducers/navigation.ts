import {createReducer} from '@reduxjs/toolkit';
import {isDark} from 'native-base/lib/typescript/theme/tools';
import {userAction} from '../action';
import {createAction} from '@reduxjs/toolkit';
import {UserState} from '../reducers/user';

export interface setStackNavigation {
  stackNavigation: any;
}
export const setStackAction = createAction<setStackNavigation>(
  'navigation/setstack',
);
export const setTabAction =
  createAction<setStackNavigation>('navigation/settab');

export interface NavigationState {
  stackNavigation: any extends {navigate: Function} ? any : null;
  TabNavigation: any;
}
export const initialState = {} as NavigationState;

const navigationReducer = createReducer(initialState, builder => {
  builder.addCase(setStackAction, (state, action) => {
    // console.log('action.payload', action.payload);
    state.stackNavigation = action.payload;
  }),
    builder.addCase(setTabAction, (state, action) => {
      // console.log('action.payload', action.payload);
      state.TabNavigation = action.payload;
    });
});
export {navigationReducer};
