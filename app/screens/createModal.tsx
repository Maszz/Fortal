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
} from 'react-native';
import {FunctionComponent, useEffect, useState} from 'react';
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
import {border} from 'native-base/lib/typescript/theme/styled-system';
import GradientButton from '../components/GradientButton';

export interface CreateEventForm {
  startDate: moment.Moment;
  startTime: moment.Moment;
  endTime: moment.Moment;
  maxMember: string;
  memberType: string;
  isPublic: boolean;
  profileColor: string[];
  eventName: string;
}
const Home: FunctionComponent<CreateModalProps> = ({route, navigation}) => {
  const {stackNavigation} = useSelector<RootState, RootState['navigation']>(
    (state: RootState) => state.navigation,
  );
  const {height, width} = Dimensions.get('window');

  const location = useSelector<RootState, RootState['location']>(
    state => state.location,
  );
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const [region, setRegion] = useState<Region>({} as Region);
  const [eventData, setEventData] = useState<CreateEventForm>({
    startDate: moment(),
    startTime: moment(),
    endTime: moment(),
    maxMember: '4',
    memberType: 'Unlimited',
    isPublic: true,
    profileColor: ['#FEDDE0', '#8C84D4'],
    eventName: 'Location name',
  } as CreateEventForm);
  const onSubmit = () => {
    const date = eventData.startDate.toISOString().split('T')[0];
    const startTime = eventData.startTime.toISOString().split('T')[1];
    const endTime = eventData.endTime.toISOString().split('T')[1];
    const startDateTime = moment(date + 'T' + startTime);
    const endDateTime = moment(date + 'T' + endTime);
  };
  useEffect(() => {
    // call once when initial mounting the component
    Geolocation.getCurrentPosition(
      info => {
        console.log(info);
        // setRegion({
        //   latitude: info.coords.latitude,
        //   longitude: info.coords.longitude,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // });
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
    <KeyboardAvoidingView style={{flex: 1}} behavior={'position'}>
      <ScrollView w={'100%'} backgroundColor={'white'} h={'100%'}>
        <VStack mx={4} flex={1} h={height}>
          <LinearGradient
            colors={eventData.profileColor}
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
              // alignItems={'center'}

              justifyContent={'space-between'}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <Image
                  marginLeft={10}
                  marginBottom={3}
                  alt="key icon"
                  source={require('../assets/back_icon.png')}
                />
              </TouchableOpacity>
              <Spacer />
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <Image
                  marginBottom={3}
                  marginRight={10}
                  alt="settingIcon"
                  source={require('../assets/setting_icon.png')}
                />
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
                  <HStack>
                    <Image
                      source={require('../assets/map_pin_icon.png')}
                      style={{marginLeft: 1}}
                      alt={'map pin icon'}
                    />
                    <Text fontSize={13} fontWeight={400} color={'white'} ml={1}>
                      tap to choose location
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
            />
            <VStack>
              <HStack alignItems={'center'} mt={4}>
                <Text fontSize={14} fontWeight={'bold'} color={'#232259'}>
                  Start
                </Text>
                <Spacer />
                <DateTimePicker
                  value={eventData.startDate?.toDate()}
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
                  <Select.Item label="Unlimited" value="Unlimited" />
                  <Select.Item label="Limit" value="Limit" />
                </Select>
              </HStack>
              <HStack justifyContent={'flex-end'} alignItems={'center'} mt={4}>
                <Input
                  value={eventData.maxMember}
                  isDisabled={eventData.memberType === 'Unlimited'}
                  onChangeText={v => {
                    setEventData({...eventData, maxMember: v});
                  }}
                  w={20}
                  keyboardType={'numeric'}
                />
              </HStack>
              <HStack
                alignItems={'center'}
                justifyContent={'space-between'}
                mt={4}>
                <Image source={require('../assets/eye_icon.png')} />
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
                  width={20}
                  borderColor={'#232259'}
                  borderWidth={1}
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
                eventData.profileColor[0] == '#FFEAE5' &&
                eventData.profileColor[1] == '#8C84D4'
              }
              colors={['#FFEAE5', '#8C84D4']}
              angle={300}
              borderColor={'#8172F7'}
              onPress={v => {
                setEventData({
                  ...eventData,
                  profileColor: v,
                });
              }}
            />
            <GradientCircleButton
              isSelected={
                eventData.profileColor[0] == '#9FDDFB' &&
                eventData.profileColor[1] == '#8172F7'
              }
              colors={['#9FDDFB', '#8172F7']}
              angle={300}
              borderColor={'#8172F7'}
              onPress={v => {
                setEventData({
                  ...eventData,
                  profileColor: v,
                });
              }}
            />
            <GradientCircleButton
              isSelected={
                eventData.profileColor[0] == '#FFFDC3' &&
                eventData.profileColor[1] == '#6BB79D'
              }
              colors={['#FFFDC3', '#6BB79D']}
              angle={300}
              borderColor={'#8172F7'}
              onPress={v => {
                setEventData({
                  ...eventData,
                  profileColor: v,
                });
              }}
            />
            <GradientCircleButton
              isSelected={
                eventData.profileColor[0] == '#F4FF92' &&
                eventData.profileColor[1] == '#EF8B88'
              }
              colors={['#F4FF92', '#EF8B88']}
              angle={300}
              borderColor={'#8172F7'}
              onPress={v => {
                setEventData({
                  ...eventData,
                  profileColor: v,
                });
              }}
            />
            <GradientCircleButton
              isSelected={
                eventData.profileColor[0] == '#9FDDFB' &&
                eventData.profileColor[1] == '#FFAECB'
              }
              colors={['#9FDDFB', '#FFAECB']}
              angle={300}
              borderColor={'#8172F7'}
              onPress={v => {
                setEventData({
                  ...eventData,
                  profileColor: v,
                });
              }}
            />
          </HStack>
        </VStack>
      </ScrollView>
      <EventNameModal
        isOpen={showModal}
        setIsOpen={setShowModal}
        setValue={v => {
          setEventData({...eventData, eventName: v});
        }}
        value={eventData.eventName}
      />
    </KeyboardAvoidingView>
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
