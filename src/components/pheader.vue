<template>
    <div class="up_header">
      <div class="up_nav">
        <span>
          <img src="./../assets/logo.png" alt="">
        </span>
        <span class="welcome">
          <i class="iconfont icon-yonghu"></i>&nbsp;&nbsp;<strong>欢迎您：admin</strong>&nbsp;&nbsp;<i class="iconfont icon-tuichu-copy">
        </i>&nbsp;&nbsp;<strong>退出</strong>&nbsp;&nbsp;
        </span>
      </div>
      <div class="down_header">
          <div class="header_nav">
            <ul>
              <li><a href="javascript:;"><i class="iconfont icon-home"></i>&nbsp;&nbsp;首页</a></li>
              <li><a href="javascript:;"><i class="iconfont icon-tongji1"></i>&nbsp;&nbsp;月度管理</a></li>
              <li><a href="javascript:;"><i class="iconfont icon-shenqing"></i>&nbsp;&nbsp;月度申请</a></li>
              <li><a href="javascript:;"><i class="iconfont icon-chulizhong"></i>&nbsp;&nbsp;月度处理</a></li>
              <li><a href="javascript:;"><i class="iconfont icon-ji"></i>&nbsp;&nbsp;季度管理</a></li>
              <li><a href="javascript:;"><i class="iconfont icon-tongji"></i>&nbsp;&nbsp;区内管理</a></li>
              <li><a href="javascript:;"><i class="iconfont icon-flightSchedule"></i>&nbsp;&nbsp;班机航线</a></li>
            </ul>
          </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'PHeader'
    }
</script>

<style lang="less" scoped>
  .up_header{
    min-width: 1200px;
    height: 185px;
    background-color: #026ab3;
    position: inherit;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 18px;
    font-weight: bold;
  }
  .up_nav{
    width: 90%;
    height: 100px;
    margin: auto;
  }
  .up_nav img{
    float: left;
    margin-top: 0.8%;
  }
  .welcome{
    float: right;
    color: #d5e0ee;
    margin-top: 40px;
  }
  .down_header{
    background-color: #003b64;
    width: 100%;
    height: 85px;
  }
  .header_nav{
    width: 90%;
    height: 100%;
    margin: auto;
    //background-color: #cccccc;
  }
  .header_nav li{
    list-style: none;
    float: left;
    width: 12%;
    text-align: left;
    margin-top: 30px;
  }
  a,a:hover{
    text-decoration:none;//去掉下划线
    color: #a3afbc;
  }
  a:hover{
    color: #ffffff;
    font-weight: bolder;
  }
  .iconfont{
    font-size: 22px;
  }
</style>
