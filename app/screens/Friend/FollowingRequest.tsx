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
    <View flex={1} backgroundColor={'white'} paddingX={'7%'} paddingTop={3}>
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
              <Box
                height={98}
                pl={['0', '4']}
                pr={['0', '5']}
                py="3"
                borderBottomWidth={1}
                borderBottomColor={'#8B9093'}>
                <HStack space={[2, 3]} justifyContent="space-between">
                  <Avatar
                    borderColor={'#8172F7'}
                    borderWidth={2}
                    size="56px"
                    // source={{
                    //   uri: item.avatarUrl,
                    // }}
                  />
                  <VStack marginLeft={2}>
                    <Text fontSize={12} color="#232259" bold>
                      {item.username}Title or User name
                    </Text>

                    <Text fontSize={12} fontWeight={'normal'} color="#232259">
                      {item.displayName}Want to add you a friend.
                    </Text>
                    <HStack mt={2}>
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
                          alignItems: 'center',
                          alignContent: 'center',
                          height: 30,
                          width: 110,
                          marginRight: 35,
                          borderWidth: 2,
                          borderColor: '#8172F7',
                          borderRadius: 20,
                        }}>
                        <Text
                          color={'#8172F7'}
                          fontSize={12}
                          mx={2}
                          my={1}
                          bold>
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
                        style={{
                          alignItems: 'center',
                          alignContent: 'center',
                          height: 30,
                          width: 110,
                          marginRight: 3,
                          borderWidth: 2,
                          borderColor: '#8B9093',
                          borderRadius: 20,
                        }}>
                        <Text
                          color={'#8B9093'}
                          fontSize={12}
                          mx={2}
                          my={1}
                          bold>
                          Delete
                        </Text>
                      </TouchableOpacity>
                    </HStack>
                  </VStack>
                  <Spacer />
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
