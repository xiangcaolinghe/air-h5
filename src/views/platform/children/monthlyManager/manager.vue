<template>
    <div class="container">
      <div class="select_div">
        <div>
          <table>
            <tr>
              <td>
                <div>
                  出发城市：<el-input v-model="startCity" class="i_input" placeholder="请输入内容"/><br/><br/>
                  到达城市：<el-input v-model="endCity" class="i_input" placeholder="请输入内容"/>
                </div>
              </td>
              <td class="select_middle"><br/></td>
              <td>
                <div>
                  匹配类型：
                  <el-checkbox-group v-model="matching">
                    <el-checkbox label="走向"/>
                    <el-checkbox label="起点"/>
                    <el-checkbox label="终点"/>
                    <el-checkbox label="起止点"/>
                  </el-checkbox-group>
                  <br/>
                </div>
                <div>
                  数据状态：
                  <el-checkbox-group v-model="numberStatus">
                  <el-checkbox label="已合并"/>
                  <el-checkbox label="已处理"/>
                  <el-checkbox label="特别关注"/>
                  <el-checkbox label="已删除"/>
                  </el-checkbox-group><br/>
                </div>
                <div>
                  对比数据：
                  <el-checkbox-group v-model="contrastNumber">
                    <el-checkbox label="一号规定"/>
                    <el-checkbox label="历史批复"/>
                  </el-checkbox-group>
                </div>
              </td>
            </tr>
          </table>
          <div class="corporation_class">
            <br/>
            航空公司：<el-input v-model="corporation" placeholder="请输入内容"/><div class="search_cl btn search">选择</div><br/><br/>
            <div class="btn search">查询</div>
            <div class="btn search">导出记录</div>
            <div class="btn search" @click="addPage()">添加</div>
          </div>
        </div>
      </div>
      <div class="search-lists">
        <div class="lists">
          <el-table
            :data="tableData"
            border>
            <el-table-column
              prop="fxresult"
              label="分析结果">
            </el-table-column>
            <el-table-column
              prop="city"
              label="城市对">
            </el-table-column>
            <el-table-column
              prop="zxtype"
              label="走向类型">
            </el-table-column>
            <el-table-column
              prop="zxdhl"
              label="走向点航路">
            </el-table-column>
            <el-table-column
              prop="czsjy"
              label="参照数据源">
            </el-table-column>
            <el-table-column
              prop="hkcompany"
              label="航空公司">
            </el-table-column>
            <el-table-column
              prop="applicatetype"
              label="申请类型">
            </el-table-column>
            <el-table-column
              prop="qbq"
              label="情报区">
            </el-table-column>
            <el-table-column
              label="操作"
              width="380">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row,scope.$index)" type="text" size="small">地图展示</el-button>
                <el-button type="text" size="small" @click="detailClick(scope.row,scope.$index)">编辑</el-button>
                <el-button type="text" size="small" class="detele-cl" @click="deteleClick(scope.row,scope.$index)">删除</el-button>
                <el-button type="text" size="small" class="detail-cl" @click="detailClick(scope.row,scope.$index)">详情</el-button>
                <el-button type="text" size="small" class="untreated-cl" @click="detailClick(scope.row,scope.$index)">未处理</el-button>
                <el-button type="text" size="small" @click="detailClick(scope.row,scope.$index)">特别关注</el-button>
              </template>
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
      <!--查看地图弹层-->
      <el-dialog title="航线图" :visible.sync="airwayPic" class="airway-pic-dialog">
        <div class="map-box">
          <img src="./../../../../assets/images/map.png" class="img">
        </div>
      </el-dialog>
    </div>
</template>

