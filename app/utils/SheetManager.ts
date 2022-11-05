import {registerSheet} from 'react-native-actions-sheet';
import LoginActionsSheet from '../components/LoginActionsSheet';
import RegisterActionsSheet from '../components/RegisterActionsSheets';
import ForgotPasswordActionsSheet from '../components/ForgotpasswordActionSheet';
registerSheet('login-sheet', LoginActionsSheet);
registerSheet('register-sheet', RegisterActionsSheet);
registerSheet('forgot-password-sheet', ForgotPasswordActionsSheet);
export {};
