import {combineReducers} from 'redux';
import {counterReducer} from './testReducer';
export * from './testReducer';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
const persistConfig = {
  key: 'count',
  storage: AsyncStorage,
  whilelist: ['value'],
};
export const rootReducer = combineReducers({
  count: persistReducer(persistConfig, counterReducer),
});
