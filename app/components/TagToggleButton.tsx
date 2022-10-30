import {
  Box,
  View,
  Center,
  Text,
  Image,
  Button,
  HStack,
  Heading,
  Spinner,
  ZStack,
  Container,
} from 'native-base';
import {StyleSheet, TouchableOpacity, TouchableHighlight} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {FunctionComponent, useState, useEffect, useCallback} from 'react';
export interface TagTooglebuttonProps {
  title: string;
  setTag: (value: boolean) => void;
}
const TagTooglebutton: FunctionComponent<TagTooglebuttonProps> = ({
  title,
  setTag,
}) => {
  const [isToggled, setIsToggled] = useState(false);
  useEffect(() => {
    setTag(isToggled);
  }, [isToggled]);
  return (
    <Container>
      <TouchableHighlight
        style={{
          height: 45,
          borderRadius: 35,
          borderColor: isToggled ? '#232259' : 'transparent',
          borderWidth: 3,
        }}
        onPress={() => {
          setIsToggled(!isToggled);
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
            {title}
          </Text>
        </LinearGradient>
      </TouchableHighlight>
    </Container>
  );
};
export default TagTooglebutton;
