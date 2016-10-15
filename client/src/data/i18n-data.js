import englishLanguage from 'data/languages/en';
import spanishLanguage from 'data/languages/en';
import germanLanguage  from 'data/languages/en';
import frenchLanguage  from 'data/languages/en';
import chineseLanguage from 'data/languages/en';
import turkishLanguage from 'data/languages/en';
import indianLanguage  from 'data/languages/en';

const languages = {
    'en': englishLanguage,
    'es': spanishLanguage,
    'de': germanLanguage,
    'fr': frenchLanguage,
    'cn': chineseLanguage,
    'tr': turkishLanguage,
    'in': indianLanguage
};

const i18nData = function (key, lang) {
    return (languages[lang] && languages[lang][key]) || key;
};

export default i18nData