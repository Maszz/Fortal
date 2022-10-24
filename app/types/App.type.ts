import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import RegisterOnboardActivity from '../screens/registerOnboardActivity';

export type StackScreenParams = {
  Home: undefined;
  Login: {eventId: string};
  Onboard1: undefined;
  Onboard2: undefined;
};
export type HomeScreenProps = StackScreenProps<StackScreenParams, 'Home'>;
export type LoginScreenProps = StackScreenProps<StackScreenParams, 'Login'>;
export type RegisterOnboardGenderProps = StackScreenProps<
  StackScreenParams,
  'Onboard1'
>;
export type RegisterOnboardActivityProps = StackScreenProps<
  StackScreenParams,
  'Onboard2'
>;
