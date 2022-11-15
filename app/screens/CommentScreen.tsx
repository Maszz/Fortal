import {
  View,
  Text,
  HStack,
  VStack,
  Image,
  Spacer,
  ScrollView,
  Divider,
  Box,
  Avatar,
} from 'native-base';
import {FunctionComponent, useState} from 'react';
import {CommentScreenProps} from '../types';
import {TextArea, Input} from 'native-base';
import {Touchable} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
const CommentScreen: FunctionComponent<CommentScreenProps> = () => {
  const [height, setHeight] = useState(30);
  return (
    <View flex={1} backgroundColor={'white'}>
      <HStack paddingTop={'7%'} paddingX={'6%'}>
        <Image alt="key icon" source={require('../assets/exit_icon.png')} />
        <Text alignSelf={'center'}>Comments</Text>
      </HStack>
      <Divider my={3} opacity={0} />
      <ScrollView variant={'vertical'} paddingX={'6%'}>
        <HStack borderBottomWidth={1} borderBottomColor={'#D9D9D9'}>
          <Image source={require('../assets/profileGroupPost_icon.png')} />
          <VStack flex={1} marginLeft={5} paddingTop={1} paddingRight={'5%'}>
            <Text fontSize={16} bold color={'#232259'}>
              John Doe
            </Text>
            <Text color={'#232259'} fontWeight={'light'} fontSize={14}>
              Date | time
            </Text>
            <Divider my={1} opacity={0} />
            <Text fontSize={16} fontWeight={'normal'} color={'#232259'}>
              Comments fjnsdkjfnkfncksnfcksnckjsdnkcnsdjnsdkcnkdnjsckn,nc,anc
              skdhnckashnxkahnxk
            </Text>
            <Divider my={1.5} opacity={0} />
            <HStack justifyContent={'flex-end'}>
              <Text>1</Text>
              <Image
                marginLeft={'10%'}
                alt="key icon"
                tintColor={'#99AAD4'}
                style={{transform: [{scale: 0.9}]}}
                source={require('../assets/smile_icon.png')}
              />
            </HStack>
            <Divider my={2} opacity={0} />
          </VStack>
        </HStack>
      </ScrollView>
      <Box
        height={'auto'}
        width={'100%'}
        backgroundColor={'white'}
        shadow={2}
        justifyContent={'flex-end'}>
        <HStack
          height={'auto'}
          marginTop={'3%'}
          marginBottom={'10%'}
          paddingTop={'2%'}
          paddingBottom={'1%'}
          paddingX={'4%'}
          alignSelf={'center'}
          justifyContent={'space-between'}
          width={'90%'}
          borderRadius={20}
          borderWidth={2}
          borderColor={'#8172F7'}>
          <Image alt="key icon" source={require('../assets/smile_icon.png')} />
          <TextArea
            // flex={1}
            variant={'unstyled'}
            // marginX={'1%'}
            alignSelf={'center'}
            justifyItems={'center'}
            borderColor={'white'}
            width={'80%'}
            // maxWidth={'90%'}
            // height={height}
            // height={'5%'}
            textAlign={'left'}
            // paddingX={2}
            paddingY={2}
            fontSize={16}
            fontWeight={'normal'}
            focusOutlineColor={'#8C84D4'}
            placeholder={'What is on your mind?'}
            onContentSizeChange={e => {
              setHeight(e.nativeEvent.contentSize.height);
            }}
            // value={userInput}
            // onChangeText={text => {
            //   setUserInput(text);
            // }}
          />
          <TouchableOpacity>
            <Image alt="key icon" source={require('../assets/send_icon.png')} />
          </TouchableOpacity>
        </HStack>
      </Box>
    </View>
  );
};
export default CommentScreen;
