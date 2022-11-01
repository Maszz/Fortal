import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import SearchScreen from '../screens/Home/Search';

export type StackScreenParams = {
  HomeIndex: undefined;
  Login: {eventId: string};
  Onboard1: undefined;
  Onboard2: undefined;
  Loading: undefined;
  CreateModal: undefined;
  SearchScreen: undefined;
};
export type HomeIndexScreenProps = StackScreenProps<
  StackScreenParams,
  'HomeIndex'
>;
export type LoginScreenProps = StackScreenProps<StackScreenParams, 'Login'>;
export type RegisterOnboardGenderProps = StackScreenProps<
  StackScreenParams,
  'Onboard1'
>;
export type RegisterOnboardActivityProps = StackScreenProps<
  StackScreenParams,
  'Onboard2'
>;
export type CreateModalProps = StackScreenProps<
  StackScreenParams,
  'CreateModal'
>;
export type SearchScreenProps = StackScreenProps<
  StackScreenParams,
  'SearchScreen'
>;
