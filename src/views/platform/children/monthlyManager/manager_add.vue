<template>
  <div class="container">
    <div class="nav_title">
      上报航线走向添加
    </div>
    <div class="add_form">
      <div class="form_title">
        <div class="form_hr"></div>
        <div class="form_info">基本信息</div>
      </div>
      <div class="form_content">
        <div>
          出发城市：<input type="text" v-model="manager.startCity"/>&nbsp;&nbsp;&nbsp;&nbsp;
          航线名称：<input type="text" v-model="manager.hxName"/>&nbsp;&nbsp;&nbsp;&nbsp;
          总距离值：<input type="text" v-model="manager.totalDistance"/>
        </div>
        <div>
          出发城市：<input type="text" v-model="manager.arriveCity"/>&nbsp;&nbsp;&nbsp;&nbsp;
          航线名称：<input type="text" v-model="manager.hkCompany"/>&nbsp;&nbsp;&nbsp;&nbsp;
          总距离值：<input type="text" v-model="manager.minHeight"/>
        </div>
      </div>
      <div class="form_title">
        <div class="form_hr"></div>
        <div class="form_info">走向信息</div>
      </div>
      <div class="form_content">
        <table class="describe-cl">
          <tr>
            <td>
              <p>去程描述：</p><textarea v-model="manager.goDescribe"/>
            </td>
            <td>
              <p>回程描述：</p><textarea v-model="manager.returnDescribe"/>
            </td>
          </tr>
        </table>
        <div class="btn-div">
          <el-checkbox v-model="manager.goReturn">往返同</el-checkbox>
          <div class="btn-box">
            <div class="btn search">确认</div>
            <div class="btn clears" @click="cancel()">取消</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      /*name: "manager_add.vue"*/
      data() {
        return {
          manager: {
            startCity: '',
            hxName: '',
            totalDistance: '',
            arriveCity: '',
            hkCompany: '',
            minHeight: '',
            id: '',
            goDescribe: '',
            returnDescribe: '',
            goReturn: true
          }
        }
      },
      methods: {
        cancel(){
          this.$router.push({path: '/platform/flowManager'});
        }
      },
      created(){
        var id = this.$route.params.id;
        if (id != 0){
          this.manager={
            startCity: '鄂尔多斯伊金霍洛',
              hxName: '鄂尔多斯伊金霍洛',
              totalDistance: '鄂尔多斯伊金霍洛',
              arriveCity: '秦皇岛北戴河',
              hkCompany: '上海航空公司',
              minHeight: '鄂尔多斯伊金霍洛',
              goDescribe: '鄂尔多斯伊金霍洛  鄂尔多斯VOR H57 P284  B215 行唐NDB  W132  天津NDB  A326 KALBA  H7  滦县VOR 秦皇岛北戴河 ',
              returnDescribe: '鄂尔多斯伊金霍洛  鄂尔多斯VOR H57 P284  B215 行唐NDB  W132  天津NDB  A326 KALBA  H7  滦县VOR 秦皇岛北戴河 ',
              goReturn: true
          }
          console.log(this.manager);
        }
    }
    }
</script>
<style lang="less">
</style>

<style lang="less" scoped>
  .container{
    width: 100%;
    height: 100%;
    font-size: 18px;
    .nav_title{
      width: 100%;
      font-size: 24px;
      color: #026ab3;
      text-align: left;
      margin-top: 55px;
    }
    .add_form{
      width: 100%;
      height: 100%;
      margin-top: 70px;
      text-align: left;
      color: #333333;
      .form_title{
        width: 100%;
        padding-bottom: 30px;
        .form_hr{
          width: 5px;
          height: 22px;
          background-color: #026ab3;
        }
        .form_info{
          margin-top: -22px;
          margin-left: 20px;
        }
      }
      .form_content{
        width: 100%;
        font-weight: normal;
        div{
          padding-bottom: 40px;
          input{
            width: 20%;
            height: 30px;
          }
        }
        .describe-cl{
          width: 100%;
          td{
            width: 50%;
            textarea{
              width: 55%;
              height: 200px;
              margin-top: -4%;
              margin-left: 90px;
            }
          }
        }
        .btn-div{
          width: 100%;
          height: 100%;
          padding-top: 40px;
          .el-checkbox{
            margin-left: 80px;
          }
          .btn-box{
            margin-top:-25px;
            margin-left: 35%;
            .el-checkbox{
              float: left;
            }
            .btn{
              width:150px;
              height: 0px;
              float: left;
              text-align: center;
              color: white;
              padding-top: 15px;
              &.search {
                margin-right: 30px;
                background: #026ab3;
              }
              &.clears {
                background: #ccc;
              }
            }
          }
        }
        /*.btn-box{
          margin-top:30px;
          margin-left: 30%;
          .el-checkbox{
            !*float: left;*!
          }
          .btn{
            width:150px;
            height: 0px;
            float: left;
            text-align: center;
            color: white;
            padding-top: 15px;
            &.search {
              margin-right: 30px;
              background: #026ab3;
            }
            &.clears {
              background: #ccc;
            }
          }
        }*/
      }
    }
  }
</style>
