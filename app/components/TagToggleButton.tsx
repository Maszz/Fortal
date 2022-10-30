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
  gc: string[];
}
const TagTooglebutton: FunctionComponent<TagTooglebuttonProps> = ({
  title,
  setTag,
  gc,
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
          marginHorizontal: 5,
          // borderColor: isToggled ? '#232259' : 'transparent',
          // borderWidth: 3,
        }}
        onPress={() => {
          setIsToggled(!isToggled);
        }}>
        <LinearGradient
          colors={
            isToggled
              ? gc // ? ['#3275F3', '#BD97FB', '#FFDFD8']
              : ['#C4C4C4', '#C4C4C4', '#C4C4C4']
          }
          useAngle={true}
          angle={90}
          angleCenter={{x: 0.5, y: 0.5}}
          style={{
            flex: 1,
            paddingLeft: 15,
            paddingRight: 15,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: 65,
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
