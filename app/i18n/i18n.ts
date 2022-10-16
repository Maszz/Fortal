import i18n, {ModuleType} from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import th from './th.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const LANGUAGES = {
  en,
  th,
};

const LANG_CODES = Object.keys(LANGUAGES);
const LANGUAGE_DETECTOR = {
  type: 'languageDetector' as ModuleType,
  async: true,
  detect: async (callback: any) => {
    AsyncStorage.getItem('user-language', (err, language) => {
      // if error fetching stored data or no language was stored
      // display errors when in DEV mode as console statements
      if (err || !language) {
        if (err) {
          console.log('Error fetching Languages from asyncstorage ', err);
        } else {
          console.log('No language is set, choosing English as fallback');
        }
        const findBestAvailableLanguage =
          RNLocalize.findBestAvailableLanguage(LANG_CODES);
        // callback('th');
        callback(findBestAvailableLanguage?.languageTag || 'en');
        // callback('en');
        return;
      }
      callback('th');
      // callback(language);
    });
  },
  init: () => {},
  cacheUserLanguage: async (language: any) => {
    AsyncStorage.setItem('user-language', language);
    console.log('cache', language);
  },
};

i18n
  .use(LANGUAGE_DETECTOR)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: LANGUAGES,
    compatibilityJSON: 'v3',
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
