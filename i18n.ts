import i18next, { LanguageDetectorModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import RNLanguageDetector from '@os-team/i18next-react-native-language-detector';
import BrowserLanguageDetector from 'i18next-browser-languagedetector';

import commonEN from '@/src/locales/en/common.json';
import commonES from '@/src/locales/es/common.json';
import { Platform } from 'react-native';

export const Language = {
  English: 'en',
  Spanish: 'es',
} as const;

export const Namespaces = {
  Common: 'common',
} as const;

export const defaultNS = Namespaces.Common;
export const resources = {
  [Language.English]: {
    [Namespaces.Common]: commonEN,
  },
  [Language.Spanish]: {
    [Namespaces.Common]: commonES,
  },
} as const;

const supportedLngs = Object.keys(resources);

const detector: LanguageDetectorModule =
  Platform.OS === 'web'
    ? (BrowserLanguageDetector as unknown as LanguageDetectorModule)
    : RNLanguageDetector;

i18next
  .use(detector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3', // Required
    fallbackLng: Language.English,
    supportedLngs,
    ns: [Namespaces.Common],
    defaultNS,
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
