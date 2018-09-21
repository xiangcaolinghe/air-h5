// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import API from './config/APIHeader';
import LocalStorageUtils from  './utils/LocalStorageUtils'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
window.API = API;
Vue.config.productionTip = false
const storage = new LocalStorageUtils();
window.storage = storage;

router.beforeEach(function (to, from, next) {
  let meta = to.meta.auth;
  let name = to.name;
  let token = storage.get('token');
  if (name == 'login') {
    next()
    return
  }
  if (meta) {
    if (token == null) {
      next({name:'login'})
      return
    }
     next()
  }else {
    next()
  }
})
router.afterEach(function (to) {
  // store.commit('updateLoadingStatus', {isLoading: false})
})




new Vue({
  el: '#app',
  router,
  // store,
  template: '<App/>',
  components: { App }
})
