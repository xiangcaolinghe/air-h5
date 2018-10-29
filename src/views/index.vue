<template>
    <div class="home-page">
        <div class="banner">
            <img src="./../assets/images/banner.png" alt="" class="img">
        </div>
        <div class="middle-table">
            <div class="messages inner-c">
                <div class="news-bg"></div>
                <div class="left">
                    <div class="tab">
                        <div class="item newst" :class="{active:isActive == 1}" @click="newsTab(1)"><span>新闻<i class="newsts"></i></span></div>
                        <div class="item newst" :class="{active:isActive == 2}" @click="newsTab(2)">动态<i class="newsts"></i></div>
                        <div class="item newst" :class="{active:isActive == 3}" @click="newsTab(3)">公告<i class="newsts"></i></div>
                    </div>
                    <div class="more" @click="newsList()">查看更多</div>
                    <div class="tab-content">
                        <div class="item" :class="{active:isActive == 1}">
                            <div class="list" v-for="i in newsShow" :key="i.id" @click="newsGo(i.id)">
                                <img :src="i.url" alt="" class="img">
                                <div class="title" :class="i.bs == 1 ? Red : Black">{{i.title}}</div>
                                <div class="article">{{i.content}}</div>
                                <div class="time">发布时间：{{i.date}}</div>
                            </div>
                        </div>
                        <div class="item common" :class="{active:isActive == 2}">
                            <div class="list" v-for="i in trendsShow" :key="i.id" @click="dynamicGo(i.id)">
                                <div class="title" :class="i.bs == 1 ? Red : Black">{{i.title}}</div>
                                <div class="article">{{i.content}}</div>
                                <div class="time">发布时间：{{i.date}}</div>
                            </div>
                        </div>
                        <div class="item common" :class="{active:isActive == 3}" >
                            <div class="list" v-for="i in noticeShow" :key="i.id" @click="noticeGo(i.id)">
                                <div class="title" :class="i.bs == 1 ? Red : Black">{{i.title}}</div>
                                <div class="article">{{i.content}}</div>
                                <div class="time">发布时间：{{i.date}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="nav-table">
                        <div class="cell" :style="{background:Color}"><i class="icon iconfont icon-ji"></i><p class="name">换季管理</p></div>
                        <div class="cell"><i class="icon iconfont icon-tongji1"></i><p class="name">月度管理</p></div>
                        <div class="cell"><i class="icon iconfont icon-tongji"></i><p class="name">区内管理</p></div>
                        <div class="cell"><i class="icon iconfont icon-flightSchedule"></i><p class="name">飞行程序</p></div>
                        <div class="cell" :style="{background:Color}"><div class="mask"><i class="icon iconfont icon-hangxian" :style="{color:Color}"></i></div><p class="name">临时航线</p></div>
                        <div class="cell"><div class="mask"><i class="icon iconfont icon-feihangxiaoshi"></i></div><p class="name">ARINC424</p></div>
                    </div>
                    <div class="input-table loginTab" v-show="loginShow">
                        <div class="cell"><span class="mask"><i class="icon iconfont icon-wode"></i></span><input type="text" class="input" placeholder="请输入您的用户名" v-model="userName"></div>
                        <div class="cell"><span class="mask"><i class="icon iconfont icon-mima"></i></span><input type="text" class="input" placeholder="请输入您的密码" v-model="passWord"></div>
                        <div class="cell"><input type="text" class="code input" placeholder="短信验证" v-model="code"><span class="code-btn" @click="validate">获取验证码</span></div>
                        <div class="cell button" @click="login">登陆</div>
                    </div>
                  <div class="loginTab" v-show="!loginShow">
                    <p>欢迎 <span>管理员</span> 登录</p>
                    <p @click="quit">【退出登录】</p>
                  </div>
                </div>
            </div>
            <div class="trends inner-c">
                <div class="left">
                    <div class="title">空域运行态势分析系统</div>
                    <div class="scheme">
                        <img src="./../assets/images/scheme.png" alt="" class="img">
                    </div>
                </div>
                <div class="right">
                    <div class="title">班机航线走向建议</div>
                    <div class="input-table">
                        <div class="cell"><span class="mask"><i class="icon iconfont icon-yuanhuan"></i></span><input type="text" class="input" placeholder="请输入起点名称" v-model="bj.qd"></div>
                        <div class="cell"><span class="mask"><i class="icon iconfont icon-round-copy"></i></span><input type="text" class="input" placeholder="请输入途径城市名称" v-model="bj.tj"></div>
                        <div class="cell"><span class="mask"><i class="icon iconfont icon-qizhongdian"></i></span><input type="text" class="input" placeholder="请输入终点名称" v-model="bj.zd"></div>
                        <div class="cell button" @click="Lookzxjy">查看走向建议</div>
                    </div>
                </div>
            </div>
            <div class="inner-c module">
              <div class="cell"><img src="./../assets/images/module-01.png" alt="" class="img"><p class="words">规范文件</p></div>
              <div class="cell"><img src="./../assets/images/module-02.png" alt="" class="img"><p class="words">新技术应用</p></div>
              <router-link :to="{name:'sign.list'}" class="cell"><img src="./../assets/images/module-01.png" alt="" class="img"><p class="words">会议报名系统</p></router-link>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
//    name: 'HelloWorld',
    data () {
      return {
        loginShow : true,
        isActive:1,
        newsShow : [],
        trendsShow : [],
        noticeShow : [],
        bj:{
          qd : '',
          tj : '',
          zd : ''
        },
        userName : '',
        passWord : '',
        code : '',
        // Color : '#026ab3',
        Color : '#ccc',
        Red : 'Red',
        Black : 'Black'
      }
    },
    methods:{
        // 新闻 动态 公告切换
      newsTab(id) {
        this.isActive = id
      },
      newsList(){
        if (this.isActive ===1){
          this.$router.push({path: '/news/list'});
        }else if (this.isActive===2){
          this.$router.push({path: '/dynamic/list'});
        }else if (this.isActive===3) {
          this.$router.push({path: '/notice/list'});
        }

      },
      getShowList(){
        // 新闻
        let params1 = {};
        params1['id'] = 123;
        API.get('static/news.json', params1).then((res) => {
          console.log(res.data)
          if (res.status == 200) {
            console.log(res.data[0])
            for(var i=0;i<3;i++){
              this.newsShow.push(res.data[i])
            }
            console.log(this.newsShow);

          } else {
            console.log(res.data)
          }
        })
        // 动态
        let params2 = {};
        params2['id'] = 123;
        API.get('static/trends.json', params2).then((res) => {
          console.log(res.data)
          if (res.status == 200) {
            console.log(res.data[0])
            for(var i=0;i<4;i++){
              this.trendsShow.push(res.data[i])
            }
            console.log(this.trendsShow);

          } else {
            console.log(res.data)
          }
        })
        //公告
        let params3 = {};
        params3['id'] = 123;
        API.get('static/notice.json', params3).then((res) => {
          console.log(res.data)
          if (res.status == 200) {
            console.log(res.data[0])
            for(var i=0;i<4;i++){
              this.noticeShow.push(res.data[i])
            }
            console.log(this.noticeShow);

          } else {
            console.log(res.data)
          }
        })
      },
      newsGo(id){
        this.$router.push({name:'newDetails',query:{id:id}})
      },
      noticeGo(id){
        this.$router.push({name:'noticeDetails',query:{id:id}})
      },
      dynamicGo(id){
        this.$router.push({name:'deynamicDetails',query:{id:id}})
      },
      // 走向建议
      Lookzxjy(){
        console.log(this.bj)
      },
      // 登录
      login(){

        if(!this.userName){
          this.$message({
            type: 'error',
            message: '请输入用户名!'
          });
        }else if(!this.passWord){
          this.$message({
            type: 'error',
            message: '请输入密码!'
          });
        }else if(!this.code){
          this.$message({
            type: 'error',
            message: '请输入验证码!'
          });
        }else {
          this.loginShow = false;
        }
      },
      // 退出
      quit(){
        this.loginShow = true;
        this.userName = ''
        this.passWord = ''
        this.code = ''
      },
      // 验证码
      validate(){
        console.log(this.userName)
        let val = /^1[34578]\d{9}$/;
        if(!val.test(this.userName)){
          this.$message({
            type: 'error',
            message: '请输入正确的手机号!'
          });
        }else{
          let params = {};
          params['userName'] = this.userName;
          API.get('static/news.json', params).then((res) => {
            if (res.status == 200) {
            } else {
              console.log(res.data)
            }
          })
        }
      },
    },
    created() {
      this.getShowList()

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .Red {
    color: #CF2727!important; ;
  }
  .Black {
    color: #0b0306!important; ;
  }
    .home-page {
        width:100%;
        .banner {
            margin-bottom: 30px;
            width:100%;
            .img {
                width:100%;
                display: block;
            }
        }
      .newst {
        position: relative;
        .newsts {
          width: 8px;
          height: 8px;
          background: red;
          position: absolute;
          left: 45px;
          top: 20px;
          border-radius: 4px;
        }
      }
        .middle-table {
            .module {
                overflow: hidden;
                margin:42px auto 30px;
                .cell {
                    width:374px;
                    height:165px;
                    cursor: pointer;
                    display: block;
                    position: relative;
                    float: left;
                    .words {
                        position: absolute;
                        color:#ffffff;
                        font-size: 30px;
                        top:50%;
                        left:50%;
                        transform: translate(-50%,-50%);
                        -webkit-transform: translate(-50%,-50%);
                    }
                    &:nth-child(2) {
                        margin:0 39px;
                     }
                    &:last-child {
                         float: right;
                     }
                }
            }
            .trends {
                height:352px;
                .title {
                    font-size: 24px;
                    font-weight: 600;
                    height:72px;
                    line-height: 72px;
                    color:#026ab3;
                    text-align: left;
                }
                .left {
                    width:770px;
                    height:352px;
                    float: left;
                }
                .right {
                    width:400px;
                    height:352px;
                    float: right;
                    .input-table {
                        .cell {
                            width:100%;
                            margin-bottom: 20px;
                            position: relative;
                            line-height:50px;
                            height:50px;
                            .input {
                                padding-left:80px;
                                width:100%;
                                height:50px;
                                font-size: 16px;
                                box-sizing: border-box;
                            }
                            .mask {
                                position: absolute;
                                display: block;
                                width:50px;
                                height:50px;
                                background: #026ab3;
                                .icon {
                                    color:#fff;
                                    font-size: 28px;
                                }
                            }
                            &.button {
                                 color:#fff;
                                 text-align: center;
                                 font-size: 18px;
                                 cursor: pointer;
                                 background: #026ab3;
                             }
                             &:nth-child(3) {
                                  margin-bottom: 35px;
                              }
                        }
                    }
                }
            }
            .messages {
                position: relative;
                height:560px;
                .news-bg {
                    position: absolute;
                    width:1130px;
                    height:560px;
                    background: url(./../assets/images/news-bg.png) no-repeat 0 0;
                    -webkit-background-size:1130px 560px;
                    background-size:1130px 560px;
                    top:0;
                    left:-360px;
                }
                .left {
                    width:770px;
                    height:560px;
                    position: relative;
                    float: left;
                    .tab {
                        width:300px;
                        height:80px;
                        .item {
                            float: left;
                            width:100px;
                            cursor: pointer;
                            text-align: left;
                            line-height: 80px;
                            font-size: 18px;
                            &.active {
                                font-size: 24px;
                                line-height: 77px;
                                font-weight: 600;
                                color:#026ab3;
                             }
                        }
                    }
                    .more {
                        position: absolute;
                        width:110px;
                        height:36px;
                        line-height: 36px;
                        font-size: 16px;
                        color:#fff;
                        background: #c5cbd1;
                        right:30px;
                        top:22px;
                        cursor: pointer;
                    }
                    .tab-content {
                        width:100%;
                        .item {
                            display: none;
                            .list {
                                float: left;
                                display: block;
                                cursor: pointer;
                                height:auto;
                                margin-right:18px;
                                width:240px;
                                .img {
                                    width:240px;
                                    display: block;
                                }
                                div {
                                    text-align: left;
                                    line-height: 30px;
                                    font-size: 18px;
                                    &.title {
                                        margin:19px 0 8px;
                                        height:60px;
                                        overflow: hidden;
                                        color:#0b0306;
                                        font-weight: 600;
                                    }
                                    &.article {
                                        color:#666666;
                                         height:150px;
                                         overflow: hidden;
                                    }
                                    &.time {
                                         color:#666666;
                                         margin-top: 30px;
                                         font-weight: 600;
                                    }
                                }
                                &:last-child {
                                    margin:0;
                                 }
                            }
                            &.active {
                                display: block;
                             }
                             &.common {
                                height:480px;
                                width:770px;
                                .list {
                                    clear:both;
                                    width:770px;
                                    height:auto;
                                    padding-right:30px;
                                    box-sizing: border-box;
                                    text-align: left;
                                    line-height: 30px;
                                    font-size: 18px;
                                    .title {
                                        height:28px;
                                        margin:0;
                                        line-height: 28px;
                                        overflow: hidden;
                                        color:#0b0306;
                                        font-weight: 600;
                                    }
                                    .article {
                                        color:#666666;
                                        height:60px;
                                        overflow: hidden;
                                    }
                                    .time {
                                        color:#666666;
                                        margin-top: 2px;
                                        height:30px;
                                        text-align: right;
                                        font-weight: 600;
                                    }
                                }
                              }
                        }
                    }
                }
                .right {
                    width:400px;
                    padding:0 10px;
                    box-sizing: border-box;
                    height:352px;
                    float: right;
                    .nav-table {
                        overflow:hidden;
                        margin-bottom:15px;
                        .cell {
                            display: block;
                            cursor: pointer;
                            width:120px;
                            padding-top: 15px;
                            height:120px;
                            float: left;
                            box-sizing: border-box;
                            background: #026ab3;
                            color:#fff;
                            margin-bottom:10px;
                            .mask {
                                width:48px;
                                height:48px;
                                background: #fff;
                                margin:0 auto;
                                border-radius: 50%;
                                .icon {
                                    font-size: 40px;
                                    color:#026ab3;
                                    line-height: 51px;
                                }
                            }
                            .name {
                                font-size: 18px;
                                line-height: 45px;
                            }
                            .icon {
                                color:#fff;
                                font-size: 48px;
                                &.icon-ji {
                                     font-size: 56px;
                                 }
                            }
                            &:nth-child(2) {
                                margin:0 10px 10px;
                             }
                            &:nth-child(5) {
                                 margin:0 10px 10px;
                             }
                             &:first-child{
                                  padding-top: 6px;
                              }
                        }
                    }
                    .input-table {
                        .cell {
                            width:100%;
                            margin-bottom: 20px;
                            position: relative;
                            line-height:50px;
                            overflow: hidden;
                            height:50px;
                            .input {
                                padding-left:80px;
                                width:100%;
                                height:50px;
                                font-size: 16px;
                                box-sizing: border-box;
                            }
                            .mask {
                                position: absolute;
                                display: block;
                                width:50px;
                                height:50px;
                                background: #026ab3;
                                .icon {
                                    color:#fff;
                                    font-size: 30px;
                                }
                            }
                            .code {
                                padding-left:15px;
                                width:230px;
                                float: left;
                            }
                            .code-btn {
                                display: block;
                                height:50px;
                                background: #026ab3;
                                width:128px;
                                float: right;
                                color:#fff;
                                text-align: center;
                                font-size: 18px;
                                cursor: pointer;
                            }
                            &.button {
                                 color:#fff;
                                 text-align: center;
                                 font-size: 18px;
                                 cursor: pointer;
                                 background: #026ab3;
                             }
                            &:nth-child(3) {
                                 margin-bottom: 35px;
                             }
                        }
                    }
                }
            }
        }
      .loginTab {
        width: 380px;
        height: 275px;
        p:nth-of-type(1) {
          text-align: center;
          font-size: 16px;
          line-height: 40px;
          margin-top: 100px;
          font-weight: bold;
        }
        p:nth-of-type(2) {
          text-align: center;
          font-size: 14px;
          font-weight: bold;
          color: #026ab3;
          cursor: pointer;
        }
      }
    }
</style>
