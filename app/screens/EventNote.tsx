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
import {FunctionComponent} from 'react';
import {TouchableOpacity} from 'react-native';
import {Divider, Input} from 'native-base';
const EventNote: FunctionComponent<EventNoteScreenProps> = () => {
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
              // navigation.goBack();
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
            Group note
          </Text>
          <Image alt="key icon" source={require('../assets/paper_icon.png')} />
        </Box>
      </Box>
      <VStack flex={1} paddingX={'7%'} marginTop={'5%'}>
        <Box>
          <HStack justifyContent={'space-between'} marginBottom={3}>
            <Text fontSize={16} color={'#232259'} fontWeight={'normal'}>
              ประกาศ
            </Text>
            <Image
              source={require('../assets/uparrow_icon.png')}
              borderRadius={5}
            />
          </HStack>

          <HStack>
            <Image
              source={require('../assets/groupAlert_icon.png')}
              // borderWidth={3}
              borderColor={'#8172F7'}
            />
            <VStack width={'100%'} marginX={5}>
              <Text fontSize={16} color={'#232259'} fontWeight={'bold'}>
                Header name
              </Text>
              <Text fontSize={14} color={'#232259'} fontWeight={'normal'}>
                date : time
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
                  paddingX={1}
                  color={'white'}
                  fontSize={16}
                  fontWeight={'normal'}
                  style={{backgroundColor: '#8C84D4'}}>
                  message Taken from the Latin words "dolorem ipsum", which
                  translates to "pain itself", Lorem Ipsum text saw a revival in
                  the mid-20th century as
                </Text>
              </Box>
            </VStack>
          </HStack>
        </Box>
        <Divider my={5} opacity={0} bg="black" />
        <Text fontSize={16} color={'#232259'} fontWeight={'normal'}>
          Post
        </Text>
        <Divider my={2} />
        <ScrollView variant={'vertical'} height={'100%'}>
          {/* this Box is triger component of member group post */}
          <Box
            mt={5}
            borderBottomWidth={1}
            paddingBottom={5}
            borderBottomColor={'#8B9093'}>
            <HStack>
              <Image
                source={require('../assets/profileGroupPost_icon.png')}
                // borderWidth={3}
                borderColor={'#8172F7'}
              />
              <VStack width={'100%'} marginX={5}>
                <Text fontSize={16} color={'#232259'} fontWeight={'bold'}>
                  Poster name
                </Text>
                <Text fontSize={14} color={'#232259'} fontWeight={'normal'}>
                  13:15
                </Text>
                <Text fontSize={14} color={'#232259'} fontWeight={'normal'}>
                  Tue, 10 Aug
                </Text>
              </VStack>
            </HStack>
            <Divider my={2} opacity={0} />
            <Text
              paddingX={'5%'}
              fontSize={16}
              fontWeight={'normal'}
              color={'#232259'}>
              Taken from the Latin words "dolorem ipsum", which translates to
              "pain itself", Lorem Ipsum text saw a revival in the mid-20th
              century as
            </Text>
            <Divider my={3} opacity={0} />
            <HStack
              // marginTop={3}
              alignSelf={'center'}
              width={'90%'}
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
                // value={userInput}
                onChangeText={text => setUserInput(text)}
              />
              <TouchableOpacity
                onPress={() => {
                  //
                }}>
                <Image
                  source={require('../assets/send_icon.png')}
                  alt={'send'}
                />
              </TouchableOpacity>
            </HStack>
          </Box>
        </ScrollView>
      </VStack>
    </View>
  );
};

export default EventNote;
