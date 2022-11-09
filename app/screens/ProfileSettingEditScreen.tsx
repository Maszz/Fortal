import {
  View,
  Text,
  Image,
  Box,
  ZStack,
  HStack,
  VStack,
  Spacer,
  Divider,
  Center,
  Input,
  TextArea,
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {FunctionComponent} from 'react';
import {ProfileSettingEditScreenProps} from '../types';
import {TouchableOpacity, Alert} from 'react-native';
import {useState} from 'react';
import {useGetSearchItemUserByUsernameQuery} from '../redux/apis';
import {useAuth} from '../hooks/useAuth';
import {useUpdateUserProfileMutation, ErrorResponse} from '../redux/apis';
import {useEffect} from 'react';
export interface UserEditFormInput {
  displayName: string;
  bio: string;
  username: string;
  isPulbic: boolean;
}
const ProfileSettingEditScreen: FunctionComponent<
  ProfileSettingEditScreenProps
> = () => {
  const {user, updateUsername} = useAuth();
  const {data, isLoading} = useGetSearchItemUserByUsernameQuery(user.username);
  const [updateUserProfile, resultUpdateUserProfile] =
    useUpdateUserProfileMutation();
  const [userFormInput, setUserFormInput] = useState<UserEditFormInput>({
    displayName: data?.profile?.displayName || '',
    bio: data?.profile?.bio || '',
    username: data?.username || '',
    isPulbic: false,
  } as UserEditFormInput);

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
            justifyContent={'space-between'}
            marginX={7}>
            <TouchableOpacity
              onPress={() => {
                console.log(userFormInput);
                updateUserProfile({
                  username: userFormInput.username,
                  profile: {
                    displayName: userFormInput.displayName,
                    bio: userFormInput.bio,
                  },
                  cUsername: user.username,
                })
                  .unwrap()
                  .then(v => {
                    console.log('update success');
                    console.log(v);
                    if (v.updateUsername) {
                      console.log('update username success');
                      updateUsername(v.profile.username);
                    } else {
                      console.log('usernaem do not change');
                    }
                  })
                  .catch(err => {
                    const result = (err as ErrorResponse).data;
                    console.log(result);
                    if (result.message === 'this username is already taken') {
                      console.log('this username is already taken');
                      Alert.alert(
                        'this username is already taken ,Plesae try again with another username',
                      );
                    }
                  });
              }}>
              <Text color={'white'} fontSize={20} fontWeight={'bold'}>
                Done
              </Text>
            </TouchableOpacity>
            <Spacer />

            {/* <Image
              alt="key icon"
              source={require('../assets/dot_icon.png')}
              style={{tintColor: 'white'}}
            /> */}
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
          marginLeft={'20%'}
          marginBottom={'10%'}>
          <TouchableOpacity
            onPress={() => {
              console.log('change profile image');
            }}>
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
                Public
              </Text>
            </Box>
          </TouchableOpacity>
        </HStack>
      </Box>

      <Box flex={2.1} marginX={5}>
        <Input
          placeholder="User name"
          placeholderTextColor={'#232259'}
          fontSize={28}
          fontWeight={'bold'}
          variant={'filled'}
          backgroundColor={'#F3F3F3'}
          borderRadius={15}
          width={320}
          height={45}
          paddingX={3}
          marginBottom={5}
          value={userFormInput.username}
          onChangeText={text => {
            setUserFormInput({...userFormInput, username: text});
          }}
        />
        <Box flexDirection={'row'} justifyContent={'space-between'}>
          <Input
            placeholder="Nickname"
            placeholderTextColor={'#8B9093'}
            variant={'filled'}
            fontSize={12}
            fontWeight={'normal'}
            backgroundColor={'#F3F3F3'}
            borderRadius={'full'}
            width={150}
            height={30}
            justifyContent={'center'}
            paddingX={3}
            value={userFormInput.displayName}
            onChangeText={text => {
              setUserFormInput({...userFormInput, displayName: text});
            }}
          />
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
        <TextArea
          placeholder="Taken from the Latin words  dolorem ipsum , which translates to  pain
          itself , Lorem Ipsum text saw a revival in the mid-20th century as"
          placeholderTextColor={'#8B9093'}
          variant={'filled'}
          fontSize={14}
          textAlign={'justify'}
          fontWeight={'normal'}
          backgroundColor={'#F3F3F3'}
          borderRadius={15}
          width={320}
          height={'40%'}
          value={userFormInput.bio}
          onChangeText={text => {
            setUserFormInput({...userFormInput, bio: text});
          }}
          paddingX={3}
          autoCompleteType
        />
      </Box>
      <Box flex={1.5} paddingX={2} paddingTop={5} marginBottom={'30%'}>
        <Text fontSize={12} fontWeight={'normal'}>
          interested event
        </Text>
        <Divider my={2} opacity={0} />
        {/* tag loop */}
        <HStack marginBottom={2} alignContent={'center'}>
          <Box
            borderRadius={'full'}
            height={37}
            width={37}
            justifyContent={'center'}
            backgroundColor={'#BFBFBF'}>
            <Image
              alignSelf={'center'}
              alt="key icon"
              source={require('../assets/plus_icon.png')}
              style={{tintColor: 'white', transform: [{scale: 0.6}]}}
            />
          </Box>
          <Box
            marginX={2}
            borderRadius={'full'}
            height={25}
            width={45}
            alignSelf={'center'}
            justifyContent={'center'}
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
        {/* <HStack flex={1}>
          <Box
            borderRadius={'full'}
            height={25}
            width={45}
            justifyContent={'center'}
            alignSelf={'center'}
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
        </HStack> */}
      </Box>
    </View>
  );
};
export default ProfileSettingEditScreen;
