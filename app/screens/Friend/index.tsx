import {View, Text} from 'native-base';
import {FriendScreenIndexProps} from '../../types';
import {FunctionComponent, useEffect} from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabScreenProps,
} from '@react-navigation/material-top-tabs';
import FollowersScreen from './FollowersScreen';
import FollowingScreen from './FollowingScreen';
import {useGetFollowCountMutation} from '../../redux/apis';
import {useAuth} from '../../hooks/useAuth';
import FollowingRequestScreen from './FollowingRequest';
import {useIsFocused} from '@react-navigation/native';
const Tab = createMaterialTopTabNavigator<TabScreenParams>();
export type TabScreenParams = {
  FollowersScreen: undefined;
  FollowingScreen: undefined;
  FollowingRequestScreen: {refetch: () => void};
};

export type FollowingRequestScreenProps = MaterialTopTabScreenProps<
  TabScreenParams,
  'FollowingRequestScreen'
>;
const FriendScreenIndex: FunctionComponent<FriendScreenIndexProps> = () => {
  const [getFollowCount, {data, error, isLoading}] =
    useGetFollowCountMutation();
  const {user} = useAuth();
  const refetch = () => {
    getFollowCount(user.username);
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    console.log('flodasda');
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);
  useEffect(() => {
    getFollowCount(user.username);
  }, []);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="FollowersScreen"
        component={FollowersScreen}
        options={{
          title: `${data?.followedBy} Followers`,
        }}
      />
      <Tab.Screen
        name="FollowingScreen"
        component={FollowingScreen}
        options={{
          title: `${data?.following} Following`,
        }}
      />
      <Tab.Screen
        name="FollowingRequestScreen"
        component={FollowingRequestScreen}
        initialParams={{refetch: refetch}}
        options={{
          title: `${data?.followingRequestBy} Request`,
        }}
      />
    </Tab.Navigator>
  );
};

export default FriendScreenIndex;
