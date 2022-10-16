import {registerSheet} from 'react-native-actions-sheet';
import LoginActionsSheet from '../components/LoginActionsSheet';
import RegisterActionsSheet from '../components/RegisterActionsSheets';
registerSheet('login-sheet', LoginActionsSheet);
registerSheet('register-sheet', RegisterActionsSheet);

export {};
