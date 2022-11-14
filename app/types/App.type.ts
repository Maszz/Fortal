import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import SearchScreen from '../screens/Home/Search';
import {Region} from 'react-native-maps';
import {Location, LocationMarker} from '../redux/apis';
import ProfileScreen from '../screens/ProfileScreen';
import FriendScreen from '../screens/Friend';
export type StackScreenParams = {
  HomeIndex: undefined;
  Login: {eventId: string};
  Onboard1: undefined;
  Onboard2: undefined;
  Loading: undefined;
  CreateModal: undefined;
  SearchScreen: undefined;
  EventScreen: {eventChatId: string; eventId: string};
  OtherProfileScreen: {userId: string};
  MapViewScreen: undefined;
  SettingScreen: undefined;
  MapViewForEventCardScreen: {
    location: Location;
    locationName: string;
    locationMarker: LocationMarker;
    locationDescription: string;
  };
  ProfileScreen: undefined;
  ProfileSettingScreen: undefined;
  ProfileSettingEditScreen: undefined;
  FriendScreenIndex: undefined;
  NotificationScreen: undefined;
  EventNoteScreen: {eventChatId: string; eventId: string};
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
export type ProfileScreenProps = StackScreenProps<
  StackScreenParams,
  'ProfileScreen'
>;
export type ProfileSettingScreenProps = StackScreenProps<
  StackScreenParams,
  'ProfileSettingScreen'
>;
export type ProfileSettingEditScreenProps = StackScreenProps<
  StackScreenParams,
  'ProfileSettingEditScreen'
>;
export type FriendScreenIndexProps = StackScreenProps<
  StackScreenParams,
  'FriendScreenIndex'
>;
export type NotificationScreenProps = StackScreenProps<
  StackScreenParams,
  'NotificationScreen'
>;
export type EventNoteScreenProps = StackScreenProps<
  StackScreenParams,
  'EventNoteScreen'
>;
