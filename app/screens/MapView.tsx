import MapView, {
  Marker,
  Region,
  LatLng,
  AnimatedRegion,
  Animated,
} from 'react-native-maps';
import {FunctionComponent, useRef} from 'react';
import {MapViewScreenProps} from '../types';
import {useState, useEffect, createRef, LegacyRef} from 'react';
import {
  View,
  Text,
  Box,
  ZStack,
  HStack,
  Image,
  ScrollView,
  VStack,
  Switch,
  Divider,
  Input,
  TextArea,
  Button,
} from 'native-base';
import {
  StyleSheet,
  StyleProp,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {RootState} from '../redux';
import {useDispatch} from 'react-redux';
import {setLocationAction} from '../redux/reducers/locationReducer';
import {
  useGetSearchLocationEventQuery,
  LocationSearchResponse,
} from '../redux/apis';
import SearchBar from '../components/SearchBar';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

export interface Address {
  addressName: string;
  addressDetail: string;
}
const MapViewScreen: FunctionComponent<MapViewScreenProps> = ({
  navigation,
  route,
}) => {
  const location = useSelector<RootState, RootState['location']>(
    state => state.location,
  );
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');
  const [clearResult, setClearResult] = useState(true);
  const {width, height} = Dimensions.get('window');
  const {data: searchLocationData, isLoading} =
    useGetSearchLocationEventQuery(searchInput);
  const [region, setRegion] = useState<Region>({} as Region);
  const [isMount, setIsMount] = useState<boolean>(false);
  const [pin, setPin] = useState<LatLng>({
    latitude: location.marker.latitude,
    longitude: location.marker.longitude,
  });
  const [enableAvoidingView, setEnableAvoidingView] = useState<boolean>(true);
  const [address, setAddress] = useState<Address>({} as Address);
  const ref = useRef<MapView>(null);
  const searchRef = useRef<any>(null);

  // const [isMount, setIsMount] = useState(false);
  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });
  const onSearchSubmit = (term: string) => {
    setSearchInput(term);

    console.log('New Search submit', term);
    // TODO: Make a request to the API
  };

  useEffect(() => {
    if (!isMount) {
      const {latitude, longitude, latitudeDelta, longitudeDelta, ...other} =
        location;
      setRegion({latitude, longitude, latitudeDelta, longitudeDelta});
      setPin(other.marker);
      setAddress({
        addressName: other.addressName,
        addressDetail: other.addressDetail,
      });
      setIsMount(true);
    }
  }, []);

  return (
    <ScrollView backgroundColor={'white'} height={'100%'} scrollEnabled={false}>
      <KeyboardAvoidingView
        behavior={'position'}
        keyboardVerticalOffset={100}
        style={{flex: 1}}
        enabled={enableAvoidingView}>
        {isMount ? (
          // <ZStack w={'300'} h={300}>
          // <Box
          //   position={'absolute'}
          //   w={'100%'}
          //   // backgroundColor={'amber.200'}
          //   safeAreaTop>
          //   <HStack
          //     w={'100%'}
          //     paddingBottom={3}
          //     marginTop={3}
          //     // alignItems={'center'}

          //     justifyContent={'space-between'}>
          //     <TouchableOpacity
          //       onPress={() => {
          //         dispatch(
          //           setLocationAction({
          //             latitude: region.latitude,
          //             longitude: region.longitude,
          //             latitudeDelta: region.latitudeDelta,
          //             longitudeDelta: region.longitudeDelta,
          //             marker: pin,
          //           }),
          //         );
          //         navigation.goBack();
          //       }}>
          //       <Image
          //         marginLeft={10}
          //         marginBottom={3}
          //         alt="key icon"
          //         source={require('../assets/back_icon.png')}
          //       />
          //     </TouchableOpacity>
          //   </HStack>
          // </Box>
          // </ZStack>
          <View flex={1} mx={6} mt={5}>
            {/* <Box
            // position={'absolute'}
            w={'100%'}
            // backgroundColor={'amber.200'}
          >
            <HStack
              w={'100%'}
              // alignItems={'center'}

              justifyContent={'space-between'}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(
                    setLocationAction({
                      latitude: region.latitude,
                      longitude: region.longitude,
                      latitudeDelta: region.latitudeDelta,
                      longitudeDelta: region.longitudeDelta,
                      marker: pin,
                    }),
                  );
                  navigation.goBack();
                }}>
                <Image
                  marginLeft={1}
                  marginBottom={3}
                  alt="key icon"
                  source={require('../assets/back_icon.png')}
                />
              </TouchableOpacity>
            </HStack>
          </Box> */}
            <Text>find place</Text>
            <SearchBar
              getRef={searchRef}
              style={{marginTop: 10}}
              onSearchSubmit={term => {
                onSearchSubmit(term);
              }}
              clearResults={v => {
                setClearResult(v);
              }}
              onFocus={() => {
                setEnableAvoidingView(false);
              }}
              onBlur={() => {
                setEnableAvoidingView(true);
              }}
            />

            <ZStack height={325}>
              <MaskedView
                style={{marginTop: 10, alignSelf: 'center'}}
                maskElement={
                  <View
                    style={{
                      // Transparent background because mask is based off alpha channel.
                      backgroundColor: 'black',
                      borderRadius: 20,
                      width: width * 0.85,
                      height: 300,
                    }}></View>
                }>
                <MapView
                  ref={ref}
                  initialRegion={region}
                  // region={region}
                  style={(styles.map, {width: width * 0.85, height: 300})}
                  // onRegionChange={region => setRegion(region)}
                  // onRegionChangeComplete={region => {

                  // }}
                  onPress={e => {
                    setPin({
                      latitude: e.nativeEvent.coordinate.latitude,
                      longitude: e.nativeEvent.coordinate.longitude,
                    });
                    // console.log(e.nativeEvent.coordinate);
                  }}>
                  <Marker
                    coordinate={{
                      latitude: pin.latitude,
                      longitude: pin.longitude,
                    }}
                  />
                </MapView>
              </MaskedView>
              <Box
                shadow={4}
                mt={2}
                backgroundColor={!clearResult ? 'white' : 'transparent'}
                w={'100%'}
                borderRadius={15}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  w={'100%'}
                  maxHeight={40}>
                  <VStack mt={4} px={2}>
                    {!clearResult
                      ? searchLocationData?.map(
                          (item: LocationSearchResponse, index: number) => {
                            return (
                              <Box key={index}>
                                <TouchableOpacity
                                  style={{paddingHorizontal: 3}}
                                  onPress={() => {
                                    setPin({
                                      latitude: item.geometry.lat,
                                      longitude: item.geometry.lng,
                                    });
                                    setRegion({
                                      latitudeDelta: 0.01,
                                      longitudeDelta: 0.01,
                                      latitude: item.geometry.lat,
                                      longitude: item.geometry.lng,
                                    });
                                    ref.current?.animateToRegion(
                                      {
                                        latitude: item.geometry.lat,
                                        longitude: item.geometry.lng,
                                        latitudeDelta: 0.01,
                                        longitudeDelta: 0.01,
                                      },
                                      0,
                                    );
                                    searchRef.current?.blur();
                                    console.log('item', item);
                                  }}>
                                  <HStack>
                                    <Text>{item.flag}</Text>
                                    <Text w={'90%'} numberOfLines={2}>
                                      {item.place}
                                    </Text>
                                  </HStack>
                                </TouchableOpacity>
                                <Divider my={2} />
                              </Box>
                            );
                          },
                        )
                      : null}
                  </VStack>
                </ScrollView>
              </Box>
            </ZStack>
            {/* <TouchableOpacity
            onPress={() => {
              dispatch(
                setLocationAction({
                  latitude: region.latitude,
                  longitude: region.longitude,
                  latitudeDelta: region.latitudeDelta,
                  longitudeDelta: region.longitudeDelta,
                  marker: pin,
                }),
              );
              navigation.goBack();
            }}>
            <Text>asdassad</Text>
          </TouchableOpacity> */}
            <VStack mt={5}>
              <Text fontWeight={400} fontSize={10}>
                Address name
              </Text>
              <Input
                borderRadius={10}
                bgColor={'#F3F3F3'}
                mt={5}
                onChangeText={v => {
                  setAddress({...address, addressName: v});
                }}
                value={address.addressName}
              />
              <Box mt={6}>
                <Text fontWeight={400} fontSize={10}>
                  address
                </Text>
                <TextArea
                  borderRadius={10}
                  bgColor={'#F3F3F3'}
                  mt={2}
                  autoCompleteType
                  value={address.addressDetail}
                  onChangeText={v => {
                    setAddress({...address, addressDetail: v});
                  }}
                />
              </Box>
            </VStack>

            <HStack mt={10} justifyContent={'flex-end'}>
              <TouchableOpacity
                style={{width: 110, height: 40}}
                // width={'250px'}
                // height={'40px'}>
                onPress={() => {
                  console.log('onPress');
                  dispatch(
                    setLocationAction({
                      latitude: region.latitude,
                      longitude: region.longitude,
                      latitudeDelta: region.latitudeDelta,
                      longitudeDelta: region.longitudeDelta,
                      marker: pin,
                      addressName: address.addressName,
                      addressDetail: address.addressDetail,
                    }),
                  );
                  navigation.goBack();
                }}>
                <LinearGradient
                  colors={['#3275F3', '#BD97FB', '#FFDFD8']}
                  useAngle={true}
                  angle={90}
                  angleCenter={{x: 0.5, y: 0.5}}
                  style={{
                    flex: 1,
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderRadius: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text color={'white'} bold fontSize={16}>
                    save
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </HStack>
          </View>
        ) : null}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default MapViewScreen;
