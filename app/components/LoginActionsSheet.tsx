import ActionSheet, {
  useScrollHandlers,
  ActionSheetRef,
  SheetProps,
  SheetManager,
} from 'react-native-actions-sheet';
import {FunctionComponent, useState, useEffect, useRef} from 'react';
import {View, Text, Input, Image, Button, Center} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  Keyboard,
} from 'react-native';
import FormInput from './FormInput';
import ImageIcon from '../utils/ImageIcon';
import ImageButton from './ImageButton';
import {LoginActionsSheetProps} from '../types';
import {useTranslation} from 'react-i18next';
import {useAuth} from '../hooks/useAuth';
import GradientButton from './GradientButton';
export interface UserInput {
  username: string;
  password: string;
}
const LoginActionsSheet: FunctionComponent<LoginActionsSheetProps> = ({
  sheetId,
  payload,
}) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const {t} = useTranslation();
  const {login} = useAuth();
  const [userInput, setUserInput] = useState<UserInput>({} as UserInput);
  const [isInvalid, setIsInvalid] = useState(false);
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
      ref={actionSheetRef}
      containerStyle={{
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        height: isKeyboardVisible ? '100%' : '65%',
      }}
      keyboardHandlerEnabled={true}
      useBottomSafeAreaPadding={true}>
      <View
        flex={1}
        style={{
          flex: 1,
          paddingLeft: 50,
          paddingRight: 50,
          marginTop: 10,
        }}>
        <View style={{flex: 0.5}}>
          <Text bold fontSize={32} color={'#232259'}>
            {t('loginActionsSheet:title_1')}
          </Text>
        </View>
        <View style={{flex: 0.5}}>
          <Text bold fontSize={32} color={'#232259'} lineHeight={'0'}>
            {t('loginActionsSheet:title_2')}
          </Text>
        </View>

        <View style={{flex: 2, marginTop: 10}}>
          <FormInput
            title={t('loginActionsSheet:username')}
            icon={ImageIcon.loginScreen.user}
            placeholder={t('loginActionsSheet:usernamePlaceholder')}
            value={userInput.username}
            onChangeText={text => {
              setUserInput({...userInput, username: text});
            }}
            isInvalid={isInvalid}
            invalidMessage={''}
          />
          <FormInput
            title={t('loginActionSheet:password')}
            icon={ImageIcon.loginScreen.user}
            placeholder={t('loginActionsSheet:passwordPlaceholder')}
            value={userInput.password}
            onChangeText={text => {
              setUserInput({...userInput, password: text});
            }}
            isInvalid={isInvalid}
            invalidMessage={'Invalid password'}
            type={'password'}
          />
          <Button
            size="sm"
            variant="unstyled"
            alignSelf={'flex-end'}
            onPress={() => {
              console.log('Pressedhgf');

              SheetManager.hide('login-sheet', {
                payload: true,
              });
            }}>
            <Text color={'#998CEB'} underline fontSize={12}>
              {t('loginActionsSheet:forgetPassword')}
            </Text>
          </Button>
        </View>
        <View style={{flex: 0.5, paddingTop: 25}}>
          <Center>
            <GradientButton
              onPress={() => {
                console.log('pressed');
                login(userInput.username, userInput.password).then(res => {
                  console.log(res);
                  if (res) {
                    actionSheetRef.current?.hide();
                  } else {
                    // alert('Login failed');
                    setUserInput({...userInput, password: ''});
                    setIsInvalid(true);
                  }
                });
                // SheetManager.hide('login-sheet');
                // payload?.navigation.navigate('Onboard1');
              }}
              text={t('loginScreen:signin')}
            />
          </Center>
        </View>
        <View style={{flex: 1, marginTop: 25}}>
          <Center>
            <Text fontSize={12}>Or sign in with</Text>
            <View style={{flexDirection: 'row', paddingTop: 10}}>
              <ImageButton
                alt="facebook"
                image={ImageIcon.loginScreen.facebook}
                onPress={() => {
                  console.log('pressed');
                }}
                imageStyle={{width: 15, height: 15}}
                backgroundColor="#4879F6"
              />
              <ImageButton
                alt="facebook"
                image={ImageIcon.loginScreen.youtube}
                onPress={() => {
                  console.log('pressed');
                }}
                imageStyle={{width: 12, height: 12}}
                backgroundColor="#F95A55"
                marginLeft={5}
                marginRight={5}
              />
              <ImageButton
                alt="facebook"
                image={ImageIcon.loginScreen.twitter}
                onPress={() => {
                  console.log('pressed');
                }}
                imageStyle={{width: 15, height: 15}}
                backgroundColor="#55BEF0"
              />
            </View>
          </Center>
        </View>
        {/* <View style={{flex: 0.5}} /> */}
      </View>
    </ActionSheet>
  );
};

export default LoginActionsSheet;
