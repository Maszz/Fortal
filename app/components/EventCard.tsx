import {useSelector} from 'react-redux';
import {
  Pressable,
  HStack,
  VStack,
  Text,
  Divider,
  Box,
  View,
  ScrollView,
  Avatar,
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {RootState} from '../redux';
import {FunctionComponent, useState, useLayoutEffect, useRef} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleProp, ViewStyle} from 'react-native';
import {useEffect} from 'react';
export interface EventCardProps {
  //   event: Event;
  title: string;
  date: string;
  description: string;
  colors: string[];
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  avatarList: Array<{
    avatar: string | undefined;
  }>;
}
const EventCard: FunctionComponent<EventCardProps> = ({
  title,
  date,
  description,
  colors,
  style,
  onPress,
  avatarList,
}) => {
  const navigation = useSelector<
    RootState,
    RootState['navigation']['stackNavigation']
  >(state => state.navigation.stackNavigation);

  const [height, setHeight] = useState<number>(0);
  const [numOfline, setNumOfline] = useState<number>(1);

  return (
    <Box shadow={5}>
      <TouchableOpacity
        // width={'250px'}
        // height={'40px'}>
        style={style}
        onPress={() => {
          // setSelectedGender({selectedGender: 'Male'});
          console.log('Pressable');
          if (onPress) {
            onPress();
          }
        }}>
        {/* this is activity component  */}
        <LinearGradient
          colors={colors}
          useAngle={true}
          angle={0}
          angleCenter={{x: 0.5, y: 0.5}}
          style={{
            //   flex: 1,
            paddingHorizontal: 10,
            paddingVertical: 14,
            borderRadius: 10,
            height: 220,
            width: 170,
            flexDirection: 'column',
          }}>
          {/* <Image
                marginBottom={3}
                alt="key icon"
                source={require('../../assets/gender_icon.png')}
              /> */}
          <View
            height={145}
            width={'100%'}
            //   maxHeight={135}
          >
            <Box
              onLayout={e => {
                console.log(e.nativeEvent.layout.height);
                setHeight(height + e.nativeEvent.layout.height);
              }}>
              <Text
                color={'#232259'}
                fontWeight={'bold'}
                fontSize={24}
                numberOfLines={2}
                ellipsizeMode={'tail'}
                onTextLayout={e => {
                  setNumOfline(e.nativeEvent.lines.length);
                }}
                alignContent={'center'}>
                {title}
              </Text>
            </Box>
            <Box height={15} my={1}>
              <Text
                color={'#232259'}
                fontSize={10}
                fontWeight={'light'}
                numberOfLines={1}>
                {date}
              </Text>
            </Box>
            <Box height={144 - (height + 15)}>
              <Text
                // paddingTop={3}
                //   flex={1.4}

                bgColor={'amber.500'}
                color={'#232259'}
                fontSize={12}
                numberOfLines={numOfline == 1 ? 5 : 3}
                ellipsizeMode={'tail'}
                fontWeight={'normal'}>
                {description}
              </Text>
            </Box>
          </View>

          <Divider mb={2} mt={3} bg="white" opacity={0.5} />
          <Box
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}>
            <Text>start</Text>
            <HStack
              justifyContent={'space-between'}
              paddingLeft={'3%'}
              marginX={'1%'}
              marginY={'2%'}>
              <Avatar.Group
                _avatar={{
                  size: 'sm',
                  marginX: 0.5,
                  borderColor: '#8C84D4',
                  borderWidth: 1,
                }}
                max={3}>
                {avatarList.map((avatar, index) => (
                  <Avatar
                    source={
                      avatar.avatar
                        ? {uri: avatar.avatar}
                        : require('../assets/profileGroupPost_icon.png')
                    }
                  />
                ))}
                {/* <Avatar
                  source={require('../assets/profileGroupPost_icon.png')}
                />
                <Avatar
                  source={require('../assets/profileGroupPost_icon.png')}
                />
                <Avatar
                  source={require('../assets/profileGroupPost_icon.png')}
                />
                <Avatar
                  source={require('../assets/profileGroupPost_icon.png')}
                />
                <Avatar
                  source={require('../assets/profileGroupPost_icon.png')}
                />
                <Avatar
                  source={require('../assets/profileGroupPost_icon.png')}
                /> */}
              </Avatar.Group>
              {/* <Box
                backgroundColor={'#8C84D4'}
                maxWidth={'30%'}
                height={'80%'}
                borderRadius={'full'}>
                <Text
                  paddingX={2}
                  paddingTop={1}
                  textAlign={'center'}
                  fontSize={12}
                  fontWeight={'light'}
                  color={'white'}></Text>
              </Box> */}
            </HStack>
          </Box>
        </LinearGradient>
      </TouchableOpacity>
    </Box>
  );
};

export default EventCard;
