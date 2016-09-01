// ReSharper disable InconsistentNaming
module $l10n {

    export var $defaultLanguage;// = "en";

    // See more details: http://www.lingoes.net/en/translator/langcode.htm
    export var $languages = {
        en: { name: "English", angular: "en", momentjs: "en-us", select2: "en", browser: ['en', 'en-us', 'en-uk', 'en-gb', 'en_US', 'en_UK', 'en_GB'] },
        da: { name: "Danish", fallbackLangId: ["de", "en"], angular: "da", momentjs: "da", select2: "da", browser: ['da', 'da-dk', 'da_DK'] },
        de: { name: "German", fallbackLangId: ["en"], angular: "de", momentjs: "de", select2: "de", browser: ['de', 'de-de', 'de_DE'] },
        ru: { name: "Русский", fallbackLangId: ["da", "de", "en"], angular: "ru", momentjs: "ru", select2: "ru", browser: ['ru', 'ru-ru', 'ru_RU'] }
    }
}
