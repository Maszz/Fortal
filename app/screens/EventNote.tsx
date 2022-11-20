import {
  View,
  Text,
  Box,
  HStack,
  Image,
  VStack,
  ScrollView,
  Avatar,
  Spacer,
} from 'native-base';
import {EventNoteScreenProps} from '../types';
import {FunctionComponent, useEffect, useState, useRef} from 'react';
import {
  TouchableOpacity,
  LayoutAnimation,
  Animated,
  Easing,
} from 'react-native';
import {Divider, Input} from 'native-base';
import {useGetPostListQuery} from '../redux/apis';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import {useGetEventByIdQuery} from '../redux/apis';
import {useAuth} from '../hooks/useAuth';
import {useCreatePinPostMutation, useGetPinedPostQuery} from '../redux/apis';
import {useLazyGetUserAvatarQuery} from '../redux/apis';
import {Config} from '../env';
import {useGetUserAvatarQuery} from '../redux/apis';
const EventNote: FunctionComponent<EventNoteScreenProps> = ({
  navigation,
  route,
}) => {
  const {eventId, eventChatId} = route.params;
  const [pinPostProps, setPinPostProps] = useState<{
    height: string;
  }>({height: 'auto'});
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const {
    data: pinPostData,
    isSuccess: pinPostIsSuccess,
    refetch: pinedRefetch,
  } = useGetPinedPostQuery({eventId: eventId});
  const [getAvatar, {data: avatarData}] = useLazyGetUserAvatarQuery();
  const [image, setImage] = useState<string | undefined>(undefined);
  const [createPinPost] = useCreatePinPostMutation();
  const {data, refetch} = useGetPostListQuery({
    eventId: eventId,
    offset: 0,
    limit: 10,
  });
  const {data: eventData, isSuccess: eventSuccess} =
    useGetEventByIdQuery(eventId);
  const isFocused = useIsFocused();
  const {user} = useAuth();
  useEffect(() => {
    if (isFocused) {
      refetch();
      pinedRefetch();
    }
  }, [isFocused]);
  useEffect(() => {
    console.log('dasjhkasddasghj', pinPostData);
  }, [pinPostData]);
  useEffect(() => {
    if (pinPostIsSuccess) {
      console.log('pinPostIsSuccess');
      getAvatar(pinPostData?.creator.username)
        .unwrap()
        .then(res => {
          if (res?.avarar === null) {
            setImage(undefined);
          } else {
            setImage(Config.apiBaseUrl + res?.avarar);
          }
        });
    }
  }, [pinPostIsSuccess]);
  return (
    <View flex={1} backgroundColor={'white'}>
      {/* head */}
      <Box
        flex={0.12}
        backgroundColor={'white'}
        shadow={2}
        justifyContent={'flex-end'}>
        <Box
          marginX={36}
          marginBottom={3}
          flexDirection={'row'}
          justifyContent={'space-between'}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              // width={30}
              // height={24.36}
              alt="key icon"
              source={require('../assets/back_icon.png')}
              tintColor={'#232259'}
            />
          </TouchableOpacity>
          <Text fontSize={16} color={'#232259'} fontWeight={'bold'}>
            Group note
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('EventDescriptionScreen', {eventId: eventId});
            }}>
            <Image alt="key icon" source={require('../assets/gear_icon.png')} />
          </TouchableOpacity>
        </Box>
      </Box>
      <VStack flex={1} paddingX={'7%'} marginTop={'5%'}>
        <Box>
          <HStack justifyContent={'space-between'} marginBottom={3}>
            <Text fontSize={16} color={'#232259'} fontWeight={'normal'}>
              announce
            </Text>
            <TouchableOpacity
              onPress={() => {
                // asd
                LayoutAnimation.configureNext({
                  duration: 300,
                  create: {
                    springDamping: 0.7,
                    type: 'spring',
                    property: 'scaleXY',
                  },
                  update: {
                    springDamping: 0.7,
                    type: 'spring',
                    property: 'scaleXY',
                  },
                  delete: {
                    springDamping: 0.7,
                    type: 'spring',
                    property: 'scaleXY',
                  },
                });
                if (pinPostProps.height === 'auto') {
                  setPinPostProps({height: '0%'});
                  Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 150,
                    easing: Easing.bounce,
                    useNativeDriver: true,
                  }).start();
                } else {
                  setPinPostProps({height: 'auto'});
                  Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: true,
                  }).start();
                }
              }}>
              <Image
                source={require('../assets/uparrow_icon.png')}
                style={{
                  transform: [
                    {
                      rotate:
                        pinPostProps.height === 'auto' ? '180deg' : '0deg',
                    },
                  ],
                }}
                alt={'up arrow'}
                borderRadius={5}
              />
            </TouchableOpacity>
          </HStack>

          <Animated.View style={{opacity: fadeAnim}}>
            <HStack h={pinPostProps.height}>
              <Avatar
                style={{borderColor: '#8172F7', borderWidth: 2}}
                size={'lg'}
                source={
                  image
                    ? {uri: image}
                    : require('../assets/groupAlert_icon.png')
                }
                // borderWidth={3}
                // alt={'group alert'}
              >
                <Avatar.Badge marginRight={10} mb={-1} color={'green.500'} />
              </Avatar>
              <VStack width={'100%'} marginX={5}>
                <Text fontSize={16} color={'#232259'} fontWeight={'bold'}>
                  {pinPostData ? pinPostData?.creator.username : 'username'}
                </Text>
                <Text fontSize={14} color={'#232259'} fontWeight={'normal'}>
                  {pinPostData?.EventPinedPost !== null
                    ? moment(pinPostData?.EventPinedPost.createdAt)
                        .tz('Asia/Bangkok')
                        .format('ll')
                    : ''}
                </Text>
                <Text fontSize={14} color={'#232259'} fontWeight={'normal'}>
                  {pinPostData?.EventPinedPost !== null
                    ? moment(pinPostData?.EventPinedPost.createdAt)
                        .tz('Asia/Bangkok')
                        .format('LT')
                    : ''}
                </Text>
                <Box
                  justifyItems={'center'}
                  marginTop={2}
                  borderWidth={10}
                  borderColor={'#8C84D4'}
                  borderRadius={20}
                  width={'75%'}>
                  <Text
                    textAlign={'left'}
                    paddingX={2}
                    color={'white'}
                    fontSize={16}
                    fontWeight={'normal'}
                    style={{backgroundColor: '#8C84D4'}}>
                    {pinPostData?.EventPinedPost !== null
                      ? pinPostData?.EventPinedPost.content
                      : 'no announcement now'}
                  </Text>
                </Box>
              </VStack>
            </HStack>
          </Animated.View>
        </Box>
        <Divider my={5} opacity={0} bg="black" />
        <Box>
          <Text fontSize={16} color={'#232259'} fontWeight={'normal'}>
            Post
          </Text>
          <Divider my={2} />
          {/* for Header Hstack */}
          {eventData?.creatorId === user?.username ? (
            <HStack
              // width={'100%'}
              height={35}
              justifyContent={'space-between'}
              paddingX={'2%'}>
              <TouchableOpacity
                onPress={() => {
                  // createPinPost({
                  //   eventId: eventId,
                  //   creatorUsername: user.username,
                  //   content: 'dasdasjkhdaskj',
                  // })
                  //   .unwrap()
                  //   .then(() => {
                  //     console.log('create pin post');
                  //   });
                  navigation.navigate('CreatePinPostScreen', {
                    eventChatId: eventChatId,
                    eventId: eventId,
                  });
                }}
                style={{
                  width: '45%',
                  height: '100%',
                }}>
                <HStack
                  marginTop={2}
                  paddingX={'5%'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  height={'100%'}
                  backgroundColor={'#FFEAE5'}
                  borderRadius={15}>
                  <Text fontSize={16} color={'#FFAECB'} fontWeight={'medium'}>
                    announce
                  </Text>
                  <Image
                    source={require('../assets/plus2_icon.png')}
                    alt={'plus2'}
                    tintColor={'#FFAECB'}
                  />
                </HStack>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('CreatePostScreen', {
                    eventId: eventId,
                    eventChatId: eventChatId,
                  });
                }}
                style={{width: '45%', height: '100%'}}>
                <HStack
                  marginTop={2}
                  paddingX={'5%'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  height={'100%'}
                  backgroundColor={'#D3F1FF'}
                  borderRadius={15}>
                  <Text fontSize={16} color={'#72D8FF'} fontWeight={'medium'}>
                    Post
                  </Text>
                  <Image
                    source={require('../assets/plus2_icon.png')}
                    alt={'plus2'}
                    tintColor={'#72D8FF'}
                  />
                </HStack>
              </TouchableOpacity>
            </HStack>
          ) : (
            <HStack
              // width={'100%'}
              height={35}
              justifyContent={'space-between'}
              paddingX={'2%'}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('CreatePostScreen', {
                    eventId: eventId,
                    eventChatId: eventChatId,
                  });
                }}
                style={{width: '100%', height: '100%'}}>
                <HStack
                  marginTop={2}
                  paddingX={'5%'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  height={'100%'}
                  backgroundColor={'#D3F1FF'}
                  borderRadius={15}>
                  <Text fontSize={16} color={'#72D8FF'} fontWeight={'medium'}>
                    Post
                  </Text>
                  <Image
                    source={require('../assets/plus2_icon.png')}
                    alt={'plus2'}
                    tintColor={'#72D8FF'}
                  />
                </HStack>
              </TouchableOpacity>
            </HStack>
          )}

          {/* non-Header view */}
          {/* <HStack
            width={'100%'}
            height={'4%'}
            justifyContent={'space-between'}
            paddingX={'2%'}>
            <HStack
              marginTop={2}
              paddingX={'5%'}
              alignItems={'center'}
              justifyContent={'space-between'}
              // width={'45%'}
              width={'100%'}
              height={'100%'}
              backgroundColor={'#D3F1FF'}
              borderRadius={15}>
              <Text fontSize={16} color={'#72D8FF'} fontWeight={'medium'}>
                Post
              </Text>
              <Image
                source={require('../assets/plus2_icon.png')}
                alt={'plus2'}
              />
            </HStack>
          </HStack> */}

          <ScrollView
            variant={'vertical'}
            height={pinPostProps.height === 'auto' ? '50%' : '75%'}
            mt={4}
            showsVerticalScrollIndicator={false}>
            {/* this Box is triger component of member group post */}
            {data?.map((item, index) => {
              return (
                <EventPost
                  name={item.creator}
                  message={item.content}
                  date={moment(item.createdAt).tz('Asia/Bangkok').format('LT')}
                  time={moment(item.createdAt).tz('Asia/Bangkok').format('ll')}
                  key={item.id}
                  onPress={() => {
                    navigation.navigate('CommentScreen', {
                      postId: item.id,
                    });
                  }}
                />
              );
            })}
          </ScrollView>
        </Box>
      </VStack>
    </View>
  );
};

