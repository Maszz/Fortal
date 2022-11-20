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
  Avatar,
  Divider,
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
import {Config} from '../env';
import {EventCardActionsSheetJoinedProps} from '../types';
const EventCardActionSheetJoined: FunctionComponent<
  EventCardActionsSheetJoinedProps
> = ({payload, sheetId}) => {
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
  const [paticipant, setPaticipant] = useState<
    {
      avarar: string | undefined;
    }[]
  >([] as {avarar: string | undefined}[]);
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
  useEffect(() => {
    if (!isLoading && data) {
      console.log(data);
      const paticipant = data?.participants.map(item => {
        if (item.profile.avarar === null) {
          return {avarar: undefined};
        }
        return {avarar: Config.apiBaseUrl + item.profile.avarar};
      });
      setPaticipant([
        {
          avarar:
            data.creator.profile.avarar === null
              ? undefined
              : Config.apiBaseUrl + data.creator.profile.avarar,
        },
        ...paticipant,
      ]);
    }
  }, [isLoading]);
  useEffect(() => {
    console.log('bbddf', paticipant);
  }, [paticipant]);
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
        height: '92%',
        paddingHorizontal: '4%',
      }}
      useBottomSafeAreaPadding={true}>
      <View flex={1}>
        <LinearGradient
          colors={data ? [data?.eventColors.c1, data?.eventColors.c2] : []}
          useAngle={true}
          angle={0}
          angleCenter={{x: 0.5, y: 0.5}}
          style={{
            borderRadius: 50,
            display: 'flex',
            height: '45%',
            width: '100%',
            justifyContent: 'flex-end',
            paddingHorizontal: '7%',
            paddingBottom: '7%',
          }}>
          <Box>
            <TouchableOpacity
              onPress={() => {
                actionSheetRef.current?.hide();
                stackNavigation.navigate('MapViewForEventCardScreen', {
                  location: data?.location ? data?.location : ({} as Location),
                  locationName: data?.locationName ? data?.locationName : '',
                  locationDescription: data?.locationDetails
                    ? data?.locationDetails
                    : '',
                  locationMarker: data?.locationMarker
                    ? data?.locationMarker
                    : ({} as LocationMarker),
                });
              }}>
              <ZStack
                bgColor={'warning.200'}
                maxWidth={'50%'}
                borderRadius={'3xl'}
                mb={5}>
                <Box
                  backgroundColor={'white'}
                  w={'100%'}
                  h={7}
                  opacity={0.2}
                  borderRadius={'3xl'}
                />
                <HStack width={'100%'} height={7} alignItems={'center'}>
                  <Image
                    source={require('../assets/map_pin_icon.png')}
                    style={{marginHorizontal: 8}}
                    alt={'map pin icon'}
                  />
                  <Text
                    paddingRight={2}
                    fontSize={14}
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
              mt={3}
              width={'50%'}
              color={'#232259'}
              fontSize={32}
              fontWeight={'bold'}
              numberOfLines={2}
              ellipsizeMode={'tail'}>
              {data?.name}
            </Text>
          </Box>
        </LinearGradient>
        <View paddingX={'7%'} mt={'5%'}>
          <Text fontSize={15} fontWeight={'bold'} color={'#232259'}>
            About the activity
          </Text>
          <Text
            textAlign={'left'}
            marginY={'3.5%'}
            color={'#232259'}
            fontSize={14}
            fontWeight={'normal'}
            numberOfLines={4}
            ellipsizeMode={'tail'}>
            {data?.description}
          </Text>
          <VStack>
            <HStack justifyContent={'space-between'}>
              <Text fontSize={15} fontWeight={'bold'} color={'#232259'}>
                Start
              </Text>
              <Text fontSize={15} fontWeight={'normal'} color={'#232259'}>
                {data
                  ? moment(data?.startDate).format('DD MMM YYYY, h:mm a')
                  : ''}
              </Text>
            </HStack>
            <HStack justifyContent={'space-between'} mt={5}>
              <Text fontSize={15} fontWeight={'bold'} color={'#232259'}>
                End
              </Text>
              <Text fontSize={15} fontWeight={'normal'} color={'#232259'}>
                {data ? moment(data?.endDate).format('h:mm a') : ''}
              </Text>
            </HStack>
            {/* <HStack justifyContent={'space-between'} mt={5}>
                <Text fontSize={15} fontWeight={'bold'} color={'#232259'}>
                  Member
                </Text>
                <Text fontSize={15} fontWeight={'normal'} color={'#232259'}>
                  {data?.memberType === 'UNLIMITED'
                    ? 'Unlimited'
                    : `${data?.memberLimit}/${data?.participantsId.length}`}
                </Text>
              </HStack> */}

            <HStack
              justifyContent={'space-between'}
              paddingLeft={'3%'}
              marginX={'1%'}
              marginY={'5%'}>
              <Avatar.Group
                _avatar={{
                  size: 'sm',
                  marginX: 0.5,
                  borderColor: '#8C84D4',
                  borderWidth: 1,
                }}
                max={5}>
                {paticipant?.map((item, index) => {
                  return (
                    <Avatar
                      source={
                        item.avarar
                          ? {uri: item.avarar}
                          : require('../assets/profileGroupPost_icon.png')
                      }
                    />
                  );
                })}
              </Avatar.Group>
              <Box
                backgroundColor={'#8C84D4'}
                maxWidth={'30%'}
                height={'80%'}
                borderRadius={'full'}>
                <Text
                  paddingX={2}
                  paddingTop={1}
                  textAlign={'center'}
                  fontSize={12}
                  fontWeight={'light'}
                  color={'white'}>
                  {data?.memberType !== 'LIMIT'
                    ? 'Unlimited'
                    : data.participants
                    ? `${data.participants.length + 1}/${data.memberLimit}`
                    : null}
                </Text>
              </Box>
            </HStack>

            <HStack alignItems={'center'}>
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
              stackNavigation.navigate('EventScreen', {
                eventChatId: payload?.eventChatId ? payload?.eventChatId : '',
                eventId: payload?.eventId ? payload?.eventId : '',
              });
              actionSheetRef.current?.hide();
            }}>
            <ZStack
              w={310}
              h={45}
              justifyContent={'center'}
              alignItems={'center'}>
              <LinearGradient
                colors={['#FEDDE0', '#8C84D4']}
                useAngle={true}
                angle={-50}
                // angleCenter={{x: 0.5, y: 0.5}}
                style={{width: 310, height: 45, borderRadius: 20}}
              />

              <Box
                w={300}
                h={35}
                borderRadius={20}
                alignItems={'center'}
                backgroundColor={'white'}
                justifyContent={'center'}></Box>
              <Text color={'#8C84D4'} fontSize={16} fontWeight={'bold'}>
                Chat
              </Text>
            </ZStack>
          </TouchableOpacity>
        </Box>
      </View>
    </ActionSheet>
  );
};
export default EventCardActionSheetJoined;
