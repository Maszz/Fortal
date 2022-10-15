import {View, Text, VStack, Image, ZStack, Box, Button} from 'native-base';
import type {StackScreenProps} from '@react-navigation/stack';
import type {StackScreenParams} from '../types';
import {FunctionComponent, useEffect} from 'react';
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {LoginScreenProps} from '../types';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet} from 'react-native';
const LoginScreen: FunctionComponent<LoginScreenProps> = ({
  navigation,
  route,
}) => {
  return (
    <View style={{flex: 1}}>
      <ZStack>
        <Image source={require('../assets/fortal_bg.png')}></Image>
      </ZStack>
      <Box style={{flex: 1}}></Box>
      <Box style={{flex: 2, flexDirection: 'row'}}>
        <Box style={{flexBasis: 50}}></Box> {/**empty tab */}
        <Box>
          <Image
            source={require('../assets/logo.png')}
            width={'80px'}
            height={'59px'}></Image>
          <Text></Text>
          <Text bold fontSize={24} color={'white'}>
            Welcome to
          </Text>
          <Text bold fontSize={25} color={'white'}>
            FORTAL
          </Text>
        </Box>
      </Box>
      <Box style={{flex: 2}}>fsd</Box>
      <Box style={{flex: 2}}>
        <Box alignItems="center">
          <Button
            onPress={() => console.log('hello world')}
            rounded={20}
            width={'250px'}
            height={'40px'}>
            <Text color={'white'} bold fontSize={16}>
              Sign In
            </Text>
          </Button>
          <LinearGradient colors={['#00000', '#fffff']}>
            {/* <Button
              backgroundColor={'white'}
              onPress={() => console.log('hello world')}
              rounded={20}
              width={'250px'}
              height={'40px'}>
              <Text color={'#4879F6'} bold fontSize={16}>
                Sign In
              </Text>
            </Button> */}
          </LinearGradient>
        </Box>
      </Box>
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
