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
import {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux';
const RequestScreen = () => {
  const {user} = useAuth();
  const [getFollow, {data, error, isLoading}] = useGetFollowingMutation();
  const navigation = useSelector<
    RootState,
    RootState['navigation']['stackNavigation']
  >(state => state.navigation.stackNavigation);
  useEffect(() => {
    getFollow(user.username);
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
