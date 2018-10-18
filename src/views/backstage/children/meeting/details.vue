<template>
  <div>
    <br>
    <div class="contain">
      <ul class="current_position">
        <li>当前位置：</li>
        <li><router-link :to="{name:'backstage.meeting'}">会议管理</router-link></li>
        <li>&nbsp;&nbsp;<i class="icon iconfont icon-youjiantou"></i>&nbsp;&nbsp;&nbsp;</li>
        <li><a href="javascript:;">详情</a></li>
      </ul>
    </div>
    <br/>
    <div class="title_hr">
      <div class="banner_hr">
        <div class="bar_hr"></div>
      </div>
    </div>
    <br/>
    <div class="inner-c detail-table">
      <div class="info">
        <div class="img"><img class="ewm pic" src="../../../../assets/images/erwm.png"></div>
        <div class="detail">
          <div class="title">{{datail.meetingName}}</div>
          <div class="time"><i class="icon iconfont icon-shijian"></i>{{datail.data[0]}} -- {{datail.data[1]}}</div>
          <div class="address"><i class="icon iconfont icon-dingweiweizhi"></i>{{datail.meetingPlace}}</div>
          <div class="btn">在线报名</div>
          <div class="wechart">
            <!--<img class="ewm" src="erwm.png">-->
            <p class="name">扫描二维码报名</p>
          </div>
        </div>
      </div>
      <div class="nav-tabs">
        <a class="tab" @click="tabActive(1)" :class="{active:active == 1}" href="#detail">会议简介</a>
        <a class="tab" @click="tabActive(2)" :class="{active:active == 2}" href="#unit">主办单位</a>
        <a class="tab" @click="tabActive(3)" :class="{active:active == 3}" href="#join">参会相关单位</a>
        <a class="tab" @click="tabActive(4)" :class="{active:active == 4}" href="#name">会议联系人</a>
        <a class="tab" @click="tabActive(5)" :class="{active:active == 5}" href="#date">会议日程</a>
      </div>
      <div class="nav-content">
        <!--会议简介-->
        <a name="detail"></a>
        <div class="tab">
          <div class="intro">
            {{datail.abstract}}
          </div>
        </div>
        <!--主办单位-->
        <a name="unit"></a>
        <div class="tab">
          <div class="title">主办单位</div>
          <ul>
            <li v-for="item in datail.partakeHost">{{item}}</li>
          </ul>
        </div>
        <!--参会相关单位-->
        <a name="join"></a>
        <div class="tab">
          <div class="title">参会相关单位</div>
          <ul>
            <li v-for="item in datail.partakeCompany">{{item}}</li>
          </ul>
        </div>
        <!--会议联系人-->
        <a name="name"></a>
        <div class="tab">
          <div class="title">会议联系人</div>
          <ul>
            <li>姓名 {{datail.contacts}}</li>
            <li>微信 {{datail.wx}}</li>
            <li>电话 {{datail.phone}}</li>
          </ul>
        </div>
        <!--会议日程-->
        <a name="date"></a>
        <div class="tab">
          <div class="title">会议日程</div>
          <div v-html="datail.agenda"></div>
          <span class="upload">附件点击下载.doc</span>
        </div>
        <!--备注-->
        <div class="tab">
          <div class="title">备注</div>
          <ul>
            <li>请认真填写报名信息，报名信息审核通过后会短信通知详细参会信息。</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      data(){
        return{
          datail:{
            meetingName : '',
            data : [],
            meetingPlace : '',
            abstract : '',
            partakeHost : [],
            partakeCompany : [],
            contacts : '',
            wx : '',
            phone : '',
            agenda : '',
            remarks : ''
          },
          active:1,
          abc : './../../../assets/logo.png'
        }
      },
      mounted: function () {
        this.getDetail();
      },
      methods: {
        getDetail() {
          let params = {};
          params['id'] = this.$route.query.id;
          API.get('static/mettingDetails.json', params).then((res) => {
            if (res.status == 200) {
              this.datail = res.data[0];
              console.log(this.datail)
            }
          })

          console.log(this.$route.query.id)

        }
      }
    }
</script>

<style lang="less" scoped>
  @import '../../../../assets/styles/list_details.less';
  .ewm {
    width: 250px;
    height: 250px;
    display: block;
    margin: 0 auto;
    margin-top: 30px;
  }
</style>
<style lang="less" scoped>
  @import '../../../../assets/styles/list.less';
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
  .detail-table {
    .info {
      width:100%;
      margin-bottom: 52px;
      background: #fff;
      height:320px;
      .img {
        float: left;
        width:574px;
        height:320px;
      }
      .detail {
        width:626px;
        text-align: left;
        float: left;
        padding:0 25px;
        box-sizing: border-box;
        height:320px;
        .title {
          height:116px;
          font-size: 26px;
          color:#026ab3;
          font-weight: 600;
          display: table-cell;
          vertical-align:middle
        }
        .time {
          font-size: 16px;
          color:#666666;
          font-weight: normal;
          line-height: 42px;
        }
        .icon {
          color:#026ab3;
          font-size: 20px;
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
        .btn {
          width:136px;
          height:46px;
          line-height: 46px;
          color:#fff;
          margin-top: 28px;
          font-size: 18px;
          cursor: pointer;
          background: #da422a;
          font-weight: 600;
          text-align: center;
        }
        .wechart {
          width:110px;
          text-align: center;
          float: right;
          .img {
            width:74px;
            height:74px;
            margin:0 auto;
            display: block;
            margin-bottom: 10px;
          }
          .name {
            font-size: 14px;
            color:#000;
          }
        }
      }
    }
    .nav-tabs {
      width: 100%;
      height:86px;
      margin-bottom: 20px;
      background: #fff;
      line-height: 86px;
      text-align: center;
      .tab {
        width:224px;
        cursor: pointer;
        color:#000;
        font-size: 24px;
        float: left;
        &.active {
          color:#026ab3;
          font-weight: 600;
          position:relative;
          &:after {
            content: '';
            display: block;
            width:100%;
            position: absolute;
            bottom:0;
            background: #026ab3;
            left:0;
            height:2px;
          }
        }
      }
    }
    .nav-content {
      .tab {
        width:100%;
        background: #fff;
        text-align: left;
        padding:14px 30px;
        box-sizing: border-box;
        margin-bottom: 20px;
        .intro {
          font-size: 18px;
          color:#666666;
        }
        .title {
          padding-left: 36px;
          box-sizing: border-box;
          position: relative;
          margin-bottom: 10px;
          font-size: 24px;
          font-weight: 600;
          &:before {
            content: '';
            display: block;
            position: absolute;
            width:3px;
            top:50%;
            transform: translateY(-50%);
            -webkit-transform: translateY(-50%);
            background: #026ab3;
            left:0;
            height:24px;
          }
        }
        ul {
          padding-left: 16px;
          box-sizing: border-box;
          list-style: disc;
          li {
            line-height: 34px;
            font-size: 18px;
            color:#666;
          }
        }
        .upload {
          font-size: 18px;
          color:#da422a;
          cursor: pointer;
          text-decoration: underline;
          font-weight: 600;
          line-height: 60px;
        }
      }
    }
  }
</style>
