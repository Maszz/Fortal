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
  KeyboardAvoidingView,
  FlatList,
  Center,
} from 'native-base';
import {FunctionComponent, useState} from 'react';
import {CommentScreenProps} from '../types';
import {TextArea, Input} from 'native-base';
import {Touchable} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useGetCommentListQuery} from '../redux/apis';
import moment from 'moment';
import {useCreateCommentMutation} from '../redux/apis';
import {useAuth} from '../hooks/useAuth';
import {useGetUserAvatarQuery} from '../redux/apis';
import {useEffect} from 'react';
import {Config} from '../env';
const CommentScreen: FunctionComponent<CommentScreenProps> = ({
  route,
  navigation,
}) => {
  const [height, setHeight] = useState(30);
  const [isMount, setIsMount] = useState(false);

  const {postId} = route.params;
  const {data, isSuccess, refetch} = useGetCommentListQuery({
    postId: postId,
    offset: 0,
    limit: 10,
  });
  const {user} = useAuth();
  const [createComment] = useCreateCommentMutation();
  const [userInput, setUserInput] = useState<string>('');
  return (
    <KeyboardAvoidingView
      flex={1}
      behavior={'padding'}
      keyboardVerticalOffset={height}>
      <View flex={1} backgroundColor={'white'}>
        <HStack paddingTop={'5%'} paddingX={'6%'}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image alt="key icon" source={require('../assets/exit_icon.png')} />
          </TouchableOpacity>

          <Text marginLeft={'33%'} fontSize={16} bold color={'#232259'}>
            Comments
          </Text>
        </HStack>
        <Divider my={1.2} opacity={0} />
        <FlatList
          data={data}
          renderItem={({item}) => <CommentCard item={item} />}
        />

        <Box
          // height={'auto'}

          // minHeight={'10%'}
          // maxHeight={'95%'}
          width={'100%'}
          backgroundColor={'white'}
          shadow={2}
          position={'absolute'}
          bottom={0}>
          <HStack
            onLayout={e => {
              if (!isMount) {
                setHeight(e.nativeEvent.layout.height);
                setIsMount(true);
              }
            }}
            marginTop={'3%'}
            paddingTop={2}
            paddingBottom={1}
            paddingX={'3%'}
            marginBottom={10}
            alignSelf={'center'}
            justifyContent={'space-between'}
            width={'90%'}
            borderRadius={'3xl'}
            borderWidth={2}
            borderColor={'#8172F7'}>
            <TouchableOpacity>
              <Image
                alt="key icon"
                source={require('../assets/smile_icon.png')}
              />
            </TouchableOpacity>
            <Input
              color={'#232259'}
              fontSize={15}
              fontWeight={'normal'}
              height={height}
              w={'85%'}
              value={userInput}
              multiline={true}
              variant={'unstyled'}
              onChangeText={text => {
                setUserInput(text);
              }}
              onContentSizeChange={e => {
                if (e.nativeEvent.contentSize.height < 85) {
                  setHeight(Math.max(35, e.nativeEvent.contentSize.height));
                  console.log(e.nativeEvent);
                }
              }}
            />
            {/* <TextArea
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
          /> */}
            <TouchableOpacity
              onPress={() => {
                createComment({
                  postId: postId,
                  content: userInput,
                  creatorUsername: user.username,
                })
                  .unwrap()
                  .then(() => {
                    setUserInput('');
                    setHeight(35);
                    refetch();
                  });
              }}>
              <Image
                alt="key icon"
                source={require('../assets/send_icon.png')}
              />
            </TouchableOpacity>
          </HStack>
        </Box>
      </View>
    </KeyboardAvoidingView>
  );
};

const CommentCard = ({
  item,
}: {
  item: {
    id: string;
    content: string;
    creator: string;
    createdAt: Date;
  };
}) => {
  const {data, isLoading} = useGetUserAvatarQuery(item.creator);
  const [image, setImage] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (!isLoading) {
      console.log('dasiodsa', data);
      if (data?.avatar === null) {
        setImage(undefined);
      } else {
        setImage(Config.apiBaseUrl + data?.avatar);
      }
    }
  }, [isLoading]);
  return (
    <HStack
      paddingTop={3}
      borderBottomWidth={1}
      borderBottomColor={'#D9D9D9'}
      marginX={'7%'}>
      <Avatar
        w={60}
        h={60}
        source={
          image ? {uri: image} : require('../assets/profileGroupPost_icon.png')
        }
        borderColor={'#8172F7'}
        borderWidth={4}
        borderRadius={'full'}
      />
      <VStack flex={1} marginLeft={5} paddingTop={1} paddingRight={'5%'}>
        <Text fontSize={16} bold color={'#232259'}>
          {item.creator}
        </Text>
        <Text color={'#232259'} fontWeight={'light'} fontSize={14}>
          {moment(item.createdAt).format('YYYY-MM-DD HH:mm')}
        </Text>
        <Divider my={1} opacity={0} />
        <Text fontSize={16} fontWeight={'normal'} color={'#232259'}>
          {item.content}
        </Text>
        <Divider my={0.3} opacity={0} />
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
  );
};
export default CommentScreen;
