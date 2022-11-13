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
                borderBottomColor={'#8B9093'}>
                <HStack space={[2, 3]} justifyContent="space-between">
                  <Avatar
                    borderColor={'#8172F7'}
                    borderWidth={2}
                    size="60px"
                    // source={{
                    //   uri: item.avatarUrl,
                    // }}
                  />
                  <VStack marginLeft={2} w={'75%'}>
                    <HStack justifyContent={'space-between'}>
                      <Text color="#232259" bold fontSize={12}>
                        {item.username}
                      </Text>
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
                          alignContent: 'center',
                          alignSelf: 'center',
                          alignItems: 'center',
                          height: 30,
                          width: 100,
                          // marginRight: 3,
                          borderWidth: 1.5,
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
                    <Text
                      textAlign={'left'}
                      width={'60%'}
                      numberOfLines={2}
                      ellipsizeMode={'tail'}
                      minHeight={10}
                      mt={-2}
                      color={'#232259'}
                      fontSize={14}
                      fontWeight={'normal'}>
                      {item.bio || 'No bio'}
                    </Text>
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
export default RequestScreen;
