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
} from 'native-base';
import {TouchableOpacity} from 'react-native';
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
export interface EventDate {
  startDate: moment.Moment;
  startTime: moment.Moment;
  endTime: moment.Moment;
}
const Home: FunctionComponent<CreateModalProps> = ({route, navigation}) => {
  const {stackNavigation} = useSelector<RootState, RootState['navigation']>(
    (state: RootState) => state.navigation,
  );
  const location = useSelector<RootState, RootState['location']>(
    state => state.location,
  );
  const dispatch = useDispatch();
  const [region, setRegion] = useState<Region>({} as Region);
  const [eventDate, setEventDate] = useState<EventDate>({
    startDate: moment(),
    startTime: moment(),
    endTime: moment(),
  } as EventDate);
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
    <View w={'100%'} backgroundColor={'white'} h={'100%'}>
      <VStack mx={4} flex={1}>
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
          <Text fontSize={14} fontWeight={700} mb={2}>
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
            <HStack alignItems={'center'}>
              <Text>Start</Text>
              <Spacer />
              <DateTimePicker
                value={eventDate.startDate?.toDate()}
                mode={'date'}
                is24Hour={true}
                onChange={v => {
                  setEventDate({
                    ...eventDate,
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
                value={eventDate.startTime.toDate()}
                mode={'time'}
                is24Hour={true}
                onChange={v => {
                  console.log(v.nativeEvent.timestamp);
                  setEventDate({
                    ...eventDate,
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
          </VStack>
        </Box>
      </VStack>
    </View>
  );
};

export default Home;
