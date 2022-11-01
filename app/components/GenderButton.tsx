import {Button, Image, IButtonProps, Text} from 'native-base';
import {FunctionComponent} from 'react';
import {ViewStyle, StyleProp, ImageStyle} from 'react-native';
import {ImageButtonProps} from '../types';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

export interface GenderButtonProps {
  onPress: (title: string) => void;
  selected: boolean;
  title: string;
  selectedColor: string[];
  containerStyle?: StyleProp<ViewStyle>;
}
const GenderButton: FunctionComponent<GenderButtonProps> = ({
  selected,
  onPress,
  title,
  selectedColor,
  containerStyle = {
    width: 100,
    height: 120,
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 0.5,
  },
}) => {
  return (
    <TouchableOpacity
      style={containerStyle}
      // width={'250px'}
      // height={'40px'}>
      onPress={() => {
        // setSelectedGender({selectedGender: 'Male'});
        onPress(title);
        console.log('Pressable');
      }}>
      <LinearGradient
        colors={selected ? selectedColor : ['#FFFFFF', '#D1D1D1', '#8B9093']}
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
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GenderButton;
