import {
  View,
  Text,
  Button,
  VStack,
  ZStack,
  Box,
  HStack,
  Image,
  Spacer,
  Circle,
  TextArea,
  Input,
  ScrollView,
  Select,
  Switch,
  Pressable,
  Modal,
  FormControl,
  Divider,
} from 'native-base';
import {
  TouchableOpacity,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {FunctionComponent, useEffect, useState, useCallback} from 'react';
import {CreateModalProps} from '../types';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {RootState} from '../redux';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker, Region, LatLng} from 'react-native-maps';
import {useDispatch} from 'react-redux';
import {setLocationAction} from '../redux/reducers/locationReducer';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {useAuth} from '../hooks/useAuth';
import {border} from 'native-base/lib/typescript/theme/styled-system';
import GradientButton from '../components/GradientButton';
import {useCreateEventMutation} from '../redux/apis/EventApi';
export interface CreateEventForm {
  startDate: moment.Moment;
  startTime: moment.Moment;
  endTime: moment.Moment;
  memberLimit: string;
  memberType: string;
  isPublic: boolean;
  eventColors: string[];
  eventName: string;
  eventDescription: string;
}
export interface CreateEventDto {
  startDateTime: string;
  endDateTime: string;
  memberLimit: string;
  memberType: string;
  isPublic: boolean;
  eventColors: string[];
  eventName: string;
  eventDescription: string;
  location: {
    latitudeDelta: number;
    longitudeDelta: number;
    latitude: number;
    longitude: number;
  };
  locationName: string;
  locationDescription: string;
  locationMarker: {
    latitude: number;
    longitude: number;
  };
  creatorUsername: string;
}
const Home: FunctionComponent<CreateModalProps> = ({route, navigation}) => {
  const {stackNavigation} = useSelector<RootState, RootState['navigation']>(
    (state: RootState) => state.navigation,
  );
  const {height, width} = Dimensions.get('window');
  const {user} = useAuth();
  const location = useSelector<RootState, RootState['location']>(
    state => state.location,
  );
  const [createEvent, result] = useCreateEventMutation();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const [eventData, setEventData] = useState<CreateEventForm>({
    startDate: moment(),
    startTime: moment(),
    endTime: moment(),
    memberLimit: '0',
    memberType: 'UNLIMITED',
    isPublic: true,
    eventColors: ['#FEDDE0', '#8C84D4'],
    eventName: 'Event name',
    eventDescription: 'event description',
  } as CreateEventForm);
  const getStartDateTime = useCallback(() => {
    const date = eventData.startDate.toISOString().split('T')[0];
    const startTime = eventData.startTime.toISOString().split('T')[1];
    return moment(date + 'T' + startTime);
  }, [eventData.startDate, eventData.startTime]);
  const onSubmit = async () => {
    const date = eventData.startDate.toISOString().split('T')[0];
    const startTime = eventData.startTime.toISOString().split('T')[1];
    const endTime = eventData.endTime.toISOString().split('T')[1];
    const startDateTime = moment(date + 'T' + startTime);
    const endDateTime = moment(date + 'T' + endTime);
    console.log('Start Date', startDateTime.toISOString());
    console.log('End Date', endDateTime.toISOString());
    const {
      memberLimit,
      memberType,
      isPublic,
      eventName,
      eventColors,
      eventDescription,
    } = eventData;
    console.log('Max Member', memberLimit);
    console.log('Member Type', memberType);
    console.log('Is Public', isPublic);
    console.log('Event Name', eventName);
    const eventDto: CreateEventDto = {
      eventName: eventName,
      eventDescription: eventDescription,
      memberLimit: memberLimit,
      memberType: memberType,
      isPublic: isPublic,
      eventColors: eventColors,
      startDateTime: startDateTime.toISOString(),
      endDateTime: endDateTime.toISOString(),
      location: {
        latitudeDelta: location.latitudeDelta,
        longitudeDelta: location.longitudeDelta,
        latitude: location.latitude,
        longitude: location.longitude,
      },
      locationName: location.addressName,
      locationDescription: location.addressDetail,
      locationMarker: location.marker,
      creatorUsername: user.username,
    };
    const request = await createEvent(eventDto).unwrap();
    console.log(request);
    return request;
  };
  useEffect(() => {
    // call once when initial mounting the component
    Geolocation.getCurrentPosition(
      info => {
        console.log(info);

        dispatch(
          setLocationAction({
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            marker: {
              latitude: info.coords.latitude,
              longitude: info.coords.longitude,
            },
            addressName: '',
            addressDetail: '',
          }),
        );
      },
      error => {
        console.log(error);
      },
    );
    console.log(eventData.startDate.toISOString().split('T')[0]);
    console.log(eventData.startTime.toISOString().split('T')[1]);
    console.log(
      moment(
        eventData.startDate.toISOString().split('T')[0] +
          'T' +
          eventData.startTime.toISOString().split('T')[1],
      ).toISOString(),
    );
    console.log('effeft');
  }, []);
  return (
    <Pressable onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={'padding'}>
        <View w={'100%'} backgroundColor={'white'} h={'100%'}>
          <VStack mx={4} flex={1} h={height}>
            <LinearGradient
              colors={eventData.eventColors}
              useAngle={true}
              angle={0}
              angleCenter={{x: 0.5, y: 0.5}}
              style={{
                borderRadius: 25,
                display: 'flex',
                height: '30%',
                marginTop: 3,
              }}>
              <HStack
                w={'100%'}
                paddingBottom={3}
                marginTop={10}
                justifyContent={'space-between'}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Image
                    marginLeft={8}
                    marginBottom={3}
                    alt="key icon"
                    source={require('../assets/back_icon.png')}
                    style={{tintColor: 'white', alignSelf: 'flex-start'}}
                  />
                </TouchableOpacity>
                {/* <Spacer /> */}
                <TouchableOpacity
                  style={{marginRight: 30}}
                  onPress={() => {
                    // navigation.goBack();
                    onSubmit().then(p => {
                      navigation.navigate('HomeIndex');
                      navigation.navigate('EventScreen', {
                        eventChatId: p.eventChat.id,
                        eventId: p.event.id,
                      });
                    });
                  }}>
                  <Text fontSize={16} fontWeight={700} color={'white'}>
                    Done
                  </Text>
                </TouchableOpacity>
              </HStack>
              <Box w={'100%'} position={'absolute'} bottom={3} left={5}>
                <TouchableOpacity
                  onPress={() => {
                    stackNavigation.navigate('MapViewScreen');
                  }}>
                  <ZStack
                    bgColor={'warning.200'}
                    width={'47%'}
                    left={3}
                    borderRadius={'3xl'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    mb={5}>
                    <Box
                      backgroundColor={'white'}
                      w={'100%'}
                      h={5}
                      opacity={20}
                      borderRadius={'3xl'}
                    />
                    <HStack alignItems={'flex-start'} w={'100%'}>
                      <Image
                        source={require('../assets/map_pin_icon.png')}
                        style={{marginLeft: 12}}
                        alt={'map pin icon'}
                      />
                      <Text
                        fontSize={13}
                        w={'85%'}
                        fontWeight={400}
                        color={'white'}
                        numberOfLines={1}
                        ml={1}>
                        {location.addressName || 'tap to choose location'}
                      </Text>
                    </HStack>
                  </ZStack>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setShowModal(true);
                  }}>
                  <ZStack
                    w={'90%'}
                    height={'24'}
                    flexWrap={'wrap'}
                    alignItems={'center'}>
                    <Box
                      backgroundColor={'white'}
                      w={'100%'}
                      height={'100%'}
                      opacity={20}
                      borderRadius={'3xl'}
                    />
                    <Text
                      fontSize={32}
                      fontWeight={700}
                      w={'90%'}
                      h={'100%'}
                      numberOfLines={2}
                      ellipsizeMode={'tail'}>
                      {eventData.eventName}
                    </Text>
                  </ZStack>
                </TouchableOpacity>
              </Box>
            </LinearGradient>
            <Box mt={5} mx={4}>
              <Text fontSize={14} fontWeight={700} mb={2} color={'#232259'}>
                About the activity
              </Text>
              <TextArea
                placeholder="Text Area Placeholder"
                w="100%"
                alignSelf={'center'}
                autoCompleteType={'off'}
                borderRadius={10}
                multiline={true}
                numberOfLines={5}
                value={eventData.eventDescription}
                onChangeText={text =>
                  setEventData({...eventData, eventDescription: text})
                }
              />
              <VStack>
                <HStack alignItems={'center'} mt={4}>
                  <Text fontSize={14} fontWeight={'bold'} color={'#232259'}>
                    Start
                  </Text>
                  <Spacer />
                  <DateTimePicker
                    minimumDate={new Date()}
                    value={eventData.startDate?.toDate()}
                    dateFormat={'shortdate'}
                    mode={'date'}
                    is24Hour={true}
                    accentColor={'#232259'}
                    onChange={v => {
                      setEventData({
                        ...eventData,
                        startDate: moment(v.nativeEvent.timestamp),
                      });
                      console.log(v.nativeEvent.timestamp);
                      console.log(
                        moment(v.nativeEvent.timestamp)
                          .utcOffset('+07:00')
                          .format('MMMM Do YYYY, h:mm:ss a'),
                      );
                    }}
                  />
                  <DateTimePicker
                    minimumDate={
                      eventData.startDate.toISOString().split('T')[0] ==
                      moment().toISOString().split('T')[0]
                        ? new Date()
                        : undefined
                    }
                    value={eventData.startTime.toDate()}
                    mode={'time'}
                    is24Hour={true}
                    accentColor={'#232259'}
                    style={{marginLeft: 3, borderRadius: 10}}
                    onChange={v => {
                      console.log(v.nativeEvent.timestamp);
                      setEventData({
                        ...eventData,
                        startTime: moment(v.nativeEvent.timestamp),
                      });

                      console.log(
                        'asdf',
                        moment(v.nativeEvent.timestamp)
                          .utcOffset('+07:00')
                          .format('MMMM Do YYYY, h:mm:ss a'),
                      );
                    }}
                  />
                </HStack>
                <HStack alignItems={'center'} mt={4}>
                  <Text fontSize={14} fontWeight={700} color={'#232259'}>
                    End
                  </Text>
                  <Spacer />
                  <DateTimePicker
                    minimumDate={getStartDateTime().toDate()}
                    value={eventData.endTime?.toDate()}
                    mode={'time'}
                    is24Hour={true}
                    accentColor={'#232259'}
                    onChange={v => {
                      setEventData({
                        ...eventData,
                        endTime: moment(v.nativeEvent.timestamp),
                      });
                      console.log(v.nativeEvent.timestamp);
                      console.log(
                        moment(v.nativeEvent.timestamp)
                          .utcOffset('+07:00')
                          .format('MMMM Do YYYY, h:mm:ss a'),
                      );
                      console.log(
                        'end time',
                        moment(v.nativeEvent.timestamp)
                          .tz('Asia/Bangkok')
                          .isSame(eventData.startDate, 'days'),
                      );
                    }}
                  />
                </HStack>
                <HStack alignItems={'center'} mt={4}>
                  <Text fontSize={14} fontWeight={700} color={'#232259'}>
                    Max Member
                  </Text>
                  <Spacer />
                  <Select
                    selectedValue={eventData.memberType}
                    accessibilityLabel="Choose Service"
                    borderRadius={20}
                    bgColor={'#F3F3F3'}
                    dropdownIcon={
                      <Image
                        source={require('../assets/dropdown_icon.png')}
                        style={{marginRight: 10}}
                        alt="dropdown icon"
                      />
                    }
                    placeholder="Choose Service"
                    // _selectedItem={{
                    //   bg: 'teal.600',
                    //   endIcon: <CheckIcon size="5" />,
                    // }}
                    mt={1}
                    size={20}
                    minWidth={125}
                    onValueChange={itemValue =>
                      setEventData({...eventData, memberType: itemValue})
                    }>
                    <Select.Item label="Unlimited" value="UNLIMITED" />
                    <Select.Item label="Limit" value="LIMIT" />
                  </Select>
                </HStack>
                <HStack
                  justifyContent={'flex-end'}
                  alignItems={'center'}
                  mt={4}>
                  <Input
                    value={eventData.memberLimit}
                    isDisabled={eventData.memberType === 'UNLIMITED'}
                    onChangeText={v => {
                      setEventData({...eventData, memberLimit: v});
                    }}
                    w={20}
                    keyboardType={'numeric'}
                  />
                </HStack>
                <HStack
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  mt={4}>
                  <Image
                    source={require('../assets/eye_icon.png')}
                    alt={'eye-icon'}
                  />
                  <Text color={'#8B9093'} fontWeight={'normal'} marginLeft={3}>
                    Public Group
                  </Text>
                  <Spacer />
                  <Switch
                    value={eventData.isPublic}
                    // onValueChange={v => {
                    //   setEventData({...eventData, isPublic: v});
                    // }}
                    onToggle={v => {
                      setEventData({...eventData, isPublic: v});
                    }}
                    size={'sm'}
                    // width={20}
                    borderColor={'#232259'}
                    // borderWidth={1}
                    offTrackColor="#A8B0C5"
                    offThumbColor="white"
                    onTrackColor="#8C84D4"
                  />
                </HStack>
              </VStack>
              <HStack mt={4}>
                <Text fontSize={14} fontWeight={700} color={'#232259'}>
                  Color
                </Text>
              </HStack>
            </Box>
            <Divider bg={'white'} my={2} />
            <HStack
              justifyContent={'space-between'}
              paddingLeft={30}
              paddingRight={30}>
              <GradientCircleButton
                isSelected={
                  eventData.eventColors[0] == '#FEDDE0' &&
                  eventData.eventColors[1] == '#8C84D4'
                }
                colors={['#FEDDE0', '#8C84D4']}
                angle={300}
                borderColor={'#8172F7'}
                onPress={v => {
                  setEventData({
                    ...eventData,
                    eventColors: v,
                  });
                }}
              />
              <GradientCircleButton
                isSelected={
                  eventData.eventColors[0] == '#9FDDFB' &&
                  eventData.eventColors[1] == '#8172F7'
                }
                colors={['#9FDDFB', '#8172F7']}
                angle={300}
                borderColor={'#8172F7'}
                onPress={v => {
                  setEventData({
                    ...eventData,
                    eventColors: v,
                  });
                }}
              />
              <GradientCircleButton
                isSelected={
                  eventData.eventColors[0] == '#FFFDC3' &&
                  eventData.eventColors[1] == '#6BB79D'
                }
                colors={['#FFFDC3', '#6BB79D']}
                angle={300}
                borderColor={'#8172F7'}
                onPress={v => {
                  setEventData({
                    ...eventData,
                    eventColors: v,
                  });
                }}
              />
              <GradientCircleButton
                isSelected={
                  eventData.eventColors[0] == '#F4FF92' &&
                  eventData.eventColors[1] == '#EF8B88'
                }
                colors={['#F4FF92', '#EF8B88']}
                angle={300}
                borderColor={'#8172F7'}
                onPress={v => {
                  setEventData({
                    ...eventData,
                    eventColors: v,
                  });
                }}
              />
              <GradientCircleButton
                isSelected={
                  eventData.eventColors[0] == '#9FDDFB' &&
                  eventData.eventColors[1] == '#FFAECB'
                }
                colors={['#9FDDFB', '#FFAECB']}
                angle={300}
                borderColor={'#8172F7'}
                onPress={v => {
                  setEventData({
                    ...eventData,
                    eventColors: v,
                  });
                }}
              />
            </HStack>
          </VStack>
        </View>
        <EventNameModal
          isOpen={showModal}
          setIsOpen={setShowModal}
          setValue={v => {
            setEventData({...eventData, eventName: v});
          }}
          value={eventData.eventName}
        />
      </KeyboardAvoidingView>
    </Pressable>
  );
};

