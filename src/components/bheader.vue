<template>
    <div class="up-header">
      <div class="nav-box">
        <div class="up-nav">
        <span class="logo">
          <img src="./../assets/logo.png" alt="">
          <span class="name">管理平台</span>
        </span>
          <span class="welcome">
            <span class="user">
              <i class="iconfont icon icon-yonghu"></i><strong>欢迎您：admin</strong>
            </span>
            <span class="exit" @click="exit">
              <i class="iconfont icon icon-tuichu-copy"></i><strong>退出</strong>
            </span>
        </span>
        </div>
      </div>
      <div class="p-content">
        <div class="p-left">
          <div class="nav-left active">
            <ul>
              <li><router-link :to="{name:'backstage'}" class="left-c" :class="{active: $route.name == 'backstage.news'}"><i class="icon iconfont icon-xinwen"></i>新闻管理</router-link></li>
              <li><router-link :to="{name:'backstage.notice'}" class="left-c" :class="{active: $route.name == 'backstage.notice'}"><i class="icon iconfont icon-gonggao"></i>公告管理</router-link></li>
              <li><router-link :to="{name:'backstage.meeting'}" class="left-c" :class="{active: $route.name == 'backstage.meeting'}"><i class="icon iconfont icon-huiyi"></i>会议管理</router-link></li>
              <li><router-link :to="{name:'backstage.user'}" class="left-c" :class="{active: $route.name == 'backstage.user'}"><i class="icon iconfont icon-yonghuguanli"></i>用户管理</router-link></li>
            </ul>
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
        },
        // 退出登陆
        exit() {
          this.$confirm('您确定要退出管理平台?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            storage.delete('token');
            this.$message({
              type: 'success',
              message: '您已成功退出!'
            });
            let that = this
            setTimeout(function () {
              that.$router.push({name:'login'})
            },300)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消退出'
            });
          });
        }
      }
    }
</script>

<style lang="less" scoped>
  .up-header{
    min-width: 1200px;
    position: inherit;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 18px;
    font-weight: bold;
    .nav-box {
      width: 100%;
      background-color: #026ab3;
      height: 100px;
      .up-nav{
        width: 90%;
        height: 100%;
        margin: auto;
        .logo {
          .name {
            float: left;
            padding-left: 20px;
            font-size: 22px;
            color:#fff;
            line-height: 100px;
          }
        }
      }
    }
  }
  .up-nav img{
    float: left;
    margin-top: 0.8%;
  }
  .welcome{
    float: right;
    height:100px;
    overflow: hidden;
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
  .header-nav li{
    list-style: none;
    float: left;
    width: 12%;
    text-align: left;
    margin-top: 30px;
  }
  .nav-left{
    background-color: #003b64;
    position: absolute;
    width:16%;
    height:100%;
    font-weight: bolder;
    font-size: 18px;
    li{
      list-style: none;
      height: 85px;
      line-height: 85px;
      .left-c{
        display: block;
        text-decoration:none;
        color: #fff;
        &:hover {
           background: #fff;
           color: #003b64;
         }
         &.active {
            background: #fff;
            color: #003b64;
          }
      }
      .iconfont{
        font-size: 22px;
        margin-right: 25px;
      }
    }
  }
  .p-content {
    width:100%;
    position: relative;
    overflow:hidden;
    .p-left {
      float: left;
      min-height: 880px;
      width: 16%;
    }
    .view {
      float: left;
      width: 84%;
      padding: 0 5% 0 2%;
      box-sizing: border-box;
    }
  }
</style>
