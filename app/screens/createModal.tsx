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
export interface CreateEventForm {
  startDate: moment.Moment;
  startTime: moment.Moment;
  endTime: moment.Moment;
  maxMember: string;
  memberType: string;
  isPublic: boolean;
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
  const [region, setRegion] = useState<Region>({} as Region);
  const [eventData, setEventData] = useState<CreateEventForm>({
    startDate: moment(),
    startTime: moment(),
    endTime: moment(),
    maxMember: '4',
    memberType: 'Unlimited',
  } as CreateEventForm);
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
    console.log('effeft');
  }, []);
  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={'position'}>
      <ScrollView w={'100%'} backgroundColor={'white'} h={'100%'}>
        <VStack mx={4} flex={1} h={height}>
          <LinearGradient
            colors={['#FEDDE0', '#8C84D4']}
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
                <Text fontSize={32} fontWeight={700} w={'90%'} h={'100%'}>
                  Location name
                </Text>
              </ZStack>
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
                <Text fontSize={14} fontWeight={700} color={'#232259'}>
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
                  style={{marginLeft: 3}}
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
              <HStack alignItems={'center'} justifyContent={'space-between'}>
                <Text>Public Group</Text>
                <Spacer />
                <Switch
                  value={eventData.isPublic}
                  // onValueChange={v => {
                  //   setEventData({...eventData, isPublic: v});
                  // }}
                  onToggle={v => {
                    setEventData({...eventData, isPublic: v});
                  }}
                  offTrackColor="rose.200"
                  onTrackColor="lime.200"
                />
              </HStack>
            </VStack>
            <HStack>
              <Text fontSize={14} fontWeight={700} color={'#232259'}>
                Color
              </Text>
            </HStack>
          </Box>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Home;
