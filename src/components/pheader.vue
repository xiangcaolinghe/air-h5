<template>
    <div class="up_header">
      <div class="up_nav">
        <div class="up_nav_content">
        <span>
          <img src="./../assets/logo.png" alt="">
        </span>
          <span class="welcome">
          <i class="iconfont icon-yonghu"></i>&nbsp;&nbsp;<strong>欢迎您：admin</strong>&nbsp;&nbsp;<i class="iconfont icon-tuichu-copy">
        </i>&nbsp;&nbsp;<strong>退出</strong>&nbsp;&nbsp;
        </span>
        </div>
      </div>
      <div class="down_header">
          <div class="header_nav">
            <ul>
              <li><router-link :to="{name: 'platform'}"><i class="iconfont icon-home"></i>&nbsp;&nbsp;首页</router-link></li>
              <li><router-link :to="{name: 'platform.flowpath'}" :class="{active:$route.meta.manager == true}"><i class="iconfont icon-tongji1"></i>&nbsp;&nbsp;月度管理</router-link></li>
              <li><a href="javascript:;" @click="switcher(2)" :class="{active:isActive == 2}"><i class="iconfont icon-shenqing"></i>&nbsp;&nbsp;月度申请</a></li>
              <li><a href="javascript:;" @click="switcher(3)" :class="{active:isActive == 3}"><i class="iconfont icon-chulizhong"></i>&nbsp;&nbsp;月度处理</a></li>
              <li><a href="javascript:;" @click="switcher(4)" :class="{active:isActive == 4}"><i class="iconfont icon-ji"></i>&nbsp;&nbsp;季度管理</a></li>
              <li><router-link :to="{name:'platform.local'}" :class="{active:isActive == 5}"><i class="iconfont icon-tongji"></i>&nbsp;&nbsp;区内管理</router-link></li>
              <li><router-link :to="{name:'platform.airway'}" :class="{active:isActive == 6}"><i class="iconfont icon-flightSchedule"></i>&nbsp;&nbsp;班机航线</router-link></li>
            </ul>
          </div>
      </div>
      <div class="p-content">
        <div class="p-left" v-show="!$route.meta.hideLeft">
          <div class="p-left-height">
            <div class="nav_left" :class="{active:$route.meta.manager == true}">
              <div class="">
                <ul>
                  <li><router-link :to="{name:'platform.flowpath'}" :class="{active:$route.meta.manager == true}" class="left-cell">月度上报流程</router-link></li>
                  <li><router-link :to="{name:'platform.flowimport'}" :class="{active:$route.meta.manager == true}" class="left-cell">上报数据导入</router-link></li>
                  <li><router-link :to="{name:'platform.flowmanager'}" :class="{active:$route.meta.manager == true}" class="left-cell">上报数据管理</router-link></li>
                  <li><router-link :to="{name:'platform.flowstatistics'}" :class="{active:$route.meta.manager == true}" class="left-cell">上报数据统计</router-link></li>
                  <li><router-link :to="{name:'platform.flowimport'}" :class="{active:$route.meta.manager == true}" class="left-cell">批复数据导入</router-link></li>
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
        </div>
        <div class="view" :class="{views : $route.meta.hideLeft,manager_statistics:$route.name == 'platform.flowstatistics'}">
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
    height: 100%;
    margin: 0 auto;
    font-size: 18px;
    font-weight: bold;
  }
  .up_nav{
    background-color: #026ab3;
    width: 100%;
    margin: auto;
    .up_nav_content{
      width: 90%;
      height: 100px;
      margin: auto;
      img{
        float: left;
        margin-top: 0.8%;
      }
      .welcome{
        float: right;
        color: #d5e0ee;
        margin-top: 40px;
      }
    }
  }
  .down_header{
    background-color: #003b64;
    width: 100%;
    height: 85px;
    .header_nav{
      width: 90%;
      height: 100%;
      margin: auto;
      li{
        list-style: none;
        float: left;
        width: 12%;
        text-align: left;
        margin-top: 30px;
        &.active{
          color: white !important;
        }
      }
    }
  }
  .iconfont {
    font-size: 22px;
  }
  a,a:hover{
    text-decoration:none;//去掉下划线
    color: #a3afbc;
  }
  a:hover{
    color: #ffffff;
    font-weight: bolder;
  }
  .p-content {
    width:100%;
    overflow:hidden;
    position: relative;
    zoom:1;
    min-height: 800px;
    .p-left {
      width: 16%;
      float: left;
      min-height: 800px;
      height: 100%;
      background-color: #003b64;
      .p-left-height{
        position: absolute;
        width: 16%;
        top: 0;
        left: 0;
        background-color: #003b64;
        height: 100%;
        .nav_left{
          width: 100%;
          height: auto;
          font-weight: bolder;
          font-size: 18px;
          display: none;
          &.active{
            display: block;
          }
          li{
            list-style: none;
            height: 85px;
            line-height: 85px;
            .left-cell,.left-cell:hover{
              display: block;
              text-decoration:none;//去掉下划线
              color: #a3afbc;
            }
            .left-cell:hover{
              color: #003b64 !important;
              background-color: white !important;
            }
            a:hover{
              color: #003b64 !important;
              background-color: white !important;
            }
          }
        }
      }
    }
    .view {
      float: left;
      width: 84%;
      padding: 0 5%;
      box-sizing: border-box;
      &.views {
        width:100%;
       }
      &.manager_statistics {
        padding: 0 5% 0 0;
      }
    }
  }
</style>
