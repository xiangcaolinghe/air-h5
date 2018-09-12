import axios from 'axios'
import config from './config'
import qs from 'qs'
class API {

  static sigParams(uri,params){


    if(params) {
      var pa={};
      var  newArr=Object.keys(params).sort();
      for(let a in newArr){
        pa[newArr[a]]=params[newArr[a]];
      }

      uri=uri+'?';
      for (var key in pa){
        if (pa[key]) {
          uri += key + '=' + pa[key] + '&';
        } else {
          uri += key  + '&';
        }
      }
    }else{
      throw ' params con not be null';
      return null;
    }
    // 删除最后一位的 &
    uri = uri.substring(0, uri.length -1);
    return params;

  }
  static sigHeaders(headers){
    if (headers) {
      var pa={};
      var  newArr=Object.keys(headers).sort();
      for(let a in newArr){
        pa[newArr[a]]=headers[newArr[a]];
      }
      console.log(pa)
      // pa['Content-Type'] =  'application/x-www-form-urlencoded;charset=utf-8';
    }else {
      // headers['Content-Type'] =  'application/x-www-form-urlencoded;charset=utf-8';
    }
    console.log(headers)
    return headers;

  }

  static get(uri,params,headers) {

    config.params=API.sigParams(uri,params);
    if (!headers) {
      config.headers['Content-Type'] =  'application/x-www-form-urlencoded;charset=utf-8';
    } else {
      config.headers=API.sigHeaders(headers)
      config.headers['Content-Type'] =  'application/x-www-form-urlencoded;charset=utf-8';
    }
    config.url=uri;
    return axios.get(uri,config);
  }

  static  delete(){
    config.params=API.sigParams(uri,params);
    config.url=uri;
    return axios.delete(uri,config);
  }


  static post(uri,params,headers){
    var data=qs.stringify(params);
    console.log(data)
    if (!headers) {
      config.headers['Content-Type'] =  'application/x-www-form-urlencoded;charset=utf-8';
    } else {
      config.headers=API.sigHeaders(headers)
      config.headers['Content-Type'] =  'application/x-www-form-urlencoded;charset=utf-8';
    }
    // config.params=API.sigParams(uri,params);
    return axios.post(uri,data,config);
  }

  static put(uri,params){

    config.params=API.sigParams(uri,params);
    return axios.put(uri,params,config);
  }

  static getNonce() {
    return Math.random().toString(36).substr(2, 15);

  }
}


export default API;
