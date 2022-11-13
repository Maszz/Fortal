import {View, Text} from 'native-base';
import {FriendScreenIndexProps} from '../../types';
import {FunctionComponent, useEffect, useState} from 'react';
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
import {CountRes} from '../../redux/apis/UserApi';
import {useDataBuffer} from '../../hooks/useDataBuffer';
const Tab = createMaterialTopTabNavigator<TabScreenParams>();
export type TabScreenParams = {
  FollowersScreen: {refetch: () => void};
  FollowingScreen: {refetch: () => void};
  FollowingRequestScreen: {refetch: () => void};
};

export type FollowingRequestScreenProps = MaterialTopTabScreenProps<
  TabScreenParams,
  'FollowingRequestScreen'
>;
export type FollowingScreenProps = MaterialTopTabScreenProps<
  TabScreenParams,
  'FollowingScreen'
>;
export type FollowersScreenProps = MaterialTopTabScreenProps<
  TabScreenParams,
  'FollowersScreen'
>;

const FriendScreenIndex: FunctionComponent<FriendScreenIndexProps> = () => {
  const [getFollowCount, {data, error, isLoading}] =
    useGetFollowCountMutation();

  const {user} = useAuth();
  // const dataBuff = useDataBuffer<CountRes>(data || ({} as CountRes));
  const [dataBuff, setDataBuff] = useState<CountRes>({
    followedBy: 0,
    following: 0,
    followingRequestBy: 0,
  } as CountRes);
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
  useEffect(() => {
    if (data) {
      setDataBuff(data);
    }
  }, [data]);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="FollowersScreen"
        initialParams={{refetch: refetch}}
        component={FollowersScreen}
        options={{
          title: `${dataBuff?.followedBy} Followers`,
        }}
      />
      <Tab.Screen
        name="FollowingScreen"
        initialParams={{refetch: refetch}}
        component={FollowingScreen}
        options={{
          title: `${dataBuff?.following} Following`,
        }}
      />
      <Tab.Screen
        name="FollowingRequestScreen"
        component={FollowingRequestScreen}
        initialParams={{refetch: refetch}}
        options={{
          title: `${dataBuff?.followingRequestBy} Request`,
        }}
      />
    </Tab.Navigator>
  );
};

export default FriendScreenIndex;
