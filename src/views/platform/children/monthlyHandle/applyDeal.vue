<template>
  <div class="container">
    <div class="title">
      月度申请处理
    </div>
    <div class="find_body">
      <div class="find_condition">
        <ul>
          <li style="width: 30%">
            时间计划：<el-input v-model="type" class="i_input" placeholder="请输入内容"/>
          </li>
          <li style="width: 20%">
            航空公司：<el-input v-model="type" style="width: 60%" placeholder="请输入内容"/>
          </li>
          <li style="width: 20%">
            航班号：<el-input v-model="type" style="width: 60%" placeholder="请输入内容"/>
          </li>
          <li style="width: 30%">
            <div class="select_page">
              每页显示：
              <el-select v-model="pageSize" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>条
            </div>
          </li>
        </ul>
        <br/>
        <br/>
        <br/>
        <ul>
          <li style="width: 35%">
            出发城市：<el-input v-model="type" class="i_input" placeholder="请输入内容"/>
          </li>
          <li style="width: 35%">
            到达城市：<el-input v-model="type" class="i_input" placeholder="请输入内容"/>
          </li>
          <li style="width: 30%">
            <div class="find_bnt">
              <div class="bnt search">查询</div>
              <div class="bnt search">重置</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="table_body">
      <div class="i_rule">
        <ul>
          <li :class="{active:isActive == 1}"><a href="javascript:;" @click="switcher(1)">添加</a></li>
          <li :class="{active:isActive == 2}"><a href="javascript:;" @click="switcher(2)">按航空公司排序</a></li>
          <li :class="{active:isActive == 3}"><a href="javascript:;" @click="switcher(3)">按出入城市排序</a></li>
          <li :class="{active:isActive == 4}"><a href="javascript:;" @click="switcher(4)">按核对状态排序</a></li>
          <li :class="{active:isActive == 5}" style="width: 180px"><a href="javascript:;" @click="switcher(5)">导出Word（按航空）</a></li>
          <li :class="{active:isActive == 6}" style="width: 200px"><a href="javascript:;" @click="switcher(6)">导出Word（按城市对）</a></li>
        </ul>
      </div>
      <div class="info_lists">
        <div class="lists" >
          <el-table
            :data="tableData"
            border>
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="arrivecity"
              width="100"
              label="航空公司">
            </el-table-column>
            <el-table-column
              prop="hxgo"
              width="100"
              label="航班号">
            </el-table-column>
            <el-table-column
              prop="syjx"
              width="100"
              label="出发城市">
            </el-table-column>
            <el-table-column
              prop="tocity"
              width="100"
              label="到达城市">
            </el-table-column>
            <el-table-column
              prop="hxfx"
              label="航线走向">
            </el-table-column>
            <el-table-column
              prop="status"
              width="100"
              label="状态">
            </el-table-column>
            <el-table-column
              prop="hdstatus"
              width="100"
              label="核对状态">
            </el-table-column>
            <el-table-column
              label="操作"
              width="150">
              <template slot-scope="scope">
                <el-button type="text" size="small" class="detail-cl" @click="detailClick(scope.row,scope.$index)">修改</el-button>
                <el-button type="text" size="small" class="detele-cl" @click="detailClick(scope.row,scope.$index)">删除</el-button>
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
    <!--<el-dialog :visible.sync="replyDetail" class="airway-detail-dialog">
      <div class="content">
        <div class="d-title">详情</div>
        <div class="d_title_hr"></div>
        <div class="d-cell">
          <span class="name">数据源：</span>
          <div class="info">上报数据</div>
        </div>
        <div class="d-cell">
          <span class="name">分析结果：</span>
          <div class="info">未批复</div>
        </div>
        <div class="d-cell">
          <span class="name">城市对：</span>
          <div class="info">
            重庆汉城-汉中古城
          </div>
        </div>
        <div class="d-cell">
          <span class="name">航空公司：</span>
          <div class="info">
            华夏航空公司
          </div>
        </div>
        <div class="d-cell">
          <span class="name">航线去程：</span>
          <div class="content">
            重庆江北经SOSLI、W550P204、H39达州VOR、H93AGULU、H144城固VOR至汉中城固重庆江北经SOSLI、W550P204、H39达州VOR、H93AGULU、H144城固VOR至汉中城固重庆江北经SOSLI、W550P204、H39达州VOR、H93AGULU、H144城固VOR至汉中城固重庆江北经SOSLI、W550P204、H39达州VOR、H93AGULU、H144城固VOR至汉中城固
          </div>
        </div>
      </div>
    </el-dialog>-->
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
        templateRadio: '',
        tableData:[
          {
            arrivecity: '北京航空',
            hxgo: '北京航空',
            hxreturn: '北京航空',
            syjx: '上海',
            tocity: '北京',
            hxfx: '北京北京北京北京不加班北京北京北京北京不加班北京北京北京北京不加班',
            status: '已导出',
            hdstatus: '已核对',
          },
          {
            arrivecity: '北京航空',
            hxgo: '北京航空',
            hxreturn: '北京航空',
            syjx: '上海',
            tocity: '北京',
            hxfx: '北京北京北京北京不加班北京北京北京北京不加班北京北京北京北京不加班',
            status: '已导出',
            hdstatus: '已核对',
          },
          {
            arrivecity: '北京航空',
            hxgo: '北京航空',
            hxreturn: '北京航空',
            syjx: '上海',
            tocity: '北京',
            hxfx: '北京北京北京北京不加班北京北京北京北京不加班北京北京北京北京不加班',
            status: '已导出',
            hdstatus: '已核对',
          },
          {
            arrivecity: '北京航空',
            hxgo: '北京航空',
            hxreturn: '北京航空',
            syjx: '上海',
            tocity: '北京',
            hxfx: '北京北京北京北京不加班北京北京北京北京不加班北京北京北京北京不加班',
            status: '已导出',
            hdstatus: '已核对',
          },
          {
            arrivecity: '北京航空',
            hxgo: '北京航空',
            hxreturn: '北京航空',
            syjx: '上海',
            tocity: '北京',
            hxfx: '北京北京北京北京不加班北京北京北京北京不加班北京北京北京北京不加班',
            status: '已导出',
            hdstatus: '已核对',
          },
          {
            arrivecity: '北京航空',
            hxgo: '北京航空',
            hxreturn: '北京航空',
            syjx: '上海',
            tocity: '北京',
            hxfx: '北京北京北京北京不加班北京北京北京北京不加班北京北京北京北京不加班',
            status: '已导出',
            hdstatus: '已核对',
          }
        ],
        analyzeType:[],
        options: [
          {
            value: '1',
            label: '10'
          },
          {
            value: '2',
            label: '20'
          },
          {
            value: '3',
            label: '30'
          },
          {
            value: '4',
            label: '40'
          },
          {
            value: '5',
            label: '50'
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
      },
      detailClick(row,idx) {
        this.replyDetail = true;
      },
      airwayClick(row,idx) {
        this.airwayPic=true;
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
      .detele-cl{
        color: #ff0000;
      }
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
      padding-bottom: 35px;
    }
    .find_body{
      width: 100%;
      height: 150px;
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
              width: 88%;
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
          /*margin-top: 30px;*/
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
      .i_rule{
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
            a,a:hover{
              text-decoration:none;//去掉下划线
              color: #026ab3;
              font-weight: bold;
            }
            &.active{
              background-color: #026ab3;
              a{
                color: white;
              }
            }
          }
        }
      }
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
