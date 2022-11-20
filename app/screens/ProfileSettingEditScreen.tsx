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
  Modal,
  Button,
  KeyboardAvoidingView,
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {FunctionComponent} from 'react';
import {ProfileSettingEditScreenProps} from '../types';
import {TouchableOpacity, Alert} from 'react-native';
import {useState} from 'react';
import {useGetSearchItemUserByUsernameMutation} from '../redux/apis';
import {useAuth} from '../hooks/useAuth';
import {useUpdateUserProfileMutation, ErrorResponse} from '../redux/apis';
import {useEffect, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {setLoadingAction} from '../redux/reducers/navigation';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Config} from '../env';
import {useFocusEffect} from '@react-navigation/native';
import {Platform, Keyboard, LayoutAnimation} from 'react-native';

export interface UserEditFormInput {
  displayName: string;
  bio: string;
  username: string;
  isProfilePublic: boolean;
}
const ProfileSettingEditScreen: FunctionComponent<
  ProfileSettingEditScreenProps
> = ({navigation}) => {
  const {user, updateUsername} = useAuth();
  const [getData, {data, isLoading}] = useGetSearchItemUserByUsernameMutation();

  const [updateUserProfile, resultUpdateUserProfile] =
    useUpdateUserProfileMutation();
  const [userFormInput, setUserFormInput] = useState<UserEditFormInput>({
    displayName: data?.profile?.displayName,
    bio: data?.profile?.bio,
    username: data?.username,
    isProfilePublic: data?.profile?.isProfilePublic,
  } as UserEditFormInput);
  const [modalOpen, setModalOpen] = useState(false);
  const [tags, setTags] = useState<string[]>(data?.categories || []);
  const [newTags, setNewTags] = useState<string[]>([]);
  const [deletedTags, setDeletedTags] = useState<string[]>([]);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [height, setHeight] = useState<number | string>('40%');

  const [imageBuff, setImageBuff] = useState<
    | {
        uri: string;
        type: string;
        name: string;
      }
    | undefined
  >(undefined);
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      const keyboardShowListener = Keyboard.addListener(
        'keyboardWillShow',
        e => {
          LayoutAnimation.easeInEaseOut();
          setHeight('25%');
        },
      );

      const keyboardHideListener = Keyboard.addListener(
        'keyboardWillHide',
        e => {
          console.log('e', e);
          LayoutAnimation.easeInEaseOut();
          setHeight('40%');
        },
      );

      return () => {
        keyboardShowListener.remove();
        keyboardHideListener.remove();
      };
    }, []),
  );
  useEffect(() => {
    console.log(user);
    console.log('data', data);
    if (!isMounted) {
      dispatch(setLoadingAction(true));
      console.log('user', user);
      setIsMounted(true);
      getData(user?.username)
        .unwrap()
        .then(res => {
          setUserFormInput({
            displayName: res.profile?.displayName,
            bio: res.profile?.bio,
            username: res.username,
            isProfilePublic: res.profile?.isProfilePublic,
          } as UserEditFormInput);
          setTags(res.categories || []);
          console.log('res', res);

          if (res?.profile?.avarar === null) {
            setImage(undefined);
          } else {
            setImage(Config.apiBaseUrl + res?.profile?.avarar);
          }
          console.log(data);
          dispatch(setLoadingAction(false));
        });
    }

    // console.log('tags: ', tags);
    // console.log('newTags: ', newTags);
    // console.log('deletedTags: ', deletedTags);
    // console.log('isProfilePublic: ', userFormInput.isProfilePublic);
  }, []);

  return (
    <View flex={10} backgroundColor={'white'} paddingX={5}>
      <Box height={height} paddingY={5}>
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
                    isProfilePublic: userFormInput.isProfilePublic,
                  },
                  newTags: newTags,
                  removeTags: deletedTags,
                  cUsername: user.username,
                })
                  .unwrap()
                  .then(v => {
                    console.log('update success');
                    console.log(v);
                    const data = new FormData();
                    data.append('userId', user.username);
                    if (imageBuff) {
                      data.append('fileData', {
                        uri: imageBuff?.uri || '',
                        type: imageBuff?.type || '',
                        name: imageBuff?.name || '',
                      });
                    }
                    const config = {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                      },
                      body: data,
                    };
                    fetch(
                      'http://192.168.1.150:3333/firebase/' + 'upload',
                      config,
                    )
                      .then(checkStatusAndGetJSONResponse => {
                        console.log(checkStatusAndGetJSONResponse);
                      })
                      .catch(err => {
                        console.log(err);
                      });

                    if (v.updateUsername) {
                      console.log('update username success');
                      updateUsername(v.profile.username);
                    } else {
                      console.log('usernaem do not change');
                    }
                    navigation.goBack();
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
        <TouchableOpacity
          onPress={() => {
            launchImageLibrary(
              {mediaType: 'photo', selectionLimit: 1, quality: 0.4},
              response => {
                console.log('Response = ', response);

                if (response.didCancel) {
                  console.log('User cancelled image picker');
                } else if (response.errorMessage) {
                  console.log('ImagePicker Error: ', response.errorMessage);
                } else {
                  console.log(
                    'User selected a file form camera or gallery',
                    response,
                  );
                  if (response.assets) {
                    setImageBuff({
                      uri: response?.assets[0].uri || '',
                      type: response?.assets[0].type || '',
                      name: response?.assets[0].fileName || '',
                    });
                    setImage(response?.assets[0].uri);
                  }
                }
              },
            );
          }}>
          <Image
            borderColor={'#8172F7'}
            borderWidth={4}
            borderRadius={'full'}
            marginLeft={4}
            w={120}
            h={120}
            alt="key icon"
            source={
              image ? {uri: image} : require('../assets/wonyoung_icon.png')
            }
          />
        </TouchableOpacity>
        <HStack
          flex={1}
          alignSelf={'flex-end'}
          marginLeft={'20%'}
          marginBottom={'10%'}>
          <TouchableOpacity
            onPress={() => {
              console.log('change profile image');
              setUserFormInput({
                ...userFormInput,
                isProfilePublic: !userFormInput.isProfilePublic,
              });
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
                {userFormInput?.isProfilePublic ? 'Public' : 'Private'}
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
        <HStack marginBottom={2} alignContent={'center'} flexWrap={'wrap'}>
          <TouchableOpacity
            style={{marginBottom: 5}}
            onPress={() => {
              setModalOpen(true);
            }}>
            <Box
              borderRadius={'full'}
              height={37}
              width={37}
              mr={2}
              justifyContent={'center'}
              alignSelf={'center'}
              backgroundColor={'#BFBFBF'}>
              <Image
                alignSelf={'center'}
                alt="key icon"
                source={require('../assets/plus_icon.png')}
                style={{tintColor: 'white', transform: [{scale: 0.6}]}}
              />
            </Box>
          </TouchableOpacity>

          {/* <Box
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
            
          </Box> */}
          {tags.map((interest: string, index: number) => {
            return (
              <TouchableOpacity
                style={{alignSelf: 'center'}}
                key={index}
                onPress={() => {
                  Alert.alert(
                    'Are your sure?',
                    'Are you sure you want to remove this interested tags?',
                    [
                      // The "Yes" button
                      {
                        text: 'Yes',
                        onPress: () => {
                          // setShowBox(false);
                          setTags(tags.filter((item, i) => item !== interest));
                          if (newTags.includes(interest)) {
                            setNewTags(
                              newTags.filter((item, i) => item !== interest),
                            );
                            console.log('isNewTag delete');
                          } else {
                            setDeletedTags([...deletedTags, interest]);
                            console.log('oldTag');
                          }
                        },
                      },
                      // The "No" button
                      // Does nothing but dismiss the dialog when tapped
                      {
                        text: 'No',
                      },
                    ],
                  );
                }}>
                <Box
                  borderRadius={'full'}
                  height={25}
                  minWidth={45}
                  mr={2}
                  justifyContent={'center'}
                  paddingX={2}
                  mb={2}
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
                    #{interest}
                  </Text>
                </Box>
              </TouchableOpacity>
            );
          })}
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
        <CreateTagModal
          modalOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
          onSave={v => {
            if (!tags.includes(v)) {
              if (deletedTags.includes(v)) {
                setDeletedTags(deletedTags.filter(item => item !== v));
                setTags([...tags, v]);
              } else {
                setNewTags([...newTags, v]);
                setTags([...tags, v]);
              }
            } else {
              Alert.alert('Error', 'This tag already exists');
            }
          }}
        />
      </Box>
    </View>
  );
};
export default ProfileSettingEditScreen;
export interface CreateTagModalProps {
  modalOpen: boolean;
  onClose: () => void;
  onSave: (v: string) => void;
}
const CreateTagModal: FunctionComponent<CreateTagModalProps> = ({
  modalOpen,
  onClose,
  onSave,
}) => {
  const [userInput, setUserInput] = useState('');
  return (
    <Modal isOpen={modalOpen} onClose={onClose} size={'xs'}>
      <Modal.Content maxH="212">
        <Modal.CloseButton />
        <Modal.Header>New Interested Tags</Modal.Header>
        <Modal.Body>
          <View>
            <Input value={userInput} onChangeText={v => [setUserInput(v)]} />
          </View>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                onClose();
              }}>
              Cancel
            </Button>
            <Button
              onPress={() => {
                onSave(userInput);
                setUserInput('');
                onClose();
              }}>
              Save
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
