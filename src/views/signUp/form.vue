<template>
  <div class="formBox">
    <p class="titleH">
      <span>请填写报名表单</span>
    </p>
      <el-form :model="form">
        <el-form-item label="报名形式：" :label-width="formLabelWidth">
          <el-select v-model="form.shape" placeholder="请选择报名形式">
            <el-option label="以个人形式报名" value="1"></el-option>
            <el-option label="以单位集体形式报名" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="参会名称：" :label-width="formLabelWidth">
          <el-input v-model="form.meeting" autocomplete="off" placeholder="请填写参会名称"></el-input>
        </el-form-item>
        <el-form-item label="参会人名称：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请填写参会人名称"></el-input>
        </el-form-item>
        <el-form-item label="所属单位：" :label-width="formLabelWidth">
          <el-input v-model="form.unit" autocomplete="off" placeholder="请填写所属单位"></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off" placeholder="请填写联系方式"></el-input>
        </el-form-item>
        <el-form-item label="到会日期：" :label-width="formLabelWidth">
          <el-input v-model="form.date" autocomplete="off" placeholder="请填写到会日期"></el-input>
        </el-form-item>
        <el-form-item label="乘坐交通工具：" prop="resource" :label-width="formLabelWidth" class="jtgj">
          <el-radio-group v-model="form.traffic" >
            <el-radio label="1">火车</el-radio>
            <el-radio label="2">飞机</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="车次：" :label-width="formLabelWidth">
          <el-input v-model="form.train" autocomplete="off" placeholder="请填写车次"></el-input>
        </el-form-item>
        <el-form-item label="时间：" :label-width="formLabelWidth">
          <el-input v-model="form.time" autocomplete="off" placeholder="请填写时间"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false" class="confirm">确 定</el-button>
        <el-button @click="dialogFormVisible = false" class="cancel">取 消</el-button>
      </div>

  </div>

</template>

<script>
    export default {
      data(){
        return{
          datail:{},
          formVis : true,
          formLabelWidth : '',
          form: {
            name: '',
            shape: '1',
            meeting:'',
            mobile:'',
            unit:'',
            time: '',
            traffic:'1',
            date:'',
            train:''
          },
        }
      },
      methods:{}
    }
</script>

<style scoped lang="less">
  html {
    font-size: 16px;
  }
  .formBox {
    width: 80%;
    margin: 30px auto;
    .titleH {
      margin-bottom: 20px;
      span {
        color: #026ab3;
        line-height: 30px;
        border-bottom: 2px solid #026ab3;
        padding-bottom: 5px;
        font-size: 1.1rem;
        font-weight: bold
      }
    }
    .el-form-item {
     margin-bottom: 0;
      .el-select {
        width: 100%;
      }
    }
    .dialog-footer {
      margin-top: 30px;
    }
    .jtgj {
      margin-top: 10px;
    }
  }
</style>


