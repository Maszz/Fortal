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
import {Keyboard, TextInput} from 'react-native';
import {RegisterActionsSheetProps} from '../types';
import {useTranslation} from 'react-i18next';
import ActionSheet, {
  useScrollHandlers,
  ActionSheetRef,
  SheetProps,
  SheetManager,
} from 'react-native-actions-sheet';
import FormInput from './FormInput';
import GradientButton from './GradientButton';
export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}
const RegisterActionsSheet: FunctionComponent<RegisterActionsSheetProps> = ({
  sheetId,
  payload,
}) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const {t} = useTranslation();
  const [userInput, setUserInput] = useState<RegisterUserInput>(
    {} as RegisterUserInput,
  );
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
        {/* <View style={{flex: 0}} /> */}
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
          <FormInput
            title={t('registerActionsSheet:name')}
            icon={require('../assets/user_icon.png')}
            placeholder={t('registerActionsSheet:namePlaceholder')}
            onChangeText={text => {
              setUserInput({...userInput, name: text});
            }}
            value={userInput.name}
            isInvalid={false}
            invalidMessage={''}
          />
          <FormInput
            title={t('registerActionsSheet:username')}
            icon={require('../assets/user_icon.png')}
            placeholder={t('registerActionsSheet:usernamePlaceholder')}
            onChangeText={text => {
              setUserInput({...userInput, username: text});
            }}
            value={userInput.username}
            isInvalid={false}
            invalidMessage={''}
          />
          <FormInput
            title={t('registerActionsSheet:password')}
            icon={require('../assets/key_icon.png')}
            placeholder={t('registerActionsSheet:passwordPlaceholder')}
            onChangeText={text => {
              setUserInput({...userInput, password: text});
            }}
            value={userInput.password}
            isInvalid={false}
            invalidMessage={''}
            type={'password'}
          />
          <FormInput
            title={t('registerActionsSheet:confirmPassword')}
            icon={require('../assets/key_icon.png')}
            placeholder={t('registerActionsSheet:confirmPasswordPlaceholder')}
            onChangeText={text => {
              setUserInput({...userInput, confirmPassword: text});
            }}
            value={userInput.confirmPassword}
            isInvalid={false}
            invalidMessage={''}
            type={'password'}
          />
          <FormInput
            title={t('registerActionsSheet:email')}
            icon={require('../assets/mail_icon.png')}
            placeholder={t('registerActionsSheet:emailPlaceholder')}
            onChangeText={text => {
              setUserInput({...userInput, email: text});
            }}
            value={userInput.email}
            isInvalid={false}
            invalidMessage={''}
          />
        </View>
        <View style={{flex: 1, marginTop: 20}}>
          <Center>
            <GradientButton
              onPress={() => {
                console.log('pressed');
                if (userInput.password === userInput.confirmPassword) {
                  // register stuff if success navigate to next screen
                  SheetManager.hide('register-sheet');
                  payload?.navigation.navigate('Onboard1');
                }
              }}
              text={t('loginScreen:signup')}
            />
          </Center>
        </View>
        {/* <View style={{flex: 0.5}} /> */}
      </ScrollView>
    </ActionSheet>
  );
};

export default RegisterActionsSheet;