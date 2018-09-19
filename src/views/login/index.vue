<template>
    <div class="login-box">
        <div class="masker">
            <div class="box inner-c">
                <div class="login">
                    <router-link :to="{name:'home'}" class="home">
                        <img src="./../../assets/logo.png" alt="" class="img">
                    </router-link>
                    <!--登陆-->
                    <div class="input-table">
                        <div class="cell user">
                            <span class="name">账号</span>
                            <input type="text" class="input" placeholder="请输入账号/手机号">
                        </div>
                        <div class="cell password">
                            <span class="name">密码</span>
                            <input type="text" class="input" placeholder="请输入密码">
                        </div>
                        <button class="login-btn">登陆</button>
                        <div class="tip">没有账号？ <span class="link">立即注册</span></div>
                    </div>
                    <!--注册-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    methods:{

    },
    created() {

    }
  }
</script>

<style lang="less" scoped>
    .login-box {
        width:100%;
        height:100vh;
        min-height: 800px;
        max-height: 1080px;
        background: url(./../../assets/images/banner-bg.jpg) no-repeat center center;
        -webkit-background-size:cover;
        background-size:cover;
        .masker {
            width:100%;
            height:100%;
            background-color: rgba(0,0,0,.3);
        }
        .box {
            height:100%;
            position: relative;
            .login {
                top:50%;
                left:50%;
                transform: translate(-50%,-50%);
                -webkit-transform: translate(-50%,-50%);
                position:absolute;
                .home {
                    position: absolute;
                    top:-37px;
                    left:213px;
                }
                .input-table {
                    width:500px;
                    height:335px;
                    background: #fff;
                    padding:70px 45px 0;
                    box-sizing: border-box;
                    .cell {
                        font-size: 18px;
                        text-align: left;
                        color:#000;
                        line-height: 35px;
                        .name {

                        }
                        .input {
                            font-size: 14px;
                            height:35px;
                            width:345px;
                            float: right;
                            padding-left:10px;
                            border:1px solid #999999;
                            box-sizing: border-box;
                        }
                        &.password {
                             margin-top: 40px;
                         }
                    }
                    .login-btn {
                        width:100%;
                        margin-top: 40px;
                        height:40px;
                        font-size: 18px;
                        line-height: 40px;
                        color:#fff;
                        border:none;
                        background: #026ab3;
                    }
                    .tip {
                        text-align: right;
                        margin-top: 25px;
                        font-size: 15px;
                        font-weight: 600;
                        .link {
                            margin-left: 15px;
                            color:#d92b2b;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
</style>
