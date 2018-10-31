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
          width="55"
          class="column">
        </el-table-column>
        <el-table-column
          prop="fTitle"
          label="标题"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="fCreateTime"
          label="创建时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="uname"
          label="创建者"
          width="100">
        </el-table-column>
        <el-table-column
          prop="fReleaseTime"
          label="发布时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="top"
          label="置顶"
          width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="look" @click="toggleTop(scope.row.id,scope.row.status)">
              {{scope.row.fTop == 0 ? "取消置顶" : "置顶"}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="250">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="release" @click="Release(scope.row.id)"
                       v-show="!scope.row.fbStatus">发布
            </el-button>
            <el-button type="text" size="small" class="release" @click="ReleaseNo(scope.row.id)"
                       v-show="scope.row.fbStatus">取消发布
            </el-button>
            <el-button type="text" size="small" class="look" @click="linkDetail(scope.row.id)">查看</el-button>
            <el-button type="text" size="small" class="edit" @click="editOpen(scope.row.id)">编辑</el-button>
            <el-button type="text" size="small" class="del" @click="del(scope.row.id)">删除</el-button>
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
    <!--添加弹框-->
    <el-dialog title="添加新闻" :visible.sync="addPop" class="tip-dialog" :close-on-click-modal="false">
      <div class="content">
        <div class="cell">
          <span class="name">标题：</span>
          <el-input v-model="addObject.fTitle" placeholder="请输入内容" class="flew-input"></el-input>
        </div>
        <el-row>
          <el-col :span="11">
            <div class="cell">
              <span class="name">作者：</span>
              <el-input v-model="addObject.fAuthor" placeholder="请输入内容" class="flew-input"></el-input>
            </div>
          </el-col>
          <el-col :span="11" :offset="2">
            <div class="cell">
              <span class="name">来源：</span>
              <el-input v-model="addObject.fFrom" placeholder="请输入内容" class="flew-input"></el-input>
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
                <img v-if="addObject.fImgUrl" :src="addObject.fImgUrl" class="avatar">
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
                action="http://192.168.3.41:8083/newsInfo/newsFiles"
                :file-list="AddfileList"
                :auto-upload="true"
                :multiple="true"
                :limit="5"
                :on-exceed="handleExceed"
                :on-success="succAdd"
                :on-remove="remAdd">
                <el-button size="small" type="primary" slot="trigger">选择文件</el-button>
                <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
              </el-upload>
            </div>
          </el-col>
        </el-row>
        <div class="cell">
          <span class="name">内容：</span>
          <quill-editor ref="myTextEditor"
                        v-model="addObject.fContent"
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
    <el-dialog title="编辑" :visible.sync="editPop" class="tip-dialog" :close-on-click-modal="false">
      <div class="content">
        <div class="cell">
          <span class="name">标题：</span>
          <el-input v-model="editObject.fTitle" placeholder="请输入内容" class="flew-input"></el-input>
        </div>
        <el-row>
          <el-col :span="11">
            <div class="cell">
              <span class="name">作者：</span>
              <el-input v-model="editObject.fAuthor" placeholder="请输入内容" class="flew-input"></el-input>
            </div>
          </el-col>
          <el-col :span="11" :offset="2">
            <div class="cell">
              <span class="name">来源：</span>
              <el-input v-model="editObject.fFrom" placeholder="请输入内容" class="flew-input"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <div class="cell">
              <span class="name">缩略图：</span>
              <el-upload
                class="avatar-uploader"
                action="http://192.168.3.41:8083/newsInfo/newsFiles"
                :show-file-list="false"
                :on-change="EditImgChange"
                :auto-upload="false">
                <img v-if="editObject.fImgUrl" :src="editObject.fImgUrl" class="avatar">
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
                action="http://192.168.3.41:8083/newsInfo/newsFiles"
                :file-list="EditfileList"
                :multiple="true"
                :limit="5"
                :on-exceed="handleExceed"
                :on-success="succEdit"
                :on-remove="remEdit">
                <el-button size="small" type="primary" slot="trigger">选择文件</el-button>
                <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
              </el-upload>
            </div>
          </el-col>
        </el-row>
        <div class="cell">
          <span class="name">内容：</span>
          <quill-editor ref="myTextEditor"
                        v-model="editObject.fContent"
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
  import {quillEditor} from 'vue-quill-editor'

  export default {
    name: '',
    components: {quillEditor},
    data() {
      return {
        loading: false,
        editPop: false,
        addPop: false,
        fb: true,
        fSystemId : 1,
        // 搜索初始化
        SearchInp: '',
        // 删除选择初始化
        multipleSelection: [],
        activeTableDataId: [],
        activeTableDataId2: '',
        addObject: {
          fTitle: '',
          fContent: '',
          fImgUrl: '',
          fAuthor: '',
          fFrom: '',
          fEnclUrl : '',
          fEnclName : ''
        },
        editObject: {
          fTitle: '',
          fContent: '',
          fImgUrl: '',
          fAuthor: '',
          fFrom: '',
          fEnclUrl : '',
          fEnclName : ''
        },
        AddfileList: [],
        EditfileList: [],
        files:[],
        // filesEdit:[],
        currentPage: 1,
        pageSize: 10,
        total: 100,
        editorOption: {
          // something config
        },
        tableData: []
      }
    },
    computed: {},
    methods: {

      // 页面初始化
      getPage() {
        let params = {};
        params['page'] = this.currentPage;
        params['count'] = this.pageSize;
        API.get('/newsInfo/FindAll', params).then((res) => {
          if (res.data.code == 200){
            console.log(res.data)
            this.tableData = res.data.data;
            for (var i = 0; i < this.tableData.length; i++) {
              if (this.tableData[i].fStatus == '1') {
                this.tableData[i].fbStatus = true;
              } else {
                this.tableData[i].fbStatus = false;
              }
            }
            console.log(this.tableData)
            //this.currentPage = 4
          } else {
            // console.log(res.data)
          }
        })
      },
      // 搜索
      search() {
        console.log(this.SearchInp)
        let params = {};
        params['title'] = this.SearchInp;
        params['page'] = this.currentPage;
        params['count'] = this.pageSize;
        API.get('/newsInfo/FindBytitle', params).then((res) => {
          console.log(res.data)
          if (res.data.code == 200) {
            this.tableData = res.data.data;
          } else {
            console.log(res.data)
          }
        })
      },
      // 选择
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
        //this.multipleSelection2 =  this.multipleSelection.join(',');
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
          console.log(params)
          API.delete('/newsInfo/newsDelete', params).then((res) => {
            console.log(res.data)
            if (res.data.code == 200) {
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
      // 置顶
      toggleTop(id, status) {
        let params = {};
        params['id'] = id;
        API.get('/newsInfo/newsupdatetop', params).then((res) => {
          console.log(res.data)
          /*if (res.status == 200) {
            this.getPage()
          } else {
            console.log(res.data)
          }*/
        })
      },
      // 新增
      addOpen() {
        this.addPop = true;
        this.files = [];
        this.addObject = {
          fTitle: '',
          fContent: '',
          fImgUrl: '',
          fAuthor: '',
          fFrom: '',
          fEnclUrl : ''
        }
      },
      // 新增保存
      addSave() {
        console.log(this.files)
        var arr = [];
        var arr2 = [];
        for(var i=0;i<this.files.length;i++){
          if(this.files[i].response.code == '200'){
              arr.push(this.files[i].response.data.revealImage);
              arr2.push(this.files[i].response.data.imageName);
          }
        }
        this.addObject.fEnclUrl = arr.join(',');
        this.addObject.fEnclName = arr2.join(',');
        let params = {};
        params['fTitle'] = this.addObject.fTitle;
        params['fContent'] = this.addObject.fContent;
        // params['fImgUrl'] = this.addObject.fImgUrl;
        params['fEnclUrl'] = this.addObject.fEnclUrl;
        params['fEnclName'] = this.addObject.fEnclName;
        params['fAuthor'] = this.addObject.fAuthor;
        params['fFrom'] = this.addObject.fFrom;
        params['fSystemId'] = this.fSystemId;
        console.log(params)
        API.post('/newsInfo/create', params).then((res) => {
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
      // 新增上传成功
      succAdd(response, file, fileList){
        this.files = fileList;
        console.log(fileList)
      },
      // 新增上传删除
      remAdd(file, fileList){
        this.files = fileList;
        console.log(fileList)
      },
      // 查看
      linkDetail(id) {
        this.$router.push({name: 'backstage.news.detail', query: {id: id}})
      },

      // 编辑
      editOpen(id) {
        this.editPop = true;
        this.EditfileList = [];
        this.editObject = {
          fTitle: '',
          fContent: '',
          fImgUrl: '',
          fAuthor: '',
          fFrom: '',
          fEnclUrl : ''
        }
        let params = {};
        params['id'] = id;
        API.get('/newsInfo/FindById', params).then((res) => {
          console.log(res.data)
          if (res.data.code == 200) {
            this.editObject = res.data.data.data;
            this.EditfileList = res.data.data.file;
            var obj = [];
            for(var i=0;i<res.data.data.file.length;i++){
              obj.push({url:res.data.data.file[i].fenclUrl,name:res.data.data.file[i].fenclName})
            }
            this.EditfileList = obj;
          } else {
            console.log(res.data)
          }
        })
      },
      // 编辑保存
      editSave() {
        var arr = [];
        var arr2 = [];
        console.log(this.EditfileList)
        for(var i=0;i<this.EditfileList.length;i++){
          if(this.EditfileList[i].response && this.EditfileList[i].response.code == '200') {
            arr.push(this.EditfileList[i].response.data.revealImage);
            arr2.push(this.EditfileList[i].response.data.imageName);
          }else {
            arr.push(this.EditfileList[i].url)
            arr2.push(this.EditfileList[i].name)
          }
        }
        this.editObject.fEnclUrl = arr.join(',');
        this.editObject.fEnclName = arr2.join(',');

        let params = {};
        params['id'] = this.editObject.id;
        params['fTitle'] = this.editObject.fTitle;
        params['fContent'] = this.editObject.fContent;
        // params['fImgUrl'] = this.editObject.fImgUrl;
        params['fEnclUrl'] = this.editObject.fEnclUrl;
        params['fEnclName'] = this.editObject.fEnclName;
        params['fAuthor'] = this.editObject.fAuthor;
        params['fFrom'] = this.editObject.fFrom;
        params['fSystemId'] = this.fSystemId;
        console.log(params)
        API.put('/newsInfo/newsUpdate', params).then((res) => {
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
      // 编辑上传成功
      succEdit(response, file, fileList){
        this.EditfileList = fileList;
        console.log(fileList)
      },
      // 编辑上传删除
      remEdit(file, fileList){
        this.EditfileList = fileList;
        console.log(fileList)
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
          console.log(params)
          API.delete('/newsInfo/newsDelete', params).then((res) => {
            console.log(res.data)
            if (res.data.code == 200) {
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
        })
      },
      //发布
      Release(id) {
      },
      // 取消发布
      ReleaseNo(id) {
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
      AddImgChange(file, fileList) {
        let fileName = file.name;
        let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
        if (regex.test(fileName.toLowerCase())) {
          this.addObject.fImgUrl = URL.createObjectURL(file.raw);
        } else {
          this.$message.error('请选择图片文件');
        }
      },
      EditImgChange(file, fileList) {
        let fileName = file.name;
        let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
        if (regex.test(fileName.toLowerCase())) {
          this.editObject.fImgUrl = URL.createObjectURL(file.raw);
        } else {
          this.$message.error('请选择图片文件');
        }
      },
      // 编辑器
      onEditorChange({editor, html, text}) {
        console.log('editor change!', editor, html, text)
        this.addObject.fContent = html
      },
      onAddChange({editor, html, text}) {
        console.log('editor change!', editor, html, text)
        this.editObject.fContent = html
      }



      /*onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
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
    */
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


</style>

