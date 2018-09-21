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
              <li><router-link :to="{name: 'platform'}"><i class="iconfont icon-home"></i>&nbsp;&nbsp;首页</router-link></li>
              <li><router-link :to="{name: 'platform.flowpath'}" :class="{active:isActive == 1}"><i class="iconfont icon-tongji1"></i>&nbsp;&nbsp;月度管理</router-link></li>
              <li><a href="javascript:;" @click="switcher(2)" :class="{active:isActive == 2}"><i class="iconfont icon-shenqing"></i>&nbsp;&nbsp;月度申请</a></li>
              <li><a href="javascript:;" @click="switcher(3)" :class="{active:isActive == 3}"><i class="iconfont icon-chulizhong"></i>&nbsp;&nbsp;月度处理</a></li>
              <li><a href="javascript:;" @click="switcher(4)" :class="{active:isActive == 4}"><i class="iconfont icon-ji"></i>&nbsp;&nbsp;季度管理</a></li>
              <li><a href="javascript:;" @click="switcher(5)" :class="{active:isActive == 5}"><i class="iconfont icon-tongji"></i>&nbsp;&nbsp;区内管理</a></li>
              <li><a href="javascript:;" @click="switcher(6)" :class="{active:isActive == 6}"><i class="iconfont icon-flightSchedule"></i>&nbsp;&nbsp;班机航线</a></li>
            </ul>
          </div>
      </div>
      <div class="p-content">
        <div class="p-left" v-show="!$route.meta.hideLeft">
          <div class="nav_left"  :class="{active:isActive == 1}">
            <div class="">
              <ul>
                <li><a href="flowpath" style="height: 88px" @click="switcher(1)" :class="{active:isLeftActive == 1}"><div :class="{active:isLeftActive == 1}"><div>月度上报流程</div></div></a></li>
                <li><a href="javascript:;" @click="switcher(2)" :class="{active:isLeftActive == 2}"><div :class="{active:isLeftActive == 2}"><div>上报数据导入</div></div></a></li>
                <li><a href="javascript:;" @click="switcher(3)" :class="{active:isLeftActive == 3}"><div :class="{active:isLeftActive == 3}"><div>上报数据管理</div></div></a></li>
                <li><a href="javascript:;" @click="switcher(4)" :class="{active:isLeftActive == 4}"><div :class="{active:isLeftActive == 4}"><div>上报数据统计</div></div></a></li>
                <li><a href="javascript:;" @click="switcher(5)" :class="{active:isLeftActive == 5}"><div :class="{active:isLeftActive == 5}"><div>批复数据导入</div></div></a></li>
              </ul>
            </div>
          </div>
          <div class="nav_left"  :class="{active:isActive == 2}">
            <div class="">
              <ul>
                <li><a href="javascript:;"><div><div>月度上报流程2</div></div></a></li>
                <li><a href="javascript:;"><div><div>上报数据导入2</div></div></a></li>
                <li><a href="javascript:;"><div><div>上报数据管理2</div></div></a></li>
                <li><a href="javascript:;"><div><div>上报数据统计2</div></div></a></li>
                <li><a href="javascript:;"><div><div>批复数据导入2</div></div></a></li>
              </ul>
            </div>
          </div>
          <div class="nav_left"  :class="{active:isActive == 3}">
            <div class="">
              <ul>
                <li><a href="javascript:;"><div><div>月度上报流程3</div></div></a></li>
                <li><a href="javascript:;"><div><div>上报数据导入3</div></div></a></li>
                <li><a href="javascript:;"><div><div>上报数据管理3</div></div></a></li>
                <li><a href="javascript:;"><div><div>上报数据统计3</div></div></a></li>
                <li><a href="javascript:;"><div><div>批复数据导入3</div></div></a></li>
              </ul>
            </div>
          </div>
          <div class="nav_left"  :class="{active:isActive == 4}">
            <div class="">
              <ul>
                <li><a href="javascript:;"><div><div>月度上报流程4</div></div></a></li>
                <li><a href="javascript:;"><div><div>上报数据导入4</div></div></a></li>
                <li><a href="javascript:;"><div><div>上报数据管理4</div></div></a></li>
                <li><a href="javascript:;"><div><div>上报数据统计4</div></div></a></li>
                <li><a href="javascript:;"><div><div>批复数据导入4</div></div></a></li>
              </ul>
            </div>
          </div>
          <div class="nav_left"  :class="{active:isActive == 5}">
            <div class="">
              <ul>
                <li><a href="javascript:;"><div><div>月度上报流程5</div></div></a></li>
                <li><a href="javascript:;"><div><div>上报数据导入5</div></div></a></li>
                <li><a href="javascript:;"><div><div>上报数据管理5</div></div></a></li>
                <li><a href="javascript:;"><div><div>上报数据统计5</div></div></a></li>
                <li><a href="javascript:;"><div><div>批复数据导入5</div></div></a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="view">
          <slot name="right-view"></slot>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'PHeader',
      data(){
        return{
          isActive:1,
          isLeftActive:1,
          isLeftNav: 1
        }
      },
      methods:{
        switcher(number){
          this.isLeftActive=number;
        }
      }
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
  .iconfont{
    font-size: 22px;
  }


  .nav_left{
    background-color: #003b64;
    width: 100%;
    min-height: 880px;
    font-weight: bolder;
    font-size: 18px;
    display: none;
  }
  .nav_list{
    background-color: #026ab3;
    width: 70%;
    height: 100%;
    float: right;
  }
  .nav_left li{
    list-style: none;
    height: 85px;
    line-height: 85px;
  }
  .nav_left li a div{
    height: 85px;
  }
  .nav_left li a div div{
    padding-left: 20px;
  }
  .nav_left li a,a:hover{
    display: block;
    text-decoration:none;//去掉下划线
    color: #a3afbc;
    /*height: 85px;*/
  }
  .nav_left li a {
    div.active {
      color: #003b64 !important;
      background-color: white !important;
    }
  }
  .nav_left li a:hover{
    div {
      color: #003b64;
      background-color: white;
    }
  }
  .active{
    display: block;
  }
  .header_nav li .active{
    color: white;
  }
  .p-content {
    width:100%;
    display: flex;
    .p-left {
      width: 16%;
    }
    .view {
      flex: 1;
      padding: 0 5%;
      box-sizing: border-box;
    }
  }
</style>
