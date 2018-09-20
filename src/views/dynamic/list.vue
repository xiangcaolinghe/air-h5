<template>
  <div class="list">
    <br>
    <div class="contain">
      <ul class="current_position">
        <li>当前位置：</li>
        <li><a href="/">首页</a>&nbsp;&nbsp;</li>
        <li><i class="icon iconfont icon-youjiantou"></i>&nbsp;&nbsp;</li>
        <li><a href="/dynamic/list">动态</a></li>
      </ul>
    </div>
    <br/>
    <div class="title_hr">
      <div class="banner_hr">
        <div class="bar_hr"></div>
      </div>
    </div>
    <br/> <br/>
    <div class="contain">
      <div class="current_date">
        <div class="date_month"><span class="current_month">{{month}}</span></div>
        <div class="date_day"><span class="current_day">{{day}}</span></div>
        <div class="jintian">今天</div>
        <div class="date_week">{{week}}</div>
      </div>
      <div class="contentList">
        <div v-for="(item,index) in list">
          <div class="news_img">
            <div class="circle"></div>
            <div class="shux"></div>
          </div>
          <ul class="content">
            <li class="title"><a href="/dynamic/details">{{item.title}}</a></li>
            <li class="contents"><a href="/dynamic/details">{{item.content}}</a></li>
            <li class="time">{{item.time}}</li>
            <li><br/></li>
          </ul>
          <!--<div v-if="index<list.length-1" class="content-hr"></div>-->
        </div>
        <br/><br/>
        <!--分页-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total=parseInt(total)>
        </el-pagination>
        <br/><br/>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Table,TableColumn,Pagination} from 'element-ui';
  import VueResource from 'vue-resource'
  Vue.use(Table);
  Vue.use(TableColumn);
  Vue.use(Pagination);
  Vue.use(VueResource)
  export default {
    data(){
      return{
        list:[
          {img: '/static/img/news-1.cf434b2.png',title: '玉树地震,西北空管局气象中心区域报室组织临时天气会商',content:
            '西北空管局管制中心主动作为，承接咸阳机场运管委战略解码指标，努力促进航班正常性工作，取得了良好成绩，' +
            '西安咸阳国际机场放行正常率达到92.21%，始发正常率达92.18%，两项指标均位列全国同级机场第一。同时，' +
            '咸阳机场离港航班正常率达83.99%，平均滑入时间、平均滑出时间、关舱门平均等待时间较去年同期均有明显平均滑入时间、平均滑出时间、关舱门平均等待时间较去年同期均有明显缩短', time: '2018/08/18'},
          {img: '/static/img/news-1.cf434b2.png',title: '玉树地震,西北空管局气象中心区域报室组织临时天气会商',content:
            '西北空管局管制中心主动作为，承接咸阳机场运管委战略解码指标，努力促进航班正常性工作，取得了良好成绩，' +
            '西安咸阳国际机场放行正常率达到92.21%，始发正常率达92.18%，两项指标均位列全国同级机场第一。同时，' +
            '咸阳机场离港航班正常率达83.99%，平均滑入时间、平均滑出时间、关舱门平均等待时间较去年同期均有明显缩短', time: '2018/08/18'},
          {img: '/static/img/news-1.cf434b2.png',title: '玉树地震,西北空管局气象中心区域报室组织临时天气会商',content:
            '西北空管局管制中心主动作为，承接咸阳机场运管委战略解码指标，努力促进航班正常性工作，取得了良好成绩，' +
            '西安咸阳国际机场放行正常率达到92.21%，始发正常率达92.18%，两项指标均位列全国同级机场第一。同时，' +
            '咸阳机场离港航班正常率达83.99%，平均滑入时间、平均滑出时间、关舱门平均等待时间较去年同期均有明显缩短', time: '2018/08/18'},
          {img: '/static/img/news-1.cf434b2.png',title: '玉树地震,西北空管局气象中心区域报室组织临时天气会商',content:
            '西北空管局管制中心主动作为，承接咸阳机场运管委战略解码指标，努力促进航班正常性工作，取得了良好成绩，' +
            '西安咸阳国际机场放行正常率达到92.21%，始发正常率达92.18%，两项指标均位列全国同级机场第一。同时，' +
            '咸阳机场离港航班正常率达83.99%，平均滑入时间、平均滑出时间、关舱门平均等待时间较去年同期均有明显缩短', time: '2018/08/18'},
          {img: '/static/img/news-1.cf434b2.png',title: '玉树地震,西北空管局气象中心区域报室组织临时天气会商',content:
            '西北空管局管制中心主动作为，承接咸阳机场运管委战略解码指标，努力促进航班正常性工作，取得了良好成绩，' +
            '西安咸阳国际机场放行正常率达到92.21%，始发正常率达92.18%，两项指标均位列全国同级机场第一。同时，' +
            '咸阳机场离港航班正常率达83.99%，平均滑入时间、平均滑出时间、关舱门平均等待时间较去年同期均有明显缩短', time: '2018/08/18'}
        ],
        currentPage: 1,      //当前页
        total: 20,          //数据总条数
        pageSize: 10,        //每页显示的数据条数
        month:'',
        day:'',
        week:''
      }
    },
    methods: {
      handleSizeChange(val) {
        this.pageSize = val;
//        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      currentDate(){
        var date = new Date();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (day >= 0 && day <= 9) {
          day = "0" + day;
        }
        var week = date.getDay()||7;
        if(week===1){
          week='星期一';
        }else if(week===2){
          week='星期二';
        }else if(week===3){
          week='星期三';
        }else if(week===4){
          week='星期四';
        }else if(week===5){
          week='星期五';
        }else if(week===6){
          week='星期六';
        }else if(week===7){
          week='星期七';
        }
        this.month=month+'月';
        this.day=day;
        this.week=week;
      }
    },
    mounted: function () {
      this.currentDate();
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
    height: 10px;
    width: 1200px;
    position: inherit;
    top: 0px;
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
  .current_date{
    width: 80px;
    height: 80px;
    /*margin-top: -540%;
    margin-left: 20%;*/
    border: 1px solid #b1b1b1;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .date_month{
    width: 80px;
    height: 40px;
    background: #da422a;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    color: white;
    font-size: 18px;
  }
  .current_month{
    position: absolute;
    margin-top: 0.6%;
    margin-left: -1%;
  }
  .date_day{
    width: 80px;
    height: 40px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    font-size: 18px;
  }
  .current_day{
    position: absolute;
    margin-top: 0.6%;
    margin-left: -0.8%;
  }
  .jintian{
    font-size: 30px;
    margin-top: 15%;
  }
  .date_week{
    font-size: 18px;
    margin-top: 15%;
  }
  .contentList{
    margin-top: -10%;
    margin-left: 9%;

  }
  .news_img {
    width: 20px;
    height: 50px;
    padding-top: 20px;
  }
  .content {
    margin-left: 10%;
    width: 80%;
    text-align: left;
    margin-top: -4%;
  }
  .circle {
    border-radius: 50%;
    height: 10px;
    width: 10px;
    background-color: #da422a;
    margin-left: 220%;
  }
  .shux{
    margin-left: 244%;
    width: 1px;
    height: 190px;
    background: #999999;
  }
</style>
