<template>
  <div class="list">
    <br/><br/>
    <div class="contain">
      <div>
        <span class="plan">空域规划</span><span class="current_plan">{{currentPlanName}}</span>
      </div>
      <br/><br/>
      <ul class="current_banner">
        <li><a @click="switcher(1)" class="banner_color" :class="{active:isActive == 1}">空域规划1&nbsp;&nbsp;&nbsp;&nbsp;<i class="icon iconfont icon-you"></i></a></li>
        <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>
        <li><a @click="switcher(2)" class="banner_color" :class="{active:isActive == 2}">空域规划2&nbsp;&nbsp;&nbsp;&nbsp;<i class="icon iconfont icon-you"></i></a></li>
        <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>
        <li><a @click="switcher(3)" class="banner_color" :class="{active:isActive == 3}">空域规划3&nbsp;&nbsp;&nbsp;&nbsp;<i class="icon iconfont icon-you"></i></a></li>
      </ul>
    </div>
    <div class="contain">
      <div class="contentList" :class="{active:isActive == this.isActive}">
        <div v-for="(item,index) in list">
          <div class="content-hr"></div>
          <br/><br/><br/>
          <ul class="content">
            <li class="title"><a href="javascript:;">{{item.title}}</a></li>
            <li :class="item.show ? 'contents' : 'limitC'"><a href="javascript:;"  @click="showContent(item,index)">{{item.content}}</a></li>
            <li class="time">{{item.time}}</li>
            <li><br/></li>
          </ul>
          <!--<div v-if="index<list.length-1" class="content-hr"></div>-->
        </div>
        <div class="content-hr"></div>
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
        list:[],
        currentPage: 1,      //当前页
        total: 20,          //数据总条数
        pageSize: 10,        //每页显示的数据条数
        month:'',
        day:'',
        week:'',
        changeNoticeList:[],
        temporaryRoutesList:[],
        meetingNoticeList:[],
        isActive:1,
        currentPlanName:'空域规划1',
        contentHidden: true
      }
    },
    methods: {
      handleSizeChange(val) {
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      switcher(number){
        if (number===1){
          this.isActive=number;
          this.currentPlanName="空域调整";
          this.list=this.changeNoticeList;
        }else if (number===2){
          this.isActive=number;
          this.currentPlanName="班机航线";
          this.temporaryRoutesList=[
            {img: '/static/img/news-1.cf434b2.png',title: '玉树地震,西北空管局气象中心区域报室组织临时天气会商2',content:
              '西北空管局管制中心主动作为，承接咸阳机场运管委战略解码指标，努力促进航班正常性工作，取得了良好成绩，' +
              '西安咸阳国际机场放行正常率达到92.21%，始发正常率达92.18%，两项指标均位列全国同级机场第一。同时，' +
              '咸阳机场离港航班正常率达83.99%，平均滑入时间、平均滑出时间、关舱门平均等待时间较去年同期均有明显平均滑入' +
              '时间、平均滑出时间、关舱门平均等待时间较去年同期均有明显缩短', time: '2018/08/18 13:30', show: true},
            {img: '/static/img/news-1.cf434b2.png',title: '玉树地震,西北空管局气象中心区域报室组织临时天气会商2',content:
              '西北空管局管制中心主动作为，承接咸阳机场运管委战略解码指标，努力促进航班正常性工作，取得了良好成绩，' +
              '西安咸阳国际机场放行正常率达到92.21%，始发正常率达92.18%，两项指标均位列全国同级机场第一。同时，' +
              '咸阳机场离港航班正常率达83.99%，平均滑入时间、平均滑出时间、关舱门平均等待时间较去年同期均有明显缩短',
              time: '2018/08/18 13:30', show: true},
            {img: '/static/img/news-1.cf434b2.png',title: '玉树地震,西北空管局气象中心区域报室组织临时天气会商2',content:
              '西北空管局管制中心主动作为，承接咸阳机场运管委战略解码指标，努力促进航班正常性工作，取得了良好成绩，' +
              '西安咸阳国际机场放行正常率达到92.21%，始发正常率达92.18%，两项指标均位列全国同级机场第一。同时，' +
              '咸阳机场离港航班正常率达83.99%，平均滑入时间、平均滑出时间、关舱门平均等待时间较去年同期均有明显缩短',
              time: '2018/08/18 13:30', show: true},
            {img: '/static/img/news-1.cf434b2.png',title: '玉树地震,西北空管局气象中心区域报室组织临时天气会商2',content:
              '西北空管局管制中心主动作为，承接咸阳机场运管委战略解码指标，努力促进航班正常性工作，取得了良好成绩，' +
              '西安咸阳国际机场放行正常率达到92.21%，始发正常率达92.18%，两项指标均位列全国同级机场第一。同时，' +
              '咸阳机场离港航班正常率达83.99%，平均滑入时间、平均滑出时间、关舱门平均等待时间较去年同期均有明显缩短',
              time: '2018/08/18 13:30', show: true},
            {img: '/static/img/news-1.cf434b2.png',title: '玉树地震,西北空管局气象中心区域报室组织临时天气会商2',content:
              '西北空管局管制中心主动作为，承接咸阳机场运管委战略解码指标，努力促进航班正常性工作，取得了良好成绩，' +
              '西安咸阳国际机场放行正常率达到92.21%，始发正常率达92.18%，两项指标均位列全国同级机场第一。同时，' +
              '咸阳机场离港航班正常率达83.99%，平均滑入时间、平均滑出时间、关舱门平均等待时间较去年同期均有明显缩短',
              time: '2018/08/18 13:30', show: true}
          ];
          this.list=this.temporaryRoutesList;
        }else if (number===3){
          this.isActive=number;
          this.currentPlanName="相关规定";
          this.meetingNoticeList=[
            {img: '/static/img/news-1.cf434b2.png',title: '玉树地震,西北空管局气象中心区域报室组织临时天气会商3',content:
              '西北空管局管制中心主动作为，承接咸阳机场运管委战略解码指标，努力促进航班正常性工作，取得了良好成绩，' +
              '西安咸阳国际机场放行正常率达到92.21%，始发正常率达92.18%，两项指标均位列全国同级机场第一。同时，' +
              '咸阳机场离港航班正常率达83.99%，平均滑入时间、平均滑出时间、关舱门平均等待时间较去年同期均有明显平均滑入' +
              '时间、平均滑出时间、关舱门平均等待时间较去年同期均有明显缩短', time: '2018/08/18 13:30', show: true},
            {img: '/static/img/news-1.cf434b2.png',title: '玉树地震,西北空管局气象中心区域报室组织临时天气会商3',content:
              '西北空管局管制中心主动作为，承接咸阳机场运管委战略解码指标，努力促进航班正常性工作，取得了良好成绩，' +
              '西安咸阳国际机场放行正常率达到92.21%，始发正常率达92.18%，两项指标均位列全国同级机场第一。同时，' +
              '咸阳机场离港航班正常率达83.99%，平均滑入时间、平均滑出时间、关舱门平均等待时间较去年同期均有明显缩短',
              time: '2018/08/18 13:30', show: true},
            {img: '/static/img/news-1.cf434b2.png',title: '玉树地震,西北空管局气象中心区域报室组织临时天气会商3',content:
              '西北空管局管制中心主动作为，承接咸阳机场运管委战略解码指标，努力促进航班正常性工作，取得了良好成绩，' +
              '西安咸阳国际机场放行正常率达到92.21%，始发正常率达92.18%，两项指标均位列全国同级机场第一。同时，' +
              '咸阳机场离港航班正常率达83.99%，平均滑入时间、平均滑出时间、关舱门平均等待时间较去年同期均有明显缩短',
              time: '2018/08/18 13:30', show: true},
            {img: '/static/img/news-1.cf434b2.png',title: '玉树地震,西北空管局气象中心区域报室组织临时天气会商3',content:
              '西北空管局管制中心主动作为，承接咸阳机场运管委战略解码指标，努力促进航班正常性工作，取得了良好成绩，' +
              '西安咸阳国际机场放行正常率达到92.21%，始发正常率达92.18%，两项指标均位列全国同级机场第一。同时，' +
              '咸阳机场离港航班正常率达83.99%，平均滑入时间、平均滑出时间、关舱门平均等待时间较去年同期均有明显缩短',
              time: '2018/08/18 13:30', show: true},
            {img: '/static/img/news-1.cf434b2.png',title: '玉树地震,西北空管局气象中心区域报室组织临时天气会商3',content:
              '西北空管局管制中心主动作为，承接咸阳机场运管委战略解码指标，努力促进航班正常性工作，取得了良好成绩，' +
              '西安咸阳国际机场放行正常率达到92.21%，始发正常率达92.18%，两项指标均位列全国同级机场第一。同时，' +
              '咸阳机场离港航班正常率达83.99%，平均滑入时间、平均滑出时间、关舱门平均等待时间较去年同期均有明显缩短',
              time: '2018/08/18 13:30', show: true}
          ];
          this.list=this.meetingNoticeList;
        }else if (number===4){
          this.isActive=number;
          this.currentPlanName="新技术应用";
          this.meetingNoticeList=[
            {img: '/static/img/news-1.cf434b2.png',title: '玉树地震,西北空管局气象中心区域报室组织临时天气会商3',content:
              '西北空管局管制中心主动作为，承接咸阳机场运管委战略解码指标，努力促进航班正常性工作，取得了良好成绩，' +
              '西安咸阳国际机场放行正常率达到92.21%，始发正常率达92.18%，两项指标均位列全国同级机场第一。同时，' +
              '咸阳机场离港航班正常率达83.99%，平均滑入时间、平均滑出时间、关舱门平均等待时间较去年同期均有明显平均滑' +
              '入时间、平均滑出时间、关舱门平均等待时间较去年同期均有明显缩短', time: '2018/08/18 13:30', show: true},
            {img: '/static/img/news-1.cf434b2.png',title: '玉树地震,西北空管局气象中心区域报室组织临时天气会商3',content:
              '西北空管局管制中心主动作为，承接咸阳机场运管委战略解码指标，努力促进航班正常性工作，取得了良好成绩，' +
              '西安咸阳国际机场放行正常率达到92.21%，始发正常率达92.18%，两项指标均位列全国同级机场第一。同时，' +
              '咸阳机场离港航班正常率达83.99%，平均滑入时间、平均滑出时间、关舱门平均等待时间较去年同期均有明显缩短',
              time: '2018/08/18 13:30', show: true},
            {img: '/static/img/news-1.cf434b2.png',title: '玉树地震,西北空管局气象中心区域报室组织临时天气会商3',content:
              '西北空管局管制中心主动作为，承接咸阳机场运管委战略解码指标，努力促进航班正常性工作，取得了良好成绩，' +
              '西安咸阳国际机场放行正常率达到92.21%，始发正常率达92.18%，两项指标均位列全国同级机场第一。同时，' +
              '咸阳机场离港航班正常率达83.99%，平均滑入时间、平均滑出时间、关舱门平均等待时间较去年同期均有明显缩短',
              time: '2018/08/18 13:30', show: true},
            {img: '/static/img/news-1.cf434b2.png',title: '玉树地震,西北空管局气象中心区域报室组织临时天气会商3',content:
              '西北空管局管制中心主动作为，承接咸阳机场运管委战略解码指标，努力促进航班正常性工作，取得了良好成绩，' +
              '西安咸阳国际机场放行正常率达到92.21%，始发正常率达92.18%，两项指标均位列全国同级机场第一。同时，' +
              '咸阳机场离港航班正常率达83.99%，平均滑入时间、平均滑出时间、关舱门平均等待时间较去年同期均有明显缩短',
              time: '2018/08/18 13:30', show: true},
            {img: '/static/img/news-1.cf434b2.png',title: '玉树地震,西北空管局气象中心区域报室组织临时天气会商3',content:
              '西北空管局管制中心主动作为，承接咸阳机场运管委战略解码指标，努力促进航班正常性工作，取得了良好成绩，' +
              '西安咸阳国际机场放行正常率达到92.21%，始发正常率达92.18%，两项指标均位列全国同级机场第一。同时，' +
              '咸阳机场离港航班正常率达83.99%，平均滑入时间、平均滑出时间、关舱门平均等待时间较去年同期均有明显缩短',
              time: '2018/08/18 13:30', show: true}
          ];
          this.list=this.meetingNoticeList;
        }
      },
      showContent(item, index) {
        if (item.show){
          item.show=false;
        }else{
          item.show=true;
        }

      }
    },
    mounted: function () {
      this.changeNoticeList=[
        {img: '/static/img/news-1.cf434b2.png',title: '玉树地震,西北空管局气象中心区域报室组织临时天气会商1',content:
          '西北空管局管制中心主动作为，承接咸阳机场运管委战略解码指标，努力促进航班正常性工作，取得了良好成绩，' +
          '西安咸阳国际机场放行正常率达到92.21%，始发正常率达92.18%，两项指标均位列全国同级机场第一。同时，' +
          '咸阳机场离港航班正常率达83.99%，平均滑入时间、平均滑出时间、关舱门平均等待时间较去年同期均有明显平均滑入' +
          '时间、平均滑出时间、关舱门平均等待时间较去年同期均有明显缩短', time: '2018/08/18 13:30', show: true},
        {img: '/static/img/news-1.cf434b2.png',title: '玉树地震,西北空管局气象中心区域报室组织临时天气会商1',content:
          '西北空管局管制中心主动作为，承接咸阳机场运管委战略解码指标，努力促进航班正常性工作，取得了良好成绩，' +
          '西安咸阳国际机场放行正常率达到92.21%，始发正常率达92.18%，两项指标均位列全国同级机场第一。同时，' +
          '咸阳机场离港航班正常率达83.99%，平均滑入时间、平均滑出时间、关舱门平均等待时间较去年同期均有明显缩短',
          time: '2018/08/18 13:30', show: true},
        {img: '/static/img/news-1.cf434b2.png',title: '玉树地震,西北空管局气象中心区域报室组织临时天气会商1',content:
          '西北空管局管制中心主动作为，承接咸阳机场运管委战略解码指标，努力促进航班正常性工作，取得了良好成绩，' +
          '西安咸阳国际机场放行正常率达到92.21%，始发正常率达92.18%，两项指标均位列全国同级机场第一。同时，' +
          '咸阳机场离港航班正常率达83.99%，平均滑入时间、平均滑出时间、关舱门平均等待时间较去年同期均有明显缩短',
          time: '2018/08/18 13:30', show: true},
        {img: '/static/img/news-1.cf434b2.png',title: '玉树地震,西北空管局气象中心区域报室组织临时天气会商1',content:
          '西北空管局管制中心主动作为，承接咸阳机场运管委战略解码指标，努力促进航班正常性工作，取得了良好成绩，' +
          '西安咸阳国际机场放行正常率达到92.21%，始发正常率达92.18%，两项指标均位列全国同级机场第一。同时，' +
          '咸阳机场离港航班正常率达83.99%，平均滑入时间、平均滑出时间、关舱门平均等待时间较去年同期均有明显缩短',
          time: '2018/08/18 13:30', show: true},
        {img: '/static/img/news-1.cf434b2.png',title: '玉树地震,西北空管局气象中心区域报室组织临时天气会商1',content:
          '西北空管局管制中心主动作为，承接咸阳机场运管委战略解码指标，努力促进航班正常性工作，取得了良好成绩，' +
          '西安咸阳国际机场放行正常率达到92.21%，始发正常率达92.18%，两项指标均位列全国同级机场第一。同时，' +
          '咸阳机场离港航班正常率达83.99%，平均滑入时间、平均滑出时间、关舱门平均等待时间较去年同期均有明显缩短',
          time: '2018/08/18 13:30', show: true}
      ];
      this.list=this.changeNoticeList;

    }
  }
