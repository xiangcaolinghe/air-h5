<template>
    <div class="container">
      <ul>
        <li class="left">
          <div class="left_body">
              <div class="left_title">
                <div class="left_title_bg">
                  <span>航空公司</span>
                  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选/全不选</el-checkbox>
                </div>
              </div>
              <el-checkbox-group v-model="checkedCompany" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in companyName" :label="city" :key="city">{{city}}</el-checkbox>
              </el-checkbox-group>
          </div>
        </li>
        <li class="right">
          <div></div>
        </li>
      </ul>
    </div>
</template>

<script>
  const cityOptions = ['上海', '北京', '广州', '深圳'];
    export default {
        /*name: "statistics.vue"*/
      data() {
        return {
          checkAll: false,
          checkedCompany: [],
          isIndeterminate: true,
          companyName:[
            '华夏航空公司（贵州）','桂林航空公司','中国东方航空公司','杭州圆通货运航空有限公司','厦门航空有限公司',
            '中国南方航空公司','长安航空公司','首都航空公司','中国联合航空公司','四川航空公司','中国国际航空公司',
            '重庆航空公司','深圳航空公司','春秋航空有限公司','中国货运航空有限公司','海南省航空公司','重庆航空公司',
            '深圳航空公司','春秋航空有限公司','中国货运航空有限公司','海南省航空公司'
          ]
        };
      },
      methods: {
        handleCheckAllChange(val) {
          this.checkedCompany = val ? companyName : [];
          this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
          let checkedCount = value.length;
          this.checkAll = checkedCount === this.cities.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        }
      }
    }
</script>
<style lang="less">
  .left_title_bg{
    .el-checkbox__label {
      font-size: 18px;
      color: #fff;
    }
  }
  .left_body{
    .el-checkbox {
      color: #646464;
      font-size: 16px;
      padding-top: 10px;
    }
    .el-checkbox-group{
      padding-top: 20px;
      text-align: left;
    }
  }
</style>
<style lang="less" scoped>
  .container{
    height: 100%;
    width: 100%;
    ul{
      height: 100%;
      width: 100%;
      li{
        text-decoration: none;
        list-style: none;
        float: left;
      }
      .left{
        width: 25%;
        height: 100%;
        border-right: 1px #cccccc solid;
        .left_body{
          width: 100%;
          height: 100%;
          .left_title{
            background-color: #026ab3;
            height: 78px;
            color: white;
            text-align: left;
            .left_title_bg{
              height: 40px;
              padding-top: 25px;
              .el-checkbox{
                margin-left: 40px;
                color: white;
              }
            }
          }
        }
      }
      .right{
        width: 75%;
        height: 100px;
        div{
          width: 100%;
          height: 100px;
          /*background-color: #999999;*/
        }
      }
    }
  }
</style>
