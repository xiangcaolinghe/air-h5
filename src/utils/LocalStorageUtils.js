import {compile, uncompile} from './utils';

class LocalStorageUtils {

  constructor(){}

  /**
   * 从LocalStorage中取value，value为字符串
   * @param key
   */
  get(key) {
    if (window.localStorage) {
      // key = compile(key);
      let storage = window.localStorage;
      return uncompile(storage.getItem(key));
    }
    return false;
  }

  /**
   * @param {String} key 
   */
  getJson(key) {
    if (window.localStorage) {
      // key = compile(key);
      let storage = window.localStorage;
      return JSON.parse(uncompile(storage.getItem(key)));
    }
    return false;
  }

  /**
   * @param {String} key
   * @param {String} value 字符串
   */
  set(key, value) {
    if (window.localStorage) {
      // key = compile(key);
      value = compile(value);
      let storage = window.localStorage;
      storage.setItem(key, value);
    }
  }

  /**
   * @param {String} key 
   * @param {Object} value 任意对象
   */
  setJson(key, value) {
    if (window.localStorage) {
      // key = compile(key);
      value = compile(JSON.stringify(value));
      let storage = window.localStorage;
      storage.setItem(key, value);
    }
  }

  /**
   *  删除
   * @param key
   */
  delete(key) {
    if (window.localStorage) {
      // key = compile(key);
      let storage = window.localStorage;
      storage.removeItem(key);
    }

  }

  /**
   *删除localStorage 中的所有内容
   */
  deleteAll() {
    if (window.localStorage) {
      let storage = window.localStorage;
      storage.clear();
    }
  }

  /**
   *更新
   * @param {String} key
   * @param {String} value 字符串
   */
  update(key, value) {
    if (window.localStorage) {
      // key = compile(key);
      value = compile(value);
      if(null!=this.get(key)){
        this.set(key,value);
      }
    }
  }

  getKeys(){
    if(window.localStorage){
      let keys=[];
      for(var i=0;i<window.localStorage.length;i++){
        let k=window.localStorage.key(i);
        keys[i]=k;
        // keys[i]=uncompile(k);
      }
      return keys;
    }
    return null;
  }

}
export default LocalStorageUtils;


