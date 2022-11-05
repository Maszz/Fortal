import MapView, {Marker, Region, LatLng} from 'react-native-maps';
import {FunctionComponent} from 'react';
import {MapViewScreenProps} from '../types';
import {useState, useEffect} from 'react';
import {View, Text, Box, ZStack, HStack, Image} from 'native-base';
import {StyleSheet} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {RootState} from '../redux';
import {useDispatch} from 'react-redux';
import {setLocationAction} from '../redux/reducers/locationReducer';

const MapViewScreen: FunctionComponent<MapViewScreenProps> = ({
  navigation,
  route,
}) => {
  const location = useSelector<RootState, RootState['location']>(
    state => state.location,
  );
  const dispatch = useDispatch();

  const [region, setRegion] = useState<Region>({} as Region);
  const [isMount, setIsMount] = useState<boolean>(false);
  const [pin, setPin] = useState<LatLng>({
    latitude: location.latitude,
    longitude: location.longitude,
  });
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
  useEffect(() => {
    if (!isMount) {
      const {latitude, longitude, latitudeDelta, longitudeDelta, ...other} =
        location;
      setRegion({latitude, longitude, latitudeDelta, longitudeDelta});
      setPin(other.marker);
      setIsMount(true);
    }
  }, []);

  return (
    <View flex={1}>
      {isMount ? (
        <ZStack flex={1}>
          <MapView
            initialRegion={region}
            style={styles.map}
            onRegionChange={region => {
              setRegion(region);
            }}
            onPress={e => {
              setPin({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              });
              console.log(e.nativeEvent.coordinate);
            }}>
            <Marker
              coordinate={{latitude: pin.latitude, longitude: pin.longitude}}
            />
          </MapView>
          <Box
            position={'absolute'}
            w={'100%'}
            // backgroundColor={'amber.200'}
            safeAreaTop>
            <HStack
              w={'100%'}
              paddingBottom={3}
              marginTop={3}
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
                  marginLeft={10}
                  marginBottom={3}
                  alt="key icon"
                  source={require('../assets/back_icon.png')}
                />
              </TouchableOpacity>
            </HStack>
          </Box>
        </ZStack>
      ) : null}
    </View>
  );
};

export default MapViewScreen;
