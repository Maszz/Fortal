import {Box, View, Center, Text, Image, Button} from 'native-base';
import {FunctionComponent} from 'react';
import {RegisterOnboardActivityProps} from '../types';
import {StyleSheet, TouchableOpacity, TouchableHighlight} from 'react-native';
import {SheetManager} from 'react-native-actions-sheet';
import LinearGradient from 'react-native-linear-gradient';

const RegisterOnboardActivity: FunctionComponent<
  RegisterOnboardActivityProps
> = ({navigation, route}) => {
  return (
    <View style={{flex: 1}}>
      <Box
        style={{
          flex: 0.15,
          justifyContent: 'flex-end',
          marginLeft: 35,
        }}>
        <Button style={{width: 53, height: 50}} variant="ghost">
          <Image
            marginBottom={3}
            alt="key icon"
            source={require('../assets/back_icon.png')}
          />
        </Button>
      </Box>
      <Box
        style={{
          flex: 0.15,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <Text fontSize={20} color={'#232259'} fontWeight={'medium'}>
          Pick your prefer activity you like
        </Text>
        <Text />
        <Text fontSize={16} color={'#232259'}>
          Tap once on your favorite genres
        </Text>
      </Box>
      <Box style={{flex: 0.08}} />
      <Box>
        <TouchableHighlight
          style={{width: 150, height: 45, borderRadius: 35}}
          onPress={() => {
            console.log('Pressable');
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
              borderRadius: 35,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text color={'white'} bold fontSize={16}>
              test button
            </Text>
          </LinearGradient>
        </TouchableHighlight>
      </Box>
    </View>
  );
};

export default RegisterOnboardActivity;
