<template>
  <div id="app">
    <c-header v-show="!formShow"></c-header>
    <router-view/>
    <c-footer v-show="!formShow"></c-footer>
    <!-- <iframe id="child" src="http://192.168.206.117/cros/cros.html"></iframe> -->
  </div>
</template>

<script>
  import CHeader from './components/header.vue'
  import CFooter from './components/footer.vue'
export default {
  name: 'App',
  components:{ CHeader, CFooter },
  data () {
    return {
      formShow : false
    }
  },
  watch:{
    $route(to,from){
      if(to.path == '/form'){
        this.formShow = true
      }else {
        this.formShow = false
      }
    }
  },
  created() {
    if(this.$route.path == '/form'){
      this.formShow = true
    }else {
      this.formShow = false
    }
  }
}
</script>

<style lang="less">
  @import './assets/styles/base.less';
  @import './assets/iconfonts/iconfont.css';
  @import './assets/styles/header.less';
  @import './assets/styles/footer.less';
  @import './assets/styles/quill.snow.css';
  @import './assets/styles/quill.core.css';
  @import './assets/styles/mintui.css';
#app {
  font-family: "Microsoft YaHei","Arial","黑体","宋体",sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: #2c3e50;*/
}
</style>
