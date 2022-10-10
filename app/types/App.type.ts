import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';

export type StackScreenParams = {
  Home: undefined;
  Login: {eventId: string};
};
export type HomeScreenProps = StackScreenProps<StackScreenParams, 'Home'>;
export type LoginScreenProps = StackScreenProps<StackScreenParams, 'Login'>;
