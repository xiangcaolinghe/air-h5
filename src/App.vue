<template>
  <div id="app">
    <c-header></c-header>
    <router-view/>
    <c-footer></c-footer>
  </div>
</template>

<script>
  import CHeader from './components/header.vue'
  import CFooter from './components/footer.vue'
export default {
  name: 'App',
  components:{ CHeader, CFooter }
}
</script>

<style lang="less">
  @import './assets/styles/base.less';
  @import './assets/iconfonts/iconfont.css';
  @import './assets/styles/header.less';
  @import './assets/styles/footer.less';
#app {
  font-family: "Microsoft YaHei","Arial","黑体","宋体",sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: #2c3e50;*/
}
</style>
