import {
  View,
  Text,
  Box,
  HStack,
  Image,
  Spacer,
  ZStack,
  Circle,
  VStack,
  Button,
  Skeleton,
  Container,
  Pressable,
  Stack,
} from 'native-base';
import {OtherProfileScreenProps} from '../types';
import {FunctionComponent, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {TabRouter} from '@react-navigation/native';
import {Heading} from 'native-base';
import {useGetSearchItemUserByUsernameQuery} from '../redux/apis/SearchApi';
import {setLoadingAction} from '../redux/reducers/navigation';
import {useDispatch} from 'react-redux';
import {StyleSheet, TouchableOpacity, TouchableHighlight} from 'react-native';
const OtherProfileScreen: FunctionComponent<OtherProfileScreenProps> = ({
  route,
  navigation,
}) => {
  //   if (loading) return <Loading />;
  //   if (error) return <Error />;
  const {userId} = route.params;
  const {data: user, isSuccess} = useGetSearchItemUserByUsernameQuery(userId);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('User', user);
    dispatch(setLoadingAction(true));

    if (isSuccess) {
      dispatch(setLoadingAction(false));
    }
  }, [user]);
  return (
    <View w={'100%'} backgroundColor={'white'} h={'100%'}>
      <VStack mx={4}>
        <ZStack
          mt={3}
          position={'relative'}
          display={'flex'}
          flexDirection={'column'}
          h={235}>
          <Box
            position={'absolute'}
            top={0}
            w={'100%'}
            h={220}
            backgroundColor={'amber.200'}
            rounded={'3xl'}
          />
          <HStack
            w={'100%'}
            paddingBottom={3}
            marginTop={10}
            // alignItems={'center'}

            justifyContent={'space-between'}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                marginLeft={10}
                marginBottom={3}
                alt="key icon"
                source={require('../assets/back_icon.png')}
              />
            </TouchableOpacity>
            <Spacer />
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                marginBottom={3}
                marginRight={10}
                alt="settingIcon"
                source={require('../assets/setting_icon.png')}
              />
            </TouchableOpacity>
          </HStack>
          <Circle
            size="120px"
            bg="secondary.400"
            // alignSelf={'flex-end'}
            position={'absolute'}
            left={5}
            top={160}
          />
        </ZStack>
        <HStack justifyContent={'flex-end'}>
          <Button
            variant={'outline'}
            rounded={'2xl'}
            borderWidth={2}
            borderColor={'#8172F7'}
            width={100}>
            <Text color={'#8172F7'}>Add friend</Text>
          </Button>
          <Button
            variant={'outline'}
            rounded={'2xl'}
            ml={6}
            mr={5}
            borderWidth={2}
            borderColor={'#8172F7'}
            width={60}>
            <Image source={require('../assets/dm_icon.png')} alt={'dm'} />
          </Button>
        </HStack>
        <HStack justifyContent={'space-around'} mt={8}>
          <VStack alignItems={'center'}>
            <Text>000</Text>
            <Text>Joined Event</Text>
          </VStack>
          <VStack alignItems={'center'}>
            <Text>000</Text>
            <Text>Follower</Text>
          </VStack>
          <VStack alignItems={'center'}>
            <Text>000</Text>
            <Text>Following</Text>
          </VStack>
        </HStack>
        <VStack mx={5} mt={5}>
          <Text fontWeight={'bold'} fontSize={'32'}>
            {user ? user.profile?.name || 'Name' : 'Name'}
          </Text>
          <Text color={'#8B9093'} fontSize={'14'}>
            {user ? user.username || 'username' : 'username'}
          </Text>
          <Text fontWeight={'normal'} fontSize={'14'} mt={5}>
            {user
              ? user.profile?.bio ||
                `Taken from the Latin words "dolorem ipsum", which translates to"pain itself", Lorem Ipsum text saw a revival in the mid-20th
            century as`
              : 'No bio'}
          </Text>
          {/* <Text color={'black'}>{route.params.userId}</Text> */}
        </VStack>
        <Text fontSize={'12'} fontWeight={'normal'} mt={10}>
          Interested
        </Text>
        <VStack>
          <HStack mt={5} flexWrap={'wrap'} w={'95%'}>
            {user
              ? user.categories.map((category, index) => (
                  <TagButton text={category} color={'#cdcdcd'} />
                ))
              : null}
          </HStack>
          {/* <HStack>
            <Text>dasdsa</Text>
          </HStack> */}
        </VStack>

        {/* <TagButton text={'asdfasdasd'} /> */}
      </VStack>
    </View>
  );
};

export default OtherProfileScreen;

export const TagButton = ({text, color}: any) => {
  return (
    <Container mr={2} my={1}>
      <TouchableOpacity
        onPress={() => {}}
        style={{
          backgroundColor: color,
          paddingVertical: 7,
          paddingHorizontal: 10,
          borderRadius: 20,
          minWidth: 45,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text rounded={'full'} fontSize={'10px'}>
          {text}
        </Text>
      </TouchableOpacity>
    </Container>
  );
};
