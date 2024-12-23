// 在你的Vuex store中
const navLang = navigator.language || navigator.userLanguage;

import i18n from "@/i18n";
const language={

     state : {
        countries: {
            en: 'English',
            zh: '中文',
        },
         currentLanguage:  localStorage.getItem('lang') || (navLang.includes('zh')?'zh':'en'), // 默认语言为英语
    },
    mutations : {
        changeLanguage(state, lang) {
            state.currentLanguage = lang
            localStorage.setItem('lang', lang)
            i18n.locale = lang
            location.reload()

        }
    },
    getters : {
        getCountries: (state) => {
            return state.countries;
        },
        getCountryName: (state) => (languageCode) => {
            return state.countries[languageCode] || ''
        },
        getCurrentLanguage: (state) => {
            return state.currentLanguage
        },

    }
}


export default language