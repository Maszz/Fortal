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
import {store, RootState} from './redux';
import {countAction, persistor} from './redux';
import {NativeBaseProvider, Box, Text, ScrollView, Button} from 'native-base';
import {PersistGate} from 'redux-persist/integration/react';
import {client} from './graphql/client';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import App from './screens/App';
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
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import type {StackScreenParams, HomeScreenProps} from './types';
import LoginScreen from './screens/loginScreen';

const Stack = createStackNavigator<StackScreenParams>();

const StackNavigation = () => {
  /**
   * when Defined new Screen you should declare type of it in folder type.
   */
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={App} />
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
