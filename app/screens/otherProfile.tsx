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
  Center,
  Divider,
} from 'native-base';
import {OtherProfileScreenProps} from '../types';
import {FunctionComponent, useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {TabRouter} from '@react-navigation/native';
import {Heading} from 'native-base';
import {useGetSearchItemUserByUsernameMutation} from '../redux/apis/SearchApi';
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
  const [getUser, {data, isSuccess}] = useGetSearchItemUserByUsernameMutation();
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // console.log('User', user);
    dispatch(setLoadingAction(true));
    if (!isMounted) {
      getUser(userId);
      setIsMounted(true);
    }
    if (isSuccess) {
      dispatch(setLoadingAction(false));
    }
  }, [isSuccess]);
  return (
    <View flex={10} backgroundColor={'white'} paddingX={5}>
      <Box flex={3} paddingY={5}>
        <ZStack flex={1}>
          <LinearGradient
            colors={['#FEDDE0', '#8172F7']}
            useAngle={true}
            angle={0}
            angleCenter={{x: 0.5, y: 0.5}}
            style={{width: '100%', height: '90%', borderRadius: 20}}
          />
          <Box
            flex={1}
            flexDirection={'row'}
            marginTop={10}
            justifyContent={'space-between'}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                marginLeft={4}
                alt="key icon"
                source={require('../assets/back_icon.png')}
                tintColor={'white'}
              />
            </TouchableOpacity>
            <Spacer />
          </Box>
        </ZStack>
      </Box>
      <Box flex={1.5} marginTop={'-30%'} opacity={1} flexDirection={'row'}>
        <Image
          borderColor={'#8172F7'}
          borderWidth={4}
          borderRadius={'full'}
          marginLeft={4}
          alt="key icon"
          source={require('../assets/wonyoung_icon.png')}
          style={{
            transform: [{rotate: '-90deg'}],
          }}
        />
      </Box>
      <Box
        paddingTop={5}
        paddingX={5}
        flex={1}
        // backgroundColor={'blue.100'}
        flexDirection={'row'}
        justifyContent={'space-between'}>
        {/* 1 prop but 3 sata such as joied event follower followinf */}
        {/* each component has 2 similars prop are number(int) and name(string) */}
        {/* box 1 */}
        <Box>
          <Center>
            <Text fontSize={16} fontWeight={'normal'}>
              1
            </Text>
            <Text fontSize={16} fontWeight={'normal'}>
              Joined event
            </Text>
          </Center>
        </Box>
        {/* box 2 */}
        <Box>
          <Center>
            <Text fontSize={16} fontWeight={'normal'}>
              {data?._count.followedBy}
            </Text>
            <Text fontSize={16} fontWeight={'normal'}>
              Follower
            </Text>
          </Center>
        </Box>
        {/* box 3 */}
        <Box>
          <Center>
            <Text fontSize={16} fontWeight={'normal'}>
              {data?._count.following}
            </Text>
            <Text fontSize={16} fontWeight={'normal'}>
              Following
            </Text>
          </Center>
        </Box>
      </Box>
      <Box flex={2.1} marginX={5}>
        <Text fontSize={32} fontWeight={'bold'}>
          {data?.username}
        </Text>
        <Box flexDirection={'row'} justifyContent={'space-between'}>
          <Text fontSize={14} fontWeight={'normal'} color={'#8B9093'}>
            {data?.profile?.displayName || 'no nickname set yet.'}
          </Text>
          <Box flexDirection={'row'}>
            <Text fontSize={14} fontWeight={'normal'} color={'#8B9093'}>
              rating
            </Text>
            <Image
              marginLeft={5}
              alignSelf={'center'}
              alt="key icon"
              source={require('../assets/star_icon.png')}
            />
          </Box>
        </Box>
        <Divider my={2} opacity={0} />
        <Text
          textAlign={'justify'}
          fontSize={14}
          fontWeight={'normal'}
          numberOfLines={4}
          color={'#232259'}>
          {data?.profile?.bio || 'No bio'}
        </Text>
      </Box>
      <Box flex={1.2} paddingX={2} marginBottom={'30%'}>
        <Text fontSize={12} fontWeight={'normal'}>
          interested event
        </Text>
        <Divider my={2} opacity={0} />
        {/* tag loop */}
        <VStack flex={1}>
          <HStack flex={1} w={'100%'} flexWrap={'wrap'}>
            {data?.categories.map((interest: string, index: number) => {
              return (
                <Box
                  key={index}
                  borderRadius={'full'}
                  height={25}
                  minWidth={45}
                  mr={2}
                  justifyContent={'center'}
                  alignContent={'center'}
                  paddingX={2}
                  mb={2}
                  // get input color props
                  backgroundColor={'salmon'}>
                  <Text
                    textAlign={'center'}
                    fontSize={10}
                    fontWeight={'normal'}
                    tintColor={'bluegray.500'}
                    opacity={0.8}
                    //   get text tittle props
                  >
                    #{interest}
                  </Text>
                </Box>
              );
            })}
          </HStack>
        </VStack>
      </Box>
    </View>
  );
};

export default OtherProfileScreen;

export const TagButton = ({text, color}: any) => {
  return (
    <Container mr={2} mb={2}>
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
