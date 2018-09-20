<template>
  <div class="list">
    <br>
    <div class="contain">
      <ul class="current_position">
        <li>当前位置：</li>
        <li><a href="/">首页</a>&nbsp;&nbsp;</li>
        <li><i class="icon iconfont icon-youjiantou"></i>&nbsp;&nbsp;</li>
        <li><a href="/news/list">新闻</a></li>
      </ul>
    </div>
    <br/>
    <div class="title_hr"></div>
    <div class="contentList">
      <div v-for="(item,index) in list">
        <div class="news_img"><img :src="item.img"/></div>
        <ul class="content">
          <li class="title"><a href="/news/details">{{item.title}}</a></li>
          <li class="contents"><a href="/news/details">{{item.content}}</a></li>
          <li class="time">{{item.time}}</li>
          <li><br/></li>
        </ul>
        <div v-if="index<list.length-1" class="content-hr"></div>
      </div>

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
        //name: "list.vue"
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
      }
    }
</script>

<style lang="less" scoped>
  @import '../../assets/styles/list.less';
</style>
