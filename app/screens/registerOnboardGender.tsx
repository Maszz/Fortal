import {Box, View, Center, Text, Image} from 'native-base';
import {FunctionComponent, useState} from 'react';
import {RegisterOnboardGenderProps} from '../types';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {SheetManager} from 'react-native-actions-sheet';
import LinearGradient from 'react-native-linear-gradient';
import {useAuth} from '../hooks/useAuth';
const RegisterOnBoardGender: FunctionComponent<RegisterOnboardGenderProps> = ({
  navigation,
  route,
}) => {
  const {updateOnboardingGender} = useAuth();
  const [selectedGender, setSelectedGender] = useState({selectedGender: ''});
  return (
    <View style={{flex: 1}}>
      <Box style={{flex: 0.2}} />
      <Box style={{flex: 0.1}}>
        <Center>
          <Text fontSize={32} fontWeight={'medium'} color={'#232259'}>
            Gender
          </Text>
        </Center>
      </Box>
      <Box
        style={{
          flex: 0.25,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginRight: 55,
          marginLeft: 55,
        }}>
        {/* button tag */}
        <TouchableOpacity
          style={{
            width: 100,
            height: 120,
            shadowColor: 'black',
            shadowOffset: {width: 2, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 1,
            elevation: 0.5,
            borderWidth: 7,
            borderRadius: 20,
            borderColor:
              selectedGender.selectedGender === 'Male'
                ? '#BD97FB'
                : 'transparent',
          }}
          // width={'250px'}
          // height={'40px'}>
          onPress={() => {
            setSelectedGender({selectedGender: 'Male'});
            console.log('Pressable');
          }}>
          <LinearGradient
            colors={['#FFFFFF', '#8CDFFF', '#4879F6']}
            useAngle={true}
            angle={0}
            angleCenter={{x: 0.5, y: 0.65}}
            style={{
              flex: 1,
              paddingLeft: 15,
              paddingRight: 15,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              marginBottom={3}
              alt="key icon"
              source={require('../assets/gender_icon.png')}
            />
            <Text color={'#232259'} fontWeight={'medium'} fontSize={16}>
              Male
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 100,
            height: 120,
            shadowColor: 'black',
            shadowOffset: {width: 2, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 1,
            elevation: 0.5,
            borderRadius: 20,
            borderWidth: 7,
            borderColor:
              selectedGender.selectedGender === 'Female'
                ? '#BD97FB'
                : 'transparent',
          }}
          // width={'250px'}
          // height={'40px'}>
          onPress={() => {
            setSelectedGender({selectedGender: 'Female'});
            console.log('Pressable');
          }}>
          <LinearGradient
            colors={['#ffffff', '#FFEDD1', '#FFA3C4']}
            useAngle={true}
            angle={0}
            angleCenter={{x: 0.5, y: 0.65}}
            style={{
              flex: 1,
              paddingLeft: 15,
              paddingRight: 15,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              marginBottom={3}
              alt="key icon"
              source={require('../assets/gender_icon.png')}
            />
            <Text color={'#232259'} fontWeight={'medium'} fontSize={16}>
              Female
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </Box>
      <Box
        style={{
          flex: 0.25,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginRight: 55,
          marginLeft: 55,
        }}>
        <TouchableOpacity
          style={{
            width: 100,
            height: 120,
            shadowColor: 'black',
            shadowOffset: {width: 2, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 1,
            elevation: 0.5,
            borderRadius: 20,
            borderWidth: 7,
            borderColor:
              selectedGender.selectedGender === 'LGTBQ+'
                ? '#BD97FB'
                : 'transparent',
          }}
          // width={'250px'}
          // height={'40px'}>
          onPress={() => {
            setSelectedGender({selectedGender: 'LGTBQ+'});
            console.log('Pressable');
          }}>
          <LinearGradient
            colors={['#8172F7', '#55BEF0', '#EEE696', '#EF8B88']}
            useAngle={true}
            angle={0}
            angleCenter={{x: 0.5, y: 0.5}}
            style={{
              flex: 1,
              paddingLeft: 15,
              paddingRight: 15,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              marginBottom={3}
              alt="key icon"
              source={require('../assets/gender_icon.png')}
            />
            <Text color={'#232259'} fontWeight={'medium'} fontSize={13}>
              LGBTQ+
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 100,
            height: 120,
            shadowColor: 'black',
            shadowOffset: {width: 2, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 1,
            elevation: 0.5,
            borderRadius: 20,
            borderWidth: 7,
            borderColor:
              selectedGender.selectedGender === 'None'
                ? '#BD97FB'
                : 'transparent',
          }}
          // width={'250px'}
          // height={'40px'}>
          onPress={() => {
            setSelectedGender({selectedGender: 'None'});
            console.log('pressed');
          }}>
          <LinearGradient
            colors={['#FFFFFF', '#D1D1D1', '#8B9093']}
            useAngle={true}
            angle={0}
            angleCenter={{x: 0.5, y: 0.65}}
            style={{
              flex: 1,
              paddingLeft: 15,
              paddingRight: 15,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              marginBottom={3}
              alt="key icon"
              source={require('../assets/gender_icon.png')}
            />
            <Text color={'#232259'} fontWeight={'medium'} fontSize={16}>
              None
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </Box>
      <Box style={{flex: 0.09}}>
        <Center style={{flexDirection: 'row'}}>
          <Box
            style={{
              width: 11,
              height: 11,
              backgroundColor: '#A55EDA',
              borderRadius: 10,
              marginRight: 10,
            }}
          />
          <Box
            style={{
              width: 11,
              height: 11,
              backgroundColor: '#A8B0C5',
              borderRadius: 10,
            }}
          />
        </Center>
      </Box>
      <Box style={{flex: 0.2, alignItems: 'center'}}>
        <TouchableOpacity
          style={{width: 250, height: 40}}
          // width={'250px'}
          // height={'40px'}>
          onPress={async () => {
            updateOnboardingGender(selectedGender.selectedGender);
            navigation.navigate('Onboard2');
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
              Next
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </Box>
    </View>
  );
};

export default RegisterOnBoardGender;
