import {createReducer} from '@reduxjs/toolkit';
import {isDark} from 'native-base/lib/typescript/theme/tools';
import {userAction} from '../action';
import {createAction} from '@reduxjs/toolkit';
import {UserState} from '../reducers/user';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackScreenParams} from '../../types';
export interface setStackNavigation {
  stackNavigation: StackNavigationProp<
    StackScreenParams,
    'HomeIndex',
    undefined
  >;
}
export const setStackAction = createAction<setStackNavigation>(
  'navigation/setstack',
);
export const setTabAction =
  createAction<setStackNavigation>('navigation/settab');
export const setLoadingAction = createAction<boolean>('navigation/setloading');
export interface NavigationState {
  stackNavigation: StackNavigationProp<
    StackScreenParams,
    'HomeIndex',
    undefined
  >;
  TabNavigation: any;
  isLoading: boolean;
}
export const initialState = {} as NavigationState;

const navigationReducer = createReducer(initialState, builder => {
  builder.addCase(setStackAction, (state, action) => {
    // console.log('action.payload', action.payload);
    state.stackNavigation = action.payload.stackNavigation;
  }),
    builder.addCase(setTabAction, (state, action) => {
      // console.log('action.payload', action.payload);
      state.TabNavigation = action.payload.stackNavigation;
    });
  builder.addCase(setLoadingAction, (state, action) => {
    // console.log('action.payload', action.payload);
    console.log(action.payload);
    state.isLoading = action.payload;
  });
});
export {navigationReducer};
