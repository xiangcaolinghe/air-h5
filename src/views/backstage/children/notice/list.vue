<template>
    <div class="backstage-notice-page">
        <div class="search-nav">
            <div class="input-table">
                <el-input v-model="input" placeholder="请输入关键词汇" class="input-search"></el-input>
                <i class="el-icon-search icon"></i>
            </div>
            <div class="select-table">
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="btn-cell">搜索</div>
            <div class="btn-cell">添加</div>
            <div class="btn-cell">删除</div>
        </div>
        <div class="result-table">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    border
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        type="index"
                        label="序号"
                        class="column">
                </el-table-column>
                <el-table-column
                        label="标题"
                        show-overflow-tooltip>
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="分类"
                        width="100">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" class="edit">{{scope.row.typeName}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="时间"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="创建者"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="top"
                        label="置顶"
                        width="120">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" class="look"  @click="toggleTop(scope.row.id,scope.row.top)">{{scope.row.topName}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="250">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" class="look" @click="linkDetail(scope.row.id)">查看</el-button>
                        <el-button type="text" size="small" class="edit">编辑</el-button>
                        <el-button type="text" size="small" class="del" @click="del(scope.row.id)">删除</el-button>
                        <el-button type="text" size="small" class="tip" @click="tip(scope.row.id)">短信提醒</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination-table">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
            </el-pagination>
        </div>
        <!--短信提醒弹框-->
        <el-dialog title="短信提醒" :visible.sync="tipPop" class="tip-dialog">
            <div class="content">
                <div class="cell">
                    <span class="name">短信内容：</span>
                    <el-input
                            type="textarea"
                            :rows="5"
                            class="flew-input"
                            placeholder="请输入内容"
                            v-model="textarea">
                    </el-input>
                </div>
                <div class="cell">
                    <span class="name">相关用户：</span>
                    <el-input v-model="inputUser" placeholder="请输入内容" class="flew-input input-user"></el-input>
                    <span class="btn">选择</span>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="tipPop = false" class="confirm">确 定</el-button>
                <el-button @click="tipPop = false" class="cancel">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: '',
    components:{  },
    data() {
      return {
        currentPage4: 4,
        tipPop:false,
        input:'',
        textarea:'',
        inputUser:'',
        options: [{
          value: '1',
          label: '换季通知'
        }, {
          value: '2',
          label: '临时航线'
        }, {
          value: '3',
          label: '会议通知'
        }],
        value: '',
        tableData: [{
          date: '2016-05-03',
          id:'22',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          top:'1',
          topName:'取消置顶',
          type:'1',
          typeName:'换季通知'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          id:'33',
          top:'0',
          topName:'置顶',
          address: '上海市普陀区金沙江路 1518 弄',
          type:'2',
          typeName:'临时航线'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          id:'23',
          top:'1',
          topName:'取消置顶',
          address: '上海市普陀区金沙江路 1518 弄',
          type:'3',
          typeName:'会议通知'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          id:'56',
          top:'1',
          topName:'取消置顶',
          address: '上海市普陀区金沙江路 1518 弄',
          type:'3',
          typeName:'会议通知'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          id:'89',
          top:'1',
          topName:'取消置顶',
          address: '上海市普陀区金沙江路 1518 弄',
          type:'3',
          typeName:'会议通知'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          top:'0',
          topName:'置顶',
          address: '上海市普陀区金沙江路 1518 弄',
          type:'3',
          typeName:'会议通知'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          id:'98',
          top:'1',
          topName:'取消置顶',
          address: '上海市普陀区金沙江路 1518 弄',
          type:'3',
          typeName:'会议通知'
        }],
        multipleSelection: []
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(val);
      },
      handleCurrentChange(val) {
        console.log(val);
      },
      // 选择
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 删除
      del(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData = this.tableData.filter(ele => {
              return ele.id != id;
            })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 短信提醒
      tip(id) {
        this.tipPop = true
      },
      // 进入详情
      linkDetail(id) {
        this.$router.push({name:'backstage.notice.detail',query:{id:id}})
      },
      // 置顶
      toggleTop(id,top) {
        console.log(id,top)
      }
    },
    created() {

    }
  }
</script>

<style lang="less">
    .backstage-notice-page {
        .tip-dialog {
            .el-dialog {
                max-width: 1200px;
                width: 100%;
                .dialog-footer {
                    text-align: center;
                    .el-button {
                        margin-left: 80px;
                    }
                    .el-button--primary {
                        background: #026ab3;
                        border-color: #026ab3;
                    }
                }
                .el-dialog__header {
                    text-align: left;
                    border-bottom: 1px solid #ccc;
                }
                .el-dialog__body {
                    .content {
                        width:100%;
                        padding:10px 30px;
                        box-sizing: border-box;
                        .cell {
                            display: flex;
                            margin-bottom: 30px;
                            width:100%;
                            .name {
                                display: block;
                                width:120px;
                                line-height: 40px;
                                text-align: left;
                                font-size: 20px;
                                color:#333;
                            }
                            .flew-input {
                                flex: 1;
                            }
                            .btn {
                                display: block;
                                width:120px;
                                height:40px;
                                line-height: 40px;
                                text-align: center;
                                font-size: 18px;
                                color:#fff;
                                margin-left: 30px;
                                background: #026ab3;
                            }
                        }
                    }
                }
            }
        }
        .search-nav {
            padding:30px 30px 36px;
            margin-top: 30px;
            overflow: hidden;
            box-sizing: border-box;
            background: #fff;
            .input-table {
                float: left;
                position: relative;
                width:35%;
                .input-search {
                    .el-input__inner {
                        padding-left:30px;
                    }
                }
                .icon {
                    position: absolute;
                    top:10px;
                    color:#999;
                    font-size: 20px;
                    left:5px;
                }
            }
            .select-table {
                float: left;
                margin-left: 30px;
                position: relative;
                width:15%;
            }
            .btn-cell {
                float: left;
                width:12%;
                cursor: pointer;
                height:40px;
                background: #026ab3;
                color:#fff;
                line-height: 40px;
                font-size: 18px;
                text-align: center;
                margin-left: 30px;
            }
        }
        .result-table {
            margin-top: 30px;
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
            .el-button.look.el-button--text.el-button--small {
                color:#026ab3;
                font-size: 14px;
            }
            .el-button.edit.el-button--text.el-button--small {
                color:#333;
                font-size: 14px;
            }
            .el-button.del.el-button--text.el-button--small {
                color:#ff3333;
                font-size: 14px;
            }
            .el-button.tip.el-button--text.el-button--small {
                color: #df9718;
                font-size: 14px;
            }
        }
        .pagination-table {
            margin-top: 40px;
        }
    }
</style>
