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
} from 'native-base';
import {useGetFollowingMutation} from '../../redux/apis';
import {useAuth} from '../../hooks/useAuth';
import {useEffect, useState, FunctionComponent} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux';
import {TouchableOpacity} from 'react-native';
import {useUnFollowingByIdMutation} from '../../redux/apis';
import {GetFollowerResponse} from '../../redux/apis';
import {useIsFocused} from '@react-navigation/native';
import {FollowingScreenProps} from '.';

const RequestScreen: FunctionComponent<FollowingScreenProps> = ({route}) => {
  const {refetch} = route.params;
  const {user} = useAuth();
  const [getFollow, {data, error, isLoading}] = useGetFollowingMutation();
  const [getFollowBuffer, setGetFollowBuffer] = useState<GetFollowerResponse[]>(
    [] as GetFollowerResponse[],
  );
  const [unFollowingById, arg] = useUnFollowingByIdMutation();
  const isFocused = useIsFocused();
  const navigation = useSelector<
    RootState,
    RootState['navigation']['stackNavigation']
  >(state => state.navigation.stackNavigation);
  useEffect(() => {
    getFollow(user.username);
  }, []);
  useEffect(() => {
    if (isFocused) {
      getFollow(user.username);
    }
  }, [isFocused]);
  useEffect(() => {
    if (data) {
      setGetFollowBuffer(data);
    }
  }, [data]);
  return (
    <View flex={1} backgroundColor={'white'} paddingX={'7%'} paddingTop={3}>
      <FlatList
        data={getFollowBuffer}
        renderItem={({item}) => {
          return (
            <Pressable
              onPress={() => {
                navigation.navigate('OtherProfileScreen', {
                  userId: item.username,
                });
              }}>
              <Box
                pl={['0', '4']}
                pr={['0', '5']}
                py="4"
                borderBottomWidth={1}
                borderBottomColor={'#8B9093'}
                height={105}>
                <HStack space={[2, 3]} justifyContent="space-between">
                  <Avatar
                    borderColor={'#8172F7'}
                    borderWidth={2}
                    size="56px"
                    // source={{
                    //   uri: item.avatarUrl,
                    // }}
                  />
                  <VStack marginLeft={2} w={'70%'}>
                    <Text color="#232259" bold fontSize={12} mb={1}>
                      {item.username}
                    </Text>
                    <Text
                      color="#232259"
                      fontSize={12}
                      fontWeight={'normal'}
                      numberOfLines={2}
                      ellipsizeMode={'tail'}
                      textAlign={'justify'}>
                      {item.displayName}Taken from the Latin words
                      "doloremasdasddasdsa
                    </Text>
                    <HStack backgroundColor={'amber.200'}>
                      <TouchableOpacity
                        onPress={() => {
                          // none event happened
                        }}
                        style={{
                          alignItems: 'center',
                          alignContent: 'center',
                          height: 27,
                          width: 80,
                          marginRight: '38%',
                          borderWidth: 0,
                          borderColor: '#8172F7',
                          borderRadius: 20,
                        }}>
                        <Text
                          opacity={0}
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
                          console.log(item.id);
                          unFollowingById({
                            followerId: user.id,
                            unfollowingId: item.id,
                          })
                            .unwrap()
                            .then(() => {
                              getFollow(user.username);
                              refetch();
                            });
                        }}
                        style={{
                          alignItems: 'center',
                          alignContent: 'center',
                          height: 27,
                          width: 80,
                          marginRight: 3,
                          borderWidth: 1,
                          borderColor: '#99AAD4',
                          borderRadius: 20,
                        }}>
                        <Text
                          color={'#99AAD4'}
                          fontSize={12}
                          mx={2}
                          my={1}
                          fontWeight={'normal'}>
                          Unfollow
                        </Text>
                      </TouchableOpacity>
                    </HStack>
                  </VStack>
                  <Spacer />
                  <Text
                    fontSize="xs"
                    _dark={{
                      color: 'warmGray.50',
                    }}
                    color="coolGray.800"
                    alignSelf="flex-start">
                    {item.displayName}
                  </Text>
                </HStack>
              </Box>
            </Pressable>
          );
        }}
      />
    </View>
  );
};
export default RequestScreen;
