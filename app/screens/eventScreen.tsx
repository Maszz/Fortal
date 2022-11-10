import {
  Box,
  Text,
  View,
  FlatList,
  HStack,
  Avatar,
  Spacer,
  KeyboardAvoidingView,
  Image,
  Input,
  ZStack,
} from 'native-base';
import {FunctionComponent, useState} from 'react';
import {EventScreenProps} from '../types';
import {useChat} from '../hooks/useChat';
import {useAuth} from '../hooks/useAuth';
import {GetMessagesType} from '../hooks/useChat';
import {useEffect} from 'react';
import {Platform, Keyboard, LayoutAnimation} from 'react-native';
const EventScreen: FunctionComponent<EventScreenProps> = ({
  navigation,
  route,
}) => {
  const {user} = useAuth();

  const {chatMessages, sendMessage, fetchMore} = useChat({
    senderName: user.username,
    eventChatId: '6362be816cee68aec77765e4',
  });
  const [bottom, setBottom] = useState<number | string>('4%');
  // const keyboardShow = (e: KeyboardEvent) => {
  //   setBottom(e.);
  // };
  const [height, setHeight] = useState<number>(0);

  const CONSTANCT = ['90%', '6%', '4%'];
  useEffect(() => {
    // console.log('chatMessages', chatMessages);
    const keyboardShowListener = Keyboard.addListener('keyboardWillShow', e => {
      console.log('will show', e);
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
    <Box flex={1} backgroundColor={'blue.200'}>
      <View h={'90%'} px={3}>
        <FlatList
          // mb={4}
          backgroundColor={'coolGray.300'}
          data={chatMessages}
          bottom={bottom === '4%' ? 0 : height - height * 0.08}
          renderItem={({item}) => {
            return (
              <>
                {item.senderName === user.username ? (
                  <Box
                    pl={['0', '4']}
                    pr={['0', '5']}
                    alignItems={'flex-end'}
                    py="2">
                    <Text>
                      {item?.senderName}: {item?.message}
                    </Text>
                  </Box>
                ) : (
                  <OtherMessage message={item} />
                )}
              </>
            );
          }}
          keyExtractor={item => item?.id}
        />
      </View>
      <Box
        position={'absolute'}
        bottom={bottom}
        w={'100%'}
        justifyContent={'center'}
        height={'6%'}
        backgroundColor={'blue.200'}>
        <Input marginLeft={2} placeholder="Text hear!" variant={'rounded'} />
      </Box>
    </Box>
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
      height={height}
      onLayout={e => {
        // console.log('e', e.nativeEvent.layout);
        if (!isMounted) {
          console.log('e', e.nativeEvent.layout);
          setHeight(e.nativeEvent.layout.height);
          setIsMounted(true);
        }
        // setHeight(e.nativeEvent.layout.height);
      }}
      pl={['0', '4']}
      pr={['0', '5']}
      alignItems={'flex-start'}
      py="2">
      <ZStack
        backgroundColor={'fuchsia.200'}
        height={height}
        maxWidth={'77%'}
        flexWrap={'wrap'}
        flex={1}>
        <Box
          borderRadius={15}
          borderWidth={6}
          borderColor={'black'}
          opacity={0.5}
          marginY={1}>
          <Text
            paddingLeft={3}
            color={'white'}
            style={{
              backgroundColor: 'black',
            }}>
            <Text opacity={0}>
              {message?.senderName}: {message?.message}{' '}
              gasdhjgdsajhdsagjhasdkgsdakjhgdsa
            </Text>
          </Text>
        </Box>

        <Text color={'white'} opacity={1} paddingX={2} paddingY={2}>
          {message?.senderName}: {message?.message}{' '}
          gasdhjgdsajhdsagjhasdkgsdakjhgdsa
        </Text>
      </ZStack>
    </Box>
  );
};
export default EventScreen;
