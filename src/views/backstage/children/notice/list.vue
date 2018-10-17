<template>
    <div class="backstage-notice-page">
        <div class="search-nav">
            <div class="input-table">
                <el-input v-model="SearchInp" placeholder="请输入关键词汇" class="input-search"></el-input>
                <i class="el-icon-search icon"></i>
            </div>
            <div class="select-table">
                <el-select v-model="SearchValue" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.label"
                            :value="item.id">
                    </el-option>
                </el-select>
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
                        prop="classify"
                        label="分类"
                        width="100">
                    <!--<template slot-scope="scope">
                        <el-button type="text" size="small" class="edit">{{scope.row.classify}}</el-button>
                    </template>-->
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
                        prop="top"
                        label="置顶"
                        width="120">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" class="look"  @click="toggleTop(scope.row.id,scope.row.status)">{{scope.row.status == 0 ? "取消置顶" : "置顶"}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="250">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" class="look" @click="linkDetail(scope.row.id)">查看</el-button>
                        <el-button type="text" size="small" class="edit" @click="editOpen(scope.row.id)">编辑</el-button>
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
          :current-page="currentPage"
          :page-sizes="[10, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
        <!--短信提醒弹框-->
        <el-dialog title="短信提醒" :visible.sync="tipPop" class="tip-dialog">
         <el-dialog
           width="540px"
           title="选择用户"
           :visible.sync="innerTipPop"
           append-to-body>
           <el-transfer
             filterable
             filter-placeholder="请输入用户姓名"
             v-model="userList"
             :data="userData">
           </el-transfer>
           <div slot="footer" class="dialog-footer">
             <el-button type="primary" @click="userBox()" class="confirm">确 定</el-button>
           </div>
         </el-dialog>
            <div class="content">
                <div class="cell">
                    <span class="name">短信内容：</span>
                    <el-input
                            type="textarea"
                            :rows="5"
                            class="flew-input"
                            placeholder="请输入内容"
                            v-model="Msg.MsgText">
                    </el-input>
                </div>
                <div class="cell">
                    <span class="name">相关用户：</span>
                    <el-input v-model="Msg.MsgUserInp" placeholder="请输入内容" class="flew-input input-user" disabled></el-input>
                    <span class="btn" @click="innerTipPop = true">选择</span>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="MesSave" class="confirm">确 定</el-button>
                <el-button @click="tipPop = false" class="cancel">取 消</el-button>
            </div>
        </el-dialog>
        <!--添加弹框-->
        <el-dialog title="添加公告" :visible.sync="addPop" class="tip-dialog">
        <div class="content">
          <div class="cell">
            <span class="name">标题：</span>
            <el-input v-model="addObject.title" placeholder="请输入内容" class="flew-input"></el-input>
          </div>
          <div class="cell">
            <span class="name">分类：</span>
            <el-select v-model="addObject.classify" placeholder="请选择活动区域" class="flew-input">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.label"
                :value="item.id"></el-option>
            </el-select>
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
                  :on-change="AddImgChange"
                  :auto-upload="false">
                  <img v-if="addObject.url" :src="addObject.url" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </el-col>
            <el-col :span="11" :offset="2">
              <div class="cell">
                <span class="name">上传附件：</span>
                <el-upload
                  ref="Addupload"
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :file-list="AddfileList" :auto-upload="false" :multiple="true" :limit="5" :on-exceed="handleExceed" >
                  <el-button size="small" type="primary" slot="trigger">选择文件</el-button>
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
                          @change="onAddChange($event)">
            </quill-editor>
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
            <span class="name">标题：</span>
            <el-input v-model="editObject.title" placeholder="请输入内容" class="flew-input"></el-input>
          </div>
          <div class="cell">
            <span class="name">分类：</span>
            <el-select v-model="editObject.classify" placeholder="请选择活动区域" class="flew-input">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.label"
                :value="item.id"></el-option>
            </el-select>
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
                  :on-change="EditImgChange"
                  :auto-upload="false">
                  <img v-if="editObject.url" :src="editObject.url" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </el-col>
            <el-col :span="11" :offset="2">
              <div class="cell">
                <span class="name">上传附件：</span>
                <el-upload
                  ref="Editupload"
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :file-list="EditfileList" :auto-upload="false" :multiple="true" :limit="5" :on-exceed="handleExceed" >
                  <el-button size="small" type="primary" slot="trigger">选择文件</el-button>
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
                          @change="onEditorChange($event)">
            </quill-editor>
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
        tipPop:false,
        innerTipPop:false,
        // 搜索部分初始化
        SearchInp:'',
        SearchValue: '',
        options: [],
        tableData : [],
        // 删除选择初始化
        multipleSelection:[],
        activeTableDataId:[],
        AddfileList: [],
        Msg:{
          MsgText:'',
          MsgUserInp:''
        },
        userData : [{
          key:'1',
          label:'张三',
          disabled : false
        },{
          key:'2',
          label:'李四',
          disabled : false
        },{
          key:'3',
          label:'王麻子',
          disabled : true
        }],
        userList:[],
        addObject:{
          title:'',
          content:'',
          url:'',
          author : '',
          source : '',
          classify : ''
        },
        editObject:{
          title:'',
          content:'',
          url:'',
          author : '',
          source : '',
          classify : ''
        },
        AddfileList: [],
        EditfileList: [],
        currentPage: 1,
        pageSize : 10,
        total:100,
        editorOption: {
          // something config
        },


      }
    },
    computed: {
//      editor() {
//        return this.$refs.myTextEditor.quillEditor
//      }
    },
    methods: {
      // 搜索
      search() {
        console.log(this.SearchInp)
        console.log(this.SearchValue)
      },
      //分类
      classify(){
        let params={};
        API.get('static/notListSelect.json',params).then((res)=>{
          if(res.status == 200) {
            console.log(res.data)
            this.options = res.data;
          }else {
            console.log(res.data)
          }
        })
      },
      // 页面初始化
      getPage(){
        let params={};
        API.get('static/notList.json',params).then((res)=>{
          if(res.status == 200) {
            console.log(res.data)
            this.tableData = res.data;
            this.currentPage = 4
          }else {
            console.log(res.data)
          }
        })
      },
      // 置顶
      toggleTop(id,status) {
        console.log(id)
        console.log(status)
        let params={};
        params['id'] = id;
        params['status'] = status;
        API.get('static/notList.json',params).then((res)=>{
          if(res.status == 200) {
            this.getPage()
          }else {
            console.log(res.data)
          }
        })
      },
      //新增
      addOpen(){
        this.addPop = true;
        this.addObject = {
          title:'',
          content:'',
          url:'',
          author : '',
          source : '',
          classify : ''
        }
      },
      // 新增保存
      addSave(){
        this.$refs.Addupload.submit();
        console.log(this.addObject)
        let params={};
        params['title'] = this.addObject.title;
        params['content'] = this.addObject.content;
        params['url'] = this.addObject.url;
        params['author'] = this.addObject.author;
        params['source'] = this.addObject.source;
        params['classify'] = this.addObject.classify;
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
            this.EditfileList =  res.data[0].fileList;
          }else {
            console.log(res.data)
          }
        })
      },
      // 编辑保存
      editSave(){
        this.$refs.Editupload.submit();
        console.log(this.editObject)
        let params={};
        params['id'] = this.editObject.id;
        params['title'] = this.editObject.title;
        params['content'] = this.editObject.content;
        params['url'] = this.editObject.url;
        params['author'] = this.editObject.author;
        params['source'] = this.editObject.source;
        params['classify'] = this.editObject.classify;
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
      // 选择
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 短信提醒
      tip(id) {
        this.tipPop = true
      },
      userBox(){
        this.innerTipPop = false;
        var arr = [];
        for(var i=0;i<this.userData.length;i++){
          for(var j=0;j<this.userList.length;j++){
            if(this.userList[j] == this.userData[i].key){
              arr.push(this.userData[i].label)
            }
          }
        }
        this.Msg.MsgUserInp = arr.join(',');
      },
      MesSave(){
        this.tipPop = false;
        console.log(this.userList)
        console.log(this.Msg.MsgUserInp)
      },
      // 进入详情
      linkDetail(id) {
        this.$router.push({name:'backstage.notice.detail',query:{id:id}})
      },


      // 翻页器：当前页，同时上一页下一页也能获取当前页
      handleCurrentChange(val) {
        console.log(val);
      },
      // 翻页器：选择10条还是20条、
      handleSizeChange(val) {
        console.log(val);
      },
      // 文件上传部分
      handleExceed(files, fileList) {
        this.$message.warning(`当前已有${fileList.length} 个文件，限制选择5个文件，本次选择了 ${files.length} 个文件`);
      },
      // 缩略图上传部分
      AddImgChange(file, fileList){
        let fileName = file.name;
        let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
        if (regex.test(fileName.toLowerCase())) {
          this.addObject.url = URL.createObjectURL(file.raw);
        } else {
          this.$message.error('请选择图片文件');
        }
      },
      EditImgChange(file, fileList){
        let fileName = file.name;
        let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
        if (regex.test(fileName.toLowerCase())) {
          this.editObject.url = URL.createObjectURL(file.raw);
        } else {
          this.$message.error('请选择图片文件');
        }
      },
      // 编辑器
      onEditorChange({ editor, html, text }) {
        console.log('editor change!', editor, html, text)
        this.addObject.content = html
      },
      onAddChange({ editor, html, text }) {
        console.log('editor change!', editor, html, text)
        this.editObject.content = html
      },
    },
    created() {
      this.classify()
      this.getPage()
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
            .el-button.tip.el-button--text.el-button--small {
                color: #df9718;
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
