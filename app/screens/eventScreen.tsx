import {
  Box,
  Text,
  View,
  // FlatList,
  HStack,
  Avatar,
  Spacer,
  KeyboardAvoidingView,
  Image,
  Input,
  ZStack,
  Pressable,
  FlatList,
} from 'native-base';
import {FunctionComponent, useState, useRef, useCallback} from 'react';
import {EventScreenProps} from '../types';
import {useChat} from '../hooks/useChat';
import {useAuth} from '../hooks/useAuth';
import {GetMessagesType} from '../hooks/useChat';
import {useEffect} from 'react';
import {
  Platform,
  Keyboard,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Animated} from 'react-native';
import {VStack} from 'native-base';
import 'moment-timezone';
import moment from 'moment';
import {useGetEventByIdQuery} from '../redux/apis';
import {useIsFocused} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import {useGetPinedPostQuery} from '../redux/apis';
const EventScreen: FunctionComponent<EventScreenProps> = ({
  navigation,
  route,
}) => {
  const {eventChatId, eventId} = route.params;
  const {user} = useAuth();
  const {data, isSuccess} = useGetEventByIdQuery(eventId);
  const {chatMessages, sendMessage, fetchMore} = useChat({
    senderName: user.username,
    eventChatId: eventChatId,
  });
  const {data: pinedPost} = useGetPinedPostQuery({eventId: eventId});
  const flatListRef = useRef<any>(null);

  const [bottom, setBottom] = useState<number | string>('4%');
  const [userInput, setUserInput] = useState<string>('');
  // const keyboardShow = (e: KeyboardEvent) => {
  //   setBottom(e.);
  // };
  const [height, setHeight] = useState<number>(0);
  useFocusEffect(
    useCallback(() => {
      const keyboardShowListener = Keyboard.addListener(
        'keyboardWillShow',
        e => {
          LayoutAnimation.easeInEaseOut();
          setHeight(e.endCoordinates.height);
          // setHeight(e.endCoordinates.height);
          setBottom(e.endCoordinates.height);
        },
      );

      const keyboardHideListener = Keyboard.addListener(
        'keyboardWillHide',
        e => {
          console.log('e', e);
          LayoutAnimation.easeInEaseOut();
          // setHeight('86%');
          setBottom('4%');
        },
      );

      return () => {
        keyboardShowListener.remove();
        keyboardHideListener.remove();
      };
    }, []),
  );
  // const [width, setWidth] = useState<number>(0);
  const CONSTANCT = ['90%', '6%', '4%'];
  // useEffect(() => {
  //   // console.log('chatMessages', chatMessages);
  // }, []);

  return (
    <View h={'100%'} backgroundColor={'white'}>
      {isSuccess ? (
        <>
          <HStack safeAreaTop pb={2} h={'10%'} justifyContent={'space-between'}>
            <TouchableOpacity
              style={{marginLeft: 30, marginBottom: 3}}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                alt="key icon"
                source={require('../assets/back_icon.png')}
              />
            </TouchableOpacity>
            <Text>{data?.name}</Text>
            <TouchableOpacity
              style={{marginRight: '7%'}}
              onPress={() => {
                navigation.navigate('EventNoteScreen', {
                  eventId: eventId,
                  eventChatId: eventChatId,
                });
              }}>
              <Text>Note</Text>
            </TouchableOpacity>
          </HStack>
          <LinearGradient
            colors={[data?.eventColors.c1, data?.eventColors.c2]}
            useAngle={true}
            angle={0}
            angleCenter={{x: 0.5, y: 0.5}}
            style={{width: '100%', height: '80%'}}>
            <Box flex={1}>
              <View h={'100%'} px={3}>
                <FlatList
                  ref={flatListRef}
                  // mb={4}
                  inverted
                  // flex={1}
                  onScroll={e => {
                    console.log('e.nativeEvent', e.nativeEvent);
                    const {layoutMeasurement, contentOffset, contentSize} =
                      e.nativeEvent;
                    if (
                      layoutMeasurement.height + contentOffset.y >=
                      contentSize.height - 20
                    ) {
                      console.log('fetch more');
                      fetchMore();
                    }
                  }}
                  scrollEventThrottle={400}
                  scrollEnabled={true}
                  data={chatMessages}
                  bottom={bottom === '4%' ? 0 : height - height * 0.08}
                  renderItem={({item}) => {
                    return (
                      <>
                        {item.senderName === user.username ? (
                          <MyMessage message={item} />
                        ) : (
                          <OtherMessage message={item} />
                        )}
                      </>
                    );
                  }}
                  keyExtractor={item => item?.id}
                />
                <HStack
                  mt={2}
                  backgroundColor={'rgba(0,0,0,0.5)'}
                  position={'absolute'}
                  alignItems={'flex-start'}
                  alignSelf={'center'}
                  paddingLeft={'5%'}
                  borderRadius={15}
                  w={'90%'}>
                  <Image
                    alignSelf={'center'}
                    style={{transform: [{scale: 0.8}]}}
                    alt="speaker_icon"
                    source={require('../assets/speaker_icon.png')}
                  />
                  <Text
                    paddingLeft={'5%'}
                    textAlign={'left'}
                    my={2}
                    fontSize={14}
                    fontWeight={400}
                    color={'white'}>
                    {pinedPost?.EventPinedPost
                      ? pinedPost?.EventPinedPost.content
                      : 'No pinned post'}
                  </Text>
                </HStack>
              </View>
            </Box>
          </LinearGradient>
          <Box
            paddingX={'5%'}
            position={'absolute'}
            bottom={bottom}
            w={'100%'}
            justifyContent={'center'}
            height={'6%'}
            backgroundColor={'white'}>
            <HStack
              // marginTop={3}
              justifyItems={'center'}
              alignItems={'center'}
              paddingX={'4%'}
              backgroundColor={'white'}
              borderRadius={'full'}
              borderColor={'#8172F7'}
              borderWidth={2}>
              <Image
                source={require('../assets/smile_icon.png')}
                alt={'smile'}
              />
              <Input
                width={'80%'}
                marginLeft={2}
                placeholder="Text hear!"
                variant={'unstyle'}
                value={userInput}
                onChangeText={text => setUserInput(text)}
              />
              <TouchableOpacity
                onPress={() => {
                  if (userInput.trim() !== '') {
                    sendMessage({
                      senderName: user.username,
                      message: userInput,
                    });
                    setUserInput('');
                  }
                }}>
                <Image
                  source={require('../assets/send_icon.png')}
                  alt={'send'}
                />
              </TouchableOpacity>
            </HStack>
          </Box>
        </>
      ) : null}
    </View>
  );
};
export interface OtherMessageProps {
  message: GetMessagesType;
}
const OtherMessage: FunctionComponent<OtherMessageProps> = ({message}) => {
  const [height, setHeight] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  return (
    <Box
      // backgroundColor={'yellow.300'}
      // height={height}

      // pl={['0', '4']}
      // pr={['0', '5']}
      mb={3}
      alignItems={'flex-start'}>
      <HStack>
        <Avatar
          style={{borderColor: 'white', borderWidth: 2}}
          size={'md'}
          source={require('../assets/human_icon.png')}
          mt={3}
          mr={2}
          // alt={'human-icon'}
        >
          <Avatar.Badge mb={-0.5} mr={8} color={'green.100'} />
        </Avatar>
        <VStack maxWidth={'77%'}>
          <Text ml={1} fontSize={12} fontWeight={'normal'}>
            {message?.senderName}
          </Text>
          <VStack w={'100%'}>
            <Box backgroundColor={'rgba(0,0,0,0.5)'} borderRadius={15}>
              <Text color={'white'} opacity={1} paddingX={2} paddingY={2}>
                {message?.message}
              </Text>
            </Box>
          </VStack>
          <Text alignSelf={'flex-end'}>
            {moment(message.date).tz('Asia/Bangkok').format('hh:mm a')}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};
export interface MyMessageProps {
  message: GetMessagesType;
}
const MyMessage: FunctionComponent<MyMessageProps> = ({message}) => {
  const [height, setHeight] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  return (
    <Box mb={3} alignItems={'flex-end'}>
      <HStack>
        <VStack maxWidth={'77%'}>
          <VStack w={'100%'}>
            <Box backgroundColor={'rgba(0,0,0,0.5)'} borderRadius={15}>
              <Text color={'white'} opacity={1} paddingX={2} paddingY={2}>
                {message?.message}
              </Text>
            </Box>
          </VStack>
          <Text alignSelf={'flex-end'}>
            {moment(message.date).tz('Asia/Bangkok').format('hh:mm a')}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};
export default EventScreen;
