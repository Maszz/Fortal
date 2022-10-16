import {FunctionComponent, useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  Box,
  Image,
  VStack,
  HStack,
  Input,
  Icon,
  Center,
  KeyboardAvoidingView,
} from 'native-base';
import {Line} from 'react-native-svg';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, TouchableOpacity, Platform, ScrollView} from 'react-native';
import ActionSheet, {
  useScrollHandlers,
  ActionSheetRef,
  SheetProps,
} from 'react-native-actions-sheet';
import {Keyboard, TextInput} from 'react-native';
import {RegisterActionsSheetProps} from '../types';
import {useTranslation} from 'react-i18next';

const RegisterActionsSheet: FunctionComponent<RegisterActionsSheetProps> = ({
  sheetId,
  payload,
}) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const {t} = useTranslation();

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <ActionSheet
      id={sheetId}
      backgroundInteractionEnabled={false}
      closable={true}
      gestureEnabled={true}
      keyboardHandlerEnabled={true}
      ref={actionSheetRef}
      containerStyle={{
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        height: isKeyboardVisible ? '100%' : '70%',
      }}
      useBottomSafeAreaPadding={true}>
      <ScrollView
        style={{
          flex: 1,
          paddingLeft: 50,
          paddingRight: 50,
        }}>
        <View style={{flex: 0}} />
        <View
          style={{
            flex: 1,
            paddingRight: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View flexDirection={'column-reverse'}>
            <Text bold fontSize={32} color={'#232259'} lineHeight={'0'}>
              {t('registerActionsSheet:title_1')}
            </Text>
          </View>
          <View alignSelf={'flex-end'}>
            <Image
              alt="upload icon"
              source={require('../assets/upload_icon.png')}
              flexDirection={'column-reverse'}
            />
          </View>
        </View>
        <View
          style={{
            flex: 0.8,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text bold fontSize={32} color={'#232259'} lineHeight={'0'}>
              {t('registerActionsSheet:title_2')}
            </Text>
          </View>
          <View>
            <Text
              fontSize={10}
              color={'#232259'}
              lineHeight={'0'}
              marginTop={3}>
              Upload picture
            </Text>
          </View>
        </View>
        <View style={{flex: 5}}>
          <View style={{borderBottomColor: '#8172F7', borderBottomWidth: 2}}>
            <Text color={'#232259'}>{t('registerActionsSheet:name')}</Text>
            <Input
              InputLeftElement={
                <Image
                  alt="user icon"
                  source={require('../assets/user_icon.png')}
                />
              }
              variant="underlined"
              placeholder={t('registerActionsSheet:namePlaceholder')}
              paddingLeft={3}
            />
          </View>
          <View
            style={{
              borderBottomColor: '#8172F7',
              borderBottomWidth: 2,
              marginTop: 10,
            }}>
            <Text color={'#232259'}>{t('registerActionsSheet:username')}</Text>
            <Input
              InputLeftElement={
                <Image
                  alt="user icon"
                  source={require('../assets/user_icon.png')}
                />
              }
              variant="underlined"
              paddingLeft={3}
              placeholder={t('registerActionsSheet:usernamePlaceholder')}
            />
          </View>
          <View
            style={{
              borderBottomColor: '#8172F7',
              borderBottomWidth: 2,
              marginTop: 10,
            }}>
            <Text color={'#232259'}>{t('registerActionsSheet:password')}</Text>
            <Input
              InputLeftElement={
                <Image
                  alt="key icon"
                  source={require('../assets/key_icon.png')}
                />
              }
              variant="underlined"
              paddingLeft={3}
              placeholder={t('registerActionsSheet:passwordPlaceholder')}
            />
          </View>
          <View
            style={{
              borderBottomColor: '#8172F7',
              borderBottomWidth: 2,
              marginTop: 10,
            }}>
            <Text color={'#232259'}>
              {t('registerActionsSheet:confirmPassword')}
            </Text>
            <Input
              InputLeftElement={
                <Image
                  alt="key icon"
                  source={require('../assets/key_icon.png')}
                />
              }
              variant="underlined"
              paddingLeft={3}
              placeholder={t('registerActionsSheet:confirmPasswordPlaceholder')}
            />
          </View>
          <View
            style={{
              borderBottomColor: '#8172F7',
              borderBottomWidth: 2,
              marginTop: 10,
            }}>
            <Text color={'#232259'}>{t('registerActionsSheet:email')}</Text>
            <Input
              InputLeftElement={
                <Image
                  alt="mail icon"
                  source={require('../assets/mail_icon.png')}
                />
              }
              variant="underlined"
              paddingLeft={3}
              placeholder={t('registerActionsSheet:emailPlaceholder')}
            />
          </View>
        </View>
        <View style={{flex: 1, marginTop: 20}}>
          <Center>
            <TouchableOpacity
              style={{width: 250, height: 40}}
              // width={'250px'}
              // height={'40px'}>
              onPress={() => {
                console.log('pressed');
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
                  borderRadius: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text color={'white'} bold fontSize={16}>
                  {t('loginScreen:signup')}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </Center>
        </View>
        {/* <View style={{flex: 0.5}} /> */}
      </ScrollView>
    </ActionSheet>
  );
};

export default RegisterActionsSheet;
