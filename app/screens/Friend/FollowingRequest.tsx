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
  Button,
} from 'native-base';
import {
  useGetFollowingRequestFromMutation,
  useHandleFollowingRequestMutation,
} from '../../redux/apis';
import {useAuth} from '../../hooks/useAuth';
import {FunctionComponent, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FollowingRequestScreenProps} from '.';
const FollowingRequestScreen: FunctionComponent<
  FollowingRequestScreenProps
> = ({route}) => {
  const {user} = useAuth();
  const {refetch} = route.params;
  const [getFollowing, {data, error, isLoading}] =
    useGetFollowingRequestFromMutation();
  const navigation = useSelector<
    RootState,
    RootState['navigation']['stackNavigation']
  >(state => state.navigation.stackNavigation);
  const [handleFollowingRequest] = useHandleFollowingRequestMutation();
  useEffect(() => {
    getFollowing(user.username);
  }, []);
  return (
    <View flex={1} backgroundColor={'white'}>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <Pressable
              onPress={() => {
                navigation.navigate('OtherProfileScreen', {
                  userId: item.username,
                });
              }}>
              <Box pl={['0', '4']} pr={['0', '5']} py="2">
                <HStack space={[2, 3]} justifyContent="space-between">
                  <Avatar
                    size="48px"
                    // source={{
                    //   uri: item.avatarUrl,
                    // }}
                  />
                  <VStack>
                    <Text color="coolGray.800" bold>
                      {item.username}
                    </Text>
                    <Text color="coolGray.600">{item.displayName}</Text>
                  </VStack>
                  <Spacer />
                  <HStack alignSelf="center" mr={3}>
                    <TouchableOpacity
                      onPress={() => {
                        console.log('accept');
                        handleFollowingRequest({
                          requestId: item.id,
                          status: 'accepted',
                        })
                          .unwrap()
                          .then(() => {
                            getFollowing(user.username);
                            refetch();
                          });
                      }}
                      style={{
                        marginRight: 3,
                        backgroundColor: '#458eff',
                        borderRadius: 10,
                      }}>
                      <Text color={'white'} mx={2} my={1} bold>
                        Confirm
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        handleFollowingRequest({
                          requestId: item.id,
                          status: 'rejected',
                        })
                          .unwrap()
                          .then(() => {
                            getFollowing(user.username);
                            refetch();
                          });
                      }}
                      style={{backgroundColor: '#5A5A5A', borderRadius: 10}}>
                      <Text color={'white'} mx={2} my={1} bold>
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </HStack>
                </HStack>
              </Box>
            </Pressable>
          );
        }}
      />
    </View>
  );
};
export default FollowingRequestScreen;
