// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import API from './config/API';
import API from './config/APIHeader';
// import store from './store/store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
window.API = API;
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  // store,
  template: '<App/>',
  components: { App }
})
