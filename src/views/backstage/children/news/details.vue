<template>
  <div>
    <br>
    <div class="contain">
      <ul class="current_position">
        <li>当前位置：</li>
        <li><router-link :to="{name:'backstage.news'}">新闻管理</router-link></li>
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
    <div class="news_tails">
      <div class="news_title">
        {{datail.title}}
      </div>
      <br/><br/>
      <div class="dis">
        <span>作者：{{datail.author}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>发布时间：{{datail.time}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>来源：{{datail.origin}}</span>
      </div>
      <br/><br/>
      <div class="detail_content" v-html="datail.content">
      </div>
      <br/><br/>
      <div class="down_res">
        <a href="datail.download_url" style="color: #df6657;text-align: left;">{{datail.download_name}}</a>
      </div>
      <br/><br/><br/>
    </div>
  </div>
</template>

<script>
    export default {
      data(){
        return{
          datail:{},
        }
      },
      mounted: function () {
        this.getDetail();
      },
      methods:{
        getDetail(){
          let params={};
          params['id'] = this.$route.query.id;
          API.get('static/newsDetails.json',params).then((res)=>{
            if(res.status == 200) {
              this.datail = res.data[0];
            }
          })

          console.log(this.$route.query.id)

        }
      }
    }
</script>

<style lang="less" scoped>
  @import '../../../../assets/styles/list_details.less';

</style>
