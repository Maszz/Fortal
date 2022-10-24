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
export interface GradientButtonProps {
  onPress: () => void;
  text: string;
}
const GradientButton: FunctionComponent<GradientButtonProps> = ({
  onPress,
  text,
}) => {
  return (
    <TouchableOpacity
      style={{width: 250, height: 40}}
      // width={'250px'}
      // height={'40px'}>
      onPress={onPress}>
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
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;
