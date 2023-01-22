import {
  View,
  Text,
  Box,
  Image,
  VStack,
  HStack,
  TextArea,
  Spacer,
  Divider,
  KeyboardAvoidingView,
  Avatar,
} from 'native-base';
import {FunctionComponent, useState} from 'react';
import {CreatePostScreenProps} from '../types';
import {
  TouchableOpacity,
  LayoutAnimation,
  Animated,
  Easing,
} from 'react-native';
import {useAuth} from '../hooks/useAuth';
import {useCreatePostMutation} from '../redux/apis';
import {CreatePinPostProps} from '../types/App.type';
import {useCreatePinPostMutation} from '../redux/apis';
import {useGetUserAvatarQuery} from '../redux/apis';

const CreatePinPostScreen: FunctionComponent<CreatePinPostProps> = ({
  navigation,
  route,
}) => {
  const {user} = useAuth();
  const {eventId, eventChatId, creatorImage} = route.params;
  const [userInput, setUserInput] = useState<string>('');
  const [createPinPost] = useCreatePinPostMutation();

  console.log('creatorImage', creatorImage);
  return (
    <View flex={1} backgroundColor={'white'}>
      <Box
        h={'12%'}
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
              width={30}
              height={24.36}
              alt="key icon"
              source={require('../assets/back_icon.png')}
              tintColor={'#232259'}
            />
          </TouchableOpacity>
          <Text fontSize={16} color={'#232259'} fontWeight={'bold'}>
            My post
          </Text>
          <Image alt="key icon" source={require('../assets/paper_icon.png')} />
        </Box>
      </Box>
      <HStack paddingX={'7%'} paddingTop={5}>
        <Avatar
          style={{borderColor: '#8172F7', borderWidth: 3}}
          size={'lg'}
          source={
            creatorImage
              ? {uri: creatorImage}
              : require('../assets/groupAlert_icon.png')
          }
          // borderWidth={3}
          // alt={'group alert'}
        />
        <VStack width={'100%'} marginX={5}>
          <Text fontSize={16} color={'#232259'} fontWeight={'bold'}>
            {user?.username}
          </Text>
        </VStack>
      </HStack>
      <TextArea
        flex={1}
        alignSelf={'center'}
        justifyItems={'center'}
        marginTop={3}
        borderWidth={1}
        borderColor={'#99AAD4'}
        borderTopRadius={20}
        borderBottomRadius={0}
        autoCompleteType={'off'}
        width={'90%'}
        textAlign={'left'}
        paddingX={3}
        paddingY={2}
        color={'#232259'}
        fontSize={16}
        fontWeight={'normal'}
        focusOutlineColor={'#8C84D4'}
        placeholder={'What is on your mind?'}
        value={userInput}
        onChangeText={text => {
          setUserInput(text);
        }}
      />
      <KeyboardAvoidingView
        // flex={0.95}
        behavior={'padding'}
        keyboardVerticalOffset={0}>
        {/* <Divider my={'5%'} opacity={0} /> */}
        <HStack
          // flex={1}

          borderBottomRadius={15}
          alignItems={'center'}
          // justifyContent={'space-between'}
          justifyContent={'center'}
          // width={'90%'}
          height={35}
          backgroundColor={'#E1E1F9'}
          style={{
            width: '90%',
            height: 35,
            alignSelf: 'center',
          }}>
          {/* <TouchableOpacity style={{width: '50%'}}>
          <Text
            textAlign={'center'}
            color={'#8172F7'}
            fontWeight={'medium'}
            fontSize={15}>
            Cancle
          </Text>
        </TouchableOpacity>
        <Divider
          orientation={'vertical'}
          height={5}
          backgroundColor={'#9488F7'}
          rounded={'full'}
        /> */}
          <TouchableOpacity
            style={{width: '50%'}}
            onPress={() => {
              console.log('post');
              createPinPost({
                eventId: eventId,
                content: userInput,
                creatorUsername: user?.username,
              })
                .unwrap()
                .then(() => {
                  navigation.goBack();
                });
            }}>
            <Text
              textAlign={'center'}
              color={'#8172F7'}
              fontWeight={'medium'}
              fontSize={15}>
              Save
            </Text>
          </TouchableOpacity>
        </HStack>
        {/* <TouchableOpacity
        style={{
          width: '87%',
          height: 35,
          alignSelf: 'center',
        }}>
        <Box
          flex={1}
          width={'100%'}
          height={35}
          backgroundColor={'#E1E1F9'}
          borderRadius={15}></Box>
      </TouchableOpacity> */}
      </KeyboardAvoidingView>
      <Divider my={'5%'} opacity={0} />
    </View>
  );
};
export default CreatePinPostScreen;