<script>
    /*import ElTable from "element-ui/packages/table/src/table";*/

    export default {
      /*components: {ElTable},
      name: "manager.vue"*/
      data(){
        return{
          currentPage: 1,      //当前页
          total: 20,          //数据总条数
          pageSize: 10,        //每页显示的数据条数
          airwayPic:false,
          startCity: '',
          endCity: '',
          matching: [],
          numberStatus: [],
          contrastNumber: [],
          corporation: '',
          tableData: [
            {
              fxresult: '0.9524',
              city: '鄂尔多斯伊金霍洛-秦皇岛北戴河',
              zxtype: '去程',
              zxdhl: '鄂尔多斯伊金霍洛经鄂尔多斯VOR、H57P284、B214行唐NDB...',
              czsjy: '2018第07期',
              hkcompany: '上海航空公司',
              applicatetype: '2018第07期',
              qbq: '北京'
            },
            {
              fxresult: '0.9524',
              city: '鄂尔多斯伊金霍洛-秦皇岛北戴河',
              zxtype: '去程',
              zxdhl: '鄂尔多斯伊金霍洛经鄂尔多斯VOR、H57P284、B214行唐NDB...',
              czsjy: '2018第07期',
              hkcompany: '上海航空公司',
              applicatetype: '2018第07期',
              qbq: '北京'
            },
            {
              fxresult: '0.9524',
              city: '鄂尔多斯伊金霍洛-秦皇岛北戴河',
              zxtype: '去程',
              zxdhl: '鄂尔多斯伊金霍洛经鄂尔多斯VOR、H57P284、B214行唐NDB...',
              czsjy: '2018第07期',
              hkcompany: '上海航空公司',
              applicatetype: '2018第07期',
              qbq: '北京'
            },
            {
              fxresult: '0.9524',
              city: '鄂尔多斯伊金霍洛-秦皇岛北戴河',
              zxtype: '去程',
              zxdhl: '鄂尔多斯伊金霍洛经鄂尔多斯VOR、H57P284、B214行唐NDB...',
              czsjy: '2018第07期',
              hkcompany: '上海航空公司',
              applicatetype: '2018第07期',
              qbq: '北京'
            }
          ]
        }
      },
      methods:{
        handleSizeChange(val) {
          this.pageSize = val;
//        console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          this.currentPage = val;
        },
        handleClick(row,idx) {
          this.airwayPic = true
          console.log(row,idx)
        },
        detailClick(row,idx) {
          this.airwayDetail = true;
          this.$router.push({name: 'platform.flowmanageradd',params:{id: 1}});
        },
        deteleClick(row,idx){
          alert("删除该条信息！");
        },
        addPage(){
          this.$router.push({name: 'platform.flowmanageradd',params:{id: 0}});
        }
      }
    }
</script>
<style lang="less">
  .el-checkbox__label {
    font-size: 18px;
    color: #333333;
  }
  .search-lists {
    .el-table__header-wrapper {
      th {
        background: #026ab3;
      }
      .cell {
        text-align: center;
        color:#fff;
        font-weight: 600;
      }
      .el-table__header {
        /*width:50% !important;*/
      }
    }
    .el-table{
      .detele-cl{
        color: #ff0000;
      }
      .detail-cl{
        color: #888888;
      }
      .untreated-cl{
        color: #ff7800;
      }
      .el-button+.el-button {
         margin-left: 0px;
      }
    }
  }
</style>
<style lang="less" scoped>
  .container{
    margin-top: 60px;
    width: 100%;
    height: 100%;
    font-weight: normal;
    font-size: 18px;
    padding-bottom: 50px;
    .select_div{
      width: 100%;
      text-align: left;
      div{
        font-size: 18px;
        color: #333333;
        width: 100%;
        table{
          td{
            width: 50%;
            div{
              .i_input{
                width: 300px;
              }
              .el-checkbox{
                font-size: 18px;
              }
              .el-checkbox-group{
                margin-top: -25px;
                margin-left: 90px;
              }
            }
          }
          .select_middle{
            width: 30px;
          }
        }
        .corporation_class{
          width: 100%;
          .el-input{
            width: 70%;
          }
          .btn {
            width: 130px;
            float: left;
            text-align: center;
            height: 35px;
            cursor: pointer;
            line-height: 35px;
            font-weight: 400;
            color: #fff;
            &.search {
              margin-right: 30px;
              background: #026ab3;
            }
          }
          .search_cl{
            float: right;
          }
        }
      }
    }
    .search-lists {
      margin-top: 50px;
    }
    .airway-pic-dialog {
      .el-dialog {
        margin-top: 50px !important;
        max-width: 1200px;
        width: 100%;
        .el-dialog__header {
          text-align: left;
          border-bottom: 1px solid #ccc;
        }
        .el-dialog__body {
          .map-box {
            .img {
              width:100%;
            }
          }
        }
      }
    }
  }
</style>
