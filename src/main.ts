import { createApp } from 'vue'
import { createI18n } from 'vue-i18n';
import './style.css'
import App from './App.vue'

import en from '../locales/en.json';
import es from '../locales/es.json';
type MessageSchema = typeof en;

const browserLocale = (navigator.languages?.[0] ?? navigator.language).toLocaleLowerCase().includes('es') ? 'es' : 'en';
const locale = window.localStorage.getItem('vueuse-i18n-locale') ?? browserLocale;
const translator = createI18n<[MessageSchema], 'en' | 'es'>({
    globalInjection: true,
    legacy: false,
    locale,
    fallbackLocale: 'en',
    messages: { en, es }
});

createApp(App).use(translator).mount('#app');
