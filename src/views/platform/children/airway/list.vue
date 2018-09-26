<template>
    <div class="airway-list-page">
        <div class="search-table">
            <div class="left">
                <div class="cell"><span class="label">起点：</span><el-input v-model="search.start" placeholder="请输入起点" class="input"></el-input></div>
                <div class="cell"><span class="label">途径：</span><el-input v-model="search.middle" placeholder="请输入途径地" class="input"></el-input></div>
                <div class="cell no-margin-bottom"><span class="label">终点：</span><el-input v-model="search.end" placeholder="请输入起点" class="input"></el-input></div>
            </div>
            <div class="right">
                <div class="cell"><span class="label">编号：</span><el-input v-model="search.code" placeholder="请输入起点" class="input"></el-input></div>
                <div class="cell no-margin-bottom last">
                    <span class="label type">类型：</span>
                    <div class="check-box">
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox label="一号规定"></el-checkbox>
                            <el-checkbox label="换季临时"></el-checkbox>
                            <el-checkbox label="月度数据"></el-checkbox>
                            <el-checkbox label="往返"></el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <div class="btn-box">
                        <div class="btn search">查询</div>
                        <div class="btn clears">清空</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="search-lists">
            <div class="title">班机航线（总计 100 条）</div>
            <div class="lists">
                <el-table
                        :data="tableData"
                        border>
                    <el-table-column
                            type="index"
                            label="序号"
                            class="column">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="航线编号">
                    </el-table-column>
                    <el-table-column
                            prop="province"
                            label="航线名称">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="数据源">
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row,scope.$index)" type="text" size="small">地图展示</el-button>
                            <el-button type="text" size="small" @click="detailClick(scope.row,scope.$index)">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!--查看地图弹层-->
        <el-dialog title="航线图" :visible.sync="airwayPic" class="airway-pic-dialog">
            <div class="map-box">
                <img src="./../../../../assets/images/map.png" class="img">
            </div>
        </el-dialog>
        <!--详情弹层-->
        <el-dialog title="详情" :visible.sync="airwayDetail" class="airway-detail-dialog">
            <div class="content">
                <div class="d-cell">
                    <span class="name">航线编号：</span>
                    <div class="info">CZ3151</div>
                </div>
                <div class="d-cell">
                    <span class="name">航线名称：</span>
                    <div class="info">CZ3151</div>
                </div>
                <div class="d-cell">
                    <span class="name">数据源：</span>
                    <div class="info">CZ3151</div>
                </div>
                <div class="d-cell">
                    <span class="name">点航路：</span>
                    <div class="info-body">
                        <div class="hb">
                            <div class="c">入点</div>
                            <div class="c">航路</div>
                            <div class="c">出点</div>
                        </div>
                        <div class="bd-table">
                            <div class="bd">
                                <div class="c">eeeeeeeeeeeee</div>
                                <div class="c">eeeeeeeeeeeee</div>
                                <div class="c">eeeeeeeeeeeee</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-cell">
                    <span class="name">点串：</span>
                    <div class="info-body">
                        <div class="hb">
                            <div class="c">顺序</div>
                            <div class="c">航路</div>
                            <div class="c">航路点</div>
                        </div>
                        <div class="bd-table">
                            <div class="bd">
                                <div class="c">eeeeeeeeeeeee</div>
                                <div class="c">eeeeeeeeeeeee</div>
                                <div class="c">eeeeeeeeeeeee</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-cell">
                    <span class="name">限制条件：</span>
                    <div class="info">CZ3151</div>
                </div>
                <div class="d-cell">
                    <span class="name">备注：</span>
                    <div class="info">CZ3151</div>
                </div>
                <div class="d-cell">
                    <div class="cell">
                        <span class="name">最低高度：</span>
                        <div class="info">CZ3151</div>
                        <span class="unit">米</span>
                    </div>
                    <div class="cell">
                        <span class="name">总距离值：</span>
                        <div class="info">CZ3151</div>
                        <span class="unit">千米</span>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: '',
    components:{  },
    data(){
      return {
        search:{
          start:'',
          end:'',
          code:'',
          middle:''
        },
        airwayPic:false,
        airwayDetail:false,
        checkList:[],
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      }
    },
    methods:{
      handleClick(row,idx) {
        this.airwayPic = true
        console.log(row,idx)
      },
      detailClick(row,idx) {
        this.airwayDetail = true
      }
    },
    created() {

    }
  }
</script>
<style lang="less">
    .airway-list-page {
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
                    /*width:100% !important;*/
                }
            }
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
        .airway-detail-dialog {
            .el-dialog {
                margin-top: 50px !important;
                max-width: 1200px;
                width: 100%;
                .el-dialog__header {
                    text-align: left;
                    border-bottom: 1px solid #ccc;
                }
                .el-dialog__body {
                    .content {
                        width:100%;
                        .d-cell {
                            padding:15px;
                            display: flex;
                            box-sizing: border-box;
                            .name {
                                width:120px;
                                font-size: 18px;
                                color:#333;
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
<style lang="less" scoped>
    .no-margin-bottom {
        margin-bottom: 0 !important;
    }
    .airway-list-page {
        width:100%;
        .search-table {
            margin:30px 0;
            background: #fff;
            padding:30px;
            overflow: hidden;
            box-sizing: border-box;
            .cell {
                text-align: left;
                margin-bottom: 30px;
                .label {
                    font-size: 18px;
                    color:#333;
                    font-weight: 500;
                    margin-right: 10px;
                }
                .input {
                    width:80%;
                }
            }
            .left {
                float: left;
                width:50%;

            }
            .right {
                float: right;
                width:50%;
                padding-left: 20px;
                box-sizing: border-box;
                .cell {
                    position: relative;
                    overflow:hidden;
                    .label {
                        line-height: 40px;
                        float: left;
                    }
                    .input {
                        float: right;
                        width:86%;
                    }
                    .check-box {
                        width:86%;
                        line-height: 40px;
                        float: right;
                    }
                    .btn-box {
                        position: absolute;
                        height:35px;
                        top:73px;
                        width:86%;
                        right:0;
                        clear: both;
                        .btn {
                            width:130px;
                            float: left;
                            text-align: center;
                            height:35px;
                            cursor: pointer;
                            line-height: 35px;
                            font-weight: 400;
                            color:#fff;
                            &.search {
                                 margin-right: 30px;
                                 background: #026ab3;
                             }
                            &.clears {
                                 background: #ccc;
                             }
                        }
                    }
                    &.last {
                        height:110px;
                     }
                }
            }
        }
        .search-lists {
            .title {
                text-align: left;
                margin-bottom: 30px;
            }
        }
    }
</style>
