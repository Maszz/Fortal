import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackScreenParams} from './App.type';
export type TabScreenParams = {
  Home: undefined;
  Search: undefined;
  Create: undefined;
  Favorite: undefined;
  Profile: undefined;
};

export type HomeScreenProps = BottomTabScreenProps<TabScreenParams, 'Home'>;
export type SearchScreenProps = BottomTabScreenProps<TabScreenParams, 'Search'>;
export type CreateScreenProps = BottomTabScreenProps<TabScreenParams, 'Create'>;
export type FavoriteScreenProps = BottomTabScreenProps<
  TabScreenParams,
  'Favorite'
>;
export type ProfileScreenProps = BottomTabScreenProps<
  TabScreenParams,
  'Profile'
>;
