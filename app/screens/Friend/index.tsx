import {View, Text} from 'native-base';
import {FriendScreenIndexProps} from '../../types';
import {FunctionComponent, useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FollowersScreen from './FollowersScreen';
import FollowingScreen from './FollowingScreen';
import {useGetFollowCountMutation} from '../../redux/apis';
import {useAuth} from '../../hooks/useAuth';
const Tab = createMaterialTopTabNavigator();

const FriendScreenIndex: FunctionComponent<FriendScreenIndexProps> = () => {
  const [getFollowCount, {data, error, isLoading}] =
    useGetFollowCountMutation();
  const {user} = useAuth();
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
    </Tab.Navigator>
  );
};

export default FriendScreenIndex;
