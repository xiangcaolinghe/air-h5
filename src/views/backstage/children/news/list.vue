<template>
    <div class="backstage-news-page">
        <div class="search-nav">
            <div class="input-table">
                <el-input v-model="input" placeholder="请输入关键词汇" class="input-search"></el-input>
                <i class="el-icon-search icon"></i>
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
                        prop="name"
                        label="时间"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="创建者"
                        width="120">
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" class="look" @click="linkDetail(scope.row.id)">查看</el-button>
                        <el-button type="text" size="small" class="edit">编辑</el-button>
                        <el-button type="text" size="small" class="del" @click="del(scope.row.id)">删除</el-button>
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
    </div>
</template>

<script>
  export default {
    name: '',
    components:{  },
    data() {
      return {
        currentPage4: 4,
        input:'',
        tableData: [{
          date: '2016-05-03',
          id:'22',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          id:'33',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          id:'23',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          id:'56',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          id:'89',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          id:'98',
          address: '上海市普陀区金沙江路 1518 弄'
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
      // 进入详情
      linkDetail(id) {
        this.$router.push({name:'backstage.news.detail',query:{id:id}})
      }
    },
    created() {

    }
  }
</script>

<style lang="less">
    .backstage-news-page {
        .search-nav {
            padding:30px 30px 36px;
            margin-top: 30px;
            overflow: hidden;
            box-sizing: border-box;
            background: #fff;
            .input-table {
                float: left;
                position: relative;
                width:50%;
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
        }
        .pagination-table {
            margin-top: 40px;
        }
    }
</style>
