import axios from 'axios'
import config from './config'
import qs from 'qs'
class API {

  static sigParams(uri, params) {
    if (params) {
      var pa = {};
      var newArr = Object.keys(params).sort();
      for (let a in newArr) {
        pa[newArr[a]] = params[newArr[a]];
      }

      uri = uri + '?';
      for (var key in pa) {
        if (pa[key]) {
          uri += key + '=' + pa[key] + '&';
        } else {
          uri += key + '&';
        }
      }
    } else {
      throw ' params con not be null';
      return null;
    }
    // 删除最后一位的 &
    uri = uri.substring(0, uri.length - 1);
    return params;

  }
  static sigHeaders(headers) {
    if (headers) {
      var pa = {};
      var newArr = Object.keys(headers).sort();
      for (let a in newArr) {
        pa[newArr[a]] = headers[newArr[a]];
      }
    }
    return headers;

  }

  static get(uri, params = {}, headers) {
    config.params = {};
    config.params = API.sigParams(uri, params);
    if (headers) {
      config.headers = API.sigHeaders(headers)
    }
    config.url = uri;
    return axios.get(uri, config);
  }

  static delete(uri, params) {
    config.params = {};
    config.params = API.sigParams(uri, params);
    config.url = uri;
    return axios.delete(uri, config);
  }

  /**
   * post请求   有请求头，并且是json的情况下自己序列化参数
   * @param {string} uri 请求地址
   * @param {Object} params 参数
   * @param {Objec} headers  请求头
   */ 
  static post(uri, params, headers) {
    config.params = {};
    var data = qs.stringify(params);
    //如果请求头是application/json;charset=utf-8
    if (headers) {
      config.headers = API.sigHeaders(headers)
      data = JSON.stringify(params);
    }
    // console.log(data);
    // config.params=API.sigParams(uri,params);
    return axios.post(uri, data, config);
  }

  static put(uri, params) {
    config.params = {};
    config.params = API.sigParams(uri, params);
    return axios.put(uri, params, config);
  }

  static getNonce() {
    return Math.random().toString(36).substr(2, 15);
  }
}
//拦截器
// axios.interceptors.response.use(
//   response => {
//     return response
//   },
//   error => {
//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           // 返回 401 清除token信息并跳转到登录页面
//           confirm('过期')
//           // router.replace({
//           //   path: '/login'
//           // })
//           location.reload()
//       }
//     }
//     return Promise.reject(error.response)   // 返回接口返回的错误信息
//   });


export default API;
