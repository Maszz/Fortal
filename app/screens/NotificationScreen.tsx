import {
  View,
  Text,
  FlatList,
  Pressable,
  HStack,
  VStack,
  Spacer,
  Box,
  Avatar,
  Divider,
  ScrollView,
} from 'native-base';
import {useGetFollowingMutation} from '../redux/apis';
import {useAuth} from '../hooks/useAuth';
import {useEffect, useState, FunctionComponent} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {RootState} from '../redux';
import {TouchableOpacity} from 'react-native';
import {useUnFollowingByIdMutation} from '../redux/apis';
import {GetFollowerResponse} from '../redux/apis';
import {useIsFocused} from '@react-navigation/native';
import {NotificationScreenProps} from '../types/App.type';
import {useGetNotificationsMutation} from '../redux/apis';
const NotificationScreen: FunctionComponent<any> = () => {
  const {user} = useAuth();
  const [getNotifications, {data, error, isLoading}] =
    useGetNotificationsMutation();
  const isFocused = useIsFocused();
  const navigation = useSelector<
    RootState,
    RootState['navigation']['stackNavigation']
  >(state => state.navigation.stackNavigation);
  useEffect(() => {
    getNotifications(user.username);
  }, []);
  return (
    <View flex={1} backgroundColor={'white'} paddingX={'7%'} paddingTop={3}>
      <Text
        textAlign={'center'}
        fontSize={16}
        fontWeight={'normal'}
        marginTop={2}>
        Notification
      </Text>
      <Divider my={2.5} bg="#8B9093" />
      {/* <ScrollView variant={'vertical'}>
        <VStack>
          <HStack
            paddingX={2}
            paddingY={3}
            borderBottomWidth={1}
            borderBottomColor={'#8B9093'}>
            <Avatar
              borderColor={'#8172F7'}
              borderWidth={2}
              size="60px"
              // source={{
              //   uri: item.avatarUrl,
              // }}
            />
            <VStack paddingX={5}>
              <Text fontSize={15} fontWeight={'bold'} color={'#232259'}>
                User anme or tittle
              </Text>
              <Text
                marginTop={1}
                fontSize={14}
                fontWeight={'normal'}
                color={'#232259'}>
                information message
              </Text>
            </VStack>
          </HStack>
          
        </VStack>
      </ScrollView> */}

      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <HStack
              paddingX={2}
              paddingY={3}
              borderBottomWidth={1}
              borderBottomColor={'#8B9093'}>
              <Avatar
                borderColor={'#8172F7'}
                borderWidth={2}
                size="60px"
                // source={{
                //   uri: item.avatarUrl,
                // }}
              />
              <VStack paddingX={5}>
                <Text fontSize={15} fontWeight={'bold'} color={'#232259'}>
                  {item.creator.username}
                </Text>
                <Text
                  marginTop={1}
                  fontSize={14}
                  fontWeight={'normal'}
                  color={'#232259'}>
                  {item.message}
                </Text>
              </VStack>
            </HStack>
          );
        }}
      />
    </View>
  );
};
export default NotificationScreen;
