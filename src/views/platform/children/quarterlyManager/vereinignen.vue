<template>
  <div class="container">
    <div class="title">
      合并申请处理
    </div>
    <div class="table_body">
      <div class="info_lists">
        <div class="lists" >
          <el-table
            :data="tableData"
            border>
            <el-table-column
              type="selection"
              width="55"/>
            <el-table-column
              type="index"
              label="序号"
              width="60"
              class="column"/>
            <el-table-column
              prop="gocity"
              width="200"
              label="航线类型">
            </el-table-column>
            <el-table-column
              prop="arrivecity"
              width="200"
              label="航空公司">
            </el-table-column>
            <el-table-column
              prop="hxgo"
              width="100"
              label="出发城市">
            </el-table-column>
            <el-table-column
              prop="hxreturn"
              width="200"
              label="到达城市">
            </el-table-column>
            <el-table-column
              prop="syjx"
              label="航线走向">
            </el-table-column>
            <el-table-column
              prop="dd"
              label="对调">
            </el-table-column>
            <el-table-column
              prop="dc"
              label="导出">
            </el-table-column>
            <el-table-column
              prop="hd"
              label="核对">
            </el-table-column>
            <el-table-column
              prop="hb"
              label="合并">
            </el-table-column>
            <el-table-column
              prop="bz"
              label="备注">
            </el-table-column>
            <el-table-column
              label="操作"
              width="200">
              <template slot-scope="scope">
                <el-button type="text" size="small" class="detail-cl" @click="detailClick(scope.row,scope.$index)">查看</el-button>
                <el-button type="text" size="small" class="detail-cl" @click="deteleClick(scope.row,scope.$index)">删除</el-button>
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
    </div>
  </div>
</template>

<script>
  export default {
    /*name: "reply-import.vue"*/
    data(){
      return {
        currentPage: 1,      //当前页
        total: 20,          //数据总条数
        pageSize: 10,        //每页显示的数据条数
        isActive: 1,
        replyDetail: false,
        tableData: [
          {
            gocity: '1',
            arrivecity: '1',
            hxgo: '1',
            hxreturn: '1',
            syjx: '1',
            dd: '1',
            dc: '1',
            hd: '1',
            hb: '1',
            bz: '1'
          }
        ]
      }
    },
    methods:{
      handleSizeChange(val) {
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      switcher(number){
        this.isActive=number;
      }
    }
  }
</script>
<style lang="less">
  .info_lists {
    /*padding-top: 40px;*/
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
  .container{
    .el-dialog{
      width: 80%;
    }
    .find_condition{
      .select_page{
        .el-select{
          width: 170px;
        }
      }
      .file_type{
        .el-select{
          width: 75%;
        }
      }
    }
  }
  .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner {
    width: 250px;
  }
</style>
<style lang="less" scoped>
  .container{
    width: 100%;
    height: 100%;
    padding-top: 55px;
    padding-bottom: 25px;
    &.active{
      display: block;
    }
    .title{
      color: #026ab3;
      font-size: 24px;
      text-align: left;
      padding-bottom: 35px;
    }
    .find_body{
      width: 100%;
      height: 170px;
      font-size: 18px;
      color: #333333;
      border: 1px #999999 solid;
      .find_condition{
        padding-top: 20px;
        padding-left: 10px;
        text-align: left;
        width: 100%;
        ul{
          list-style: none;
          li{
            float:left;
            div{
              .block{
                margin-left: -5%;
              }
            }
            .i_input{
              width: 70%;
            }
            .i_input_file{
              width: 70%;
            }
            .bnt{
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
          }
        }
        .analyze_type{
          .el-checkbox-group{
            margin-top: -25px;
            margin-left: 100px;
          }
        }
        .find_bnt{
          width: 100%;
          height: 130px;
          margin-top: -9%;
          margin-left: 35%;
          .bnt {
            width: 110px;
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
        }
      }
    }
    .table_body{
      width: 100%;
      height: 100%;
      .table_nav{
        font-weight: normal;
        width: 100%;
        height: 0.1px;
        ul{
          li{
            list-style: none;
            float: left;
            width: 140px;
            border: 1px #d6d6d6 solid;
            text-align: center;
            &.active{
              background-color: #026ab3;
              a{
                color: white;
              }
            }
            a{
              list-style: none;
              text-decoration: none;
              color: #333333;
            }
          }
        }
      }
    }
    .airway-detail-dialog {
      .el-dialog {
        margin-top: 0px !important;
        max-width: 1200px;
        width: 100%;
        .el-dialog__header {
          text-align: left;
          border-bottom: 1px solid #ccc;
        }
        .el-dialog__body {
          .content {
            width:100%;
            padding-left: 15px;
            .d-title{
              width: 100%;
              text-align: left;
              font-size: 24px;
              color: #000;
            }
            .d_title_hr{
              margin-top: 20px;
              width: 100%;
              height:1px;
              background-color: #999999;
            }
            .d-cell {
              padding-top:15px;
              display: flex;
              box-sizing: border-box;
              color: #333333;
              font-size: 18px;
              font-weight: 500;
              .name {
                width:120px;
                line-height: 40px;
                text-align: left;
              }
              .info {
                text-align: left;
                flex: 1;
                height:40px;
                padding-left: 30px;
                line-height: 38px;
                border:1px solid #ccc;
                border-radius: 5px;
                box-sizing: border-box;
                margin-right: 5%;
              }
              .content{
                text-align: left;
                flex: 1;
                height:80%;
                padding-left: 30px;
                line-height: 38px;
                border:1px solid #ccc;
                border-radius: 5px;
                box-sizing: border-box;
                margin-right: 5%;
              }
              .info-body {
                flex: 1;
                .hb {
                  display: flex;
                  background: #026ab3;
                  border-top: 1px solid #ccc;
                  box-sizing: border-box;
                  width:100%;
                  .c {
                    flex: 1;
                    height:40px;
                    line-height: 40px;
                    color:#fff;
                    text-align: center;
                    box-sizing: border-box;
                    border-right:1px solid #ccc;
                    &:last-child {
                      border-right:none;
                    }
                  }
                }
                .bd-table {
                  width:100%;
                  display: flex;
                  .bd {
                    display: flex;
                    border: 1px solid #ccc;
                    box-sizing: border-box;
                    border-top: none;
                    width:100%;
                    .c {
                      flex: 1;
                      height:40px;
                      line-height: 40px;
                      text-align: center;
                      box-sizing: border-box;
                      border-right:1px solid #ccc;
                      &:last-child {
                        border-right:none;
                      }
                    }
                  }
                }
              }
              .cell {
                flex: 1;
                display: flex;
                .info {
                  flex: 1;
                }
                .unit {
                  width:60px;
                  font-size: 18px;
                  color:#026ab3;
                  text-align: center;
                  line-height: 40px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
