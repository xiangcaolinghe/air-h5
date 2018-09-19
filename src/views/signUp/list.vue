<template>
    <div class="sign-list">
        <div class="banner">
            <img src="./../../assets/images/banner.png" alt="" class="img">
        </div>
        <div class="list-content inner-c">
            <router-link :to="{name:'sign.detail'}" class="cell">
                <div class="img-box"><img src="" alt="" class="img"></div>
                <div class="detail">
                    <div class="title">董卿对自己有多狠？沉迷工作看不见儿子生病，网友：杨幂不要学</div>
                    <div class="time"><i class="icon iconfont icon-shijian"></i>2018-08-20  10:49:45 -- 2018-08-20  10:49:59</div>
                    <div class="address"><i class="icon iconfont icon-dingweiweizhi"></i>北京市东城区毛家湾胡同甲13号</div>
                </div>
            </router-link>
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

<style scoped lang="less">
    .sign-list {
        width:100%;
        .banner {
            margin-bottom: 30px;
            width:100%;
            .img {
                width:100%;
                display: block;
            }
        }
        .list-content {
            overflow:hidden;
            .cell {
                width:588px;
                display: block;
                float: left;
                height:558px;
                background: #fff;
                margin-right: 24px;
                margin-bottom:24px;
                &:hover {
                    text-decoration: none;
                }
                &:nth-child(2n+2) {
                     margin-right: 0;
                 }
                 .img-box {
                     width:558px;
                     margin-bottom: 10px;
                     height:357px;
                     .img {
                         display: block;
                         width:558px;
                         height:357px;
                     }
                 }
                .detail {
                    width:100%;
                    text-align: left;
                    padding:0 18px;
                    box-sizing: border-box;
                    .title {
                        height:82px;
                        font-size: 26px;
                        color:#000;
                        font-weight: 600;
                        display: table-cell;
                        vertical-align:middle
                    }
                    .time {
                        font-size: 16px;
                        color:#666666;
                        line-height: 42px;
                    }
                    .icon {
                        color:#026ab3;
                        margin-right: 20px;
                    }
                    .address {
                        font-size: 16px;
                        color:#666666;
                        line-height: 42px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;

                    }
                }
            }
        }
    }
</style>