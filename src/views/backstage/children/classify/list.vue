<template>
  <div class="backstage-news-page">
    <div class="search-nav">
      <div class="btn-cell" @click="selectDel">删除</div>
      <div class="btn-cell" @click="addOpen">添加</div>
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
          prop="label"
          label="分类名称">
        </el-table-column>
        <el-table-column
          prop="name"
          label="创建者"
          width="120">
        </el-table-column>
        <el-table-column
          prop="date"
          label="创建时间"
          width="120">
        </el-table-column>
        <el-table-column
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="edit" @click="editOpen(scope.row.id)">编辑</el-button>
            <el-button type="text" size="small" class="del" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--添加弹框-->
    <el-dialog title="添加分类" :visible.sync="addPop" class="tip-dialog">
      <div class="content">
        <div class="cell">
          <span class="name">分类：</span>
          <el-input v-model="addObject.title" placeholder="请输入内容" class="flew-input"></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addSave" class="confirmAdd">确 定</el-button>
        <el-button @click="addPop = false" class="cancelAdd">取 消</el-button>
      </div>
    </el-dialog>
    <!--编辑弹框-->
    <el-dialog title="编辑" :visible.sync="editPop" class="tip-dialog">
      <div class="content">
        <div class="cell">
          <span class="name">分类：</span>
          <el-input v-model="editObject.title" placeholder="请输入内容" class="flew-input"></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editSave" class="confirmTip">确 定</el-button>
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
        // 删除选择初始化
        multipleSelection:[],
        activeTableDataId:[],
        addObject:{
          title:'',
        },
        editObject:{
          title:'',
        },
        tableData: []
      }},
    computed: {},
    methods: {
      // 页面初始化
      getPage(){
        let params={};
        API.get('static/classify.json',params).then((res)=>{
          if(res.status == 200) {
            console.log(res.data)
            this.tableData = res.data;
          }else {
            console.log(res.data)
          }
        })
      },
      // 选择
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
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
          /*Array.from(this.activeTableDataId).forEach(element => {
            this.tableData = this.tableData.filter(ele => {
              console.log(ele.id != element.id)
              return ele.id != element.id;
            })
          })*/
          let params={};
          params['idlist'] = this.activeTableDataId;
          API.get('static/edit.json',params).then((res)=>{
            console.log(res)
            if(res.status == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getPage();
            }else {
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            }
          })
        })
      },
      // 新增
      addOpen(){
        this.addPop = true;
        this.addObject = {
          title:'',
        }
      },
      // 新增保存
      addSave(){
        console.log(this.addObject)
        let params={};
        params['title'] = this.addObject.title;
        API.get('static/list.json',params).then((res)=>{
          if(res.status == 200) {
            this.addPop = false;
            this.getPage();
            this.$message({
              type: 'success',
              message: '新增成功!'
            });
          }else {
            this.$message({
              type: 'error',
              message: '新增失败!'
            });
          }
        })
      },
      // 编辑
      editOpen(id) {
        this.editPop = true
        let params={};
        params['id'] = id;
        API.get('static/edit.json',params).then((res)=>{
          console.log(res.data)
          if(res.status == 200) {
            console.log(res.data[0])
            // this.editObject.title = '12345'
            this.editObject = res.data[0];
          }else {
            console.log(res.data)
          }
        })
      },
      // 编辑保存
      editSave(){
        console.log(this.editObject)
        let params={};
        params['id'] = this.editObject.id;
        params['title'] = this.editObject.title;
        API.get('static/list.json',params).then((res)=>{
          if(res.status == 200) {
            this.editPop = false;
            this.getPage();
            this.$message({
              type: 'success',
              message: '编辑成功!'
            });
          }else {
            this.$message({
              type: 'error',
              message: '编辑失败!'
            });
          }
        })
      },
      // 单个删除
      del(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params={};
          params['id'] = id;
          /*this.tableData = this.tableData.filter(ele => {
            return ele.id != id;
          })*/
          API.get('static/list.json',params).then((res)=>{
            if(res.status == 200) {
              this.getPage();
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }else {
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
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
      .select-table {
        float: left;
        margin-left: 30px;
        position: relative;
        width:15%;
      }
      .btn-cell {
        float: right;
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
  .tip-dialog {
    .el-dialog {
      width: 500px;
    }
  }
</style>

