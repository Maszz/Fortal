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

import moment from 'moment';
const EventNote: FunctionComponent<EventNoteScreenProps> = ({
  navigation,
  route,
}) => {
  const {eventId, eventChatId} = route.params;
  const [pinPostProps, setPinPostProps] = useState<{
    height: string;
  }>({height: 'auto'});
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const {data} = useGetPostListQuery({eventId: eventId, offset: 0, limit: 10});
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
              <Image
                source={require('../assets/groupAlert_icon.png')}
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
                    translates to "pain itself", Lorem Ipsum text saw a revival
                    in the mid-20th century as
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
          <ScrollView variant={'vertical'} height={'100%'}>
            {/* this Box is triger component of member group post */}
            {data?.map((item, index) => {
              return (
                <EventPost
                  name={item.creator}
                  message={item.content}
                  date={moment(item.createdAt).tz('Asia/Bangkok').format('ll')}
                  time={moment(item.createdAt).tz('Asia/Bangkok').format('LT')}
                  key={item.id}
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
}
const EventPost: FunctionComponent<EventPostProps> = ({
  name,
  time,
  date,
  message,
}) => {
  return (
    <Box
      mt={5}
      // borderBottomWidth={1}
      // paddingBottom={1}
      borderBottomColor={'#8B9093'}>
      <HStack>
        <Image
          source={require('../assets/profileGroupPost_icon.png')}
          // borderWidth={3}
          borderColor={'#8172F7'}
        />
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
