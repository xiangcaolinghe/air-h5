<template>
  <div class="ca-header">
    <div class="pass">
      <div class="inner-c">
        <a class="words" @click="manager">管理员通道</a>
        <a class="words" @click="backOld">返回旧版</a>
      </div>
    </div>
    <div class="box">
      <div class="inner-c">
        <div class="logo"><img src="./../assets/logo.png" alt="" class="img"></div>
        <ul class="nav">
          <li class="cell" :class="{active: $route.name == 'home'}"><router-link :to="{name:'home'}" class="link"><span class="word">首页</span></router-link></li>
          <li class="cell planning" :class="{active: $route.name == 'planning'}"><router-link :to="{name:'planning'}" class="link"><span class="word">空域规划</span></router-link></li>
          <li class="cell manage" :class="{active: $route.name == 'manage'}"><router-link :to="{name:'manage'}" class="link"><span class="word">空域管理</span></router-link></li>
          <li class="cell design" :class="{active: $route.name == 'design'}"><router-link :to="{name:'design'}" class="link"><span class="word">程序设计</span></router-link></li>
          <li class="cell reduce" :class="{active: $route.name == 'reduce'}"><router-link  :to="{name:'reduce'}" class="link"><span class="word">节能减排</span></router-link></li>
          <li class="cell contact" :class="{active: $route.name == 'contact'}"><a class="link" style="cursor: pointer" @click="lxwm"><span class="word">联系我们</span></a></li>
          <!--<li class="cell contact" :class="{active: $route.name == 'contact'}"><router-link :to="{name:'contact'}" class="link"><span class="word">联系我们</span></router-link></li>-->
        </ul>
      </div>
    </div>
    <el-dialog
      title="联系我们"
      :visible.sync="lxwmVisible"
      width="30%"
      center>
      <p class="hea-p">E-MAIL：WEBMASTER@ATMB.NET.CN</p>
      <p class="hea-p">京顺义区空港街道天柱路23号空域管理中心</p>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'CHeader',
  data () {
    return {
      lxwmVisible:false

    }
  },
  methods:{
    lxwm(){
      this.lxwmVisible = true;
    },
    manager(){
      window.open("/backstage");
    },
    backOld(){
      window.open("http://asmc.atmb.net.cn:8002/");
    }
  },
  created() {

  }
}
</script>
<style>
  .el-dialog--center .el-dialog__body .hea-p {
    text-align: center;
    line-height: 40px;
    font-weight: 600;
    font-size: 16px;
    color: #026ab3;
  }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--<style lang="less">-->
<!--</style>-->
