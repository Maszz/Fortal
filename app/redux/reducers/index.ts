import {combineReducers} from 'redux';
import {counterReducer} from './testReducer';
export * from './testReducer';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userReducer} from './user';
import {MMKVStorage} from '../mmkv';
const persistConfig = {
  key: 'count',
  storage: MMKVStorage,
  whilelist: ['value'],
};
const userPersistConfig = {
  key: 'user',
  storage: MMKVStorage,
};
export const rootReducer = combineReducers({
  count: persistReducer(persistConfig, counterReducer),
  user: persistReducer(userPersistConfig, userReducer),
});
