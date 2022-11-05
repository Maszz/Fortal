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
import {ForgotPasswordActionsSheetProps} from '../types';
import {useTranslation} from 'react-i18next';
import ActionSheet, {
  useScrollHandlers,
  ActionSheetRef,
  SheetProps,
  SheetManager,
} from 'react-native-actions-sheet';
import FormInput from './FormInput';
import GradientButton from './GradientButton';
import {useAuth} from '../hooks/useAuth';
import {Config} from '../env';
export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}
export interface InvalidRegisterInput {
  name: boolean;
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
  username: boolean;
}
const RegisterActionsSheet: FunctionComponent<
  ForgotPasswordActionsSheetProps
> = ({sheetId, payload}) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const {t} = useTranslation();
  const [userInput, setUserInput] = useState<RegisterUserInput>(
    {} as RegisterUserInput,
  );
  const {register} = useAuth();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [invalidInput, setInvalidInput] = useState<InvalidRegisterInput>(
    {} as InvalidRegisterInput,
  );
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
        <View style={{flex: 1}} />
        {/* <View style={{flex: 0.5}} /> */}
      </ScrollView>
    </ActionSheet>
  );
};

export default RegisterActionsSheet;
