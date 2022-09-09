import {createReducer} from '@reduxjs/toolkit';
import {countAction} from '../action';
interface CounterState {
  value: number;
}
export const initialState = {value: 0} as CounterState;

const counterReducer = createReducer(initialState, builder => {
  builder
    .addCase(countAction.increment, state => {
      state.value++;
    })
    .addCase(countAction.decrement, state => {
      state.value--;
    })
    .addCase(countAction.incrementByAmount, (state, action) => {
      state.value += action.payload;
    });
});
export {counterReducer};
