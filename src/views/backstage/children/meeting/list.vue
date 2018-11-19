<template>
  <div class="backstage-news-page backstage-meeting-page">
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
          prop="mname"
          label="会议名称"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="mcreateTime"
          label="创建时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="uname"
          label="创建者"
          width="100">
        </el-table-column>
        <el-table-column
          prop="mreleaseTime"
          label="发布时间"
          width="120">
        </el-table-column>
        <el-table-column
          label="操作"
          width="300">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="release" @click="Release(scope.row.id,scope.row.mstatus)"
                       v-show="!scope.row.fbStatus">发布
            </el-button>
            <el-button type="text" size="small" class="release" @click="ReleaseNo(scope.row.id,scope.row.mstatus)"
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
    <el-dialog title="添加会议" :visible.sync="addPop" class="tip-dialog" :close-on-click-modal="false">
      <el-form :model="addObject" status-icon :rules="rules" ref="addObject" label-width="120px" class="demo-ruleForm">
      <div class="content">
        <div class="cell">
          <el-form-item label="会议名称：" prop="mName">
          <!--<span class="name">会议名称：</span>-->
          <el-input v-model="addObject.mName" placeholder="请输入内容" class="flew-input"></el-input>
          </el-form-item>
        </div>
        <el-row>
          <el-col :span="11">
            <div class="cell">
              <el-form-item label="会议联系人：" prop="mContacts">
              <!--<span class="name">会议联系人：</span>-->
              <el-input v-model="addObject.mContacts" placeholder="请输入内容" class="flew-input"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="11" :offset="2">
            <div class="cell">
              <el-form-item label="会议地址：" prop="mAddress">
              <!--<span class="name">会议地址：</span>-->
              <el-input v-model="addObject.mAddress" placeholder="请输入内容" class="flew-input"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <div class="cell">
          <el-form-item label="会议时间：" prop="data">
            <!--<span class="name padlet5">会议时间：</span>-->
            <el-date-picker
              class="flew-input"
              v-model="addObject.data"
              type="datetimerange"
              :picker-options="pickerOptions2"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width: 780px">
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="cell marbot20">
          <span class="name padlet5">会议简介：</span>
          <el-input type="textarea" v-model="addObject.mBrief" class="flew-input"></el-input>
        </div>
        <el-row>
          <el-col :span="11">
            <div class="cell marbot20">
              <span class="name padlet5">联系人微信：</span>
              <el-input v-model="addObject.mWechat" placeholder="请输入内容" class="flew-input"></el-input>
            </div>
          </el-col>
          <el-col :span="11" :offset="2">
            <div class="cell">
              <el-form-item label="联系人电话：" prop="mPhone">
              <!--<span class="name">联系人电话：</span>-->
              <el-input v-model="addObject.mPhone" placeholder="请输入内容" class="flew-input"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <div class="cell">
          <span class="name padlet5">主办单位：</span>
          <div class="el-cont-box">
            <el-tag
              :key="tag"
              v-for="tag in addObject.mHostUnit"
              closable
              :disable-transitions="false"
              @close="AddhandleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="addVisible"
              v-model="addValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="AddhandleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="AddshowInput">+ 添加主办单位</el-button>
          </div>
        </div>
        <div class="cell">
          <span class="name padlet5">参会单位：</span>
          <div class="el-cont-box">
            <el-tag
              :key="tag"
              v-for="tag in addObject.mParticipatingUnits"
              closable
              :disable-transitions="false"
              @close="AddhandleClose2(tag)">
              {{tag}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="addVisible2"
              v-model="addValue2"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="AddhandleInputConfirm2"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="AddshowInput2">+ 添加参会单位</el-button>
          </div>
        </div>
        <div class="cell marbot20">
          <span class="name padlet5">备注：</span>
          <el-input type="textarea" v-model="addObject.mRemarks" class="flew-input"></el-input>
        </div>
        <div class="cell marbot20">
          <span class="name padlet5">上传附件：</span>
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
            :on-remove="remAdd"
            :headers="myHeaders">
            <el-button size="small" type="primary" slot="trigger">选择文件</el-button>
            <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
          </el-upload>
        </div>
        <div class="cell">
          <span class="name padlet5">会议日程：</span>
          <quill-editor ref="myTextEditor"
                        v-model="addObject.mContent"
                        :config="editorOption"
                        @change="onAddChange($event)">
          </quill-editor>
        </div>
      </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addSave('addObject')" class="confirmAdd">确 定</el-button>
        <el-button @click="addPop = false" class="cancelAdd">取 消</el-button>
      </div>
    </el-dialog>
    <!--编辑弹框-->
    <el-dialog title="编辑" :visible.sync="editPop" class="tip-dialog" :close-on-click-modal="false">
      <el-form :model="editObject" status-icon :rules="rules" ref="editObject" label-width="120px" class="demo-ruleForm">
      <div class="content">
        <div class="cell">
          <el-form-item label="会议名称：" prop="mName">
          <!--<span class="name">会议名称：</span>-->
          <el-input v-model="editObject.mName" placeholder="请输入内容" class="flew-input"></el-input>
          </el-form-item>
        </div>
        <el-row>
          <el-col :span="11">
            <div class="cell">
              <el-form-item label="会议联系人：" prop="mContacts">
              <!--<span class="name">会议联系人：</span>-->
              <el-input v-model="editObject.mContacts" placeholder="请输入内容" class="flew-input"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="11" :offset="2">
            <div class="cell">
              <el-form-item label="会议地址：" prop="mAddress">
              <!--<span class="name">会议地址：</span>-->
              <el-input v-model="editObject.mAddress" placeholder="请输入内容" class="flew-input"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <div class="cell marbot20">
          <span class="name padlet5"><i style="color: red;padding-right: 5px;">*</i>会议时间：</span>
          <el-date-picker
            class="flew-input"
            v-model="EditData"
            type="datetimerange"
            :picker-options="pickerOptions2"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 780px">
          </el-date-picker>
        </div>
        <div class="cell marbot20">
          <span class="name padlet5">会议简介：</span>
          <el-input type="textarea" v-model="editObject.mBrief" class="flew-input"></el-input>
        </div>
        <el-row>
          <el-col :span="11">
            <div class="cell marbot20">
              <span class="name padlet5">联系人微信：</span>
              <el-input v-model="editObject.mWechat" placeholder="请输入内容" class="flew-input"></el-input>
            </div>
          </el-col>
          <el-col :span="11" :offset="2">
            <div class="cell">
              <el-form-item label="联系人电话：" prop="mPhone">
              <!--<span class="name">联系人电话：</span>-->
              <el-input v-model="editObject.mPhone" placeholder="请输入内容" class="flew-input"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <div class="cell">
          <span class="name padlet5">主办单位：</span>
          <div class="el-cont-box">
            <el-tag
              :key="tag"
              v-for="tag in editObject.mHostUnit"
              closable
              :disable-transitions="false"
              @close="EdithandleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="editVisible"
              v-model="editValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="EdithandleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="EditshowInput">+ 添加主办单位</el-button>
          </div>
        </div>
        <div class="cell">
          <span class="name padlet5">参会单位：</span>
          <div class="el-cont-box">
            <el-tag
              :key="tag"
              v-for="tag in editObject.mParticipatingUnits"
              closable
              :disable-transitions="false"
              @close="EdithandleClose2(tag)">
              {{tag}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="editVisible2"
              v-model="editValue2"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="EdithandleInputConfirm2"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="EditshowInput2">+ 添加参会单位</el-button>
          </div>
        </div>
        <div class="cell marbot20">
          <span class="name padlet5">备注：</span>
          <el-input type="textarea" v-model="editObject.mRemarks" class="flew-input"></el-input>
        </div>
        <div class="cell marbot20">
          <span class="name padlet5">上传附件：</span>
          <el-upload
            ref="Editupload"
            class="upload-demo"
            action="http://192.168.3.41:8083/newsInfo/newsFiles"
            :file-list="EditfileList"
            :multiple="true"
            :limit="5"
            :on-exceed="handleExceed"
            :on-success="succEdit"
            :on-remove="remEdit"
            :headers="myHeaders">
            <el-button size="small" type="primary" slot="trigger">选择文件</el-button>
          </el-upload>
        </div>
        <div class="cell">
          <span class="name padlet5">会议日程：</span>
          <quill-editor ref="myTextEditor"
                        v-model="editObject.mContent"
                        :config="editorOption"
                        @change="onEditChange($event)">
          </quill-editor>
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
  import * as Quill from 'quill' //引入编辑器
  //quill编辑器的字体
  var fonts = ['SimSun', 'SimHei','Microsoft-YaHei','KaiTi','FangSong','Arial','Times-New-Roman','sans-serif'];
  var Font = Quill.import('formats/font');
  Font.whitelist = fonts; //将字体加入到白名单
  Quill.register(Font, true);
  export default {
    name: '',
    components: {quillEditor},
    data() {
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return ;
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          console.log(reg.test(value));
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
          }
        }
      };
      return {
        loading: false,
        editPop: false,
        addPop: false,
        data:'',
        // mSystemId : 1,
        // 搜索初始化
        SearchInp: '',
        // 删除选择初始化
        multipleSelection: [],
        activeTableDataId: [],
        activeTableDataId2: '',
        tableData: [],
        addObject: {
          mName: '',
          data: '',
          mAddress: '',
          mBrief: '',
          mContacts: '',
          mWechat: '',
          mPhone: '',
          mRemarks: '',
          mHostUnit: [],
          mParticipatingUnits: [],
          mContent: '',
          mContents: '',
          mEnclName : '',
          mEnclUrl : ''
        },
        myHeaders :{Authorization:storage.get('token')},
        // 新增的主办单位标签内容
        addValue: '',
        addVisible: false,
        addValue2: '',
        addVisible2: false,
        rules: {
          mName: [
            { required: true, message: '必填', trigger: 'blur' },
          ],
          mAddress: [
            { required: true, message: '必填', trigger: 'blur' },
          ],
          mContacts: [
            { required: true, message: '必填', trigger: 'blur' },
          ],
          data: [
            { required: true, message: '必填', trigger: 'blur' },
          ],
          mPhone: [
            {validator: checkPhone, trigger: 'blur'}
          ]

          /* EditData: [
             { required: true, message: '必填', trigger: 'blur' },
           ]*/
        },
        editObject: {
          id: '',
          mName: '',
          mAddress: '',
          mBrief: '',
          mContacts: '',
          mWechat: '',
          mPhone: '',
          mRemarks: '',
          mHostUnit: [],
          mParticipatingUnits: [],
          mContent: '',
          mContents: '',
          mEnclName : '',
          mEnclUrl : ''
        },
        EditData : [],
        // 编辑的主办单位标签内容
        editValue: '',
        editVisible: false,
        editValue2: '',
        editVisible2: false,

        AddfileList: [],
        EditfileList: [],

        currentPage: 1,
        pageSize: 10,
        total: 0,
        // 富文本配置
        editorOption: {
          modules:{
            toolbar:[
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],

              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'script': 'sub'}, { 'script': 'super' }],
              // [{ 'indent': '-1'}, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],

              [{ 'size': [] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

              [{ 'color': [] }, { 'background': [] }],
              [{ 'font': fonts }],    //把上面定义的字体数组放进来

              [{ 'align': [] }],

              ['clean'],
              ['image','video']
            ]
          },
          theme:'snow'
        },
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },

      }
    },
    methods: {
      // 页面初始化
      getPage() {
        let params = {};
        params['page'] = this.currentPage;
        params['count'] = this.pageSize;
        API.get('/meeTing/FindAll', params,{Authorization:storage.get('token')}).then((res) => {
          if (res.data.code == 200) {
            console.log(res.data)
            this.tableData = res.data.data;
            this.total = res.data.count;
            for (var i = 0; i < this.tableData.length; i++) {
              if (this.tableData[i].mstatus == '1') {
                this.tableData[i].fbStatus = true;
              } else {
                this.tableData[i].fbStatus = false;
              }
            }
            console.log(this.tableData)
          } else if(res.data.code == 1001){
            this.signOut()
          } else {
            console.log(res.data)
          }
        })
      },
      // 搜索
      search() {
        console.log(this.SearchInp)
        let params = {};
        params['name'] = this.SearchInp;
        API.get('/meeTing/FindByName', params,{Authorization:storage.get('token')}).then((res) => {
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
        this.AddfileList = [];
        this.addObject = {
          mName: '',
          data: '',
          mAddress: '',
          mBrief: '',
          mContacts: '',
          mWechat: '',
          mPhone: '',
          mRemarks: '',
          mHostUnit: [],
          mParticipatingUnits: [],
          mContent: '',
          mContents: '',
          mEnclName : '',
          mEnclUrl : ''
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
            console.log(this.addObject)
            // 上传数据
            var arr = [];
            var arr2 = [];
            for (var i = 0; i < this.AddfileList.length; i++) {
              if (this.AddfileList[i].response.code == '200') {
                arr.push(this.AddfileList[i].response.data.revealImage);
                arr2.push(this.AddfileList[i].response.data.imageName);
              }
            }
            this.addObject.mEnclUrl = arr.join(',');
            this.addObject.mEnclName = arr2.join(',');
            let params = {};
            params['mName'] = this.addObject.mName;
            params['mStartTime'] = this.addObject.data[0];
            params['mEndTime'] = this.addObject.data[1];
            params['mAddress'] = this.addObject.mAddress;
            params['mBrief'] = this.addObject.mBrief;
            params['mContacts'] = this.addObject.mContacts;
            params['mWechat'] = this.addObject.mWechat;
            params['mPhone'] = this.addObject.mPhone;
            params['mHostUnit'] = this.addObject.mHostUnit.join(",");
            params['mParticipatingUnits'] = this.addObject.mParticipatingUnits.join(",");
            params['mRemarks'] = this.addObject.mRemarks;
            params['mEnclUrl'] = this.addObject.mEnclUrl;
            params['mEnclName'] = this.addObject.mEnclName;
            params['mContent'] = this.addObject.mContent;
            params['mContents'] = this.addObject.mContents.replace(/[\r\n]/g, "");
            params['mSystemId'] = storage.get('sysid');
            console.log(params)
            API.post('/meeTing/create', params,{Authorization:storage.get('token')}).then((res) => {
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
      // 新增上传功能成功
      succAdd(response, file, fileList) {
        this.AddfileList = fileList;
      },
      // 新增上传功能删除
      remAdd(file, fileList) {
        this.AddfileList = fileList;
      },
      //编辑
      editOpen(id) {
        if(this.$refs.editObject){
          this.$refs.editObject.clearValidate();
        }
        this.editObject = {
          mName: '',
          mAddress: '',
          mBrief: '',
          mContacts: '',
          mWechat: '',
          mPhone: '',
          mRemarks: '',
          mHostUnit: [],
          mParticipatingUnits: [],
          mContent: '',
          mContents: '',
          mEnclName : '',
          mEnclUrl : ''
        }
        this.EditData = [];
        this.EditfileList = [];
        this.editPop = true;
        console.log(this.editObject.data)
        let params = {};
        params['id'] = id;
        console.log(params)
        API.get('/meeTing/FindById', params,{Authorization:storage.get('token')}).then((res) => {
          console.log(res.data)
          if (res.data.code == 200) {
            this.editObject = res.data.data.data;
            this.editObject.mHostUnit = res.data.data.data.mHostUnit.split(',');
            this.editObject.mParticipatingUnits = res.data.data.data.mParticipatingUnits.split(',');
            var arr = [];
            arr[0] = res.data.data.data.mStartTime;
            arr[1] = res.data.data.data.mEndTime;
            this.EditData = arr;
            console.log(this.EditData)
            // 上传列表
            this.EditfileList = res.data.data.file;
            var obj = [];
            for (var i = 0; i < res.data.data.file.length; i++) {
              obj.push({url: res.data.data.file[i].fenclUrl, name: res.data.data.file[i].fenclName})
            }
            this.EditfileList = obj;
          } else if(res.data.code == 1001){
            this.signOut()
          } else {
            console.log(res.data)
          }
        })
      },
      // 编辑保存
      editSave(formName) {
        console.log(this.EditData)
        if(!this.EditData){
          this.$message({
            type: 'error',
            message: '会议时间必填!'
          });
        }else if(!this.EditData[0]){
          this.$message({
            type: 'error',
            message: '会议时间必填!'
          });
        }else {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              console.log(this.editObject)
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
              this.editObject.mEnclUrl = arr.join(',');
              this.editObject.mEnclName = arr2.join(',');
              let params = {};
              params['id'] = this.editObject.id;
              params['mName'] = this.editObject.mName;
              params['mStartTime'] = this.EditData[0];
              params['mEndTime'] = this.EditData[1];
              params['mAddress'] = this.editObject.mAddress;
              params['mBrief'] = this.editObject.mBrief;
              params['mContacts'] = this.editObject.mContacts;
              params['mWechat'] = this.editObject.mWechat;
              params['mPhone'] = this.editObject.mPhone;
              params['mHostUnit'] = this.editObject.mHostUnit.join(",");
              params['mParticipatingUnits'] = this.editObject.mParticipatingUnits.join(",");
              params['mRemarks'] = this.editObject.mRemarks;
              params['mEnclUrl'] = this.editObject.mEnclUrl;
              params['mEnclName'] = this.editObject.mEnclName;
              params['mContent'] = this.editObject.mContent;
              params['mContents'] = this.editObject.mContents.replace(/[\r\n]/g, "");
              params['mSystemId'] = storage.get('sysid');

              console.log(params)
              API.put('/meeTing/update', params,{Authorization:storage.get('token')}).then((res) => {
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
      // 校验重置
      closeDialog(){
        this.$refs['addObject'].resetFields();
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
          params['mSystemId'] = storage.get('sysid');
          API.delete('/meeTing/delete', params,{Authorization:storage.get('token')}).then((res) => {
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
          params['mSystemId'] = storage.get('sysid');
          API.delete('/meeTing/delete', params,{Authorization:storage.get('token')}).then((res) => {
            console.log(res)
            if (res.status == 200) {
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

      //发布
      Release(id, mstatus) {
        let params = {};
        params['id'] = id;
        params['mStatus'] = mstatus;
        params['mSystemId'] = storage.get('sysid');
        console.log(params)
        API.post('/meeTing/release', params,{Authorization:storage.get('token')}).then((res) => {
          console.log(res.data)
          if (res.data.code == 200) {
            this.getPage()
          } else if(res.data.code == 1001){
            this.signOut()
          } else {
            this.$message({
              type: 'error',
              message: '发布失败!'
            });
          }
        })
      },
      // 取消发布
      ReleaseNo(id, mstatus) {
        let params = {};
        params['id'] = id;
        params['mStatus'] = mstatus;
        params['mSystemId'] = storage.get('sysid');
        console.log(params)
        API.post('/meeTing/release', params,{Authorization:storage.get('token')}).then((res) => {
          console.log(res.data)
          if (res.data.code == 200) {
            this.getPage()
          } else if(res.data.code == 1001){
            this.signOut()
          } else {
            this.$message({
              type: 'error',
              message: '取消发布失败!'
            });
          }
        })
      },
      // 新增主办单位标签
      AddhandleClose(tag) {
        console.log(tag)
        // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        this.addObject.mHostUnit.splice(this.addObject.mHostUnit.indexOf(tag), 1);
      },
      AddshowInput() {
        this.addVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      AddhandleInputConfirm() {
        let inputValue = this.addValue;
        if (inputValue) {
          for(var i=0;i<this.addObject.mHostUnit.length;i++){
            if(this.addObject.mHostUnit[i] == inputValue){
              this.$message({
                type: 'error',
                message: '不可以重复!'
              });
              return
            }
          }
          this.addObject.mHostUnit.push(inputValue)
          // this.dynamicTags.push(inputValue);
          console.log(this.addObject.mHostUnit)
        }
        this.addVisible = false;
        this.addValue = '';
      },
      // 新增参与单位标签
      AddhandleClose2(tag) {
        console.log(tag)
        // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        this.addObject.mParticipatingUnits.splice(this.addObject.mParticipatingUnits.indexOf(tag), 1);
      },
      AddshowInput2() {
        this.addVisible2 = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      AddhandleInputConfirm2() {
        console.log(this.addObject.mParticipatingUnits)
        let inputValue = this.addValue2;
        if (inputValue) {
          for(var i=0;i<this.addObject.mParticipatingUnits.length;i++){
            if(this.addObject.mParticipatingUnits[i] == inputValue){
              this.$message({
                type: 'error',
                message: '不可以重复!'
              });
              return
            }
          }
          // this.dynamicTags.push(inputValue);
          this.addObject.mParticipatingUnits.push(inputValue)
        }
        this.addVisible2 = false;
        this.addValue2 = '';
      },
      // 编辑主办单位标签
      EdithandleClose(tag) {
        console.log(tag)
        // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        this.editObject.mHostUnit.splice(this.editObject.mHostUnit.indexOf(tag), 1);
      },
      EditshowInput() {
        this.editVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      EdithandleInputConfirm() {
        console.log(this.editObject.mHostUnit)
        let inputValue = this.editValue;
        if (inputValue) {
          for(var i=0;i<this.editObject.mHostUnit.length;i++){
            if(this.editObject.mHostUnit[i] == inputValue){
              this.$message({
                type: 'error',
                message: '不可以重复!'
              });
              return
            }
          }
          // this.dynamicTags.push(inputValue);
          this.editObject.mHostUnit.push(inputValue)
        }
        this.editVisible = false;
        this.editValue = '';
      },
      // 编辑参与单位标签
      EdithandleClose2(tag) {
        console.log(tag)
        // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        this.editObject.mParticipatingUnits.splice(this.editObject.mParticipatingUnits.indexOf(tag), 1);
      },
      EditshowInput2() {
        this.editVisible2 = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      EdithandleInputConfirm2() {
        console.log(this.editObject.mParticipatingUnits)
        let inputValue = this.editValue2;
        if (inputValue) {
          for(var i=0;i<this.editObject.mParticipatingUnits.length;i++){
            if(this.editObject.mParticipatingUnits[i] == inputValue){
              this.$message({
                type: 'error',
                message: '不可以重复!'
              });
              return
            }
          }
          // this.dynamicTags.push(inputValue);
          this.editObject.mParticipatingUnits.push(inputValue)
        }
        this.editVisible2 = false;
        this.editValue2 = '';
      },


      // 编辑器
      onEditChange({editor, html, text}) {
        this.editObject.mContent = html
        this.editObject.mContents = text
      },
      onAddChange({editor, html, text}) {
        this.addObject.mContent = html
        this.addObject.mContents = text
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
        this.getPage();
      },
      // 进入详情
      linkDetail(id) {
        this.$router.push({name: 'backstage.meeting.detail', query: {id: id}})
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
      this.getPage()
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

  .backstage-meeting-page {
    .quill-editor {
      margin-left: 35px!important;
      width: 1120px!important;
    }
    .tip-dialog {
      .el-dialog__body {
        .cell {
          .name {
            width: 115px !important;
          }
        }
      }
    }
    .el-tag + .el-tag {
      margin-left: 10px;
    }

    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }

    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }
    .marbot20 {
      margin-bottom: 20px;
    }
    .padlet5 {
      padding-left: 5px;
    }
  }

</style>
