<template>
    <div class="container">
      <div class="title">
        批复数据导入设置
      </div>
      <div class="find_body">
        <div class="find_condition">
          <ul>
            <li style="width: 25%">
              数据类型：<el-input v-model="type" class="i_input" placeholder="请输入内容"/>
            </li>
            <li style="width: 25%">
              <div class="block">
                <span class="demonstration">申报时间：</span>
                <el-date-picker
                  v-model="month"
                  type="month"
                  class="i_input"
                  placeholder="选择月">
                </el-date-picker>
              </div>
            </li>
            <li style="width: 35%">
              文件名称：<el-input v-model="name"  class="i_input_file"  placeholder="请输入内容"/>
            </li>
            <li style="width: 15%">
              <div class="bnt search">选择</div>
            </li>
          </ul>
          <br/><br/><br/>
          <div class="find_bnt">
            <div class="bnt search">检查数据</div>
            <div class="bnt search">导入数据</div>
            <div class="bnt search">重新导入</div>
            <div class="bnt search">追加导入</div>
            <div class="bnt search">更新</div>
          </div>
        </div>
      </div>
      <div class="table_body">
        <div class="table_nav">
          <ul>
            <li :class="{active:isActive == 1}"><a href="javascript:;" @click="switcher(1)">规则数据</a></li>
            <li :class="{active:isActive == 2}"><a href="javascript:;" @click="switcher(2)">不规则数据</a></li>
          </ul>
        </div>
        <div class="info_lists">
          <div class="lists" :class="{active:isActive == this.isActive}">
            <el-table
              :data="tableData"
              border>
              <el-table-column
                type="index"
                label="序号"
                width="60"
                class="column"/>
              <el-table-column
                prop="gocity"
                width="100"
                label="出发城市">
              </el-table-column>
              <el-table-column
                prop="arrivecity"
                width="100"
                label="到达城市">
              </el-table-column>
              <el-table-column
                prop="hxgo"
                label="航线去程">
              </el-table-column>
              <el-table-column
                prop="hxreturn"
                label="航信回程">
              </el-table-column>
              <el-table-column
                prop="syjx"
                width="100"
                label="使用机型">
              </el-table-column>
              <el-table-column
                prop="fxheight"
                width="100"
                label="飞行高度">
              </el-table-column>
              <el-table-column
                label="操作"
                width="80">
                <template slot-scope="scope">
                  <el-button type="text" size="small" class="detail-cl" @click="detailClick(scope.row,scope.$index)">详情</el-button>
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
      <!--详情弹层-->
      <el-dialog :visible.sync="replyDetail" class="airway-detail-dialog">
        <div class="content">
          <div class="d-title">详情</div>
          <div class="d_title_hr"></div>
          <div class="d-cell">
            <span class="name">出发城市：</span>
            <div class="info">北京</div>
          </div>
          <div class="d-cell">
            <span class="name">到达城市：</span>
            <div class="info">深圳</div>
          </div>
          <div class="d-cell">
            <span class="name">航线去程：</span>
            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.
            </div>
          </div>
          <div class="d-cell">
            <span class="name">航线回程：</span>
            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.
            </div>
          </div>
          <div class="d-cell">
            <span class="name">使用机型：</span>
            <div class="info"></div>
          </div>
          <div class="d-cell">
            <div class="cell">
              <span class="name">飞翔高度：</span>
              <div class="info"></div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        /*name: "reply-import.vue"*/
        data(){
          return{
            currentPage: 1,      //当前页
            total: 20,          //数据总条数
            pageSize: 10,        //每页显示的数据条数
            isActive: 1,
            replyDetail: false,
            type: '',
            month: '',
            name: '',
            tableData:[
              {
                gocity: '北京',
                arrivecity: '深圳',
                hxgo: '鄂尔多斯伊金霍洛经鄂尔多斯VOR、H57P284、B214...',
                hxreturn: '鄂尔多斯伊金霍洛经鄂尔多斯VOR、H57P284、B214...',
                syjx: '',
                fxheight: ''
              },
              {
                gocity: '北京',
                arrivecity: '深圳',
                hxgo: '鄂尔多斯伊金霍洛经鄂尔多斯VOR、H57P284、B214...',
                hxreturn: '鄂尔多斯伊金霍洛经鄂尔多斯VOR、H57P284、B214...',
                syjx: '',
                fxheight: ''
              },
              {
                gocity: '北京',
                arrivecity: '深圳',
                hxgo: '鄂尔多斯伊金霍洛经鄂尔多斯VOR、H57P284、B214...',
                hxreturn: '鄂尔多斯伊金霍洛经鄂尔多斯VOR、H57P284、B214...',
                syjx: '',
                fxheight: ''
              },
              {
                gocity: '北京',
                arrivecity: '深圳',
                hxgo: '鄂尔多斯伊金霍洛经鄂尔多斯VOR、H57P284、B214...',
                hxreturn: '鄂尔多斯伊金霍洛经鄂尔多斯VOR、H57P284、B214...',
                syjx: '',
                fxheight: ''
              },
              {
                gocity: '北京',
                arrivecity: '深圳',
                hxgo: '鄂尔多斯伊金霍洛经鄂尔多斯VOR、H57P284、B214...',
                hxreturn: '鄂尔多斯伊金霍洛经鄂尔多斯VOR、H57P284、B214...',
                syjx: '',
                fxheight: ''
              },
              {
                gocity: '北京',
                arrivecity: '深圳',
                hxgo: '鄂尔多斯伊金霍洛经鄂尔多斯VOR、H57P284、B214...',
                hxreturn: '鄂尔多斯伊金霍洛经鄂尔多斯VOR、H57P284、B214...',
                syjx: '',
                fxheight: ''
              },
              {
                gocity: '北京',
                arrivecity: '深圳',
                hxgo: '鄂尔多斯伊金霍洛经鄂尔多斯VOR、H57P284、B214...',
                hxreturn: '鄂尔多斯伊金霍洛经鄂尔多斯VOR、H57P284、B214...',
                syjx: '',
                fxheight: ''
              },
              {
                gocity: '北京',
                arrivecity: '深圳',
                hxgo: '鄂尔多斯伊金霍洛经鄂尔多斯VOR、H57P284、B214...',
                hxreturn: '鄂尔多斯伊金霍洛经鄂尔多斯VOR、H57P284、B214...',
                syjx: '',
                fxheight: ''
              },
              {
                gocity: '北京',
                arrivecity: '深圳',
                hxgo: '鄂尔多斯伊金霍洛经鄂尔多斯VOR、H57P284、B214...',
                hxreturn: '鄂尔多斯伊金霍洛经鄂尔多斯VOR、H57P284、B214...',
                syjx: '',
                fxheight: ''
              },
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
        },
        detailClick(row,idx) {
          this.replyDetail = true;
        },
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
      padding-bottom: 55px;
    }
    .find_body{
      width: 100%;
      height: 150px;
      border: 1px #999999 solid;
      font-size: 18px;
      color: #333333;
      .find_condition{
        padding-top: 20px;
        padding-left: 10px;
        text-align: left;
        width: 100%;
        ul{
          list-style: none;
          li{
            float:left;
            /*width: 25%;*/
            div{
              .block{
                margin-left: -5%;
              }
            }
            .i_input{
              width: 60%;
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
        .find_bnt{
          width: 100%;
          height: 130px;
          .bnt {
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
    }
    .table_body{
      width: 100%;
      height: 100%;
      padding-top: 30px;
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
