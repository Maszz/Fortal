import {FunctionComponent} from 'react';
import {View, Text, Divider, Box, ScrollView} from 'native-base';
import {HomeScreenTypes} from '../../types';
import {StyleSheet, TouchableOpacity, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const FavoriteScreen: FunctionComponent<
  HomeScreenTypes.FavoriteScreenProps
> = () => {
  return (
    <ScrollView
      horizontal={false}
      showsHorizontalScrollIndicator={false}
      pagingEnabled={true}
      backgroundColor={'white'}>
      <Box paddingX={5} paddingY={5}>
        <Text fontSize={14} fontWeight={'normal'}>
          Joing
        </Text>
        <Divider my={4} />
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}>
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
                  Taken from the Latin words "dolorem ipsum", which translates
                  to ...
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
        </ScrollView>
      </Box>
      <Box paddingX={5} paddingY={5}>
        <Text fontSize={14} fontWeight={'normal'}>
          History
        </Text>
        <Divider my={4} />
        {/* this column, activities component is simila to "Activities near me" in home.tsx */}
        {/* Do not forget to add activities component */}
      </Box>
    </ScrollView>
  );
};
export default FavoriteScreen;
