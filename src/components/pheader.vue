<template>
    <div class="up_header">
      <div class="up_nav">
        <div class="up_nav_content">
        <span>
          <img src="./../assets/logo.png" alt="">
        </span>
          <span class="welcome">
          <i class="iconfont icon-yonghu"></i>&nbsp;&nbsp;<strong>欢迎您：admin</strong>&nbsp;&nbsp;<span class="exit" @click="exit">
              <i class="iconfont icon icon-tuichu-copy"></i>&nbsp;&nbsp;<strong>退出</strong>&nbsp;&nbsp;
            </span>
        </span>
        </div>
      </div>
      <div class="down_header">
          <div class="header_nav">
            <ul>
              <li><router-link class="nav-cell" :to="{name: 'platform.index'}" :class="{active:$route.name == 'platform.index'}"><i class="iconfont icon-home"></i>&nbsp;&nbsp;首页</router-link></li>
              <li><router-link class="nav-cell" :to="{name: 'platform.flowpath'}" :class="{active:$route.meta.manager == true}"><i class="iconfont icon-tongji1"></i>&nbsp;&nbsp;月度管理</router-link></li>
              <li><router-link class="nav-cell" :to="{name: 'month.apply.regular'}" :class="{active:$route.meta.monthApply == true}"><i class="iconfont icon-tongji1"></i>&nbsp;&nbsp;月度申请</router-link></li>
              <li><router-link class="nav-cell" :to="{name: 'month.handle.deal'}" :class="{active:$route.meta.monthHandle == true}"><i class="iconfont icon-tongji1"></i>&nbsp;&nbsp;月度处理</router-link></li>
              <li><router-link class="nav-cell" :to="{name: 'quarterly.manager.deal'}" :class="{active:$route.meta.quarterlyManager == true}"><i class="iconfont icon-tongji1"></i>&nbsp;&nbsp;季度管理</router-link></li>
              <li><router-link class="nav-cell" :to="{name:'platform.local'}" :class="{active:$route.meta.local == true}"><i class="iconfont icon-tongji"></i>&nbsp;&nbsp;区内管理</router-link></li>
              <li><router-link class="nav-cell" :to="{name:'platform.airway'}" :class="{active:$route.name == 'platform.airway'}"><i class="iconfont icon-flightSchedule"></i>&nbsp;&nbsp;班机航线</router-link></li>
            </ul>
          </div>
      </div>
      <div class="p-content">
        <div class="p-left" v-show="!$route.meta.hideLeft">
          <div class="p-left-height">
            <div class="nav_left" :class="{active:$route.meta.manager == true}">
              <div class="">
                <ul>
                  <li><router-link :to="{name:'platform.flowpath'}" :class="{active:$route.name == 'platform.flowpath'}" class="left-cell">月度上报流程</router-link></li>
                  <li><router-link :to="{name:'platform.flowimport'}" :class="{active:$route.name == 'platform.flowimport'}" class="left-cell">上报数据导入</router-link></li>
                  <li><router-link :to="{name:'platform.flowmanager'}" :class="{active:$route.name == 'platform.flowmanager'}" class="left-cell">上报数据管理</router-link></li>
                  <li><router-link :to="{name:'platform.flowstatistics'}" :class="{active:$route.name == 'platform.flowstatistics'}" class="left-cell">上报数据统计</router-link></li>
                  <li><router-link :to="{name:'platform.flowreplyimport'}" :class="{active:$route.name == 'platform.flowreplyimport'}" class="left-cell">批复数据导入</router-link></li>
                  <li><router-link :to="{name:'platform.flowreplyexport'}" :class="{active:$route.name == 'platform.flowreplyexport'}" class="left-cell">批复数据导出</router-link></li>
                </ul>
              </div>
            </div>
            <div class="nav_left" :class="{active:$route.meta.monthApply == true}">
              <div class="">
                <ul>
                  <li><router-link :to="{name:'month.apply.regular'}" :class="{active:$route.name == 'month.apply.regular'}" class="left-cell">月度申请</router-link></li>
                  <li><router-link :to="{name:'month.apply.special'}" :class="{active:$route.name == 'month.apply.special'}" class="left-cell">特殊申请</router-link></li>
                </ul>
              </div>
            </div>
            <div class="nav_left"  :class="{active:$route.meta.monthHandle == true}">
            <div class="">
              <ul>
                <li><router-link :to="{name:'month.handle.deal'}" :class="{active:$route.name == 'month.handle.deal'}" class="left-cell">当月申请处理</router-link></li>
                <li><router-link :to="{name:'month.handle.history'}" :class="{active:$route.name == 'month.handle.history'}" class="left-cell">月度申请历史</router-link></li>
                <li><router-link :to="{name:'month.handle.special'}" :class="{active:$route.name == 'month.handle.special'}" class="left-cell">特殊申请</router-link></li>
                <li><router-link :to="{name:'month.handle.upload'}" :class="{active:$route.name == 'month.handle.upload'}" class="left-cell">运行附件上传</router-link></li>
                <li><router-link :to="{name:'month.handle.download'}" :class="{active:$route.name == 'month.handle.download'}" class="left-cell">军方批复下载</router-link></li>
              </ul>
            </div>
          </div>
            <div class="nav_left"  :class="{active:$route.meta.quarterlyManager == true}">
              <div class="">
                <ul>
                  <li><router-link :to="{name:'quarterly.manager.deal'}" :class="{active:$route.name == 'quarterly.manager.deal'}" class="left-cell">当季申请处理</router-link></li>
                  <li><router-link :to="{name:'quarterly.manager.vereinignen'}" :class="{active:$route.name == 'quarterly.manager.vereinignen'}" class="left-cell">换季处理合并项</router-link></li>
                  <li><router-link :to="{name:'quarterly.manager.aufstellen'}" :class="{active:$route.name == 'quarterly.manager.aufstellen'}" class="left-cell">换季处理设置</router-link></li>
                  <li><router-link :to="{name:'quarterly.manager.recyclebin'}" :class="{active:$route.name == 'quarterly.manager.recyclebin'}" class="left-cell">回收站</router-link></li>
                  <li><router-link :to="{name:'quarterly.manager.history'}" :class="{active:$route.name == 'quarterly.manager.history'}" class="left-cell">换季申请历史</router-link></li>
                  <li><router-link :to="{name:'quarterly.manager.special'}" :class="{active:$route.name == 'quarterly.manager.special'}" class="left-cell">特殊申请</router-link></li>
                  <li><router-link :to="{name:'quarterly.manager.upload'}" :class="{active:$route.name == 'quarterly.manager.upload'}" class="left-cell">班级航线附件上传</router-link></li>
                  <li><router-link :to="{name:'quarterly.manager.download'}" :class="{active:$route.name == 'quarterly.manager.download'}" class="left-cell">军方批复下载</router-link></li>
                </ul>
              </div>
            </div>
            <div class="nav_left" :class="{active:$route.meta.local == true}">
              <div class="">
                <ul>
                  <li><router-link :to="{name:'platform.local'}" :class="{active:$route.name == 'platform.local'}" class="left-cell">区内上报流程</router-link></li>
                  <li><router-link :to="{name:'platform.local.import'}" :class="{active:$route.name == 'platform.local.import'}" class="left-cell">上报数据导入</router-link></li>
                  <li><router-link :to="{name:'platform.local.manager'}" :class="{active:$route.name == 'platform.local.manager'}" class="left-cell">上报数据管理</router-link></li>
                  <li><router-link :to="{name:'platform.local.statistics'}" :class="{active:$route.name == 'platform.local.statistics'}" class="left-cell">上报数据统计</router-link></li>
                  <li><router-link :to="{name:'platform.local.reply.import'}" :class="{active:$route.name == 'platform.local.reply.import'}" class="left-cell">批复数据导入</router-link></li>
                  <li><router-link :to="{name:'platform.local.reply.export'}" :class="{active:$route.name == 'platform.local.reply.export'}" class="left-cell">批复数据导出</router-link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="view" :class="{views : $route.meta.hideLeft,manager_statistics:$route.meta.noPadding== true}">
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
        },
        // 退出登陆
        exit() {
          storage.delete('token');
          this.$router.push({name:'login'})
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
        line-height: 100px;
        font-size: 20px;
        color: #d5e0ee;
        .user {
          cursor: pointer;
          margin-right: 30px;
          .iconfont {
            font-size: 27px;
            margin-right: 10px;
          }
        }
        .exit {
          cursor: pointer;
          margin-right: 5px;
          .iconfont {
            font-size: 25px;
            margin-right: 10px;
          }
        }
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
        .nav-cell {
          &.active{
            color: white !important;
          }
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
            .left-cell{
              display: block;
              height: 85px;
              text-decoration:none;//去掉下划线
              color: #a3afbc;
              &.active {
                color: #003b64 !important;
                background-color: white !important;
              }
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
