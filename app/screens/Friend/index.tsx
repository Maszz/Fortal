import {View, Text} from 'native-base';
import {FriendScreenIndexProps} from '../../types';
import {FunctionComponent} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FriendScreen from './FriendScreen';
import RequestScreen from './Requestscreen';
const Tab = createMaterialTopTabNavigator();

const FriendScreenIndex: FunctionComponent<FriendScreenIndexProps> = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="FriendScreen"
        component={FriendScreen}
        options={{
          title: 'Friend',
        }}
      />
      <Tab.Screen
        name="RequestScreen"
        component={RequestScreen}
        options={{
          title: 'Request',
        }}
      />
    </Tab.Navigator>
  );
};

export default FriendScreenIndex;
