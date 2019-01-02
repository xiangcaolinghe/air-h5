import router from '../router';
import LocalStorageUtils from '@/utils/LocalStorageUtils.js'

const storage = new LocalStorageUtils();
export default {


  url: '',
  //测试环境
  baseURL: 'http://192.168.3.41:8083',
  // baseURL: 'http://localhost:8083',
  loginURL: 'http://192.168.3.41:8084',
  // openURL: 'http://192.168.206.117:3001',
  // openFlowURL: 'http://192.168.206.117:8085/adccAir/index.html',
  // openManagerURL: 'http://192.168.206.117:3002',
  //正式环境
  // baseURL: 'http://10.0.56.7:8080/airapi',
  // openURL: 'http://10.0.56.7:3001',
  // openFlowURL: 'http://10.0.51.100:8085/adccAir/index.html',
  // openManagerURL: 'http://10.0.56.7:3002',
  // loginURL: 'http://10.0.56.7:8084',
  passwordsecret: '*975b99fe*15c9*4341*b21a*f355926ded00',

  transformRequest: [function (config) {
    return config;
  }],

  transformResponse: [function (data) {
    // let errcode = data.errcode;
    // if (null != errcode && '888' == errcode) {
    //
    //   MessageBox.confirm("登录异常，请重新登录", "温馨提示", {confirmButtonText: "去登录"}).then(action => {
    //     storage.deleteAll()
    //
    //     router.push({name: 'login'})
    //
    //   }).catch(action => {
    //
    //   });
    //
    // }

    return data;
  }],
  //get,delete方法传递参数
  params: {},

  //post,put 方法
  data: {

  },

  timeout: 200000,

  withCredentials: false, // default

  responseType: 'json', // default

  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },
  onDownloadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  maxContentLength: 2000,

  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  },

  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },

  maxRedirects: 15, // default
}









