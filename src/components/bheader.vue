<template>
    <div class="up-header">
      <div class="nav-box">
        <div class="up-nav">
        <span class="logo">
          <img src="./../assets/logo.png" alt="">
          <span class="name">管理平台</span>
        </span>
          <span class="welcome">
            <span class="user">
              <i class="iconfont icon icon-yonghu"></i><strong>欢迎您：{{userName}}</strong>
            </span>
            <span class="user" @click="OpenPassword">
              <strong style="font-size: 13px;">修改密码</strong>
            </span>
            <span class="exit" @click="exit">
              <i class="iconfont icon icon-tuichu-copy"></i><strong>退出</strong>
            </span>

        </span>
        </div>
      </div>
      <div class="p-content">
        <div class="p-left" v-bind:style="{ minHeight: offHeight + 'px' }">

          <div class="nav-left active">
            <ul>
              <li><router-link :to="{name:'home'}" class="left-c" :class="{active: $route.name == 'backstage.news'}"><i class="icon iconfont icon-xinwen"></i>新闻管理</router-link></li>
              <li><router-link :to="{name:'backstage.notice'}" class="left-c" :class="{active: $route.name == 'backstage.notice'}"><i class="icon iconfont icon-gonggao"></i>公告管理</router-link></li>
              <li><router-link :to="{name:'backstage.meeting'}" class="left-c" :class="{active: $route.name == 'backstage.meeting'}"><i class="icon iconfont icon-huiyi"></i>会议管理</router-link></li>
              <li><router-link :to="{name:'backstage.user'}" class="left-c" :class="{active: $route.name == 'backstage.user'}"><i class="icon iconfont icon-yonghuguanli"></i>用户管理</router-link></li>
              <li><router-link :to="{name:'backstage.classify'}" class="left-c" :class="{active: $route.name == 'backstage.classify'}"><i class="icon iconfont icon-yijianfankui"></i>分类管理</router-link></li>
            </ul>
          </div>
        </div>
        <div class="view">
          <slot name="right-view"></slot>
        </div>
      </div>
      <el-dialog
        title="修改密码"
        :visible.sync="editPassword"
        width="20%"
        class="tip-dialog pass-top">
        <div class="content">
          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="80px" class="demo-ruleForm">
            <el-form-item label="原始密码" prop="passOld">
              <el-input type="password" v-model="ruleForm2.passOld" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm2')" class="confirm">提交</el-button>
          <el-button @click="resetForm('ruleForm2')" class="cancel">重置</el-button>
        </span>
      </el-dialog>
    </div>

</template>

<script>
    export default {
      name: 'PHeader',
      data(){
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.ruleForm2.checkPass !== '') {
              this.$refs.ruleForm2.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.ruleForm2.pass) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return{
          isActive:1,
          isLeftActive:1,
          isLeftNav: 1,
          offHeight : 0,
          editPassword : false,
          ruleForm2: {
            passOld : '',
            pass: '',
            checkPass: ''
          },
          userName : storage.get('userName'),
          rules2: {
            passOld: [
              { required: true, message: '请输入旧密码', trigger: 'blur' },
              // { min: 6, message: '长度至少6位', trigger: 'blur' }
            ],
            pass: [
              { validator: validatePass, trigger: 'blur' },
              { required: true, message: '请输入新密码', trigger: 'blur' },
              { min: 6, message: '长度至少6位', trigger: 'blur' }
            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' },
              { required: true, message: '请再次输入密码', trigger: 'blur' },
              { min: 6, message: '长度至少6位', trigger: 'blur' }
            ]
          }
        }
      },
      methods:{
        OpenPassword(){
          this.editPassword = true
          if(this.$refs.ruleForm2){
            this.$refs.ruleForm2.clearValidate();
          }
        },
        // 修改密码提交
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            console.log(this.ruleForm2)
            if (valid) {
              let params={};
              params['uName'] = storage.get('userName');
              params['id'] = storage.get('token');
              params['uPasswd'] = this.ruleForm2.passOld;
              params['NewuPasswd'] = this.ruleForm2.pass;

              API.post('/ususer/changepasswd',params).then((res)=>{
                console.log(res.data)
                if(res.data.code == 200) {
                  this.editPassword  = false;
                  this.$message({
                    type: 'success',
                    message: '密码修改成功!'
                  });
                }else {
                  this.$message({
                    type: 'error',
                    message: '密码修改失败!'
                  });
                }
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        // 重置
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        switcher(number){
          this.isLeftActive=number;
        },
        // 退出登陆
        exit() {
          this.$confirm('您确定要退出管理平台?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            storage.delete('token');
            this.$message({
              type: 'success',
              message: '您已成功退出!'
            });
            let that = this
            setTimeout(function () {
              that.$router.push({name:'login'})
            },300)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消退出'
            });
          });
        },
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        }
      },
      mounted(){
        let hei = document.documentElement.clientHeight-110;
        console.log(hei)
        this.offHeight = hei;
        console.log(this.offHeight)
      }
    }
</script>

<style lang="less" scoped>
  @import "../assets/styles/edit-pop.less";
  .tip-dialog .el-dialog .dialog-footer .el-button {
    margin-left: 0;
  }
  .up-header{
    min-width: 1200px;
    position: inherit;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    /*font-size: 18px;*/
    /*font-weight: bold;*/
    .pass-top{
      .el-dialog {
        .el-dialog__body {
          .content {
            padding: 10px 0;
          }
        }
      }
    }

    .demo-ruleForm {
      .el-form-item {
        .el-form-item__label {
          width: 80px;
        }
        .el-form-item__content {
          margin-left: 85px;
        }
      }
    }

    .nav-box {
      width: 100%;
      background-color: #026ab3;
      height: 75px;
      .up-nav{
        width: 90%;
        height: 100%;
        margin: auto;
        .logo {
          .name {
            float: left;
            padding-left: 20px;
            font-size: 18px;
            color:#fff;
            line-height: 75px;
          }
        }
      }
    }
  }
  .up-nav img{
    float: left;
    margin-top: 0.8%;
    width: 50px;
  }
  .welcome{
    float: right;
    height:75px;
    overflow: hidden;
    line-height: 75px;
    font-size: 13px;
    color: #d5e0ee;
    .user {
      cursor: pointer;
      margin-right: 20px;
      .iconfont {
        font-size: 18px;
        margin-right: 10px;
      }
    }
    .exit {
      cursor: pointer;
      margin-right: 5px;
      .iconfont {
        font-size: 18px;
        margin-right: 10px;
      }
    }
  }
  .header-nav li{
    list-style: none;
    float: left;
    width: 12%;
    text-align: left;
    margin-top: 30px;
  }
  .nav-left{
    background-color: #003b64;
    position: absolute;
    width:16%;
    height:100%;
    font-weight: bolder;
    font-size: 15px;
    li{
      list-style: none;
      height: 65px;
      line-height: 65px;
      .left-c{
        display: block;
        text-decoration:none;
        color: #fff;
        &:hover {
           background: #fff;
           color: #003b64;
         }
         &.active {
            background: #fff;
            color: #003b64;
          }
      }
      .iconfont{
        font-size: 15px;
        margin-right: 10px;
      }
    }
  }
  .p-content {
    width:100%;
    position: relative;
    overflow:hidden;
    .p-left {
      float: left;
      /*min-height: 880px;*/
      min-height: 1px;
      width: 16%;
    }
    .view {
      float: left;
      width: 84%;
      padding: 0 5% 0 2%;
      box-sizing: border-box;
    }
  }

</style>
