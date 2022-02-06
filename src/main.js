import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// fortawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fab);
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(far);
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();
Vue.component('font-awesome-icon', FontAwesomeIcon)
////

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import vSelect from 'vue-select'
import './assets/sass/style.scss';
Vue.component('v-select', vSelect)
import 'vue-select/dist/vue-select.css';
import VuePersianDatetimePicker from 'vue-persian-datetime-picker';
Vue.component('date-picker', VuePersianDatetimePicker);

import { ValidationProvider, ValidationObserver } from 'vee-validate'
import '@/config/validate'
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