</script>

<style lang="less" scoped>
  @import '../assets/styles/list.less';
  .plan{
    font-size: 30px;
    font-weight: bolder;
    color: #da422a;
    float: left;
  }
  .current_plan{
    font-size: 26px;
    font-weight: bolder;
    color: #026ab3;
    margin-left: -60%;
  }
  .current_banner{
    font-size: 18px;
    /*font-weight: bold;*/
    display: table-cell;
  }
  .current_banner li{
    text-decoration: none;  /*去掉前面的圆点*/
    list-style: none;
    /*float: left;*///横向排列
  }
  .current_banner li a {
    text-decoration: none;
    margin: 0px;
  }
  .banner_color{
    color: #999999;
  }
  .content-hr{
    background-color: #cccccc;
    padding: 1px 0 0;
    margin-left: 10%;
    width: 80%;
  }
  .contentList{
    display: none;
    margin-top: -10%;
    margin-left: 9%;

  }
  .active{
    color: #da422a;
    display: block;
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
    margin-left: 49px;
    width: 1px;
    height: 190px;
    background: #999999;
  }
  .contents a{
    color: #999999;
  }
  .limitC{
    color: #999999;
    line-height: 28px;
    margin-top: 12px;
    margin-bottom: 12px;
  }
  content ul li a,a:hover{
    text-decoration:none;//去掉下划线
    color:#999;
    cursor: pointer;//光标变小手
  }
</style>
