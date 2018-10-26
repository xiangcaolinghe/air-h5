<template>
    <div class="sign-list">
        <div class="banner">
            <img src="./../../assets/images/banner.png" alt="" class="img">
        </div>
        <div class="list-content inner-c" >
            <router-link :to="{path:'/sign/detail',query:{id:i.id}}" class="cell" v-for="i in meetingList" :key="i.id">
                <div class="img-box"><img src="./../../assets/images/erwm.png" class="img"></div>
                <div class="detail">
                    <div class="title">{{i.meetingName}}</div>
                    <div class="time"><i class="icon iconfont icon-shijian"></i>{{i.data[0]}} -- {{i.data[1]}}</div>
                    <div class="address"><i class="icon iconfont icon-dingweiweizhi"></i>{{i.meetingPlace}}</div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        meetingList : []
      }
    },
    methods:{
      getPage(){
        let params1 = {};
        params1['id'] = 123;
        API.get('static/mettingDetails.json', params1).then((res) => {
          console.log(res.data)
          if (res.status == 200) {
            this.meetingList = res.data;
          } else {
            console.log(res.data)
          }
        })
      }

    },
    created() {
      this.getPage();
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
                     .img {
                       display: block;
                       margin: 50px auto;
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
