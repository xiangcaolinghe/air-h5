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
          出发城市：<input type="text" name="manager.startCity"/>&nbsp;&nbsp;&nbsp;&nbsp;
          航线名称：<input type="text" name="manager.hxName"/>&nbsp;&nbsp;&nbsp;&nbsp;
          总距离值：<input type="text" name="manager.totalDistance"/>
        </div>
        <div>
          出发城市：<input type="text" name="manager.arriveCity"/>&nbsp;&nbsp;&nbsp;&nbsp;
          航线名称：<input type="text" name="manager.hkCompany"/>&nbsp;&nbsp;&nbsp;&nbsp;
          总距离值：<input type="text" name="manager.minHeight"/>
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
              <p>去程描述：</p><textarea/>
            </td>
            <td>
              <p>回程描述：</p><textarea/>
            </td>
          </tr>
        </table>
        <div class="btn-box">
          <div class="btn search">确认</div>
          <div class="btn clears">取消</div>
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
            id: ''
          }
        }
      },
      methods: {},
      created(){
        console.log(this.$route.query.id);
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
        .btn-box{
          margin-top:30px;
          margin-left: 30%;
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
    }
  }
</style>
