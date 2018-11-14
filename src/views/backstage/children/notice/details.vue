<template>
  <div>
    <br>
    <div class="contain">
      <ul class="current_position">
        <li>当前位置：</li>
        <li><router-link :to="{name:'backstage.news'}">公告管理</router-link></li>
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
        {{datail.nTitle}}
      </div>
      <br/><br/>
      <div class="dis">
        <span>作者：{{datail.nAuthor}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>发布时间：{{datail.nReleaseTime}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>来源：{{datail.nFrom}}</span>
      </div>
      <br/><br/>
      <div class="detail_content ql-snow" >
        <div class="ql-editor" v-html="datail.nContent"></div>
      </div>
      <br/><br/>
      <div class="down_res" v-for="i in file">
        <a :href="i.fenclUrl" style="color: #df6657;text-align: left;" >{{i.fenclName}}</a>
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
        file : []
      }
    },
    mounted: function () {
      this.getDetail();
    },
    methods:{
      getDetail(){
        let params={};
        params['id'] = this.$route.query.id;
        API.get('/notice/FindById',params,{Authorization:storage.get('token')}).then((res)=>{
          console.log(res.data)
          if(res.data.code == 200) {
            this.datail = res.data.data.data;
            this.file = res.data.data.file
          }else if(res.data.code == 1001){
            this.signOut()
          }
        })
        console.log(this.$route.query.id)
      },
      signOut(){
        this.$message({
          type: 'error',
          message: '登录失效，请重新登录!'
        });
        storage.delete('Authorization');
        storage.delete('userName');
        storage.delete('auth');
        storage.delete('token');
        this.$router.push({name:'login'})
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../../assets/styles/list_details.less';

</style>
