/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
/*eslint eslint-comments/no-unlimited-disable: error */
import React from 'react';
import {SafeAreaView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Provider} from 'react-redux';
import {store, RootState} from './redux';
import {useSelector, useDispatch} from 'react-redux';
import {countAction, persistor} from './redux';
import {NativeBaseProvider, Box, Text} from 'native-base';
import {PersistGate} from 'redux-persist/integration/react';
// @ts-ignore: no declaration files
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {
  useFlipper,
  useReduxDevToolsExtension,
} from '@react-navigation/devtools';
const App = () => {
  const {t} = useTranslation();
  const count = useSelector<RootState, RootState['count']>(
    state => state.count,
  );
  const dispatch = useDispatch();
  return (
    <Provider store={store}>
      <SafeAreaView>
        <Text>{t('common:ok')}</Text>
        <Text>Test</Text>
        <Text>{count.value}</Text>
        <Text onPress={() => dispatch(countAction.increment())}>+</Text>
        <Box>Boxxxx</Box>
      </SafeAreaView>
    </Provider>
  );
};

const Wrapper = () => {
  const navigationRef = useNavigationContainerRef();

  if (__DEV__) {
    useFlipper(navigationRef); //eslint-disable-line react-hooks/rules-of-hooks
    useReduxDevToolsExtension(navigationRef); //eslint-disable-line react-hooks/rules-of-hooks
  }
  return (
    <Provider store={store}>
      <FlipperAsyncStorage />
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <NavigationContainer ref={navigationRef}>
            <App />
          </NavigationContainer>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};

export default Wrapper;
