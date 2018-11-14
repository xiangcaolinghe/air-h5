<template>
  <div class="backstage-news-page backstage-classify-page-classify">
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
          width="55"
          class="column">
        </el-table-column>
        <el-table-column
          prop="iName"
          label="分类名称">
        </el-table-column>
        <el-table-column
          prop="iCreateTime"
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
    <el-dialog title="添加分类" :visible.sync="addPop" class="tip-dialog small-dia" :close-on-click-modal="false">
      <el-form :model="addObject" status-icon :rules="rules" ref="addObject" label-width="80px" class="demo-ruleForm">
      <div class="content">
        <div class="cell">
          <el-form-item label="分类：" prop="iName">
          <!--<span class="name">分类：</span>-->
          <el-input v-model="addObject.iName" placeholder="请输入内容" class="flew-input"></el-input>
          </el-form-item>
        </div>
      </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addSave('addObject')" class="confirmAdd">确 定</el-button>
        <el-button @click="addPop = false" class="cancelAdd">取 消</el-button>
      </div>
    </el-dialog>
    <!--编辑弹框-->
    <el-dialog title="编辑" :visible.sync="editPop" class="tip-dialog small-dia" :close-on-click-modal="false">
      <el-form :model="editObject" status-icon :rules="rules" ref="editObject" label-width="80px" class="demo-ruleForm">
      <div class="content">
        <div class="cell">
          <el-form-item label="分类：" prop="iName">
          <!--<span class="name">分类：</span>-->
          <el-input v-model="editObject.iName" placeholder="请输入内容" class="flew-input"></el-input>
          </el-form-item>
        </div>
      </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editSave('editObject')" class="confirmTip">确 定</el-button>
        <el-button @click="editPop = false" class="cancelTip">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {quillEditor} from 'vue-quill-editor'

  export default {
    name: '',
    components: {quillEditor},
    data() {
      return {
        loading: false,
        editPop: false,
        addPop: false,
        iSystemId : 1,
        // 删除选择初始化
        multipleSelection: [],
        activeTableDataId: [],
        activeTableDataId2: '',
        addObject: {
          iName: '',
        },
        editObject: {
          iName: '',
        },
        tableData: [],
        rules: {
          iName: [
            { required: true, message: '必填', trigger: 'blur' },
          ]
        },
      }
    },
    computed: {},
    methods: {
      // 页面初始化
      getPage() {
        let params = {};
        API.get('/ification/FindAll', params,{Authorization:storage.get('token')}).then((res) => {
          if (res.data.code == 200) {
            console.log(res.data)
            this.tableData = res.data.data;
          } else if(res.data.code == 1001){
            this.signOut()
          } else {
            console.log(res.data)
          }
        })
      },
      // 新增
      addOpen() {
        this.addPop = true;
        this.addObject = {
          iName: '',
        }
        if(this.$refs.addObject){
          this.$refs.addObject.clearValidate();
        }else {
          return
        }
      },
      // 新增保存
      addSave(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {};
            params['iName'] = this.addObject.iName;
            params['iSystemId'] = this.iSystemId;
            console.log(params)
            API.post('/ification/create', params,{Authorization:storage.get('token')}).then((res) => {
              console.log(res.data)
              if (res.data.code == 200) {
                this.addPop = false;
                this.getPage();
                this.$message({
                  type: 'success',
                  message: '新增成功!'
                });
              } else if(res.data.code == 1001){
                this.signOut()
              } else {
                this.$message({
                  type: 'error',
                  message: '新增失败!'
                });
              }
            })
          }
        })
      },
      // 编辑
      editOpen(id) {
        if(this.$refs.editObject){
          this.$refs.editObject.clearValidate();
        }
        this.editPop = true
        let params = {};
        params['id'] = id;
        API.get('/ification/FindByid', params,{Authorization:storage.get('token')}).then((res) => {
          console.log(res.data)
          if (res.data.code == 200) {
            // this.editObject.title = '12345'
            this.editObject = res.data.data;
          } else if(res.data.code == 1001){
            this.signOut()
          } else {
            console.log(res.data)
          }
        })
      },
      // 编辑保存
      editSave(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.editObject)
            let params = {};
            params['id'] = this.editObject.id;
            params['iName'] = this.editObject.iName;
            API.put('/ification/ificatUpdate', params,{Authorization:storage.get('token')}).then((res) => {
              console.log(res.data)
              if (res.data.code == 200) {
                this.editPop = false;
                this.getPage();
                this.$message({
                  type: 'success',
                  message: '编辑成功!'
                });
              } else if(res.data.code == 1001){
                this.signOut()
              } else {
                this.$message({
                  type: 'error',
                  message: '编辑失败!'
                });
              }
            })
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
          let params = {};
          params['id'] = id;
          params['iSystemId'] = storage.get('sysid');
          API.delete('/ification/ificatDelete', params,{Authorization:storage.get('token')}).then((res) => {
            if (res.data.code == 200) {
              this.getPage();
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            } else if(res.data.code == 1001){
              this.signOut()
            } else {
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            }
          })
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
          this.activeTableDataId.push(ele.id)
        })
        this.activeTableDataId2 = this.activeTableDataId.join(',');
        this.$confirm('您确定要删除这' + this.multipleSelection.length + '条数据吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {};
          params['id'] = this.activeTableDataId2;
          params['iSystemId'] = storage.get('sysid');
          API.delete('/ification/ificatDelete', params,{Authorization:storage.get('token')}).then((res) => {
            console.log(res.data)
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getPage();
            } else if(res.data.code == 1001){
              this.signOut()
            } else {
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            }
          })
        })
      },
      signOut(){
        this.$message({
          type: 'error',
          message: '登录失效，请重新登录!'
        });
        storage.delete('Authorization');
        storage.delete('userName');
        storage.delete('auth');
        storage.delete('token');
        storage.delete('sysid');
        this.$router.push({name:'login'})
      }
    },
    created() {
      this.getPage();
    }

  }
</script>

<style lang="less">
  @import "./../../../../assets/styles/edit-pop.less";
  @import "./../../../../assets/styles/base2";

  .backstage-classify-page-classify {
    .tip-dialog {
      .el-dialog {
        .el-dialog__footer {
          padding: 0px 20px 20px;
        }
      }
    }
    .search-nav {
      .btn-cell {
        float: right!important;
      }
    }

    .result-table {
      .el-table__body-wrapper {
        .el-table__row {
          td {
            text-align: center;
          }
          td:nth-of-type(3) {
            text-align: center;
          }
        }
      }
    }
    .pagination-table {
      margin-top: 40px;
    }
    .small-dia {
      .el-dialog {
        width: 400px !important;
      }
    }
  }


</style>

