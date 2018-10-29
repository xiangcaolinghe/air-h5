<template>
  <div class="list" >
    <br>
    <div class="contain">
      <ul class="current_banner" ref="ulWidth">
        <li v-for="i in typeList" :key="i.id"><a @click="switcher(i)" class="banner_color" :class="{active:isActive == i.id}">{{i.label}}</a></li>
      </ul>
    </div>
    <br/>
    <div class="title_hr">
      <div class="banner_hr">
        <div class="bar_hr" :style="{ width: widthStyle + 'px' }"></div>
      </div>
    </div>
    <br/> <br/>
        <div class="contain" >
          <div class="current_date">
            <div class="date_month"><span class="current_month">{{month}}</span></div>
            <div class="date_day"><span class="current_day">{{day}}</span></div>
            <div class="jintian">今天</div>
            <div class="date_week">{{week}}</div>
          </div>
          <div class="contentList">
            <div v-for="i in contentList">
              <div class="news_img">
                <div class="circle"></div>
                <div class="shux"></div>
              </div>
              <ul class="content" >
                <li class="title"><a><router-link :to="{path:'/notice/details',query:{id:i.id}}" :class="i.bs == 1 ? Red : Black">{{i.title}}</router-link></a></li>
                <li class="contents"><router-link :to="{path:'/notice/details',query:{id:i.id}}">{{i.content}}</router-link></li>
                <li class="time">{{i.date}}</li>
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
        currentPage: 1,      //当前页
        total: 20,          //数据总条数
        pageSize: 10,        //每页显示的数据条数
        month:'',
        day:'',
        week:'',
        typeList:[],
        contentList : [],
        widthStyle:'',
        Red : 'Red',
        Black : 'Black'
      }
    },
    methods: {
      // 翻页器：当前页，同时上一页下一页也能获取当前页
      handleCurrentChange(val) {
        console.log(val);
        this.pageSize = val;
      },
      // 翻页器：选择10条还是20条、
      handleSizeChange(val) {
        console.log(val);
        this.currentPage = val;
      },
      // 时间
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
      },
      // 页面初始化
      getPage(){
        // 分类
        let params = {};
        params['id'] = 123;
        API.get('static/notListSelect.json', params).then((res) => {
          console.log(res.data)
          if (res.status == 200) {
            this.typeList = res.data;
            console.log(this.typeList);
            // 第一个分类的列表
            this.isActive = this.typeList[0].id;
            let params2 = {};
            params2['id'] = this.typeList[0].id;
            API.get('static/news.json', params2).then((res) => {
              console.log(res.data)
              if (res.status == 200) {
                this.contentList = res.data;
                console.log(this.contentList);
              } else {
                console.log(res.data)
              }
            })
            // 分类横条样式
            var that = this;
            setTimeout(function(){
              that.widthStyle = that.$refs.ulWidth.clientWidth;
            })
          } else {
            console.log(res.data)
          }
        })
      },
      // 点击分类
      switcher(id){
        this.isActive = id.id;
        console.log(id)
        let params = {};
        params['id'] = id;
        API.get('static/news.json', params).then((res) => {
          console.log(res.data)
          if (res.status == 200) {
            this.contentList = res.data;
            console.log(this.contentList);
          } else {
            console.log(res.data)
          }
        })
      },
    },
    mounted: function () {
      this.currentDate();
    },
    created(){
      this.getPage()
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/styles/list.less';
  .Red {
    color: #CF2727!important; ;
  }
  .Black {
    color: #0b0306!important; ;
  }
  .current_banner{
    font-size: 18px;
    font-weight: bold;
    display: table-cell;
  }
  .current_banner li{
    text-decoration: none;  /*去掉前面的圆点*/
    list-style: none;
    float: left;
    margin-right: 40px;
  }
  .current_banner li a {
    text-decoration: none;
    margin: 0px;
  }
  .banner_color{
    color: #999999;
  }
  .contentList{
    display: none;
    margin-top: -10%;
    margin-left: 9%;
    display: block;

  }
  .active{
    color: #026ab3;
    display: block;
  }
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
    /*width: 27%;*/
  }
  .current_date{
    width: 80px;
    height: 80px;
    /*margin-top: -540px;
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
    margin-left: 49px;
    width: 1px;
    height: 190px;
    background: #999999;
  }
  .contents a{
    color: #999999;
  }
</style>
