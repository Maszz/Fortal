import {combineReducers} from 'redux';
import {counterReducer} from './testReducer';
export * from './testReducer';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MMKVStorage} from '../mmkv';
const persistConfig = {
  key: 'count',
  storage: MMKVStorage,
  whilelist: ['value'],
};
export const rootReducer = combineReducers({
  count: persistReducer(persistConfig, counterReducer),
});
