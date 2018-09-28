<template>
    <div class="backstage-news-page">
        <div class="search-nav">
            <div class="input-table">
                <el-input v-model="input" placeholder="请输入关键词汇" class="input-search"></el-input>
                <i class="el-icon-search icon"></i>
            </div>
            <div class="btn-cell">搜索</div>
            <div class="btn-cell" @click="addPop = true">添加</div>
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
                        label="会议名称"
                        show-overflow-tooltip>
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="会议时间"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="会议地点"
                        width="200">
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
                        <el-button type="text" size="small" class="edit" @click="edit(scope.row.id)">编辑</el-button>
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
        <!--添加弹框-->
        <el-dialog title="添加新闻" :visible.sync="addPop" class="tip-dialog">
            <div class="content">
                <div class="cell">
                    <span class="name">标题：</span>
                    <el-input v-model="inputUser" placeholder="请输入内容" class="flew-input"></el-input>
                </div>
                <div class="cell">
                    <span class="name">缩略图：</span>
                    <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
                <div class="cell">
                    <span class="name">内容：</span>
                    <quill-editor ref="myTextEditor"
                                  v-model="content"
                                  :config="editorOption"
                                  @blur="onEditorBlur($event)"
                                  @focus="onEditorFocus($event)"
                                  @ready="onEditorReady($event)">
                    </quill-editor>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="tipPop = false" class="confirmAdd">确 定</el-button>
                <el-button @click="tipPop = false" class="cancelAdd">取 消</el-button>
            </div>
        </el-dialog>
        <!--编辑弹框-->
        <el-dialog title="编辑" :visible.sync="editPop" class="tip-dialog">
            <div class="content">
                <div class="cell">
                    <span class="name">标题：</span>
                    <el-input v-model="inputUser" placeholder="请输入内容" class="flew-input"></el-input>
                </div>
                <div class="cell">
                    <span class="name">缩略图：</span>
                    <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
                <div class="cell">
                    <span class="name">内容：</span>
                    <quill-editor ref="myTextEditor"
                                  v-model="editContent"
                                  :config="editorOption"
                                  @blur="onEditorBlur($event)"
                                  @focus="onEditorFocus($event)"
                                  @ready="onEditorReady($event)">
                    </quill-editor>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="tipPop = false" class="confirmTip">确 定</el-button>
                <el-button @click="tipPop = false" class="cancelTip">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  import { quillEditor } from 'vue-quill-editor'
  export default {
    name: '',
    components:{ quillEditor },
    data() {
      return {
        editPop:false,
        addPop:false,
        imageUrl: '',
        editContent:'',
        content: '<h2>I am Example</h2>',
        editorOption: {
          // something config
        },
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
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
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
        this.$router.push({name:'backstage.meeting.detail',query:{id:id}})
      },
      // 编辑
      edit(id) {
        this.editPop = true
      },
      //确定添加
      confirmAdd() {

      },
      // 取消添加
      cancelAdd() {

      },
      //确定编辑
      confirmEdit() {

      },
      // 取消编辑
      cancelEdit() {

      },
      onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },
      onEditorChange({ editor, html, text }) {
        // console.log('editor change!', editor, html, text)
        this.content = html
      }
    },
    created() {

    },
    mounted() {
      // you can use current editor object to do something(editor methods)
      console.log('this is my editor', this.editor)
      // this.editor to do something...
    }
  }
</script>

<style lang="less">
    @import "./../../../../assets/styles/edit-pop.less";
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
