/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React, {FunctionComponent} from 'react';
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
import {
  createStackNavigator,
  StackScreenProps,
  StackCardStyleInterpolator,
  StackCardInterpolationProps,
  CardStyleInterpolators,
  TransitionPresets,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {Animated} from 'react-native';
import {client} from './graphql/client';
import {countAction, persistor, RootState, store} from './redux';
import App from './screens/App';
import LoginScreen from './screens/loginScreen';

import type {StackScreenParams, HomeScreenProps} from './types';

import {SheetProvider} from 'react-native-actions-sheet';
import './utils/SheetManager';
import RegisterOnboardGender from './screens/registerOnboardGender';
import RegisterOnboardActivity from './screens/registerOnboardActivity';
const Stack = createStackNavigator<StackScreenParams>();
const defaultScreenOption: StackNavigationOptions = {
  headerShown: false,
  gestureEnabled: true,
};
const StackNavigation = () => {
  /**
   * when Defined new Screen you should declare type of it in folder type.
   */
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{...defaultScreenOption}}
      />
      <Stack.Screen
        name="Home"
        component={App}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Onboard1"
        component={RegisterOnboardGender}
        options={{...defaultScreenOption}}
      />
      <Stack.Screen
        name="Onboard2"
        component={RegisterOnboardActivity}
        options={{...defaultScreenOption}}
      />
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
            <SheetProvider>
              <NavigationContainer ref={navigationRef}>
                <StackNavigation />
              </NavigationContainer>
            </SheetProvider>
          </NativeBaseProvider>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
};

export default Wrapper;
