<template>
  <div class="backstage-news-page backstage-notice-page">
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
            :label="item.iName"
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
          width="55"
          class="column">
        </el-table-column>
        <el-table-column
          prop="nTitle"
          label="标题"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="iId"
          label="分类"
          width="100">
          <!--<template slot-scope="scope">
              <el-button type="text" size="small" class="edit">{{scope.row.classify}}</el-button>
          </template>-->
        </el-table-column>
        <el-table-column
          prop="nCreateTime"
          label="创建时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="uname"
          label="创建者"
          width="100">
        </el-table-column>
        <el-table-column
          prop="nReleaseTime"
          label="发布时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="top"
          label="置顶"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="look" @click="toggleTop(scope.row.id,scope.row.nTop)">
              {{scope.row.nTop == 1 ? "取消置顶" : "置顶"}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="300">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="release" @click="Release(scope.row.id,scope.row.nStatus)"
                       v-show="!scope.row.fbStatus">发布
            </el-button>
            <el-button type="text" size="small" class="release" @click="ReleaseNo(scope.row.id,scope.row.nStatus)"
                       v-show="scope.row.fbStatus">取消发布
            </el-button>
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
    <el-dialog title="短信提醒" :visible.sync="tipPop" class="tip-dialog footer-top" :close-on-click-modal="false">
      <el-dialog
        title="模板"
        :visible.sync="dialogVisible"
        width="30%"
        append-to-body
        :close-on-click-modal="false">
        <div>
          <div class="mb-box" v-for="(l,index) in msgList" :key="l.key">
            <input type="radio" v-model="messAge" :name="'radio[]'" :value="l.value">
            <span>{{l.value}}</span>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="mbSave">确 定</el-button>
            </span>
      </el-dialog>
      <el-dialog
        width="540px"
        title="选择用户"
        :visible.sync="innerTipPop"
        append-to-body
        :close-on-click-modal="false">
        <el-transfer
          filterable
          filter-placeholder="请输入用户姓名"
          :titles="['用户列表', '已选用户']"
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
          <span class="btn" @click="modelbox">模板</span>
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
    <el-dialog title="添加公告" :visible.sync="addPop" class="tip-dialog" :close-on-click-modal="false">
      <div class="content">
        <div class="cell">
          <span class="name">标题：</span>
          <el-input v-model="addObject.nTitle" placeholder="请输入内容" class="flew-input"></el-input>
        </div>
        <div class="cell">
          <span class="name">分类：</span>
          <el-select v-model="addObject.iId" placeholder="请选择活动区域" class="flew-input">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.iName"
              :value="item.id"></el-option>
          </el-select>
        </div>
        <el-row>
          <el-col :span="11">
            <div class="cell">
              <span class="name">作者：</span>
              <el-input v-model="addObject.nAuthor" placeholder="请输入内容" class="flew-input"></el-input>
            </div>
          </el-col>
          <el-col :span="11" :offset="2">
            <div class="cell">
              <span class="name">来源：</span>
              <el-input v-model="addObject.nFrom" placeholder="请输入内容" class="flew-input"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <div class="cell">
              <span class="name">缩略图：</span>
              <el-upload
                class="avatar-uploader"
                action="http://192.168.3.41:8083/newsInfo/newsFile"
                :show-file-list="false"
                :on-success="succImgAdd">
                <img v-if="addObject.nImgUrl" :src="addObject.nImgUrl" class="avatar">
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
                        v-model="addObject.nContent"
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
          <el-input v-model="editObject.nTitle" placeholder="请输入内容" class="flew-input"></el-input>
        </div>
        <div class="cell">
          <span class="name">分类：</span>
          <el-select v-model="editObject.iId" placeholder="请选择活动区域" class="flew-input">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.iName"
              :value="item.id"></el-option>
          </el-select>
        </div>
        <el-row>
          <el-col :span="11">
            <div class="cell">
              <span class="name">作者：</span>
              <el-input v-model="editObject.nAuthor" placeholder="请输入内容" class="flew-input"></el-input>
            </div>
          </el-col>
          <el-col :span="11" :offset="2">
            <div class="cell">
              <span class="name">来源：</span>
              <el-input v-model="editObject.nFrom" placeholder="请输入内容" class="flew-input"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <div class="cell">
              <span class="name">缩略图：</span>
              <el-upload
                class="avatar-uploader"
                action="http://192.168.3.41:8083/newsInfo/newsFile"
                :show-file-list="false"
                :on-success="succImgEdit">
                <img v-if="editObject.nImgUrl" :src="editObject.nImgUrl" class="avatar">
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
                        v-model="editObject.nContent"
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
        tipPop: false,
        innerTipPop: false,
        dialogVisible: false,
        nSystemId : 1,
        // 搜索部分初始化
        SearchInp: '',
        SearchValue: '',
        options: [],
        tableData: [],
        // 删除选择初始化
        multipleSelection: [],
        activeTableDataId: [],
        activeTableDataId2: '',

        messAge: '',
        msgList: [],
        AddfileList: [],
        Msg: {
          MsgText: '',
          MsgUserInp: ''
        },
        userData: [{
          key: '1',
          label: '张三',
          disabled: false
        }, {
          key: '2',
          label: '李四',
          disabled: false
        }, {
          key: '3',
          label: '王麻子',
          disabled: true
        }],
        userList: [],
        addObject: {
          nTitle: '',
          nImgUrl : '',
          nurl : '',
          nEnclUrl : '',
          nEnclName : '',
          nContent: '',
          nAuthor: '',
          nFrom: '',
          iId: ''
        },
        editObject: {
          nTitle: '',
          nImgUrl : '',
          nurl : '',
          nEnclUrl : '',
          nEnclName : '',
          nContent: '',
          nAuthor: '',
          nFrom: '',
          iId: ''
        },
        AddfileList: [],
        EditfileList: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
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
// 页面初始化
      getPage() {
        let params = {};
        params['page'] = this.currentPage;
        params['count'] = this.pageSize;
        API.get('/notice/FindAll', params).then((res) => {
          if (res.data.code == 200) {
            console.log(res.data)
            this.tableData = res.data.data;
            this.total = res.data.count;
            for (var i = 0; i < this.tableData.length; i++) {
              if (this.tableData[i].nStatus == '1') {
                this.tableData[i].fbStatus = true;
              } else {
                this.tableData[i].fbStatus = false;
              }
            }
          } else {
            console.log(res.data)
          }
        })
      },
      // 搜索
      search() {
        console.log(this.SearchInp)
        let params = {};
        params['title'] = this.SearchInp;
        params['iId'] = this.SearchValue;
        params['page'] = this.currentPage;
        params['count'] = this.pageSize;
        console.log(params)
        API.get('/notice/FindBytitle', params).then((res) => {
          console.log(res.data)
          if (res.data.code == 200) {
            this.tableData = res.data.data;
            this.total = res.data.count;
          } else {
            console.log(res.data)
          }
        })
      },
      //新增
      addOpen() {
        this.addPop = true;
        this.AddfileList = [];
        this.addObject = {
          nTitle: '',
          nImgUrl : '',
          nurl : '',
          nEnclUrl : '',
          nEnclName : '',
          nContent: '',
          nAuthor: '',
          nFrom: '',
          iId: ''
        }
      },
      // 新增保存
      addSave() {
        // 上传数据
        var arr = [];
        var arr2 = [];
        for (var i = 0; i < this.AddfileList.length; i++) {
          if (this.AddfileList[i].response.code == '200') {
            arr.push(this.AddfileList[i].response.data.revealImage);
            arr2.push(this.AddfileList[i].response.data.imageName);
          }
        }
        this.addObject.nEnclUrl = arr.join(',');
        this.addObject.nEnclName = arr2.join(',');
        let params = {};
        params['nTitle'] = this.addObject.nTitle;
        params['nContent'] = this.addObject.nContent;
        params['nImgUrl'] = this.addObject.nurl;
        params['nAuthor'] = this.addObject.nAuthor;
        params['nFrom'] = this.addObject.nFrom;
        params['nEnclUrl'] = this.addObject.nEnclUrl;
        params['nEnclName'] = this.addObject.nEnclName;
        params['iId'] = this.addObject.iId;
        params['nSystemId'] = this.nSystemId;
        console.log(params)
        API.post('/notice/create', params).then((res) => {
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
      // 新增图片上传
      succImgAdd(response, file, fileList) {
        let fileName = file.name;
        let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
        if (regex.test(fileName.toLowerCase())) {
          this.addObject.nurl = response.data.revealImage;
          this.addObject.nImgUrl = URL.createObjectURL(file.raw);
        } else {
          this.$message.error('请选择图片文件');
        }
      },
      // 新增上传功能成功
      succAdd(response, file, fileList) {
        this.AddfileList = fileList;
      },
      // 新增上传功能删除
      remAdd(file, fileList) {
        this.AddfileList = fileList;
      },
      // 编辑
      editOpen(id) {
        this.editPop = true;
        this.EditfileList = [];
        this.editObject = {
          nTitle: '',
          nImgUrl: '',
          nurl: '',
          nEnclUrl: '',
          nEnclName: '',
          nContent: '',
          nAuthor: '',
          nFrom: '',
          iId: ''
        }
        let params = {};
        params['id'] = id;
        API.get('/notice/FindById', params).then((res) => {
          console.log(res.data)
          if (res.data.code == 200) {
            this.editObject = res.data.data.data;
            this.editObject.nurl = this.editObject.nImgUrl;
            // 上传列表
            this.EditfileList = res.data.data.file;
            var obj = [];
            for (var i = 0; i < res.data.data.file.length; i++) {
              obj.push({url: res.data.data.file[i].fenclUrl, name: res.data.data.file[i].fenclName})
            }
            this.EditfileList = obj;
          } else {
            console.log(res.data)
          }
        })
      },
      // 编辑保存
      editSave() {
        // 上传部分
        var arr = [];
        var arr2 = [];
        for (var i = 0; i < this.EditfileList.length; i++) {
          if (this.EditfileList[i].response && this.EditfileList[i].response.code == '200') {
            arr.push(this.EditfileList[i].response.data.revealImage);
            arr2.push(this.EditfileList[i].response.data.imageName);
          } else {
            arr.push(this.EditfileList[i].url)
            arr2.push(this.EditfileList[i].name)
          }
        }
        this.editObject.nEnclUrl = arr.join(',');
        this.editObject.nEnclName = arr2.join(',');

        console.log(this.editObject.nurl)
        let params = {};
        params['id'] = this.editObject.id;
        params['nTitle'] = this.editObject.nTitle;
        params['nContent'] = this.editObject.nContent;
        params['nImgUrl'] = this.editObject.nurl;
        params['nAuthor'] = this.editObject.nAuthor;
        params['nFrom'] = this.editObject.nFrom;
        params['nEnclUrl'] = this.editObject.nEnclUrl;
        params['nEnclName'] = this.editObject.nEnclName;
        params['iId'] = this.editObject.iId;
        params['nSystemId'] = this.nSystemId;
        console.log(params)
        API.put('/notice/noticeUpdate', params).then((res) => {
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
      // 编辑图片上传
      succImgEdit(response, file, fileList) {
        let fileName = file.name;
        let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
        if (regex.test(fileName.toLowerCase())) {
          this.editObject.nurl = response.data.revealImage;
          this.editObject.nImgUrl = URL.createObjectURL(file.raw);
        } else {
          this.$message.error('请选择图片文件');
        }
      },
      // 编辑上传功能成功
      succEdit(response, file, fileList) {
        this.EditfileList = fileList;
      },
      // 编辑上传功能删除
      remEdit(file, fileList) {
        this.EditfileList = fileList;
      },
      // 文件上传部分
      handleExceed(files, fileList) {
        this.$message.warning(`当前已有${fileList.length} 个文件，限制选择5个文件，本次选择了 ${files.length} 个文件`);
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
          API.delete('/notice/noticeDelete', params).then((res) => {
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
      // 选择
      handleSelectionChange(val) {
        this.multipleSelection = val;
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
          API.delete('/notice/noticeDelete', params).then((res) => {
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
      toggleTop(id, nTop) {
        let params = {};
        params['id'] = id;
        params['nTop'] = nTop;
        console.log(params)
        API.post('/notice/noticeupdatetop', params).then((res) => {
          console.log(res.data)
          if (res.data.code == 200) {
            this.getPage()
          } else {
            this.$message({
              type: 'error',
              message: '置顶失败!'
            });
          }
        })
      },
      //发布
      Release(id,nStatus) {
        let params = {};
        params['id'] = id;
        params['nStatus'] = nStatus;
        console.log(params)
        API.post('/notice/noticerelease', params).then((res) => {
          console.log(res.data)
          if (res.data.code == 200) {
            this.getPage()
          } else {
            this.$message({
              type: 'error',
              message: '发布失败!'
            });
          }
        })
      },
      // 取消发布
      ReleaseNo(id,nStatus) {
        let params = {};
        params['id'] = id;
        params['nStatus'] = nStatus;
        console.log(params)
        API.post('/notice/noticerelease', params).then((res) => {
          console.log(res.data)
          if (res.data.code == 200) {
            this.getPage()
          } else {
            this.$message({
              type: 'error',
              message: '取消发布失败!'
            });
          }
        })
      },
      //分类
      classify() {
        let params = {};
        API.get('/ification/FindAll', params).then((res) => {
          if(res.data.code == 200){
            this.options = res.data.data;
          }
          console.log(this.options)
        })
      },




      // 短信提醒
      tip(id) {
        this.tipPop = true
      },
      // 短信用户选择
      userBox() {
        this.innerTipPop = false;
        var arr = [];
        for (var i = 0; i < this.userData.length; i++) {
          for (var j = 0; j < this.userList.length; j++) {
            if (this.userList[j] == this.userData[i].key) {
              arr.push(this.userData[i].label)
            }
          }
        }
        this.Msg.MsgUserInp = arr.join(',');
      },
      // 短信保存
      MesSave() {
        this.tipPop = false;
        console.log(this.Msg)
      },
      // 短信模板
      modelbox() {
        this.dialogVisible = true;
        let params = {};
        API.get('static/dxmb.json', params).then((res) => {
          if (res.status == 200) {
            console.log(res.data)
            this.msgList = res.data;
            this.messAge = res.data[0].value;
          } else {
            console.log(res.data)
          }
        })
      },
      // 短信模板保存
      mbSave() {
        this.Msg.MsgText = this.messAge;
        this.dialogVisible = false;
      },
      // 进入详情
      linkDetail(id) {
        this.$router.push({name: 'backstage.notice.detail', query: {id: id}})
      },
      // 翻页器：当前页，同时上一页下一页也能获取当前页
      handleCurrentChange(val) {
        console.log(val);
        this.currentPage = val;
        this.getPage()
      },
      // 翻页器：选择10条还是20条、
      handleSizeChange(val) {
        console.log(val);
        this.pageSize = val;
        this.getPage()
      },
      // 编辑器
      onEditorChange({editor, html, text}) {
        console.log('editor change!', editor, html, text)
        this.addObject.content = html
      },
      onAddChange({editor, html, text}) {
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
  @import "./../../../../assets/styles/base2";

  .backstage-notice-page {
    .footer-top > .el-dialog > .el-dialog__footer {
      padding: 0px 20px 20px !important;
    }
    .el-dialog__body {

      .el-textarea__inner {
        font-size: 13px;
        padding-left: 10px;
      }
    }

    .search-nav {
      .input-table {
        width: 35% !important;
      }
      .select-table {
        float: left;
        margin-left: 30px;
        position: relative;
        width: 15%;
        .el-input__inner {
          padding-left: 30px;
          height: 35px;
          line-height: 35px;
          font-size: 13px;
        }
      }
    }
    .btn {
      cursor: pointer;
      width: 100px !important;
      height: 35px !important;
      line-height: 35px !important;
      font-size: 15px !important;
    }

  }

  .mb-box {
    margin-bottom: 10px;
    width: 100%;
    text-align: left;
  }


</style>
