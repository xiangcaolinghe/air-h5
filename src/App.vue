<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components:{  },
  created() {


  },

}
</script>

<style lang="less">
  @import './assets/styles/base.less';
  @import './assets/iconfonts/iconfont.css';
  @import './assets/styles/header.less';
  @import './assets/styles/footer.less';
  @import './assets/styles/font.css';

#app {
  font-family: "Microsoft YaHei","Arial","黑体","宋体",sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: #2c3e50;*/
}
</style>
