import {Box, View, Center, Text, Image} from 'native-base';
import {FunctionComponent, useState} from 'react';
import {RegisterOnboardGenderProps} from '../types';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {SheetManager} from 'react-native-actions-sheet';
import LinearGradient from 'react-native-linear-gradient';
import {useAuth} from '../hooks/useAuth';
import GenderButton from '../components/GenderButton';
import {useTranslation} from 'react-i18next';

const RegisterOnBoardGender: FunctionComponent<RegisterOnboardGenderProps> = ({
  navigation,
  route,
}) => {
  const {updateOnboardingGender} = useAuth();
  const [selectedGender, setSelectedGender] = useState({selectedGender: ''});
  const {t} = useTranslation();
  // t('registerActionsSheet:username'
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Box style={{flex: 0.2}} />
      <Box style={{flex: 0.1}}>
        <Center>
          <Text fontSize={32} fontWeight={'medium'} color={'#232259'}>
            {t('onboardingGender:gender')}
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
        <GenderButton
          title={t('onboardingGender:male')}
          value={'Male'}
          onPress={v => {
            setSelectedGender(prev => {
              if (prev.selectedGender === v) {
                return {selectedGender: ''};
              }
              return {selectedGender: v};
            });
            console.log('Pressableasd');
          }}
          selected={selectedGender.selectedGender === 'Male'}
          selectedColor={['#FFFFFF', '#8CDFFF', '#4879F6']}
        />
        <GenderButton
          title={t('onboardingGender:female')}
          value={'Female'}
          onPress={v => {
            setSelectedGender(prev => {
              if (prev.selectedGender === v) {
                return {selectedGender: ''};
              }
              return {selectedGender: v};
            });
            console.log('Pressableasd');
          }}
          selected={selectedGender.selectedGender === 'Female'}
          selectedColor={['#ffffff', '#FFEDD1', '#FFA3C4']}
        />
      </Box>
      <Box
        style={{
          flex: 0.25,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginRight: 55,
          marginLeft: 55,
        }}>
        <GenderButton
          title={t('onboardingGender:lgbtQ')}
          value={'LGBTQ+'}
          onPress={v => {
            setSelectedGender(prev => {
              if (prev.selectedGender === v) {
                return {selectedGender: ''};
              }
              return {selectedGender: v};
            });
            console.log('Pressableasd');
          }}
          selected={selectedGender.selectedGender === 'LGBTQ+'}
          selectedColor={['#8172F7', '#55BEF0', '#EEE696', '#EF8B88']}
        />
        <GenderButton
          title={t('onboardingGender:other')}
          value={'Other'}
          onPress={v => {
            setSelectedGender(prev => {
              if (prev.selectedGender === v) {
                return {selectedGender: ''};
              }
              return {selectedGender: v};
            });
            console.log('Pressableasd');
          }}
          selected={selectedGender.selectedGender === 'Other'}
          selectedColor={['#FFFFFF', '#D1D1D1', '#8B9093']}
        />
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
