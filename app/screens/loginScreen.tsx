import {
  View,
  Text,
  VStack,
  Image,
  ZStack,
  Box,
  Button,
  Pressable,
} from 'native-base';
import type {StackScreenProps} from '@react-navigation/stack';
import type {StackScreenParams} from '../types';
import {FunctionComponent, useEffect} from 'react';
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {LoginScreenProps} from '../types';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {SheetManager} from 'react-native-actions-sheet';
import {useTranslation} from 'react-i18next';
import {Dimensions} from 'react-native';
import GradientButton from '../components/GradientButton';
const LoginScreen: FunctionComponent<LoginScreenProps> = ({
  navigation,
  route,
}) => {
  const {t} = useTranslation();
  const windowHeight = Dimensions.get('window').height;
  return (
    <View style={{flex: 1}}>
      <ZStack>
        <Image
          source={require('../assets/fortal_bg.png')}
          alt={'bg'}
          width={'100%'}
          height={windowHeight}></Image>
      </ZStack>
      <Box style={{flex: 1}}></Box>
      <Box style={{flex: 2, flexDirection: 'row'}}>
        <Box style={{flexBasis: 50}} />
        <Box>
          <Image
            source={require('../assets/logo.png')}
            width={'80px'}
            height={'59px'}
            alt={'logo'}
          />
          <Text />
          <Text bold fontSize={24} color={'white'}>
            {t('loginScreen:welcome')}
            {'\n'}
            {t('loginScreen:fortal')}
          </Text>
        </Box>
      </Box>
      <Box style={{flex: 2}} />
      <Box style={{flex: 1}}>
        <Box alignItems="center" justifyContent={'space-between'} flex={1}>
          <GradientButton
            onPress={() => {
              SheetManager.show('login-sheet', {
                payload: {
                  id: 'login-sheet',
                  navigation: navigation,
                },
              });
            }}
            text={t('loginScreen:signin')}
          />
          <TouchableOpacity
            onPress={() =>
              SheetManager.show('register-sheet', {
                payload: {
                  id: 'login-sheet',
                  navigation: navigation,
                },
              })
            }
            style={{
              width: 250,
              height: 40,
              borderRadius: 25,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            // rounded={20}
            // width={'250px'}
            // height={'40px'}
            // backgroundColor={'white'}
            // alignItems={'center'}
            // justifyContent={'center'}
          >
            <Text color={'#4879F6'} bold fontSize={16}>
              {t('loginScreen:signup')}
            </Text>
          </TouchableOpacity>
        </Box>
      </Box>
      <Box style={{flex: 1}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  view1: {
    flex: 1,
    backgroundColor: 'red',
  },
});
export default LoginScreen;
