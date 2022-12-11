import { createApp } from 'vue'
import './styles/crescent.css'
import { createI18n } from 'vue-i18n'
import { messages as tmmessages} from './assets/locale_tm.js'
import { messages as enmessages} from './assets/locale_en.js'
import vue3GoogleLogin from 'vue3-google-login'
import App from './App.vue'
import vClickOutside from "click-outside-vue3"
import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './assets/routes.js'

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'tm',
    messages: {
        en: enmessages,
        tm: tmmessages
    }
});

const pinia = createPinia();

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

createApp(App)
.use(i18n)
.use(vue3GoogleLogin,{
    clientId: '656458709655-86jt0m9ea559r73pdnds2ccff1sgd7tp.apps.googleusercontent.com'
})
.use(pinia)
.use(router)
.use(vClickOutside)
.mount('#app')
