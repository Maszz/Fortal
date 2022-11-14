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
} from 'native-base';
import {FunctionComponent} from 'react';
import {CreatePostScreenProps} from '../types';
import {
  TouchableOpacity,
  LayoutAnimation,
  Animated,
  Easing,
} from 'react-native';
const CreatePostScreen: FunctionComponent<CreatePostScreenProps> = ({
  navigation,
}) => {
  return (
    <View flex={1} backgroundColor={'white'}>
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
        <Image
          source={require('../assets/profileGroupPost_icon.png')}
          // borderWidth={3}
          alt={'group alert'}
          borderColor={'#8172F7'}
        />
        <VStack width={'100%'} marginX={5}>
          <Text fontSize={16} color={'#232259'} fontWeight={'bold'}>
            Header name
          </Text>
          <Text fontSize={14} color={'#232259'} fontWeight={'normal'}>
            date : time
          </Text>
        </VStack>
      </HStack>
      <TextArea
        flex={0.85}
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
        // value={
        //   'What is your mind?  message Taken from the Latin words message Taken from the Latin words message Taken from the Latin words message Taken from the Latin words message Taken from the Latin words'
        // }
      />
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
        <TouchableOpacity style={{width: '50%'}}>
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
    </View>
  );
};
export default CreatePostScreen;
