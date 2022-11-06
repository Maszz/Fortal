import {View, Text, Button, Box, Divider, Image} from 'native-base';
import {useAuth} from '../../hooks/useAuth';
import {HomeScreenTypes} from '../../types';
import {FunctionComponent} from 'react';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Config} from '../../env';
import {useSelector, useDispatch} from 'react-redux';
import {store, RootState} from '../../redux';
import {StyleSheet, TouchableOpacity, Platform, ScrollView} from 'react-native';
import {Line} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

const Home: FunctionComponent<HomeScreenTypes.HomeScreenProps> = ({route}) => {
  const {logout, user} = useAuth();

  return (
    <ScrollView
      horizontal={false}
      showsHorizontalScrollIndicator={false}
      pagingEnabled={true}
      style={{flex: 10, backgroundColor: 'white'}}>
      {/* portion 1 == > story */}
      <Box
        style={{
          flex: 1.5,

          paddingTop: 15,
          paddingHorizontal: 20,
          marginVertical: 10,
        }}>
        <Text fontSize={14} fontWeight={'medium'}>
          Random activities
        </Text>
        <Divider my={2.5} bg="black" />
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}>
          <Box
            style={{
              flex: 0.5,
              flexDirection: 'row',
            }}>
            {/* add this many box */}
            <Box
              style={{
                borderRadius: 100,
                backgroundColor: 'white',
                width: 60,
                height: 60,
                borderWidth: 3,
                borderColor: '#8C84D4',
              }}
            />
          </Box>
        </ScrollView>
      </Box>
      {/* portion 2 ==> type or hash tag */}
      <Box
        style={{
          flex: 2.5,
          marginVertical: 10,
          paddingHorizontal: 20,
        }}>
        <Text fontSize={14} fontWeight={'medium'}>
          Types filter
        </Text>
        <Divider my={2.5} bg="black" />

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}>
          {/* one tag item grop box */}
          {/* loop this box for manyb tag */}
          <Box flexDirection={'column'}>
            {/* row 1 */}
            <Box flexDirection={'column'} alignItems={'center'} paddingTop={3}>
              <Box
                style={{
                  borderRadius: 100,
                  backgroundColor: 'white',
                  width: 40,
                  height: 40,
                  borderWidth: 3,
                  borderColor: '#8C84D4',
                }}
              />
              <Text fontSize={12} fontWeight={'normal'} color={'black'}>
                tag1
              </Text>
            </Box>
            {/* row 2 */}
            <Box flexDirection={'column'} alignItems={'center'} paddingTop={3}>
              <Box
                style={{
                  borderRadius: 100,
                  backgroundColor: 'white',
                  width: 40,
                  height: 40,
                  borderWidth: 3,
                  borderColor: '#8C84D4',
                }}
              />
              <Text fontSize={12} fontWeight={'normal'} color={'black'}>
                tag1
              </Text>
            </Box>
          </Box>
        </ScrollView>
      </Box>
      {/* portion 3 == tag filter */}
      <Box
        style={{
          flex: 5,
          flexDirection: 'column',
          paddingHorizontal: 20,
          paddingTop: 30,
        }}>
        <Text fontSize={14} fontWeight={'medium'}>
          Activities near me
        </Text>
        <Divider my={2.5} bg="black" marginBottom={5} />
        {/* copy this box to make column */}
        <Box flexDirection={'row'} justifyContent={'space-between'} marginY={4}>
          <TouchableOpacity
            // width={'250px'}
            // height={'40px'}>
            onPress={() => {
              // setSelectedGender({selectedGender: 'Male'});

              console.log('Pressable');
            }}>
            {/* this is activity component  */}
            <LinearGradient
              colors={['#FEDDE0', '#8172F7']}
              useAngle={true}
              angle={0}
              angleCenter={{x: 0.5, y: 0.5}}
              style={{
                flex: 3,
                paddingHorizontal: 14,
                paddingVertical: 20,
                borderRadius: 10,
                height: 220,
                width: 170,
                shadowColor: 'black',
                shadowOpacity: 0.5,
                shadowOffset: {width: 170, height: 5},
                flexDirection: 'column',
              }}>
              {/* <Image
                marginBottom={3}
                alt="key icon"
                source={require('../../assets/gender_icon.png')}
              /> */}
              <Text
                color={'#232259'}
                fontWeight={'bold'}
                fontSize={24}
                flex={0.8}
                alignContent={'center'}>
                Hello
              </Text>
              <Text
                flex={0.3}
                color={'#232259'}
                fontSize={10}
                fontWeight={'light'}>
                date time
              </Text>
              <Text
                paddingTop={3}
                flex={1.4}
                color={'#232259'}
                fontSize={12}
                fontWeight={'normal'}>
                Taken from the Latin words "dolorem ipsum", which translates to
                ...
              </Text>
              <Divider my={3} bg="white" opacity={0.5} />
              <Box
                flex={0.5}
                flexDirection={'row'}
                justifyContent={'space-between'}>
                <Text>start</Text>
                <Box
                  justifyContent={'center'}
                  alignItems={'center'}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 20,
                    width: 35,
                    height: 35,
                  }}>
                  <Text fontSize={12}>10+</Text>
                </Box>
              </Box>
            </LinearGradient>
          </TouchableOpacity>

          {/* column 2 */}
          <TouchableOpacity
            // width={'250px'}
            // height={'40px'}>
            onPress={() => {
              // setSelectedGender({selectedGender: 'Male'});

              console.log('Pressable');
            }}>
            {/* this is activity component  */}
            <LinearGradient
              colors={['#FFFDC3', '#6BB79D']}
              useAngle={true}
              angle={0}
              angleCenter={{x: 0.5, y: 0.5}}
              style={{
                flex: 3,
                paddingHorizontal: 14,
                paddingVertical: 20,
                borderRadius: 10,
                height: 220,
                width: 170,
                shadowColor: 'black',
                shadowOpacity: 0.5,
                shadowOffset: {width: 170, height: 5},
                flexDirection: 'column',
              }}>
              {/* <Image
                marginBottom={3}
                alt="key icon"
                source={require('../../assets/gender_icon.png')}
              /> */}
              <Text
                color={'#232259'}
                fontWeight={'bold'}
                fontSize={24}
                flex={0.8}
                alignContent={'center'}>
                Hello
              </Text>
              <Text
                flex={0.3}
                color={'#232259'}
                fontSize={10}
                fontWeight={'light'}>
                date time
              </Text>
              <Text
                paddingTop={3}
                flex={1.4}
                color={'#232259'}
                fontSize={12}
                fontWeight={'normal'}>
                Taken from the Latin words "dolorem ipsum", which translates to
                ...
              </Text>
              <Divider my={3} bg="white" opacity={0.5} />
              <Box
                flex={0.5}
                flexDirection={'row'}
                justifyContent={'space-between'}>
                <Text>start</Text>
                <Box
                  justifyContent={'center'}
                  alignItems={'center'}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 20,
                    width: 35,
                    height: 35,
                  }}>
                  <Text fontSize={12}>10+</Text>
                </Box>
              </Box>
            </LinearGradient>
          </TouchableOpacity>
        </Box>

        {/* row 2 */}
        <Box flexDirection={'row'} justifyContent={'space-between'}>
          <TouchableOpacity
            // width={'250px'}
            // height={'40px'}>
            onPress={() => {
              // setSelectedGender({selectedGender: 'Male'});

              console.log('Pressable');
            }}>
            {/* this is activity component  */}
            <LinearGradient
              colors={['#9FDDFB', '#FFAECB']}
              useAngle={true}
              angle={0}
              angleCenter={{x: 0.5, y: 0.5}}
              style={{
                flex: 3,
                paddingHorizontal: 14,
                paddingVertical: 20,
                borderRadius: 10,
                height: 220,
                width: 170,
                shadowColor: 'black',
                shadowOpacity: 0.5,
                shadowOffset: {width: 170, height: 5},
                flexDirection: 'column',
              }}>
              {/* <Image
                marginBottom={3}
                alt="key icon"
                source={require('../../assets/gender_icon.png')}
              /> */}
              <Text
                color={'#232259'}
                fontWeight={'bold'}
                fontSize={24}
                flex={0.8}
                alignContent={'center'}>
                Hello
              </Text>
              <Text
                flex={0.3}
                color={'#232259'}
                fontSize={10}
                fontWeight={'light'}>
                date time
              </Text>
              <Text
                paddingTop={3}
                flex={1.4}
                color={'#232259'}
                fontSize={12}
                fontWeight={'normal'}>
                Taken from the Latin words "dolorem ipsum", which translates to
                ...
              </Text>
              <Divider my={3} bg="white" opacity={0.5} />
              <Box
                flex={0.5}
                flexDirection={'row'}
                justifyContent={'space-between'}>
                <Text>start</Text>
                <Box
                  justifyContent={'center'}
                  alignItems={'center'}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 20,
                    width: 35,
                    height: 35,
                  }}>
                  <Text fontSize={12}>10+</Text>
                </Box>
              </Box>
            </LinearGradient>
          </TouchableOpacity>

          {/* column 2 */}
          <TouchableOpacity
            // width={'250px'}
            // height={'40px'}>
            onPress={() => {
              // setSelectedGender({selectedGender: 'Male'});

              console.log('Pressable');
            }}>
            {/* this is activity component  */}
            <LinearGradient
              colors={['#F4FF92', '#EF8B88']}
              useAngle={true}
              angle={0}
              angleCenter={{x: 0.5, y: 0.5}}
              style={{
                flex: 3,
                paddingHorizontal: 14,
                paddingVertical: 20,
                borderRadius: 10,
                height: 220,
                width: 170,
                shadowColor: 'black',
                shadowOpacity: 0.5,
                shadowOffset: {width: 170, height: 5},
                flexDirection: 'column',
              }}>
              {/* <Image
                marginBottom={3}
                alt="key icon"
                source={require('../../assets/gender_icon.png')}
              /> */}
              <Text
                color={'#232259'}
                fontWeight={'bold'}
                fontSize={24}
                flex={0.8}
                alignContent={'center'}>
                Hello
              </Text>
              <Text
                flex={0.3}
                color={'#232259'}
                fontSize={10}
                fontWeight={'light'}>
                date time
              </Text>
              <Text
                paddingTop={3}
                flex={1.4}
                color={'#232259'}
                fontSize={12}
                fontWeight={'normal'}>
                Taken from the Latin words "dolorem ipsum", which translates to
                ...
              </Text>
              <Divider my={3} bg="white" opacity={0.5} />
              <Box
                flex={0.5}
                flexDirection={'row'}
                justifyContent={'space-between'}>
                <Text>start</Text>
                <Box
                  justifyContent={'center'}
                  alignItems={'center'}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 20,
                    width: 35,
                    height: 35,
                  }}>
                  <Text fontSize={12}>10+</Text>
                </Box>
              </Box>
            </LinearGradient>
          </TouchableOpacity>
        </Box>
      </Box>

      <Button onPress={() => logout()}>btn</Button>
    </ScrollView>
  );
};

export default Home;
