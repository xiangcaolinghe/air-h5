<template>
  <div class="backstage-news-page">
    <div class="search-nav">
      <div class="input-table">
        <el-input v-model="input" placeholder="请输入关键词汇" class="input-search"></el-input>
        <i class="el-icon-search icon"></i>
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
        border
        v-loading="loading"
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
          prop="date"
          label="发布时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
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
          <el-input v-model="addObject.title" placeholder="请输入内容" class="flew-input"></el-input>
        </div>
        <el-row>
          <el-col :span="11">
            <div class="cell">
              <span class="name">作者：</span>
              <el-input v-model="addObject.author" placeholder="请输入内容" class="flew-input"></el-input>
            </div>
          </el-col>
          <el-col :span="11" :offset="2">
            <div class="cell">
              <span class="name">来源：</span>
              <el-input v-model="addObject.source" placeholder="请输入内容" class="flew-input"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
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
          </el-col>
          <el-col :span="11" :offset="2">
            <div class="cell">
              <span class="name">上传附件：</span>
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="5" :on-exceed="handleExceed" :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
              </el-upload>
            </div>
          </el-col>
        </el-row>



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
        <el-button @click="addPop = false" class="cancelAdd">取 消</el-button>
      </div>
    </el-dialog>
    <!--编辑弹框-->
    <el-dialog title="编辑" :visible.sync="editPop" class="tip-dialog">
      <div class="content">
        <div class="cell">
          <span class="name">标题：</span>
          <el-input v-model="editObject.title" placeholder="请输入内容" class="flew-input"></el-input>
        </div>
        <el-row>
          <el-col :span="11">
            <div class="cell">
              <span class="name">作者：</span>
              <el-input v-model="editObject.author" placeholder="请输入内容" class="flew-input"></el-input>
            </div>
          </el-col>
          <el-col :span="11" :offset="2">
            <div class="cell">
              <span class="name">来源：</span>
              <el-input v-model="editObject.source" placeholder="请输入内容" class="flew-input"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
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
          </el-col>
          <el-col :span="11" :offset="2">
            <div class="cell">
              <span class="name">上传附件：</span>
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="5" :on-exceed="handleExceed" :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
              </el-upload>
            </div>
          </el-col>
        </el-row>



        <div class="cell">
          <span class="name">内容：</span>
          <quill-editor ref="myTextEditor"
                        v-model="editObject.content"
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
        <el-button @click="editPop = false" class="cancelTip">取 消</el-button>
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
        editPop:false,
        addPop:false,
        fileList: [],
        editorOption: {
          // something config
        },
        addObject:{
          title:'',
          content:'',
          url:''
        },
        editObject:{},
        currentPage4: 4,
        input:'',
        activeTableDataId:[],
        tableData: [{
          tableData: [],
          multipleSelection: []
        }]
      }},
        computed: {
      },
      methods: {
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },
        handleExceed(files, fileList) {
          this.$message.warning(`当前限制选择 ${fileList.length} 个文件，本次选择了 ${files.length} 个文件`);
        },
        beforeRemove(file, fileList) {
          return this.$confirm(`确定移除 ${ file.name }？`);
        },
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
          console.log(this.multipleSelection)
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
        // 进入详情
        linkDetail(id) {
          alert(id)
          this.$router.push({name:'backstage.news.detail',query:{id:id}})
        },
        // 编辑
        edit(id) {
          this.editPop = true
          let params={};
          params['id'] = id;
          API.get('static/edit.json',params).then((res)=>{
            console.log(res.data)
            if(res.status == 200) {
              console.log(res.data[0])
              // this.editObject.title = '12345'
              this.editObject = res.data[0];
              this.fileList =  res.data[0].fileList;
            }else {
              console.log(res.data)
            }
          })
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
        },
        getPage(){
          let params={};
          API.get('static/list.json',params).then((res)=>{
            if(res.status == 200) {
              console.log(res.data)
              this.tableData = res.data;
            }else {
              console.log(res.data)
            }
          })
        },
        getEdit(){
          //this.addPop = true;
          let params={};
          API.get('static/edit.json',params).then((res)=>{
            if(res.status == 200) {
              console.log(res.data)
              this.tableData = res.data;
            }else {
              console.log(res.data)
            }
          })
        }

      },
      created() {
        this.getPage();
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
      .el-table__body-wrapper {
        .el-table__row {
          td {
            text-align: center;
          }
          td:nth-of-type(3) {
            text-align: left;
          }
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
  .upload-demo {
    .el-upload--text {
      float: left;
      width: 100%;
      text-align: left;
    }
    .el-upload-list {
      float: left;
      text-align: left;
    }
  }
  .ql-toolbar {
    text-align: left;
  }
</style>

