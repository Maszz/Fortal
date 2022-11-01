import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './reducers';
import {persistStore} from 'redux-persist';
import {storage} from './mmkv';
const middlewares = [] as any;

if (__DEV__) {
  console.log('Running in Dev Mode.');
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
  const {initializeMMKVFlipper} = require('react-native-mmkv-flipper-plugin');

  initializeMMKVFlipper({default: storage});
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          'persist/PERSIST',
          'navigation/setstack',
          'navigation/settab',
        ],
        ignoredPaths: ['navigation'],

        // Ignore these field paths in all actions
      },
    }).concat(middlewares),
});
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
