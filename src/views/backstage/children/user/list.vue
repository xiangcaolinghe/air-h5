<template>
  <div class="backstage-news-page backstage-user-page">
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
          width="55"
          class="column">
        </el-table-column>
        <el-table-column
          prop="uName"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="uCreateTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="qname"
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
    <el-dialog title="添加用户" :visible.sync="addPop" class="tip-dialog" :close-on-click-modal="false">
      <div class="content">
        <div class="cell">
          <span class="name">用户名：</span>
          <el-input v-model="addObject.uName" placeholder="请输入内容" class="flew-input"></el-input>
        </div>
        <div class="cell qx" style="margin-top: 20px;">
          <span class="name">权限：</span>
          <div class="qx-div">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="AddAllhandleChecked">全选
            </el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedCities" @change="AddhandleChecked">
              <el-checkbox v-for="p in power" :label="p.qName" :key="p.id">{{p.qName}}</el-checkbox>
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
    <el-dialog v-bind:title="title" :visible.sync="editPop" class="tip-dialog" :close-on-click-modal="false">
      <div class="content">
        <div class="cell">
          <span class="name">用户名：</span>
          <el-input v-model="editObject.uName" placeholder="请输入内容" class="flew-input"
                    v-bind:disabled="look"></el-input>
        </div>
        <div class="cell qx" style="margin-top: 20px;">
          <span class="name">权限：</span>
          <div class="qx-div">
            <el-checkbox :indeterminate="EditisIndeterminate" v-model="EditcheckAll" @change="EditAllhandleChecked"
                         v-bind:disabled="look">全选
            </el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="EditcheckedCities" @change="EdithandleChecked">
              <el-checkbox v-for="p in power" :label="p.qName" :key="p.id" v-bind:disabled="look">{{p.qName}}
              </el-checkbox>
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
  export default {
    name: '',
    data() {
      return {
        loading: false,
        editPop: false,
        addPop: false,
        checkAll: false,
        look: false,
        uSystemId : 1,
        title: "编辑",
        // 搜索初始化
        SearchInp: '',
        // 删除选择初始化
        multipleSelection: [],
        activeTableDataId: [],
        activeTableDataId2: '',
        tableData: [],
        // 权限项
        power: [],
        // 权限打开页面被选中的
        checkedCities: [],
        isIndeterminate: true,
        checkAll: false,
        // 编辑权限打开页面被选中的
        EditcheckedCities: [],
        EditisIndeterminate: true,
        EditcheckAll: false,

        addObject: {
          uName: '',
          powerList: []
        },
        editObject: {
          userName: '',
          powerList: [],
          id: ''
        }
      }
    },
    methods: {
      // 页面初始化
      getPage() {
        let params = {};
        API.get('/ususer/FindAll', params).then((res) => {
          if (res.data.code == 200) {
            console.log(res.data)
            this.tableData = res.data.data;
          } else {
            console.log(res.data)
          }
        })
        API.get('/juris/FindAll', params).then((res) => {
          console.log(res.data)
          if (res.data.code == 200) {
            this.power = res.data.data;
          } else {
            console.log(res.data)
          }
        })
      },
      // 搜索
      search() {
        let params = {};
        params['name'] = this.SearchInp;
        API.get('/ususer/FindByName', params).then((res) => {
          console.log(res.data)
          if (res.data.code == 200) {
            this.tableData = res.data.data;
          } else {
            console.log(res.data)
          }
        })
      },

      // 新增
      addOpen() {
        this.checkedCities = [];
        this.addPop = true;
        this.addObject = {
          uName: '',
          powerList: []
        }
      },
      // 新增保存
      addSave() {
        let params = {};
        params['uName'] = this.addObject.uName;
        params['qId'] = this.addObject.powerList;
        params['uSystemId'] = this.uSystemId;
        console.log(params)
        API.post('/ususer/create', params).then((res) => {
          console.log(res.data)
          if (res.data.code == 200) {
            this.addPop = false;
            this.getPage();
            this.$message({
              type: 'success',
              message: '新增成功!'
            });
          } else {
            this.$message({
              type: 'error',
              message: '新增失败!'
            });
          }
        })
      },
      // 新增权限
      AddAllhandleChecked(val) {
        var cityOptions = []
        var cityOptionsKey = []
        for (var i = 0; i < this.power.length; i++) {
          cityOptions.push(this.power[i].qName);
          cityOptionsKey.push(this.power[i].id);
        }
        this.checkedCities = val ? cityOptions : [];
        this.addObject.powerList = val ? cityOptionsKey : [];
        this.isIndeterminate = false;
      },
      AddhandleChecked(value) {
        console.log(value)
        this.addObject.powerList = []
        var ctOption = value;
        for (var i = 0; i < ctOption.length; i++) {
          for (var j = 0; j < this.power.length; j++) {
            if (ctOption[i] == this.power[j].qName) {
              this.addObject.powerList.push(this.power[j].id)
            }
          }
        }
        console.log(this.addObject.powerList)
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.power.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.power.length;
      },
      // 编辑
      editOpen(id) {
        this.look = false;
        this.title = "编辑";
        this.EditcheckedCities = [];
        this.editObject = {
          uName: '',
          powerList: []
        }
        var arr = [];
        this.editPop = true;
        let params = {};
        params['id'] = id;
        API.get('/ususer/FindByid', params).then((res) => {
          console.log(res.data)
          if (res.data.code == 200) {
            this.editObject = res.data.data;
            this.editObject.uName = res.data.data.uname;
            arr = res.data.data.qid;
            this.editObject.powerList = Array.prototype.slice.call(arr);
            this.editObject.powerList = arr;
            for (var i = 0; i < arr.length; i++) {
              for (var j = 0; j < this.power.length; j++) {
                if (arr[i] == this.power[j].id) {
                  this.EditcheckedCities.push(this.power[j].qName);
                  // this.editObject.powerList.push(this.power[j].id)
                }
              }
            }
            console.log(this.EditcheckedCities)
            console.log(this.editObject.powerList)
          } else {
            console.log(res.data)
          }
        })
      },
      // 编辑保存
      editSave() {
        console.log(this.editObject.powerList)
        console.log(this.editObject)
        var params = {
          qId : []
        };
        params['id'] = this.editObject.id;
        params['uName'] = this.editObject.uName;
        console.log(this.editObject.powerList)
        console.log(params.qId)
        /*for(var i=0;i<this.editObject.powerList.length;i++){
          params.qId[i] = this.editObject.powerList[i]
        }*/
        params['qId'] = this.editObject.powerList.join(',');
        params['uSystemId'] = this.uSystemId;


        console.log(params)
        API.put('/ususer/update', params).then((res) => {
          console.log(res.data)
          if (res.data.code == 200) {
            this.editPop = false;
            this.getPage();
            this.$message({
              type: 'success',
              message: '编辑成功!'
            });
          } else {
            this.$message({
              type: 'error',
              message: '编辑失败!'
            });
          }
        })
      },

      // 编辑权限
      EditAllhandleChecked(val) {
        var cityOptions = []
        var cityOptionsKey = []
        for (var i = 0; i < this.power.length; i++) {
          cityOptions.push(this.power[i].qName);
          cityOptionsKey.push(this.power[i].id);
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
        for (var i = 0; i < ctOption.length; i++) {
          for (var j = 0; j < this.power.length; j++) {
            if (ctOption[i] == this.power[j].qName) {
              this.editObject.powerList.push(this.power[j].id)
            }
          }
        }
        console.log(this.editObject.powerList)
        let checkedCount = value.length;
        this.EditcheckAll = checkedCount === this.power.length;
        this.EditisIndeterminate = checkedCount > 0 && checkedCount < this.power.length;
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
          this.activeTableDataId.push( ele.id )
        })
        this.activeTableDataId2 = this.activeTableDataId.join(',');
        this.$confirm('您确定要删除这' + this.multipleSelection.length + '条数据吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {};
          params['id'] = this.activeTableDataId2;
          API.delete('/ususer/delete', params).then((res) => {
            console.log(res)
            if (res.status == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getPage();
            } else {
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
          let params = {};
          params['id'] = id;
          /*this.tableData = this.tableData.filter(ele => {
            return ele.id != id;
          })*/
          API.delete('/ususer/delete', params).then((res) => {
            if (res.status == 200) {
              this.getPage();
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            } else {
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
  @import "./../../../../assets/styles/base2";

  .backstage-user-page {
    .tip-dialog {
      .el-dialog {
        .el-dialog__footer {
          padding: 0px 20px 20px;
        }
      }
    }
    .el-table__body-wrapper {
      .el-table__row {
        td:nth-of-type(3) {
          text-align: center !important;
        }
      }
    }
    .qx {
      .qx-div {
        height: 50px;
        .el-checkbox {
          float: left;
        }
        .el-checkbox-group {
          float: left;
          margin-top: 15px;
        }
      }
    }
  }

</style>
