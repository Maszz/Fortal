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
import {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux';
import {useIsFocused} from '@react-navigation/native';
import {GetFollowerResponse} from '../../redux/apis';
import {TouchableOpacity} from 'react-native-gesture-handler';
const FriendScreen = () => {
  const {user} = useAuth();
  const [getFollowing, {data, error, isLoading}] = useGetFollowersMutation();
  const [followData, setFollowData] = useState<GetFollowerResponse[]>(
    [] as GetFollowerResponse[],
  );
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
                      {item.displayName}Taken from the Latin words "dolorem
                      ipsum", which
                    </Text>
                    <HStack mt={-1.5}>
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
                        onPress={() => {}}
                        style={{
                          alignItems: 'center',
                          alignContent: 'center',
                          height: 27,
                          width: 80,
                          marginRight: 3,
                          borderWidth: 1,
                          borderColor: '#8B9093',
                          borderRadius: 20,
                        }}>
                        <Text
                          color={'#8B9093'}
                          fontSize={12}
                          mx={2}
                          my={1}
                          fontWeight={'normal'}>
                          Remove
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
