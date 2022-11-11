import {FunctionComponent, useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  Box,
  Image,
  VStack,
  HStack,
  Input,
  Icon,
  Center,
  KeyboardAvoidingView,
  ZStack,
  Button,
} from 'native-base';
import ActionSheet, {
  useScrollHandlers,
  ActionSheetRef,
  SheetProps,
  SheetManager,
} from 'react-native-actions-sheet';
import {useTranslation} from 'react-i18next';
import {Keyboard, TextInput, Dimensions} from 'react-native';
import {EventCardActionsSheetProps} from '../types';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {border} from 'native-base/lib/typescript/theme/styled-system';
import MaskedView from '@react-native-masked-view/masked-view';
import {LocationMarker, useGetEventByIdQuery} from '../redux/apis';
import {RootState} from '../redux';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {Location} from '../redux/apis';
import {useJoinedEventMutation} from '../redux/apis';
import {useAuth} from '../hooks/useAuth';
import {ErrorResponse} from '../redux/apis';
import {Alert} from 'react-native';

const EventCardActionSheet: FunctionComponent<EventCardActionsSheetProps> = ({
  sheetId,
  payload,
}) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const {t} = useTranslation();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const {width, height} = Dimensions.get('window');
  const {data, isLoading} = useGetEventByIdQuery(payload?.eventId || '');
  const {stackNavigation} = useSelector<RootState, RootState['navigation']>(
    (state: RootState) => state.navigation,
  );
  const {user} = useAuth();
  const [joinedEvent, {isLoading: isJoiningEvent}] = useJoinedEventMutation();
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <ActionSheet
      id={sheetId}
      backgroundInteractionEnabled={false}
      closable={true}
      gestureEnabled={true}
      keyboardHandlerEnabled={true}
      ref={actionSheetRef}
      containerStyle={{
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        height: '80%',
        paddingHorizontal: 10,
      }}
      useBottomSafeAreaPadding={true}>
      <View flex={1}>
        <LinearGradient
          colors={data ? [data?.eventColors.c1, data?.eventColors.c2] : []}
          useAngle={true}
          angle={0}
          angleCenter={{x: 0.5, y: 0.5}}
          style={{
            borderRadius: 25,
            display: 'flex',
            height: '45%',
            justifyContent: 'flex-end',
          }}>
          <Box ml={5} mb={5}>
            <TouchableOpacity
              onPress={() => {
                actionSheetRef.current?.hide();
                stackNavigation.navigate('MapViewForEventCardScreen', {
                  location: data?.location ? data?.location : ({} as Location),
                  locationName: data?.locationName ? data?.locationName : '',
                  locationDescription: data?.description
                    ? data?.description
                    : '',
                  locationMarker: data?.locationMarker
                    ? data?.locationMarker
                    : ({} as LocationMarker),
                });
              }}>
              <ZStack
                bgColor={'warning.200'}
                width={'47%'}
                borderRadius={'3xl'}
                mb={5}>
                <Box
                  backgroundColor={'white'}
                  w={'100%'}
                  h={5}
                  opacity={20}
                  borderRadius={'3xl'}
                />
                <HStack>
                  <Image
                    source={require('../assets/map_pin_icon.png')}
                    style={{marginHorizontal: 8}}
                    alt={'map pin icon'}
                  />
                  <Text
                    fontSize={13}
                    fontWeight={400}
                    width={'85%'}
                    color={'white'}
                    numberOfLines={1}>
                    {data?.locationName || 'No location name'}
                  </Text>
                </HStack>
              </ZStack>
            </TouchableOpacity>

            <Text
              color={'#232259'}
              fontSize={32}
              fontWeight={700}
              numberOfLines={2}
              ellipsizeMode={'tail'}>
              {data?.name}
            </Text>
          </Box>
        </LinearGradient>
        <View paddingX={4} mt={4}>
          <Text fontSize={14} fontWeight={700} mb={2} color={'#232259'}>
            About the activity
          </Text>
          <Text
            color={'#232259'}
            fontSize={14}
            fontWeight={400}
            numberOfLines={4}
            ellipsizeMode={'tail'}>
            {data?.description}
          </Text>
          <VStack>
            <HStack justifyContent={'space-between'} mt={5}>
              <Text fontSize={14} fontWeight={700} color={'#232259'}>
                Start
              </Text>
              <Text fontSize={14} fontWeight={400} color={'#232259'}>
                {data
                  ? moment(data?.startDate).format('DD MMM YYYY, h:mm a')
                  : ''}
              </Text>
            </HStack>
            <HStack justifyContent={'space-between'} mt={5}>
              <Text fontSize={14} fontWeight={700} color={'#232259'}>
                End
              </Text>
              <Text fontSize={14} fontWeight={400} color={'#232259'}>
                {data ? moment(data?.endDate).format('h:mm a') : ''}
              </Text>
            </HStack>
            <HStack mt={5} alignItems={'center'}>
              <Image
                source={require('../assets/eye_icon.png')}
                alt={'eye-icon'}
              />
              <Text color={'#8B9093'} fontWeight={'normal'} marginLeft={3}>
                {!data
                  ? ''
                  : data
                  ? data.isPublic
                    ? 'Public'
                    : 'Private'
                  : ''}
              </Text>
            </HStack>
          </VStack>
        </View>
        <Box position={'absolute'} bottom={2} alignSelf={'center'}>
          <TouchableOpacity
            onPress={() => {
              if (data) {
                joinedEvent({
                  eventId: data?.id,
                  userName: user?.username,
                })
                  .unwrap()
                  .then(v => {
                    actionSheetRef.current?.hide();
                    stackNavigation.navigate('EventScreen', {
                      eventChatId: data?.eventChat.id,
                    });
                    console.log(v);
                  })
                  .catch(err => {
                    const res = err as ErrorResponse;
                    if (res.data?.message) {
                      if (res.data.message === 'Event is full') {
                        Alert.alert('Event is full');
                        return;
                      }
                      if (res.data.message === 'creator cannot join event') {
                        Alert.alert('creator cannot join event');
                        return;
                      }
                      if (
                        res.data.message === 'You are already a participant'
                      ) {
                        // Alert.alert('User already joined');

                        actionSheetRef.current?.hide();
                        stackNavigation.navigate('EventScreen', {
                          eventChatId: data?.eventChat.id,
                        });
                        return;
                      }
                    }
                  });
              }
            }}>
            <ZStack
              w={310}
              h={45}
              justifyContent={'center'}
              alignItems={'center'}>
              <LinearGradient
                colors={['#FEDDE0', '#8C84D4']}
                useAngle={true}
                angle={0}
                angleCenter={{x: 0.5, y: 0.5}}
                style={{width: 310, height: 45, borderRadius: 20}}
              />
              <Box
                backgroundColor={'white'}
                w={300}
                h={35}
                borderRadius={20}
                alignItems={'center'}
                justifyContent={'center'}>
                <Text color={'#8172F7'} fontSize={16} fontWeight={600}>
                  Join
                </Text>
              </Box>
            </ZStack>
          </TouchableOpacity>
        </Box>
      </View>
    </ActionSheet>
  );
};
export default EventCardActionSheet;
