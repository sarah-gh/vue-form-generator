import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './assets/stylesheets/advanced-tabulator.css'
// import './assets/tabulator-css.css'
// import './assets/sas/style.scss'
import VueTabulator from 'vue-tabulator';

Vue.use(VueTabulator);
Vue.config.productionTip = false

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-theme-chalk';
import 'element-theme-default';
Vue.use(ElementUI)
import DynamicForm from 'vue-dynamic-form-component'
Vue.use(DynamicForm)
import VuePersianDatetimePicker from 'vue-persian-datetime-picker';
Vue.component('date-picker', VuePersianDatetimePicker);
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
