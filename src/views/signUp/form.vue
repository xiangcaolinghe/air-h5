<template>
  <div class="formBox">
    <p class="titleH">
      <span>请填写报名表单</span>
    </p>
      <el-form>
        <el-form-item label="报名形式：" :label-width="formLabelWidth">
          <el-select v-model="form.sForm" placeholder="请选择报名形式">
            <el-option label="以个人形式报名" value="以个人形式报名"></el-option>
            <el-option label="以单位集体形式报名" value="以单位集体形式报名"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="参会名称：" :label-width="formLabelWidth">
          <el-input v-model="form.sName" autocomplete="off" placeholder="请填写参会名称"></el-input>
        </el-form-item>
        <el-form-item label="参会人名称：" :label-width="formLabelWidth">
          <el-input v-model="form.sPeopleName" autocomplete="off" placeholder="请填写参会人名称"></el-input>
        </el-form-item>
        <el-form-item label="所属单位：" :label-width="formLabelWidth">
          <el-input v-model="form.sUnit" autocomplete="off" placeholder="请填写所属单位"></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" :label-width="formLabelWidth">
          <el-input v-model="form.sMobile" autocomplete="off" placeholder="请填写联系方式"></el-input>
        </el-form-item>
        <el-form-item label="到会日期：" :label-width="formLabelWidth">
          <el-input v-model="form.sTime" autocomplete="off" placeholder="请填写到会日期" @focus="openPick1"></el-input>
          <mt-datetime-picker
            ref="picker1"
            type="date"
            :startDate="startDate"
            @confirm="handleConfirm1">
          </mt-datetime-picker>
          <!--v-model="form.date"-->
        </el-form-item>
        <el-form-item label="乘坐交通工具：" prop="resource" :label-width="formLabelWidth" class="jtgj">
          <el-radio-group v-model="form.sVehicle" >
            <el-radio label="1">火车</el-radio>
            <el-radio label="2">飞机</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="车次：" :label-width="formLabelWidth">
          <el-input v-model="form.sTrain" autocomplete="off" placeholder="请填写车次"></el-input>
        </el-form-item>
        <el-form-item label="时间：" :label-width="formLabelWidth">
          <el-input v-model="form.sTrainTime" autocomplete="off" placeholder="请填写时间" @focus="openPick2"></el-input>
          <mt-datetime-picker
            ref="picker2"
            type="datetime"
            :startDate="startDate"
            @confirm="handleConfirm2">
          </mt-datetime-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save" class="confirm">提 交</el-button>
      </div>

  </div>

</template>

<script>
   import moment from 'moment'
    export default {
      data(){
        return{
          datail:{},
          formVis : true,
          formLabelWidth : '',
          mId : '',
          form: {
            sForm: '',
            sName: '',
            sPeopleName:'',
            sUnit:'',
            sMobile:'',
            sTime: '',
            sVehicle:'1',
            sTrain:'',
            sTrainTime:'',
          },
          // pickerValue:'',
          startDate:new Date(),
        }
      },
      methods:{
        getPage(){
          console.log(window.location.href)
          function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
          }
          this.mId = getQueryString('id')
          console.log(this.mId)
        },
        openPick1(){
          this.$refs.picker1.open();
        },
        openPick2(){
          this.$refs.picker2.open();
        },
        handleConfirm1 (data) {
          let date = moment(data).format('YYYY-MM-DD')
          this.form.sTime = date
        },
        handleConfirm2 (data) {
          let date = moment(data).format('YYYY-MM-DD HH:mm:ss')
          this.form.sTrainTime = date
        },
        save(){
          console.log(this.form)
          let params = {};
          params['sForm'] = this.form.sForm;
          params['sName'] = this.form.sName;
          params['sPeopleName'] = this.form.sPeopleName;
          params['sUnit'] = this.form.sUnit;
          params['sMobile'] = this.form.sMobile;
          params['sTime'] = this.form.sTime;
          params['sVehicle'] = this.form.sVehicle;
          params['sTrain'] = this.form.sTrain;
          params['sTrainTime'] = this.form.sTrainTime;
          params['mId'] = this.mId;
          console.log(params)

          API.post('/signup/create', params).then((res) => {
            console.log(res.data)
            if (res.data.code == 200) {
              this.form ={
                  sForm: '',
                  sName: '',
                  sPeopleName:'',
                  sUnit:'',
                  sMobile:'',
                  sTime: '',
                  sVehicle:'1',
                  sTrain:'',
                  sTrainTime:'',
              },
              this.$message({
                type: 'success',
                message: '提交成功!'
              });
            } else {
              this.$message({
                type: 'error',
                message: '提交失败!'
              });
            }
          })
        }
      },
      created() {
        this.getPage()
      }
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


