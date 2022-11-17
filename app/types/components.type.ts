import {Button, Image, IButtonProps} from 'native-base';
import {FunctionComponent} from 'react';
import {ViewStyle, StyleProp, ImageStyle} from 'react-native';
import LoginActionsSheet from '../components/LoginActionsSheet';
import ActionSheet, {
  useScrollHandlers,
  ActionSheetRef,
  SheetProps,
} from 'react-native-actions-sheet';
export interface ImageButtonProps extends IButtonProps {
  image: any;
  imageStyle?: StyleProp<ImageStyle>;
  alt: string;
}
export interface FormInputProps {
  title: string;
  placeholder: string;
  icon: any;
  onChangeText: (text: string) => void;
  value: string;
  isInvalid: boolean;
  invalidMessage: string;
  type?: 'text' | 'password';
}

interface LoginActionsSheetPayload {
  id: string;
  navigation: any;
}

export interface LoginActionsSheetProps
  extends SheetProps<LoginActionsSheetPayload> {}

interface RegisterActionsSheetPayload {
  id: string;
  navigation: any;
}
interface EventCardActionsSheetPayload {
  eventId: string;
}
interface EventCardActionsSheetJoinedPayload {
  eventId: string;
  eventChatId: string;
}
export interface EventCardActionsSheetProps
  extends SheetProps<EventCardActionsSheetPayload> {}

interface ForgotPasswordActionsSheetPayload {}

export interface RegisterActionsSheetProps
  extends SheetProps<RegisterActionsSheetPayload> {}

export interface ForgotPasswordActionsSheetProps
  extends SheetProps<ForgotPasswordActionsSheetPayload> {}

export interface EventCardActionsSheetJoinedProps
  extends SheetProps<EventCardActionsSheetJoinedPayload> {}
