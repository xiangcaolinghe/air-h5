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
            <div class="btn-cell" @click="search">搜索</div>
            <div class="btn-cell" @click="addPop = true">添加</div>
            <div class="btn-cell" @click="selectDel">删除</div>
        </div>
        <div class="result-table">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    v-loading="loading"
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
                        prop="title"
                        label="标题">
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
                        <el-button type="text" size="small" class="edit" @click="edit(scope.row.id)">编辑</el-button>
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
        <!--添加弹框-->
        <el-dialog title="添加新闻" :visible.sync="addPop" class="tip-dialog">
            <div class="content">
                <div class="cell">
                    <span class="name">标题：</span>
                    <el-input v-model="addObject.title" placeholder="请输入内容" class="flew-input"></el-input>
                </div>
                <div class="cell">
                    <span class="name">缩略图：</span>
                    <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="addObject.url" :src="addObject.url" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
                <div class="cell">
                    <span class="name">内容：</span>
                    <quill-editor ref="myTextEditor"
                                  v-model="addObject.content"
                                  :config="editorOption"
                                  @change="onAddChange($event)"
                                  @blur="onAddBlur($event)"
                                  @focus="onAddFocus($event)"
                                  @ready="onAddReady($event)">
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
                    <el-input v-model="editObject.title" placeholder="请输入内容" class="flew-input"></el-input>
                </div>
                <div class="cell">
                    <span class="name">缩略图：</span>
                    <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="editObject.url" :src="editObject.url" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
                <div class="cell">
                    <span class="name">内容：</span>
                    <quill-editor ref="myTextEditor"
                                  v-model="editObject.editContent"
                                  :config="editorOption"
                                  @change="onEditorChange($event)"
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
        loading:false,
        editorOption: {
          // something config
        },
        addObject:{
          title:'',
          content:'',
          url:''
        },
        editObject:{
          title:'上海市普陀区金沙江路 1518',
          content:'<h2>I am Example</h2>',
          url:''
        },
        currentPage4: 4,
        tipPop:false,
        editPop:false,
        addPop:false,
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
        activeTableDataId:[],
        tableData: [{
          title:'宁夏空管分局飞行服务室开展安康杯“真情服务”主题辩论赛活动',
          date: '2016-05-03',
          id:'234',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          top:true,
          topName:'取消置顶',
          type:'1',
          typeName:'换季通知'
        }, {
          title:'宁夏空管分局飞行服务室开展安康杯“真情服务”主题辩论赛活动',
          date: '2016-05-02',
          name: '王小虎',
          id:'456',
          top:false,
          topName:'置顶',
          address: '上海市普陀区金沙江路 1518 弄',
          type:'2',
          typeName:'临时航线'
        }, {
          title:'宁夏空管分局飞行服务室开展安康杯“真情服务”主题辩论赛活动',
          date: '2016-05-04',
          name: '王小虎',
          id:'56',
          top:true,
          topName:'取消置顶',
          address: '上海市普陀区金沙江路 1518 弄',
          type:'3',
          typeName:'会议通知'
        }, {
          title:'宁夏空管分局飞行服务室开展安康杯“真情服务”主题辩论赛活动',
          date: '2016-05-01',
          name: '王小虎',
          id:'78',
          top:true,
          topName:'取消置顶',
          address: '上海市普陀区金沙江路 1518 弄',
          type:'3',
          typeName:'会议通知'
        }, {
          title:'宁夏空管分局飞行服务室开展安康杯“真情服务”主题辩论赛活动',
          date: '2016-05-08',
          name: '王小虎',
          id:'78',
          top:true,
          topName:'取消置顶',
          address: '上海市普陀区金沙江路 1518 弄',
          type:'3',
          typeName:'会议通知'
        }, {
          title:'宁夏空管分局飞行服务室开展安康杯“真情服务”主题辩论赛活动',
          date: '2016-05-06',
          name: '王小虎',
          id:'09',
          top:false,
          topName:'置顶',
          address: '上海市普陀区金沙江路 1518 弄',
          type:'3',
          typeName:'会议通知'
        }, {
          title:'宁夏空管分局飞行服务室开展安康杯“真情服务”主题辩论赛活动',
          date: '2016-05-07',
          name: '王小虎',
          id:'786',
          top:true,
          topName:'取消置顶',
          address: '上海市普陀区金沙江路 1518 弄',
          type:'3',
          typeName:'会议通知'
        }],
        multipleSelection: []
      }
    },
    computed: {
//      editor() {
//        return this.$refs.myTextEditor.quillEditor
//      }
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
      // 搜索
      search() {

      },
      // 选择删除
      selectDel() {
        if (this.multipleSelection.length == 0) {
          this.$message({
            type: 'info',
            message: '请选择需要删除的数据'
          });
          return
        }
        this.multipleSelection.forEach(ele => {
          this.activeTableDataId.push({'id': ele.id})
        })
        this.$confirm('您确定要删除这' + this.multipleSelection.length +'条数据吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          Array.from(this.activeTableDataId).forEach(element => {
            this.tableData = this.tableData.filter(ele => {
              return ele.id != element.id;
            })
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
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
        this.tableData.forEach(ele => {
          if (ele.id == id) {
            ele.top = !ele.top
            ele.top ? ele.topName = '取消置顶' : ele.topName = '置顶'
          }
        })
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
      //确定短信提醒
      confirmEdit() {

      },
      // 取消短信提醒
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
        console.log('editor change!', editor, html, text)
//        this.content = html
      },
      // 添加弹框
      onAddBlur(editor) {
        console.log('editor blur!', editor)
      },
      onAddFocus(editor) {
        console.log('editor focus!', editor)
      },
      onAddReady(editor) {
        console.log('editor ready!', editor)
      },
      onAddChange({ editor, html, text }) {
        console.log('editor change!', editor, html, text)
      }
    },
    created() {
    },
    mounted() {
      // you can use current editor object to do something(editor methods)
      console.log('this is my editor', this.editor)
      // this.editor to do something...
    },
  }
</script>

<style lang="less">
    @import "./../../../../assets/styles/edit-pop.less";
    .backstage-notice-page {
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
