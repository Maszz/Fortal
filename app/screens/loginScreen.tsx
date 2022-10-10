import {View, Text} from 'native-base';
import type {StackScreenProps} from '@react-navigation/stack';
import type {StackScreenParams} from '../types';
import {FunctionComponent, useEffect} from 'react';
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {LoginScreenProps} from '../types';
const LoginScreen: FunctionComponent<LoginScreenProps> = ({
  navigation,
  route,
}) => {
  useEffect(() => {
    console.log('route ', route.params);
  });
  return (
    <View>
      <Text>Login Screen</Text>
    </View>
  );
};

export default LoginScreen;
