/**
 * Created by zhaochengyu on 2017/2/27.
 */

class LocalStorageUtils {


  /**
   * 从LocalStorage中取value，value为字符串
   * @param key
   */
  get(key) {

    if (window.localStorage) {
      let storage = window.localStorage;
      return storage.getItem(key);
    }
    return false;

  }
  getJson(key) {

    if (window.localStorage) {
      let storage = window.localStorage;
      return JSON.parse(storage.getItem(key));
    }
    return false;

  }

  /**
   *
   * @param key
   * @param value 字符串
   */
  set(key, value) {

    if (window.localStorage) {
      let storage = window.localStorage;
      storage.setItem(key, value);
    }

  }
  setJson(key, value) {

    if (window.localStorage) {
      let storage = window.localStorage;
      storage.setItem(key, JSON.stringify(value));
    }

  }

  /**
   *  删除
   * @param key
   */
  delete(key) {

    if (window.localStorage) {
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
   * @param key
   * @param value
   */
  update(key, value) {
    if (window.localStorage) {

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
      }
      return keys;
    }
    return null;
  }

}
export default LocalStorageUtils;


