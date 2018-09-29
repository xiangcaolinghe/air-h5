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
              <div class="left_checkbox">
                <el-checkbox-group v-model="checkedCompany" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="city in companyName" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
              </div>
          </div>
        </li>
        <li class="right">
          <div class="right_body">
            <div class="right_title">
              <div class="title_left">
                <el-radio v-model="handle" label="1">已处理</el-radio>
                <el-radio v-model="handle" label="2">未处理</el-radio>
                <div class="find_bnt"><div>查询</div></div>
              </div>
              <div class="title_right">
                <div class="export_bnt"><div>导出</div></div>
              </div>
            </div>
            <div class="search-lists">
              <div class="lists">
                <el-table
                  :data="tableData"
                  border>
                  <el-table-column
                    prop="hgcompany"
                    width="260"
                    label="航空公司">
                  </el-table-column>
                  <el-table-column
                    prop="xphx"
                    label="新辟航线">
                  </el-table-column>
                  <el-table-column
                    prop="pb"
                    label="配备8400">
                  </el-table-column>
                  <el-table-column
                    prop="xzzx"
                    label="新增走向">
                  </el-table-column>
                  <el-table-column
                    prop="wxhx"
                    label="无锡航线">
                  </el-table-column>
                  <el-table-column
                    prop="yjhx"
                    label="夜间航路">
                  </el-table-column>
                  <el-table-column
                    prop="totalNum"
                    label="总个数">
                  </el-table-column>
                </el-table>
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
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
  import ElBreadcrumb from "element-ui/packages/breadcrumb/src/breadcrumb";

  const cityOptions = ['上海', '北京', '广州', '深圳'];
    export default {
        /*name: "statistics.vue"*/
      components: {ElBreadcrumb},
      data() {
        return {
          currentPage: 1,      //当前页
          total: 20,          //数据总条数
          pageSize: 10,        //每页显示的数据条数
          checkAll: false,
          checkedCompany: [],
          isIndeterminate: true,
          companyName:[
            '华夏航空公司（贵州）','桂林航空公司','中国东方航空公司','杭州圆通货运航空有限公司','厦门航空有限公司',
            '中国南方航空公司','长安航空公司','首都航空公司','中国联合航空公司','四川航空公司','中国国际航空公司',
            '重庆航空公司','深圳航空公司','春秋航空有限公司','中国货运航空有限公司','海南省航空公司','重庆航空公司',
            '深圳航空公司','春秋航空有限公司','中国货运航空有限公司','海南省航空公司','春秋航空有限公司',
            '中国货运航空有限公司','海南省航空公司'
          ],
          handle: 1,
          tableData:[
            {
              hgcompany: '福州航空',
              xphx: '17',
              pb: '',
              xzzx: '',
              wxhx: '2',
              yjhx: '',
              totalNum: '19'
            },
            {
              hgcompany: '中国联合航空公司',
              xphx: '62',
              pb: '',
              xzzx: '',
              wxhx: '1',
              yjhx: '',
              totalNum: '62'
            },
            {
              hgcompany: '吉祥航空公司（虹桥）',
              xphx: '20',
              pb: '',
              xzzx: '',
              wxhx: '4',
              yjhx: '',
              totalNum: '29'
            },
            {
              hgcompany: '中国国际航空内蒙古有限公司',
              xphx: '1',
              pb: '',
              xzzx: '',
              wxhx: '',
              yjhx: '',
              totalNum: '1'
            },
            {
              hgcompany: '友和道航空有限公司',
              xphx: '3',
              pb: '',
              xzzx: '',
              wxhx: '',
              yjhx: '',
              totalNum: '3'
            },{
              hgcompany: '华夏航空公司（厦门）',
              xphx: '64',
              pb: '',
              xzzx: '',
              wxhx: '2',
              yjhx: '',
              totalNum: '64'
            },{
              hgcompany: '昆明航空有限公司',
              xphx: '8',
              pb: '',
              xzzx: '',
              wxhx: '',
              yjhx: '',
              totalNum: '8'
            },{
              hgcompany: '福州航空',
              xphx: '17',
              pb: '',
              xzzx: '',
              wxhx: '2',
              yjhx: '',
              totalNum: '19'
            },{
              hgcompany: '福州航空',
              xphx: '17',
              pb: '',
              xzzx: '',
              wxhx: '2',
              yjhx: '',
              totalNum: '19'
            },{
              hgcompany: '福州航空',
              xphx: '17',
              pb: '',
              xzzx: '',
              wxhx: '2',
              yjhx: '',
              totalNum: '19'
            }
          ]
        };
      },
      methods: {
        handleSizeChange(val) {
          this.pageSize = val;
//        console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          this.currentPage = val;
        },
        handleCheckAllChange(val) {
          this.checkedCompany = val ? this.companyName : [];
          this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
          let checkedCount = value.length;
          this.checkAll = checkedCount === this.companyName.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.companyName.length;
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
    .el-checkbox+.el-checkbox {
      margin-left: 20px;
    }
  }
  .left_body{
    .el-checkbox {
      color: #646464;
      font-size: 16px;
      padding-top: 10px;
      display: block;//一行显示
      width: 100%;//一行显示
    }
    .el-checkbox-group{
      padding-top: 20px;
      text-align: left;
    }
    .el-checkbox+.el-checkbox {
      margin-left: 0px;
    }
  }
  .left_checkbox{
    .el-checkbox__label {
      font-size: 16px;
      color: #646464;
    }
  }
  //修改全选时字体颜色
  /*.el-checkbox__input.is-checked+.el-checkbox__label {
    color: white;
  }*/
  .search-lists {
    padding-top: 40px;
    .el-table__header-wrapper {
      th {
        background: #026ab3;
      }
      .cell {
        text-align: center;
        color:#fff;
        font-weight: 600;
      }
    }
    .el-table{
      font-size: 14px;
      color: #666666;
      font-weight: normal;
    }
  }
</style>
<style lang="less" scoped>
  .container{
    height: 780px;
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
          /*overflow: hidden;*/
          .left_title{
            background-color: #026ab3;
            height: 78px;
            color: white;
            text-align: left;
            .left_title_bg{
              height: 40px;
              padding-top: 20px;
              margin-left: 10%;
              .el-checkbox{
                margin-left: 45%;
                margin-top: -30px;
                color: white;
              }
            }
          }
        }
        .left_checkbox{
          width: 90%;
          height: 650px;
          float: right;
          overflow-y: scroll;
          overflow-x: hidden;
        }
      }
      .right{
        width: 74%;
        overflow: hidden;
        .right_body{
          padding-top: 20px;
          padding-left: 20px;
          width: 100%;
          .right_title{
            width: 100%;
            height: 100%;
            .title_left{
              text-align: left;
              font-size: 16px;
              color: #333333;
              .find_bnt{
                margin-top: -25px;
                margin-left: 250px;
                width: 70px;
                height: 30px;
                background-color: #026ab3;
                color: white;
                text-align: center;
                div{
                  padding-top: 3px;
                }
              }
            }
            .title_right{
              margin-top: -25px;
              margin-left: 89%;
              text-align: center;
              width: 70px;
              height: 30px;
              .export_bnt{
                width: 70px;
                height: 30px;
                background-color: #026ab3;
                color: white;
                div{
                  padding-top: 3px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
