import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import SearchScreen from '../screens/Home/Search';
import {Region} from 'react-native-maps';
import {Location, LocationMarker} from '../redux/apis';
export type StackScreenParams = {
  HomeIndex: undefined;
  Login: {eventId: string};
  Onboard1: undefined;
  Onboard2: undefined;
  Loading: undefined;
  CreateModal: undefined;
  SearchScreen: undefined;
  EventScreen: {eventId: string};
  OtherProfileScreen: {userId: string};
  MapViewScreen: undefined;
  SettingScreen: undefined;
  MapViewForEventCardScreen: {
    location: Location;
    locationName: string;
    locationMarker: LocationMarker;
    locationDescription: string;
  };
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

export type EventScreenProps = StackScreenProps<
  StackScreenParams,
  'EventScreen'
>;

export type OtherProfileScreenProps = StackScreenProps<
  StackScreenParams,
  'OtherProfileScreen'
>;

export type MapViewScreenProps = StackScreenProps<
  StackScreenParams,
  'MapViewScreen'
>;

export type SettingScreenProps = StackScreenProps<
  StackScreenParams,
  'SettingScreen'
>;

export type MapViewForEventCardScreenProps = StackScreenProps<
  StackScreenParams,
  'MapViewForEventCardScreen'
>;
