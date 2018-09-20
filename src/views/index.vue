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
                        <div class="item" :class="{active:isActive == 1}" @click="newsTab(1)">新闻</div>
                        <div class="item" :class="{active:isActive == 2}" @click="newsTab(2)">动态</div>
                        <div class="item" :class="{active:isActive == 3}" @click="newsTab(3)">公告</div>
                    </div>
                    <div class="more" @click="newsList()">查看更多</div>
                    <div class="tab-content">
                        <div class="item" :class="{active:isActive == 1}">
                            <div class="list">
                                <img src="./../assets/images/news-1.png" alt="" class="img">
                                <div class="title">西北空管局召开2018年“两优一先”表彰会。</div>
                                <div class="article">近日，华东空管局空管工程建设指挥部工会组织带领全体员工与上海同济工程项目管理咨询有限公司开展工程业务交流活动。</div>
                                <div class="time">发布时间：2018.07.10</div>
                            </div>
                            <div class="list">
                                <img src="./../assets/images/news-1.png" alt="" class="img">
                                <div class="title">西北空管局召开2018年“两优一先”表彰会。</div>
                                <div class="article">近日，华东空管局空管工程建设指挥部工会组织带领全体员工与上海同济工程项目管理咨询有限公司开展工程业务交流活动。</div>
                                <div class="time">发布时间：2018.07.10</div>
                            </div>
                            <div class="list">
                                <img src="./../assets/images/news-1.png" alt="" class="img">
                                <div class="title">西北空管局召开2018年“两优一先”表彰会。</div>
                                <div class="article">近日，华东空管局空管工程建设指挥部工会组织带领全体员工与上海同济工程项目管理咨询有限公司开展工程业务交流活动。</div>
                                <div class="time">发布时间：2018.07.10</div>
                            </div>
                        </div>
                        <div class="item common" :class="{active:isActive == 2}">
                            <div class="list">
                                <div class="title">西北空管局召开2018年“两优一先”表彰会。</div>
                                <div class="article">近日，华东空管局空管工程建设指挥部工会组织带领全体员工与上海同济工程项目管理咨询有限公司开展工程业务交流活动。</div>
                                <div class="time">发布时间：2018.07.10</div>
                            </div>
                            <div class="list">
                                <div class="title">西北空管局召开2018年“两优一先”表彰会。</div>
                                <div class="article">近日，华东空管局空管工程建设指挥部工会组织带领全体员工与上海同济工程项目管理咨询有限公司开展工程业务交流活动。</div>
                                <div class="time">发布时间：2018.07.10</div>
                            </div>
                            <div class="list">
                                <div class="title">西北空管局召开2018年“两优一先”表彰会。</div>
                                <div class="article">近日，华东空管局空管工程建设指挥部工会组织带领全体员工与上海同济工程项目管理咨询有限公司开展工程业务交流活动。</div>
                                <div class="time">发布时间：2018.07.10</div>
                            </div>
                            <div class="list">
                                <div class="title">西北空管局召开2018年“两优一先”表彰会。</div>
                                <div class="article">近日，华东空管局空管工程建设指挥部工会组织带领全体员工与上海同济工程项目管理咨询有限公司开展工程业务交流活动。</div>
                                <div class="time">发布时间：2018.07.10</div>
                            </div>
                        </div>
                        <div class="item common" :class="{active:isActive == 3}">
                            <div class="list">
                                <div class="title">西北空管局召开2018年“两优一先”表彰会。</div>
                                <div class="article">近日，华东空管局空管工程建设指挥部工会组织带领全体员工与上海同济工程项目管理咨询有限公司开展工程业务交流活动。</div>
                                <div class="time">发布时间：2018.07.10</div>
                            </div>
                            <div class="list">
                                <div class="title">西北空管局召开2018年“两优一先”表彰会。</div>
                                <div class="article">近日，华东空管局空管工程建设指挥部工会组织带领全体员工与上海同济工程项目管理咨询有限公司开展工程业务交流活动。</div>
                                <div class="time">发布时间：2018.07.10</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="nav-table">
                        <div class="cell"><i class="icon iconfont icon-ji"></i><p class="name">换季管理</p></div>
                        <div class="cell"><i class="icon iconfont icon-tongji1"></i><p class="name">月度管理</p></div>
                        <div class="cell"><i class="icon iconfont icon-tongji"></i><p class="name">区内管理</p></div>
                        <div class="cell"><i class="icon iconfont icon-flightSchedule"></i><p class="name">飞行程序</p></div>
                        <div class="cell"><div class="mask"><i class="icon iconfont icon-hangxian"></i></div><p class="name">临时航线</p></div>
                        <div class="cell"><div class="mask"><i class="icon iconfont icon-feihangxiaoshi"></i></div><p class="name">ARINC424</p></div>
                    </div>
                    <div class="input-table">
                        <div class="cell"><span class="mask"><i class="icon iconfont icon-wode"></i></span><input type="text" class="input" placeholder="请输入您的用户名"></div>
                        <div class="cell"><span class="mask"><i class="icon iconfont icon-mima"></i></span><input type="text" class="input" placeholder="请输入您的密码"></div>
                        <div class="cell"><input type="text" class="code input" placeholder="短信验证"><span class="code-btn">获取验证码</span></div>
                        <div class="cell button">登陆</div>
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
                        <div class="cell"><span class="mask"><i class="icon iconfont icon-yuanhuan"></i></span><input type="text" class="input" placeholder="请输入起点名称"></div>
                        <div class="cell"><span class="mask"><i class="icon iconfont icon-round-copy"></i></span><input type="text" class="input" placeholder="请输入途径城市名称"></div>
                        <div class="cell"><span class="mask"><i class="icon iconfont icon-qizhongdian"></i></span><input type="text" class="input" placeholder="请输入终点名称"></div>
                        <div class="cell button">查看走向建议</div>
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
        isActive:1
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

      }
    },
    created() {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
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
    }
</style>
