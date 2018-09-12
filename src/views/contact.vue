<template>
    <div class="ca-header">
        <div class="pass">
            <div class="inner-c">
                <a href="javascript:;" class="words">管理员通道</a>
            </div>
        </div>
        <div class="box">
            <div class="inner-c">
                <div class="logo"><img src="./../assets/logo.png" alt="" class="img"></div>
                <ul class="nav">
                    <li class="cell" :class="{active: $route.name == 'home'}"><router-link :to="{name:'home'}" class="link"><span class="word">首页</span></router-link></li>
                    <li class="cell" :class="{active: $route.name == 'planning'}"><router-link :to="{name:'planning'}" class="link"><span class="word">空域规划</span></router-link></li>
                    <li class="cell" :class="{active: $route.name == 'manage'}"><router-link :to="{name:'manage'}" class="link"><span class="word">空域管理</span></router-link></li>
                    <li class="cell" :class="{active: $route.name == 'design'}"><router-link :to="{name:'design'}" class="link"><span class="word">程序设计</span></router-link></li>
                    <li class="cell" :class="{active: $route.name == 'reduce'}"><router-link  :to="{name:'reduce'}" class="link"><span class="word">节能减排</span></router-link></li>
                    <li class="cell" :class="{active: $route.name == 'contact'}"><router-link :to="{name:'contact'}" class="link"><span class="word">联系我们</span></router-link></li>
                </ul>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--<style lang="less">-->
<!--</style>-->
