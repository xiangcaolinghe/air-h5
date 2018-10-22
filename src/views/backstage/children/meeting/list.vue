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
                        prop="meetingName"
                        label="会议名称">
                </el-table-column>
                <el-table-column
                  prop="releaseDate"
                  label="创建时间"
                  width="120">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="创建者"
                        width="80">
                </el-table-column>
                <el-table-column
                  prop="releaseDate"
                  label="发布时间"
                  width="120">
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" class="release" @click="Release(scope.row.id)" v-show="!scope.row.fbStatus">发布</el-button>
                        <el-button type="text" size="small" class="release" @click="ReleaseNo(scope.row.id)" v-show="scope.row.fbStatus">取消发布</el-button>
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
        <el-dialog title="添加新闻" :visible.sync="addPop" class="tip-dialog">
            <div class="content">
                <div class="cell">
                    <span class="name">会议名称：</span>
                    <el-input v-model="addObject.meetingName" placeholder="请输入内容" class="flew-input"></el-input>
                </div>
                <el-row>
                  <el-col :span="11">
                    <div class="cell">
                      <span class="name">会议时间：</span>
                      <el-date-picker
                        class="flew-input"
                        v-model="addObject.data"
                        type="datetimerange"
                        :picker-options="pickerOptions2"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right"
                        value-format="yyyy-MM-dd HH:mm:ss">
                      </el-date-picker>
                    </div>
                  </el-col>
                  <el-col :span="11" :offset="2">
                    <div class="cell">
                      <span class="name">会议地址：</span>
                      <el-input v-model="addObject.meetingPlace" placeholder="请输入内容" class="flew-input"></el-input>
                    </div>
                  </el-col>
                </el-row>
              <div class="cell">
                <span class="name">会议简介：</span>
                <el-input type="textarea" v-model="addObject.abstract" class="flew-input"></el-input>
              </div>
              <div class="cell">
                <span class="name">会议联系人：</span>
                <el-input v-model="addObject.contacts" placeholder="请输入内容" class="flew-input"></el-input>
              </div>
              <el-row>
                <el-col :span="11">
                  <div class="cell">
                    <span class="name">联系人微信：</span>
                    <el-input v-model="addObject.wx" placeholder="请输入内容" class="flew-input"></el-input>
                  </div>
                </el-col>
                <el-col :span="11" :offset="2">
                  <div class="cell">
                    <span class="name">联系人电话：</span>
                    <el-input v-model="addObject.phone" placeholder="请输入内容" class="flew-input"></el-input>
                  </div>
                </el-col>
              </el-row>
              <div class="cell">
                <span class="name">主办单位：</span>
                <el-tag
                  :key="tag"
                  v-for="tag in addObject.partakeHost"
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
              <div class="cell">
                <span class="name">参会单位：</span>
                <el-tag
                  :key="tag"
                  v-for="tag in addObject.partakeCompany"
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
              <div class="cell">
                <span class="name">备注：</span>
                <el-input type="textarea" v-model="addObject.remarks" class="flew-input"></el-input>
              </div>
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
              <div class="cell">
                    <span class="name">会议日程：</span>
                    <quill-editor ref="myTextEditor"
                                  v-model="addObject.agenda"
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
              <span class="name">会议名称：</span>
              <el-input v-model="editObject.meetingName" placeholder="请输入内容" class="flew-input"></el-input>
            </div>
            <el-row>
              <el-col :span="11">
                <div class="cell">
                  <span class="name">会议时间：</span>
                  <el-date-picker
                    class="flew-input"
                    v-model="editObject.data"
                    type="datetimerange"
                    :picker-options="pickerOptions2"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right"
                    value-format="yyyy-MM-dd HH:mm:ss">
                  </el-date-picker>
                </div>
              </el-col>
              <el-col :span="11" :offset="2">
                <div class="cell">
                  <span class="name">会议地址：</span>
                  <el-input v-model="editObject.meetingPlace" placeholder="请输入内容" class="flew-input"></el-input>
                </div>
              </el-col>
            </el-row>
            <div class="cell">
              <span class="name">会议简介：</span>
              <el-input type="textarea" v-model="editObject.abstract" class="flew-input"></el-input>
            </div>
            <div class="cell">
              <span class="name">会议联系人：</span>
              <el-input v-model="editObject.contacts" placeholder="请输入内容" class="flew-input"></el-input>
            </div>
            <el-row>
              <el-col :span="11">
                <div class="cell">
                  <span class="name">联系人微信：</span>
                  <el-input v-model="editObject.wx" placeholder="请输入内容" class="flew-input"></el-input>
                </div>
              </el-col>
              <el-col :span="11" :offset="2">
                <div class="cell">
                  <span class="name">联系人电话：</span>
                  <el-input v-model="editObject.phone" placeholder="请输入内容" class="flew-input"></el-input>
                </div>
              </el-col>
            </el-row>
            <div class="cell">
              <span class="name">主办单位：</span>
              <el-tag
                :key="tag"
                v-for="tag in editObject.partakeHost"
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
            <div class="cell">
              <span class="name">参会单位：</span>
              <el-tag
                :key="tag"
                v-for="tag in editObject.partakeCompany"
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
            <div class="cell">
              <span class="name">备注：</span>
              <el-input type="textarea" v-model="editObject.remarks" class="flew-input"></el-input>
            </div>
            <div class="cell">
              <span class="name">上传附件：</span>
              <el-upload
                ref="Editupload"
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :file-list="EditfileList" :auto-upload="false" :multiple="true" :limit="5" :on-exceed="handleExceed" >
                <el-button size="small" type="primary" slot="trigger">选择文件</el-button>
              </el-upload>
            </div>
            <div class="cell">
              <span class="name">会议日程：</span>
              <quill-editor ref="myTextEditor"
                            v-model="editObject.agenda"
                            :config="editorOption"
                            @change="onEditChange($event)">
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
        // 搜索初始化
        SearchInp:'',
        // 删除选择初始化
        multipleSelection:[],
        activeTableDataId:[],
        tableData: [],
        addObject:{
          meetingName :'',
          data : '',
          meetingPlace : '',
          abstract : '',
          contacts : '',
          wx : '',
          phone : '',
          remarks : '',
          partakeHost : [],
          partakeCompany : [],
          agenda : ''
        },
        // 新增的主办单位标签内容
        addValue : '',
        addVisible: false,
        addValue2 : '',
        addVisible2: false,

        editObject:{
          id:'',
          meetingName :'',
          data : '',
          meetingPlace : '',
          abstract : '',
          contacts : '',
          wx : '',
          phone : '',
          remarks : '',
          partakeHost : [],
          partakeCompany : [],
          agenda : ''
        },
        // 编辑的主办单位标签内容
        editValue : '',
        editVisible: false,
        editValue2 : '',
        editVisible2: false,

        AddfileList: [],
        EditfileList: [],

        currentPage: 1,
        pageSize : 10,
        total:100,
        editorOption: {
          // something config
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
      getPage(){
        let params={};
        API.get('static/mettingList.json',params).then((res)=>{
          if(res.status == 200) {
            console.log(res.data)
            this.tableData = res.data;
            for(var i=0;i<this.tableData.length;i++){
              if(this.tableData[i].fb == '1'){
                this.tableData[i].fbStatus = true;
              }else {
                this.tableData[i].fbStatus = false;
              }
            }
            console.log(this.tableData)
            this.currentPage = 4
          }else {
            console.log(res.data)
          }
        })
      },
      // 搜索
      search(){
        console.log(this.SearchInp)
        let params={};
        params['search'] = this.SearchInp;
        API.get('static/list.json',params).then((res)=>{
          if(res.status == 200) {
            console.log(res.data)
            this.tableData = res.data;
          }else {
            console.log(res.data)
          }
        })
      },
      // 新增
      addOpen(){
        this.addPop = true;
        this.addObject = {
            meetingName :'',
            data : '',
            meetingPlace : '',
            abstract : '',
            contacts : '',
            wx : '',
            phone : '',
            remarks : '',
            partakeCompany : [],
            partakeHost : [],
            agenda : ''
        }
      },
      // 新增保存
      addSave(){
        this.$refs.Addupload.submit();
        console.log(this.addObject)
        let params={};
        params['meetingName'] = this.addObject.meetingName;
        params['data'] = this.addObject.data;
        params['meetingPlace'] = this.addObject.meetingPlace;
        params['abstract'] = this.addObject.abstract;
        params['contacts'] = this.addObject.contacts;
        params['wx'] = this.addObject.wx;
        params['phone'] = this.addObject.phone;
        params['remarks'] = this.addObject.remarks;
        params['partakeCompany'] = this.addObject.partakeCompany;
        params['partakeHost'] = this.addObject.partakeHost;
        params['agenda'] = this.addObject.agenda;
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
      //编辑
      editOpen(id){
        this.editPop = true;
        let params={};
        params['id'] = id;
        API.get('static/mettingEdit.json',params).then((res)=>{
          console.log(res.data)
          if(res.status == 200) {
            console.log(res.data[0])
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
        params['meetingName'] = this.editObject.meetingName;
        params['data'] = this.editObject.data;
        params['meetingPlace'] = this.editObject.meetingPlace;
        params['abstract'] = this.editObject.abstract;
        params['contacts'] = this.editObject.contacts;
        params['wx'] = this.editObject.wx;
        params['phone'] = this.editObject.phone;
        params['remarks'] = this.editObject.remarks;
        params['partakeCompany'] = this.editObject.partakeCompany;
        params['partakeHost'] = this.editObject.partakeHost;
        params['agenda'] = this.editObject.agenda;
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
      //发布
      Release(id){},
      // 取消发布
      ReleaseNo(id){},
      // 新增主办单位标签
      AddhandleClose(tag) {
        console.log(tag)
        // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        this.addObject.partakeHost.splice(this.addObject.partakeHost.indexOf(tag), 1);
      },
      AddshowInput() {
        this.addVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      AddhandleInputConfirm() {
        console.log(this.addObject.partakeHost)
        let inputValue = this.addValue;
        if (inputValue) {
          // this.dynamicTags.push(inputValue);
          this.addObject.partakeHost.push(inputValue)
        }
        this.addVisible = false;
        this.addValue = '';
      },
      // 新增参与单位标签
      AddhandleClose2(tag) {
        console.log(tag)
        // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        this.addObject.partakeCompany.splice(this.addObject.partakeCompany.indexOf(tag), 1);
      },
      AddshowInput2() {
        this.addVisible2 = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      AddhandleInputConfirm2() {
        console.log(this.addObject.partakeCompany)
        let inputValue = this.addValue2;
        if (inputValue) {
          // this.dynamicTags.push(inputValue);
          this.addObject.partakeCompany.push(inputValue)
        }
        this.addVisible2 = false;
        this.addValue2 = '';
      },
      // 编辑主办单位标签
      EdithandleClose(tag) {
        console.log(tag)
        // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        this.editObject.partakeHost.splice(this.editObject.partakeHost.indexOf(tag), 1);
      },
      EditshowInput() {
        this.editVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      EdithandleInputConfirm() {
        console.log(this.editObject.partakeHost)
        let inputValue = this.editValue;
        if (inputValue) {
          // this.dynamicTags.push(inputValue);
          this.editObject.partakeHost.push(inputValue)
        }
        this.editVisible = false;
        this.editValue = '';
      },
      // 编辑参与单位标签
      EdithandleClose2(tag) {
        console.log(tag)
        // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        this.editObject.partakeCompany.splice(this.editObject.partakeCompany.indexOf(tag), 1);
      },
      EditshowInput2() {
        this.editVisible2 = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      EdithandleInputConfirm2() {
        console.log(this.editObject.partakeCompany)
        let inputValue = this.editValue2;
        if (inputValue) {
          // this.dynamicTags.push(inputValue);
          this.editObject.partakeCompany.push(inputValue)
        }
        this.editVisible2 = false;
        this.editValue2 = '';
      },
      // 文件上传部分
      handleExceed(files, fileList) {
        this.$message.warning(`当前已有${fileList.length} 个文件，限制选择5个文件，本次选择了 ${files.length} 个文件`);
      },

      // 编辑器
      onEditChange({ editor, html, text }) {
        console.log('editor change!', editor, html, text)
        this.addObject.content = html
      },
      onAddChange({ editor, html, text }) {
        console.log('editor change!', editor, html, text)
        this.editObject.content = html
      },

      // 翻页器：当前页，同时上一页下一页也能获取当前页
      handleCurrentChange(val) {
        console.log(val);
      },
      // 翻页器：选择10条还是20条、
      handleSizeChange(val) {
        console.log(val);
      },
      // 进入详情
      linkDetail(id) {
        this.$router.push({name:'backstage.meeting.detail',query:{id:id}})
      },
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
        .el-button.release.el-button--text.el-button--small {
          color:#7BB552;
          font-size: 14px;
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
