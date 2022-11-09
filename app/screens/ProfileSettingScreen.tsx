import {View, Text, Box, HStack, Image, Divider, VStack} from 'native-base';
import {FunctionComponent} from 'react';
import {ProfileSettingScreenProps} from '../types';
import {TouchableOpacity} from 'react-native';
const ProfileSettingScreen: FunctionComponent<ProfileSettingScreenProps> = ({
  navigation,
}) => {
  return (
    <View flex={10} backgroundColor={'white'}>
      <Box
        flex={1.2}
        backgroundColor={'white'}
        shadow={2}
        justifyContent={'flex-end'}>
        <Box
          marginX={36}
          marginBottom={3}
          flexDirection={'row'}
          justifyContent={'space-between'}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              width={30}
              height={24.36}
              alt="key icon"
              source={require('../assets/back_icon.png')}
              tintColor={'#232259'}
            />
          </TouchableOpacity>
          <Text fontSize={16} color={'#232259'} fontWeight={'bold'}>
            Profile setting
          </Text>
          <Image alt="key icon" source={require('../assets/gear_icon.png')} />
        </Box>
      </Box>
      <Box flex={8.8} marginX={36}>
        <VStack>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProfileSettingEditScreen');
            }}>
            <Box
              flexDirection={'row'}
              justifyContent={'space-between'}
              marginTop={5}>
              <Text fontSize={16} color={'#283952'} fontWeight={'normal'}>
                Edit profile
              </Text>
              <Image
                alignSelf={'center'}
                alt="key icon"
                source={require('../assets/edit_icon.png')}
              />
            </Box>
          </TouchableOpacity>
          <Divider my={2} />
          <Box
            flexDirection={'row'}
            justifyContent={'space-between'}
            marginTop={5}>
            <Text fontSize={16} color={'#283952'} fontWeight={'normal'}>
              My information
            </Text>
            <Image
              alignSelf={'center'}
              alt="key icon"
              source={require('../assets/closedBell_icon.png')}
            />
          </Box>
          <Divider my={2} />
        </VStack>
      </Box>
    </View>
  );
};
export default ProfileSettingScreen;
