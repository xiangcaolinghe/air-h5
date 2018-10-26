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
      <div v-for="(item,index) in newsList" :key="item.id" @click="newsGo(item.id)">
        <div class="news_img"><img :src="item.url" style="width: 240px;"/></div>
        <ul class="content">
          <li class="title"><a>{{item.title}}</a></li>
          <li class="contents"><a>{{item.content}}</a></li>
          <li class="time">{{item.date}}</li>
          <li><br/></li>
        </ul>
        <div v-if="index<newsList.length-1" class="content-hr"></div>
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
          newsList : [],
          currentPage: 1,      //当前页
          total: 20,          //数据总条数
          pageSize: 10,        //每页显示的数据条数
        }
      },
      methods: {
        getPage(){
          let params1 = {};
          params1['id'] = 123;
          API.get('static/news.json', params1).then((res) => {
            console.log(res.data)
            if (res.status == 200) {
              this.newsList = res.data;
            } else {
              console.log(res.data)
            }
          })
        },
        newsGo(id){
          this.$router.push({name:'newDetails',query:{id:id}})
        },
        handleSizeChange(val) {
          this.pageSize = val;
//        console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          this.currentPage = val;
        },
      },
      created() {
        this.getPage()
      }
    }
</script>

<style lang="less" scoped>
  @import '../../assets/styles/list.less';
</style>