export default EventNote;
export interface EventPostProps {
  name: string;
  date: string;
  time: string;
  message: string;
  onPress?: () => void;
}
const EventPost: FunctionComponent<EventPostProps> = ({
  name,
  time,
  date,
  message,
  onPress,
}) => {
  const {data, isLoading} = useGetUserAvatarQuery(name);
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (!isLoading) {
      if (data?.avarar === null) {
        setAvatar(undefined);
      } else {
        setAvatar(Config.apiBaseUrl + data?.avarar);
      }
    }
  }, [data]);
  return (
    <Box mt={5}>
      <HStack>
        <Avatar
          style={{borderColor: '#8172F7', borderWidth: 1}}
          size={'md'}
          source={
            avatar
              ? {uri: avatar}
              : require('../assets/profileGroupPost_icon.png')
          }
          // borderWidth={3}
        >
          <Avatar.Badge marginRight={8} mb={-1} color={'green.500'} />
        </Avatar>
        <VStack width={'100%'} marginX={5}>
          <Text fontSize={16} color={'#232259'} fontWeight={'bold'}>
            {name}
          </Text>
          <Text fontSize={14} color={'#232259'} fontWeight={'normal'}>
            {time}
          </Text>
          <Text fontSize={14} color={'#232259'} fontWeight={'normal'}>
            {date}
          </Text>
        </VStack>
      </HStack>
      <Divider my={2} opacity={0} />
      <Text
        paddingX={'5%'}
        fontSize={16}
        fontWeight={'normal'}
        numberOfLines={4}
        color={'#232259'}>
        {message}
      </Text>
      <Divider my={3} opacity={0} />
      <HStack
        flex={1}
        alignItems={'center'}
        paddingX={'5%'}
        height={35}
        width={'100%'}
        backgroundColor={'#E1E1F9'}
        borderRadius={15}>
        <HStack flex={1}>
          <Image
            source={require('../assets/smile_icon.png')}
            alt={'smile'}
            tintColor={'#9488F7'}
          />

          <Text
            fontSize={15}
            color={'#8172F7'}
            fontWeight={'normal'}
            marginLeft={'10%'}>
            1
          </Text>
        </HStack>

        <Divider
          justifyContent={'center'}
          orientation={'vertical'}
          height={5}
          bg="#9488F7"
          width={0.5}
          rounded={'full'}
        />
        <Box flex={1} justifyContent={'flex-end'}>
          <TouchableOpacity
            onPress={() => {
              if (onPress) {
                onPress();
              }

              //
            }}>
            <Text
              textAlign={'center'}
              fontSize={15}
              color={'#8172F7'}
              fontWeight={'normal'}>
              Comment
            </Text>
          </TouchableOpacity>
        </Box>
      </HStack>
    </Box>
  );
};
