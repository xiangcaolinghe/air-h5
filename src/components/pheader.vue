<template>
    <div class="up_header">
      <div class="up_nav">
        <span>
          <img src="./../assets/logo.png" alt="">
        </span>
        <span class="welcome">
          <i class="icon iconfont icon-wode"></i>&nbsp;&nbsp;<strong>欢迎您：admin</strong>&nbsp;&nbsp;<i class="icon iconfont icon-wode">
        </i>&nbsp;&nbsp;<strong>退出</strong>&nbsp;&nbsp;
        </span>
      </div>
      <div class="down_header">
          <div class="header_nav">
            <ul>
              <li><a href="javascript:;">首页</a></li>
              <li><a href="javascript:;">月度管理</a></li>
              <li><a href="javascript:;">月度申请</a></li>
              <li><a href="javascript:;">月度处理</a></li>
              <li><a href="javascript:;">季度管理</a></li>
              <li><a href="javascript:;">区内管理</a></li>
              <li><a href="javascript:;">班机航线</a></li>
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
    height: 100px;
    background-color: #026ab3;
    position: inherit;
    margin: auto;
    top: 0px;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 18px;
    font-weight: bold;
  }
  .up_nav{
    width: 90%;
    height: 100%;
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
</style>
