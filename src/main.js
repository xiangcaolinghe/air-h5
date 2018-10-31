// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import API from './config/APIHeader';
import LocalStorageUtils from  './utils/LocalStorageUtils'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import  VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// import  VueQuillEditor from 'vue-quill-editor'
import { Loading } from 'element-ui';
Vue.use(VueQuillEditor)
Vue.use(ElementUI);
window.API = API;
Vue.config.productionTip = false
const storage = new LocalStorageUtils();
window.storage = storage;
// let loadingInstance
router.beforeEach(function (to, from, next) {
  // loadingInstance = Loading.service({ fullscreen: true,background:'rgba(0,0,0,.5)' });
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
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
router.afterEach(function (to) {
  // loadingInstance.close();
  // store.commit('updateLoadingStatus', {isLoading: false})
})




new Vue({
  el: '#app',
  router,
  // store,
  template: '<App/>',
  components: { App }
})
