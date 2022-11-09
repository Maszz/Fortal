import {FunctionComponent} from 'react';
import {
  View,
  Text,
  Box,
  HStack,
  Image,
  ZStack,
  Spacer,
  Center,
  TextArea,
  Divider,
  VStack,
  Button,
} from 'native-base';
import {StyleSheet, TouchableOpacity, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {border} from 'native-base/lib/typescript/theme/styled-system';
import {EventNameModal} from './createModal';
import {ProfileScreenProps} from '../types';
const ProfileScreen: FunctionComponent<ProfileScreenProps> = ({
  navigation,
  route,
}) => {
  return (
    <View flex={10} backgroundColor={'white'} paddingX={5}>
      <Box flex={3} paddingY={5}>
        <ZStack flex={1}>
          <LinearGradient
            colors={['#FEDDE0', '#8172F7']}
            useAngle={true}
            angle={0}
            angleCenter={{x: 0.5, y: 0.5}}
            style={{width: '100%', height: '90%', borderRadius: 20}}
          />
          <Box
            flex={1}
            flexDirection={'row'}
            marginTop={10}
            justifyContent={'space-between'}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                marginLeft={4}
                alt="key icon"
                source={require('../assets/back_icon.png')}
                tintColor={'white'}
              />
            </TouchableOpacity>
            <Spacer />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ProfileSettingScreen');
              }}>
              <Image
                marginRight={7}
                alt="key icon"
                source={require('../assets/dot_icon.png')}
                style={{tintColor: 'white'}}
              />
            </TouchableOpacity>
          </Box>
        </ZStack>
      </Box>
      <Box flex={1.5} marginTop={'-30%'} opacity={1} flexDirection={'row'}>
        <Image
          borderColor={'#8172F7'}
          borderWidth={4}
          borderRadius={'full'}
          marginLeft={4}
          alt="key icon"
          source={require('../assets/wonyoung_icon.png')}
          style={{
            transform: [{rotate: '-90deg'}],
          }}
        />
        <HStack
          flex={1}
          alignSelf={'flex-end'}
          justifyContent={'space-between'}
          marginLeft={4}
          marginRight={2}
          marginBottom={'5%'}>
          <Box
            justifyContent={'center'}
            backgroundColor={'white'}
            borderColor={'#8C84D4'}
            borderWidth={2}
            borderRadius={'full'}
            width={120}
            height={35}>
            <Text
              fontSize={14}
              fontWeight={'bold'}
              color={'#8C84D4'}
              textAlign={'center'}>
              Add friend
            </Text>
          </Box>
          <Box
            justifyContent={'center'}
            backgroundColor={'white'}
            borderColor={'#8C84D4'}
            borderWidth={2}
            borderRadius={'full'}
            width={60}
            height={35}>
            <Image
              alignSelf={'center'}
              alt="key icon"
              source={require('../assets/mail_icon.png')}
              style={{tintColor: '#8C84D4', transform: [{scale: 1.5}]}}
            />
          </Box>
        </HStack>
      </Box>
      <Box
        paddingTop={5}
        paddingX={5}
        flex={1}
        // backgroundColor={'blue.100'}
        flexDirection={'row'}
        justifyContent={'space-between'}>
        {/* 1 prop but 3 sata such as joied event follower followinf */}
        {/* each component has 2 similars prop are number(int) and name(string) */}
        {/* box 1 */}
        <Box>
          <Center>
            <Text fontSize={16} fontWeight={'normal'}>
              1
            </Text>
            <Text fontSize={16} fontWeight={'normal'}>
              Joined event
            </Text>
          </Center>
        </Box>
        {/* box 2 */}
        <Box>
          <Center>
            <Text fontSize={16} fontWeight={'normal'}>
              1,234
            </Text>
            <Text fontSize={16} fontWeight={'normal'}>
              Follower
            </Text>
          </Center>
        </Box>
        {/* box 3 */}
        <Box>
          <Center>
            <Text fontSize={16} fontWeight={'normal'}>
              55
            </Text>
            <Text fontSize={16} fontWeight={'normal'}>
              Following
            </Text>
          </Center>
        </Box>
      </Box>
      <Box flex={2.1} marginX={5}>
        <Text fontSize={32} fontWeight={'bold'}>
          User name
        </Text>
        <Box flexDirection={'row'} justifyContent={'space-between'}>
          <Text fontSize={14} fontWeight={'normal'} color={'#8B9093'}>
            Nickname
          </Text>
          <Box flexDirection={'row'}>
            <Text fontSize={14} fontWeight={'normal'} color={'#8B9093'}>
              rating
            </Text>
            <Image
              marginLeft={5}
              alignSelf={'center'}
              alt="key icon"
              source={require('../assets/star_icon.png')}
            />
          </Box>
        </Box>
        <Divider my={2} opacity={0} />
        <Text
          textAlign={'justify'}
          fontSize={14}
          fontWeight={'normal'}
          color={'#232259'}>
          Taken from the Latin words "dolorem ipsum", which translates to "pain
          itself", Lorem Ipsum text saw a revival in the mid-20th century as
        </Text>
      </Box>
      <Box flex={1.2} paddingX={2} marginBottom={'30%'}>
        <Text fontSize={12} fontWeight={'normal'}>
          interested event
        </Text>
        <Divider my={2} opacity={0} />
        {/* tag loop */}
        <VStack flex={1}>
          <HStack flex={1}>
            <Box
              borderRadius={'full'}
              height={25}
              width={45}
              justifyContent={'center'}
              alignContent={'center'}
              // get input color props
              backgroundColor={'salmon'}>
              <Text
                textAlign={'center'}
                fontSize={10}
                fontWeight={'normal'}
                tintColor={'bluegray.500'}
                opacity={0.8}
                //   get text tittle props
              >
                #cafe
              </Text>
            </Box>
          </HStack>
          <HStack flex={1}>
            <Box
              borderRadius={'full'}
              height={25}
              width={45}
              justifyContent={'center'}
              alignContent={'center'}
              // get input color props
              backgroundColor={'#99AAD4'}>
              <Text
                textAlign={'center'}
                fontSize={10}
                fontWeight={'normal'}
                tintColor={'bluegray.500'}
                opacity={0.8}
                //   get text tittle props
              >
                #cafe
              </Text>
            </Box>
          </HStack>
        </VStack>
      </Box>
      {/* <Box
        flex={1.2}
        // backgroundColor={'#F5F5F5'}
        justifyContent={'center'}
        alignContent={'center'}
        marginBottom={'10%'}>
        <HStack
          justifyContent={'space-between'}
          alignContent={'center'}
          marginX={'32%'}>
          {/* select new beautifull image icon */}
      {/* <Image
            backgroundColor={'blue.500'}
            borderRadius={'full'}
            width={30}
            height={30}
            alt="key icon"
            source={require('../assets/facebook_icon.png')}
          />
          <Image
            backgroundColor={'lightblue'}
            borderRadius={'full'}
            width={30}
            height={30}
            alt="key icon"
            source={require('../assets/twitter_icon.png')}
          />
          <Image
            backgroundColor={'salmon'}
            borderRadius={'full'}
            width={31}
            height={30}
            alt="key icon"
            tintColor={'white'}
            source={require('../assets/mail_icon.png')}
          />
        </HStack>
      </Box> */}
    </View>
  );
};
export default ProfileScreen;