export default Home;

export interface GradientCircleButtonProps {
  colors: string[];
  borderColor: string;
  angle: number;
  isSelected: boolean;
  onPress: (v: string[]) => void;
}
export const GradientCircleButton: FunctionComponent<
  GradientCircleButtonProps
> = ({colors, borderColor, angle, onPress, isSelected}) => {
  return (
    <Pressable
      onPress={() => {
        onPress(colors);
      }}>
      <LinearGradient
        colors={colors}
        useAngle={true}
        angle={angle}
        angleCenter={{x: 0.5, y: 0.5}}
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          borderColor: isSelected ? borderColor : 'transparent',
          borderWidth: 4,
        }}
      />
    </Pressable>
  );
};
export interface EventNameModalProps {
  isOpen: boolean;
  setIsOpen(isOpen: boolean): void;
  value: string;
  setValue: (value: string) => void;
}
export const EventNameModal: FunctionComponent<EventNameModalProps> = ({
  isOpen,
  setIsOpen,
  value,
  setValue,
}) => {
  const [text, setText] = useState(value);
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Edit Event Name</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>Name</FormControl.Label>
            <Input
              value={text}
              onChangeText={v => {
                setText(v);
              }}
            />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setIsOpen(false);
              }}>
              Cancel
            </Button>
            <Button
              onPress={() => {
                setValue(text);
                setIsOpen(false);
              }}>
              Save
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
