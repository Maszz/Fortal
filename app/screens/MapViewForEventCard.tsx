import {View, Text, ZStack, Box, VStack, TextArea, Input} from 'native-base';
import {FunctionComponent} from 'react';
import {MapViewForEventCardScreenProps} from '../types';
import MaskedView from '@react-native-masked-view/masked-view';
import {Dimensions, StyleSheet} from 'react-native';

import MapView, {
  Marker,
  Region,
  LatLng,
  AnimatedRegion,
  Animated,
} from 'react-native-maps';
const MapViewForEventCard: FunctionComponent<
  MapViewForEventCardScreenProps
> = ({navigation, route}) => {
  const {location, locationName, locationMarker, locationDescription} =
    route.params;
  const {width, height} = Dimensions.get('window');

  return (
    <View flex={1} backgroundColor={'white'}>
      <View flex={1} mx={6} mt={8}>
        <ZStack height={325} w={width * 0.9} alignSelf={'center'}>
          <MaskedView
            maskElement={
              <View
                style={{
                  // Transparent background because mask is based off alpha channel.
                  backgroundColor: 'black',
                  borderRadius: 20,
                  width: width * 0.9,
                  height: 300,
                }}
              />
            }>
            <MapView
              initialRegion={location}
              // region={region}
              style={{
                width: width * 0.9,
                height: 300,
                ...StyleSheet.absoluteFillObject,
              }}
              // onRegionChange={region => setRegion(region)}
              // onRegionChangeComplete={region => {

              // }}
            >
              <Marker coordinate={locationMarker} />
            </MapView>
          </MaskedView>
        </ZStack>
        <VStack mt={5}>
          <Text fontWeight={400} fontSize={10}>
            Address name
          </Text>
          <Text
            borderRadius={10}
            bgColor={'#F3F3F3'}
            mt={5}
            // onChangeText={v => {
            //   setAddress({...address, addressName: v});
            // }}
            // value={address.addressName}
          >
            {locationName || 'No location name'}
          </Text>
          <Box mt={6}>
            <Text fontWeight={400} fontSize={10}>
              address
            </Text>
            <Text>{locationDescription || 'No location description'}</Text>
          </Box>
        </VStack>
      </View>
    </View>
  );
};
export default MapViewForEventCard;
