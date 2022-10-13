/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
// @ts-ignore: no declaration files
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';
import {Box, Button, NativeBaseProvider, ScrollView, Text} from 'native-base';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {
  useFlipper,
  useReduxDevToolsExtension,
} from '@react-navigation/devtools';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';

import {client} from './graphql/client';
import {countAction, persistor, RootState, store} from './redux';
import App from './screens/App';
import LoginScreen from './screens/loginScreen';

import type {StackScreenParams, HomeScreenProps} from './types';
const Stack = createStackNavigator<StackScreenParams>();

const StackNavigation = () => {
  /**
   * when Defined new Screen you should declare type of it in folder type.
   */
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={App}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
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
        <ApolloProvider client={client}>
          <NativeBaseProvider>
            <NavigationContainer ref={navigationRef}>
              <StackNavigation />
            </NavigationContainer>
          </NativeBaseProvider>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
};

export default Wrapper;
