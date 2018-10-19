<template>
    <div class="backstage-news-page">
        <div class="search-nav">
            <div class="input-table">
                <el-input v-model="SearchInp" placeholder="请输入关键词汇" class="input-search"></el-input>
                <i class="el-icon-search icon"></i>
            </div>
            <div class="btn-cell" @click="search">搜索</div>
            <div class="btn-cell" @click="addOpen">添加</div>
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
                        prop="userName"
                        label="用户名">
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="创建时间">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="创建人">
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" class="look" @click="linkDetail(scope.row.id)">查看</el-button>
                        <el-button type="text" size="small" class="edit" @click="editOpen(scope.row.id)">编辑</el-button>
                        <el-button type="text" size="small" class="del" @click="del(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--添加弹框-->
        <el-dialog title="添加用户" :visible.sync="addPop" class="tip-dialog">
            <div class="content">
                <div class="cell">
                    <span class="name">用户名：</span>
                    <el-input v-model="addObject.userName" placeholder="请输入内容" class="flew-input"></el-input>
                </div>
              <div class="cell qx">
                <span class="name">权限：</span>
                <div class="qx-div">
                  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="AddAllhandleChecked">全选</el-checkbox>
                  <div style="margin: 15px 0;"></div>
                  <el-checkbox-group v-model="checkedCities" @change="AddhandleChecked">
                    <el-checkbox v-for="p in power" :label="p.value" :key="p.key">{{p.value}}</el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addSave" class="confirmAdd">确 定</el-button>
                <el-button @click="addPop = false" class="cancelAdd">取 消</el-button>
            </div>
        </el-dialog>
        <!--编辑弹框-->
        <el-dialog v-bind:title="title" :visible.sync="editPop" class="tip-dialog">
            <div class="content">
                <div class="cell">
                    <span class="name">用户名：</span>
                    <el-input v-model="editObject.userName" placeholder="请输入内容" class="flew-input" v-bind:disabled="look"></el-input>
                </div>
                <div class="cell qx">
                  <span class="name">权限：</span>
                  <div class="qx-div">
                    <el-checkbox :indeterminate="EditisIndeterminate" v-model="EditcheckAll" @change="EditAllhandleChecked" v-bind:disabled="look">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="EditcheckedCities" @change="EdithandleChecked">
                      <el-checkbox v-for="p in power" :label="p.value" :key="p.key" v-bind:disabled="look">{{p.value}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer" v-show="!look">
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
        checkAll: false,
        look:false,
        title:"编辑",
        // 搜索初始化
        SearchInp:'',
        // 删除选择初始化
        multipleSelection:[],
        activeTableDataId:[],
        tableData : [],
        // 权限项
        power: [],
        // 权限打开页面被选中的
        checkedCities: [],
        isIndeterminate: true,
        checkAll : false,
        // 编辑权限打开页面被选中的
        EditcheckedCities: [],
        EditisIndeterminate: true,
        EditcheckAll : false,

        addObject:{
          userName:'',
          powerList:[]
        },
        editObject:{
          userName:'',
          powerList:[],
          userid : ''
        }
      }
    },
    methods: {
      // 页面初始化
      getPage(){
        let params={};
        API.get('static/userList.json',params).then((res)=>{
          if(res.status == 200) {
            console.log(res.data)
            this.tableData = res.data;
          }else {
            console.log(res.data)
          }
        })
        API.get('static/power.json',params).then((res)=>{
          if(res.status == 200) {
            console.log(res.data)
            this.power = res.data;
          }else {
            console.log(res.data)
          }
        })
      },
      // 搜索
      search() {
        console.log(this.SearchInp)
        let params={};
        params['search'] = this.SearchInp;
        API.get('static/userList.json',params).then((res)=>{
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
          let params={};
          params['idlist'] = this.activeTableDataId;
          API.get('static/userList.json',params).then((res)=>{
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
      // 新增
      addOpen(){
        this.checkedCities = [];
        this.addPop = true;
        this.addObject = {
          userName:'',
          powerList:[]
        }
      },
      // 新增保存
      addSave(){
        console.log(this.addObject)
        console.log(this.addObject.powerList)
        let params={};
        params['userName'] = this.addObject.userName;
        params['power'] = this.addObject.powerList;
        API.get('static/userList.json',params).then((res)=>{
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
        this.look = false;
        this.title = "编辑";
        this.EditcheckedCities = [];
        var arr = [];
        this.editPop = true;
        let params={};
        params['id'] = id;
        API.get('static/userList.json',params).then((res)=>{
          console.log(res.data)
          if(res.status == 200) {
            console.log(res.data[0])
            this.editObject = res.data[0];
            arr = res.data[1].power
            for(var i=0;i<arr.length;i++){
              for(var j=0;j<this.power.length;j++){
                if(arr[i] == this.power[j].key ){
                  this.EditcheckedCities.push(this.power[j].value);
                }
              }
            }
          }else {
            console.log(res.data)
          }
        })
      },
      // 编辑保存
      editSave(){
        console.log(this.editObject.powerList)
        console.log(this.editObject)
        let params={};
        params['id'] = this.editObject.id;
        params['userName'] = this.editObject.userName;
        params['power'] = this.editObject.powerList;
        API.get('static/userList.json',params).then((res)=>{
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

      // 新增权限
      AddAllhandleChecked(val) {
        var cityOptions = []
        var cityOptionsKey = []
        for(var i=0;i<this.power.length;i++){
          cityOptions.push(this.power[i].value);
          cityOptionsKey.push(this.power[i].key);
        }
        this.checkedCities = val ? cityOptions : [];
        this.addObject.powerList = val ? cityOptionsKey : [];
        this.isIndeterminate = false;
      },
      AddhandleChecked(value) {
        console.log(value)
        this.addObject.powerList = []
        var ctOption = value;
        for(var i=0;i<ctOption.length;i++){
          for(var j=0;j<this.power.length;j++){
            if(ctOption[i] == this.power[j].value){
              this.addObject.powerList.push(this.power[j].key)
            }
          }
        }
        console.log(this.addObject.powerList)
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.power.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.power.length;
      },

      // 编辑权限
      EditAllhandleChecked(val) {
        var cityOptions = []
        var cityOptionsKey = []
        for(var i=0;i<this.power.length;i++){
          cityOptions.push(this.power[i].value);
          cityOptionsKey.push(this.power[i].key);
        }
        this.EditcheckedCities = val ? cityOptions : [];
        this.editObject.powerList = val ? cityOptionsKey : [];
        console.log(this.editObject.powerList)
        this.EditisIndeterminate = false;
      },
      EdithandleChecked(value) {
        console.log(value)
        this.editObject.powerList = []
        var ctOption = value;
        for(var i=0;i<ctOption.length;i++){
          for(var j=0;j<this.power.length;j++){
            if(ctOption[i] == this.power[j].value){
              this.editObject.powerList.push(this.power[j].key)
            }
          }
        }
        console.log(this.editObject.powerList)
        let checkedCount = value.length;
        this.EditcheckAll = checkedCount === this.power.length;
        this.EditisIndeterminate = checkedCount > 0 && checkedCount < this.power.length;
      },

      // 进入详情
      linkDetail(id) {
        this.editOpen(id);
        //this.$router.push({name:'backstage.meeting.detail',query:{id:id}})
        this.look = true;
        this.editPop = true;
        this.title = "详情";
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
    .qx {
      .qx-div {
        height: 50px;
        .el-checkbox{
          float: left;
        }
        .el-checkbox-group {
          float: left;
          margin-top: 15px;
        }
      }
    }
</style>
