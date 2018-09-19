<template>
    <div class="sign-detail">
        <div class="list">
            <br>
            <div class="contain">
                <ul class="current_position">
                    <li>当前位置：</li>
                    <li><a href="/">首页</a>&nbsp;&nbsp;</li>
                    <li>通知报名</li>
                    <li>详情</li>
                </ul>
            </div>
            <br/>
            <div class="title_hr">
                <div class="banner_hr">
                    <div class="bar_hr"></div>
                </div>
            </div>
            <br/> <br/>
        </div>
        <!--<div class="pass">-->
            <!--<div class="inner-c">-->

            <!--</div>-->
        <!--</div>-->
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
    @import '../../assets/styles/list.less';
    .title_hr{
        background-color: #f8f8f8;
        height: 10px;
        width: 100%;
    }
    .banner_hr{
        width: 1200px;
        position: inherit;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        height: inherit;
    }
    .bar_hr{
        background-color: #026ab3;
        height: 100%;
        width: 27%;
    }
</style>

