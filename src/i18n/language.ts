import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 导入语言文件
import en from './locales/en.json';
import zh from './locales/zh.json';
import {resources} from './resources';

// 定义语言资源类型
interface Resources {
  [key: string]: {
    [key: string]: {
      [key: string]:
        | string
        | {
            [key: string]: string;
          };
    };
  };
}

const LANGUAGES = {
  en,
  zh,
};

// const LANG_CODES = Object.keys(LANGUAGES);

// 定义语言检测器类型
// interface LanguageDetectorType {
//   type: string;
//   async: boolean;
//   detect: (callback: (lng: string) => void) => void;
//   init: () => void;
//   cacheUserLanguage: (lng: string) => void;
// }
//
// // 获取设备默认语言
// const LANGUAGE_DETECTOR: LanguageDetectorType = {
//   type: 'languageDetector',
//   async: true,
//   detect: callback => {
//     AsyncStorage.getItem('user-language', (err, language) => {
//       // 如果有用户设置的语言
//       if (language) {
//         return callback(language);
//       }
//
//       // 获取设备语言
//
//       const findBestLanguage = RNLocalize.findBestLanguageTag(LANG_CODES);
//
//       callback(findBestLanguage ? findBestLanguage.languageTag : 'en');
//     });
//   },
//   init: () => {},
//   cacheUserLanguage: language => {
//     AsyncStorage.setItem('user-language', language);
//   },
// };

// 初始化i18next
i18n
  //.use(LANGUAGE_DETECTOR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({

    debug: true,
    lng: 'zh',
    resources: resources,
    react: {
      useSuspense: true,
    },
    interpolation: {
      escapeValue: false,
    },
    // defaultNS: 'common',
    fallbackLng: 'zh',
      // compatibilityJSON: 'v3',
  });

export default i18n;
