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
import {FunctionComponent, useState, useRef} from 'react';
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
const EventScreen: FunctionComponent<EventScreenProps> = ({
  navigation,
  route,
}) => {
  const {eventChatId} = route.params;
  const {user} = useAuth();

  const {chatMessages, sendMessage, fetchMore} = useChat({
    senderName: user.username,
    eventChatId: eventChatId,
  });
  const flatListRef = useRef<any>(null);

  const [bottom, setBottom] = useState<number | string>('4%');
  const [userInput, setUserInput] = useState<string>('');
  // const keyboardShow = (e: KeyboardEvent) => {
  //   setBottom(e.);
  // };
  const [height, setHeight] = useState<number>(0);
  // const [width, setWidth] = useState<number>(0);
  const CONSTANCT = ['90%', '6%', '4%'];
  useEffect(() => {
    // console.log('chatMessages', chatMessages);
    const keyboardShowListener = Keyboard.addListener('keyboardWillShow', e => {
      LayoutAnimation.easeInEaseOut();
      setHeight(e.endCoordinates.height);
      // setHeight(e.endCoordinates.height);
      setBottom(e.endCoordinates.height);
    });

    const keyboardHideListener = Keyboard.addListener('keyboardWillHide', e => {
      console.log('e', e);
      LayoutAnimation.easeInEaseOut();
      // setHeight('86%');
      setBottom('4%');
    });
    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  return (
    <View h={'100%'} backgroundColor={'white'}>
      <LinearGradient
        colors={['#FEDDE0', '#8172F7']}
        useAngle={true}
        angle={0}
        angleCenter={{x: 0.5, y: 0.5}}
        style={{width: '100%', height: '90%'}}>
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
            <Box
              mt={2}
              backgroundColor={'rgba(0,0,0,0.5)'}
              position={'absolute'}
              alignItems={'center'}
              alignSelf={'center'}
              // h={10}
              borderRadius={15}
              w={'90%'}
              justifyContent={'center'}>
              <Text my={2} fontSize={12} fontWeight={400} color={'white'}>
                dasdsadsa
              </Text>
            </Box>
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
          <Image source={require('../assets/smile_icon.png')} alt={'smile'} />
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
                sendMessage({senderName: user.username, message: userInput});
                setUserInput('');
              }
            }}>
            <Image source={require('../assets/send_icon.png')} alt={'send'} />
          </TouchableOpacity>
        </HStack>
      </Box>
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
        <Image
          source={require('../assets/human_icon.png')}
          mt={3}
          mr={2}
          alt={'human-icon'}
        />
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
          <Text alignSelf={'flex-start'}>
            {moment(message.date).tz('Asia/Bangkok').format('hh:mm a')}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};
export default EventScreen;
