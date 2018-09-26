<template>
  <div class="container">
    <div class="i_title">
      上报数据导入设置
    </div>
    <div class="i_select">
      <ul>
        <li>
          数据类型：<el-input v-model="type" class="i_input" placeholder="请输入内容"/>
        </li>
        <li>
          <div class="block">
            <span class="demonstration">申报时间：</span>
            <el-date-picker
              v-model="month"
              type="month"
              class="i_input"
              placeholder="选择月">
            </el-date-picker>
          </div>
        </li>
        <li>
          文件名称：<el-input v-model="name"  class="i_input"  placeholder="请输入内容"/>
        </li>
        <li>
          <el-button type="primary" @click="onSubmit">选择检查数据</el-button>
        </li>
      </ul>
      <el-button type="primary" @click="onSubmit" class="i_bnt">导入数据</el-button>
      <el-button type="primary" @click="onSubmit" style="width: 10%">重新导入</el-button>
      <el-button type="primary" @click="onSubmit" style="width: 10%">追加导入</el-button>
      <el-button type="primary" @click="onSubmit" style="width: 15%">航空公司管理</el-button>
    </div>
    <div class="hint">
      <span class="marked_words"><i class="el-icon-info"></i>&nbsp;&nbsp;温馨提示</span>
      <div class="hint_hr">
        <hr/>
      </div>
      <div class="i_summary">
        2018年8月   总数：1318条        未合并1292条   合并0条    处理0条     不规则26条     合并后0条       未处理1292条
      </div>
    </div>
    <div class="i_content">
      <div class="i_rule">
        <ul>
          <li><a href="javascript:;" @click="switcher(2)" :class="{active:isActive == 1}">规则数据</a></li>
          <li><a href="javascript:;" @click="switcher(2)" :class="{active:isActive == 2}">规则数据</a></li>
          <li><a href="javascript:;" @click="switcher(2)" :class="{active:isActive == 3}">规则数据</a></li>
        </ul>
      </div>
      <div class="i_tree">
        <ul>
          <li class="i_tree_left">
            <el-tree
              :data="treeData"
              show-checkbox
              node-key="id"
              :default-expanded-keys="[2]"
              :default-checked-keys="[5]">
            </el-tree>
          </li>
          <li class="i_tree_middle">
            <div></div>
          </li>
          <li  class="i_tree_right">
            <div class="i_detail">
              <div class="title_hr"></div>
              <div class="detail_title">
                班机航线详情
              </div>
              <div>
                航空公司：<input/>
                申请类型：<input/><br/>
                出发机场：<input/>
                到达机场：<input/><br/>
                使用机型：<input/>
                飞翔高度：<input/>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        //name: "import.vue"
      data(){
        return{
          month: '',
          isActive: 1,
          type:'',
          name:'',
          treeData: [{
            label: '一级 1',
            children: [{
              label: '二级 1-1',
              children: [{
                label: '三级 1-1-1'
              }]
            }]
          }, {
            label: '一级 2',
            children: [{
              label: '二级 2-1',
              children: [{
                label: '三级 2-1-1'
              }]
            }, {
              label: '二级 2-2',
              children: [{
                label: '三级 2-2-1'
              }]
            }]
          }, {
            label: '一级 3',
            children: [{
              label: '二级 3-1',
              children: [{
                label: '三级 3-1-1'
              }]
            }, {
              label: '二级 3-2',
              children: [{
                label: '三级 3-2-1'
              }]
            }]
          }],
          defaultProps: {
            children: 'children',
            label: 'label'
          }
        }
      },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      onSubmit(){
        console.log(1);
      }
    }
    }
</script>
<style lang="less">
  .i_tree {
    .el-icon-caret-right:before {
      display: none;
    }
  }
</style>
<style lang="less" scoped>
  .container{
    margin: auto;
    top: 0px;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 18px;
    width: 100%;
  }
  .i_title{
    padding-top: 56px;
    font-size: 24px;
    font-weight: bold;
    color: #026ab3;
    text-align: left;
  }
  .i_select{
    padding-top: 70px;
    text-align: left;
    width: 100%;
  }
  .declare_time{
    margin-top: -20px;
    margin-left: 40%;
  }
  .i_select ul{
    list-style: none;
  }
  .i_select ul li{
    float:left;
    width: 25%;
  }
  .block{
    margin-left: -5%;
  }
  .i_input{
    width: 50%;
  }
  .el-button--primary{
    width: 80%;
    height: 37px;
    color: #fff;
    background-color: #026ab3;
  }
  .i_bnt{
    width: 10%;
    margin-left: -100%;
    margin-top: 80px;
  }
  .hint{
    width: 100%;
    margin-top: 60px;
    text-align: left;
  }
  .marked_words{
    margin-top: 160px;
    color: #026ab3;
    margin-right: 895px;
  }
  .hint_hr{
    margin-top: 20px;
  }
  .i_summary{
    color: #666666;
    font-weight: normal;
    margin-top: 20px;
  }
  .i_content{
    margin-top: 50px;
    text-align: left;
    font-size: 18px;
    width: 74%;
    height: auto;
    position: absolute;
    .i_rule{
      font-weight: normal;
      .i_rule_li{
        border-top: white;
        border-right: white;
      }
      li{
        list-style: none;
        float: left;
        width: 140px;
        border: 1px #d6d6d6 solid;
        text-align: center;
      }
      li active{
        background-color: #026ab3;
      }
    }
    .i_tree{
      margin-top: 25.5px;
      width: 100%;
      height: 100%;
      ul{
        border-top: 1px #d6d6d6 solid;
        width: 100%;
        height: auto;
      }
      li{
        text-decoration: none;  /*去掉前面的圆点*/
        list-style: none;
        float: left;
        margin-top: 20px;
      }
      .i_tree_left{
        width: 45%;
        height: auto;
        border-left: 1px #d6d6d6 solid;
      }
      .i_tree_middle{
        width: 10%;
        height: 100%;
        div{
          width: 1px;
          height: 100%;
          background-color: #d6d6d6;
        }
      }
      .i_tree_right{
        width: 45%;
        height: auto;
        border-right: 1px #d6d6d6 solid;
        .i_detail{
          width: 100%;
          height: 100%;
          margin-left: 10px;
          .title_hr{
            background-color: #026ab3;
            width: 5px;
            height: 16px;
          }
          .detail_title{
            margin-top: -20px;
            margin-left: 10px;
          }
        }
      }
    }
  }
  a,a:hover{
    text-decoration:none;//去掉下划线
    color: #666666;
  }
</style>
