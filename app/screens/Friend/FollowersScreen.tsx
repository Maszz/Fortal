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
import {useGetFollowersMutation} from '../../redux/apis';
import {useAuth} from '../../hooks/useAuth';
import {FunctionComponent, useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux';
import {useIsFocused} from '@react-navigation/native';
import {GetFollowerResponse} from '../../redux/apis';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useRemoveFollowerByIdMutation} from '../../redux/apis';
import {FollowersScreenProps} from './index';
const FriendScreen: FunctionComponent<FollowersScreenProps> = ({route}) => {
  const {refetch} = route.params;
  const {user} = useAuth();
  const [getFollowing, {data, error, isLoading}] = useGetFollowersMutation();
  const [followData, setFollowData] = useState<GetFollowerResponse[]>(
    [] as GetFollowerResponse[],
  );
  const [removeFollwer, args] = useRemoveFollowerByIdMutation();
  const navigation = useSelector<
    RootState,
    RootState['navigation']['stackNavigation']
  >(state => state.navigation.stackNavigation);
  const isFocused = useIsFocused();
  useEffect(() => {
    getFollowing(user.username);
  }, []);
  useEffect(() => {
    if (isFocused) {
      getFollowing(user.username);
    }
  }, [isFocused]);
  useEffect(() => {
    if (data) {
      setFollowData(data);
    }
  }, [data]);
  return (
    <View flex={1} backgroundColor={'white'} paddingX={'7%'} paddingTop={3}>
      <FlatList
        data={followData}
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
                      <Text
                        color="#232259"
                        bold
                        fontSize={12}
                        w={'50%'}
                        numberOfLines={1}>
                        {item.username}
                      </Text>
                      <Spacer />
                      <TouchableOpacity
                        onPress={() => {
                          console.log(item.id);
                          removeFollwer({
                            userId: user.id,
                            followerId: item.id,
                          })
                            .unwrap()
                            .then(() => {
                              refetch();
                              getFollowing(user.username);
                            });
                        }}
                        style={{
                          alignContent: 'center',
                          alignSelf: 'flex-end',
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
                          Remove
                        </Text>
                      </TouchableOpacity>
                    </HStack>
                    <Text
                      textAlign={'left'}
                      width={'60%'}
                      numberOfLines={2}
                      ellipsizeMode={'tail'}
                      minHeight={10}
                      color={'#232259'}
                      marginTop={-2}
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
export default FriendScreen;

// export const a = () => {
//   return (
//     <Pressable
//       onPress={() => {
//         navigation.navigate('OtherProfileScreen', {
//           userId: item.username,
//         });
//       }}>
//       <Box
//         pl={['0', '4']}
//         pr={['0', '5']}
//         py="2"
//         marginTop={3}
//         borderBottomWidth={1}
//         borderBottomColor={'#8B9093'}>
//         <HStack space={[2, 3]} justifyContent="space-between">
//           <Avatar
//             borderColor={'#8172F7'}
//             borderWidth={2}
//             size="56px"
//             // source={{
//             //   uri: item.avatarUrl,
//             // }}
//           />
//           <VStack marginLeft={2} w={'70%'}>
//             <Text color="#232259" bold fontSize={12} mb={1}>
//               {item.username}
//             </Text>
//             <Text
//               color="#232259"
//               fontSize={12}
//               fontWeight={'normal'}
//               numberOfLines={2}
//               ellipsizeMode={'tail'}
//               textAlign={'justify'}>
//               {item.displayName}Taken from the Latin words "dolorem ipsum",
//               which
//             </Text>
//           </VStack>

//           <Spacer />
//           <Text
//             fontSize="xs"
//             _dark={{
//               color: 'warmGray.50',
//             }}
//             color="coolGray.800"
//             alignSelf="flex-start">
//             {item.displayName}
//           </Text>
//         </HStack>
//       </Box>
//     </Pressable>
//   );
// };
