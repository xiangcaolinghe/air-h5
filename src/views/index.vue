<template>
  <div class="home-page">
    <div class="banner">
      <img src="./../assets/images/banner.png" alt class="img">
    </div>
    <div class="middle-table">
      <div class="messages inner-c">
        <div class="news-bg"></div>
        <div class="left">
          <div class="tab">
            <div class="item newst" :class="{active:isActive == 1}" @click="newsTab(1)">
              <span>
                新闻
                <i class="newsts" v-show="newS"></i>
              </span>
            </div>
            <div class="item newst" :class="{active:isActive == 2}" @click="newsTab(2)">
              动态
              <i class="newsts" v-show="dynamicS"></i>
            </div>
            <div class="item newst" :class="{active:isActive == 3}" @click="newsTab(3)">
              公告
              <i class="newsts" v-show="noticeS"></i>
            </div>
          </div>
          <div class="more" @click="newsList()">查看更多</div>
          <div class="tab-content">
            <div class="item" :class="{active:isActive == 1}">
              <div class="list" v-for="i in newsShow" :key="i.id" @click="newsGo(i.id)">
                <img :src="i.fImgUrl" alt class="img" v-if="i.fImgUrl">
                <img src="../assets/news.jpg" alt class="img" v-else>
                <div class="title" :class="i.fTop == 1 ? Red : Black">{{i.fTitle}}</div>
                <div class="article">{{i.fContents}}</div>
                <div class="time">发布时间：{{i.fReleaseTime}}</div>
              </div>
            </div>
            <div class="item common" :class="{active:isActive == 2}">
              <div class="list" v-for="i in trendsShow" :key="i.id" @click="dynamicGo(i.id)">
                <div class="title" :class="i.bs == 1 ? Red : Black">{{i.fTitle}}</div>
                <div class="article">{{i.fContents}}}</div>
                <div class="time">发布时间：{{i.fReleaseTime}}</div>
              </div>
            </div>
            <div class="item common" :class="{active:isActive == 3}">
              <div class="list" v-for="i in noticeShow" :key="i.id" @click="noticeGo(i.id)">
                <div class="title" :class="i.nTop == 1 ? Red : Black">{{i.nTitle}}</div>
                <div class="article">{{i.nContents}}</div>
                <div class="time">发布时间：{{i.nReleaseTime}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="nav-table">
            <div
              class="cell"
              v-for="(item, key) in menuSubsystem"
              :key="key"
              :class="{Boxactive:boxShadow==key}"
              @click="subsystem(key)"
            >
              <i :class="item.class" ></i>
              <p class="name">{{key}}</p>
            </div>
            <!-- <div class="cell" :class="{Boxactive:boxShadow=='换季管理'}" @click="subsystem('换季管理')">
              <i class="icon iconfont icon-ji"></i>
              <p class="name">换季管理</p>
            </div>
            <div class="cell" :class="{Boxactive:boxShadow=='月度管理'}" @click="subsystem('月度管理')">
              <i class="icon iconfont icon-tongji1"></i>
              <p class="name">月度管理</p>
            </div>
            <div class="cell" :class="{Boxactive:boxShadow=='区内管理'}" @click="subsystem('区内管理')">
              <i class="icon iconfont icon-tongji"></i>
              <p class="name">区内管理</p>
            </div>
            <div class="cell" :class="{Boxactive:boxShadow=='飞行程序'}" @click="subsystem('飞行程序')">
              <i class="icon iconfont icon-flightSchedule"></i>
              <p class="name">飞行程序</p>
            </div>
            <div class="cell" :class="{Boxactive:boxShadow=='临时航线'}" @click="subsystem('临时航线')">
              <div class="mask">
                <i class="icon iconfont icon-hangxian"></i>
              </div>
              <p class="name">临时航线</p>
            </div>
            <div
              class="cell"
              :class="{Boxactive:boxShadow=='ARINC424'}"
              @click="subsystem('ARINC424')"
            >
              <div class="mask">
                <i class="icon iconfont icon-feihangxiaoshi"></i>
              </div>
              <p class="name">ARINC424</p>
            </div>-->
          </div>
          <div class="input-table loginTab">
            <div class="cell">
              <span class="mask">
                <i class="icon iconfont icon-wode"></i>
              </span>
              <input type="text" class="input" placeholder="请输入您的用户名" v-model="userName">
            </div>
            <div class="cell">
              <span class="mask">
                <i class="icon iconfont icon-mima"></i>
              </span>
              <input type="password" class="input" placeholder="请输入您的密码" v-model="passWord">
            </div>
            <!--<div class="cell"><input type="text" class="code input" placeholder="短信验证" v-model="code"><span
            class="code-btn" @click="validate">获取验证码</span></div>-->
            <div class="cell button" @click="login">登陆</div>
            <div class="cell button" @click="dialogFormVisible = true" label="left">注册</div>
          </div>
          <!--<div class="loginTab" v-show="!loginShow">
            <p>欢迎 <span>管理员</span> 登录</p>
            <p @click="quit">【退出登录】</p>
          </div>-->
        </div>
      </div>
      <div class="trends inner-c">
        <div class="left">
          <div class="title">空域运行态势分析系统</div>
          <div class="scheme">
            <img src="./../assets/images/scheme.png" alt class="img">
          </div>
        </div>
        <div class="right right-1">
          <div class="title">班机航线走向建议</div>
          <div class="input-table">
            <div class="cell">
              <span class="mask">
                <i class="icon iconfont icon-yuanhuan"></i>
              </span>
              <input type="text" class="input" placeholder="请输入起点名称" v-model="bj.qd">
            </div>
            <div class="cell">
              <span class="mask">
                <i class="icon iconfont icon-round-copy"></i>
              </span>
              <input type="text" class="input" placeholder="请输入途径城市名称" v-model="bj.tj">
            </div>
            <div class="cell">
              <span class="mask">
                <i class="icon iconfont icon-qizhongdian"></i>
              </span>
              <input type="text" class="input" placeholder="请输入终点名称" v-model="bj.zd">
            </div>
            <div class="cell button" @click="Lookzxjy">查看走向建议</div>
          </div>
        </div>
      </div>
      <div class="inner-c module">
        <div class="cell">
          <img src="./../assets/images/module-01.png" alt class="img">
          <p class="words">规范文件</p>
        </div>
        <div class="cell">
          <img src="./../assets/images/module-02.png" alt class="img">
          <p class="words">新技术应用</p>
        </div>
        <router-link :to="{name:'sign.list'}" class="cell">
          <img src="./../assets/images/module-01.png" alt class="img">
          <p class="words">会议报名系统</p>
        </router-link>
      </div>
    </div>
    <!--对话框-->
    <el-dialog :visible.sync="dialogFormVisible" class="sign-dialog">
      <p style="font-size: 24px;font-weight: bolder">注册</p>
      <br>
      <el-form label-width="20%" :model="form">
        <el-form-item label="用户名：">
          <el-input v-model="form.username" autocomplete="off" placeholder="请填写您的用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input
            v-model="form.password"
            autocomplete="off"
            type="password"
            placeholder="请填写您的密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码：">
          <el-input
            v-model="respassword"
            autocomplete="off"
            type="password"
            @blur="verify_pas"
            placeholder="请再次填写您的密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属单位：">
          <el-input v-model="form.unit" autocomplete="off" placeholder="请填写您的所属单位"></el-input>
        </el-form-item>
        <el-form-item label="部  门：">
          <el-input v-model="form.department" autocomplete="off" placeholder="请填写您的部门"></el-input>
        </el-form-item>
        <el-form-item label="姓  名：">
          <el-input v-model="form.name" autocomplete="off" placeholder="请填写您的真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：">
          <el-input v-model="form.id_number" autocomplete="off" placeholder="请填写您的身份证号"></el-input>
        </el-form-item>
        <el-form-item label="手机号： ">
          <el-input
            v-model="form.phone"
            autocomplete="off"
            placeholder="请填写您的手机号"
            style="width: 40%;text-align: left"
          ></el-input>
          <el-input v-model="reg_code" autocomplete="off" placeholder="短信验证" style="width: 30%"></el-input>
          <span class="code-btn" @click="register_validate">获取验证码</span>
        </el-form-item>
        <el-form-item label="证件附件：">
          <el-upload
            class="upload-demo"
            action
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList2"
            list-type="picture"
          >
            <el-button size="small" type="primary" style="float: left">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="register" class="confirm">注 册</el-button>
        <el-button @click="cancel" class="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!--手机验证-->
    <el-dialog
      :visible.sync="PhoneDia"
      width="25%"
      title="提示"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form ref="form" :model="form" label-width="70px" class="PhoneForm">
        <p>首次登录需要手机验证</p>
        <p>您的手机是{{phoneNum}}，请输入验证码</p>
        <div class="PhoneForm-box">
          <el-col :span="16">
            <span>验证码：</span>
            <input type="text" v-model="FirstCode">
          </el-col>
          <el-col :span="8">
            <el-button
              size="medium"
              v-bind:disabled="codePhon"
              @click="Countdown"
            >获取验证码{{auth_time}}</el-button>
          </el-col>
        </div>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="PhoneDia = false">取 消</el-button>
        <el-button type="primary" @click="verCode">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import config from "@/config/config.js";

export default {
  //    name: 'HelloWorld',
  data() {
    return {
      indexMenus: [],
      menuSubsystem: {
        换季管理: {
          url: "/season/#/quarterly",
          class: "icon iconfont icon-ji"
        },
        月度管理: {
          url: "/monthly/#/",
          class: "icon iconfont icon-tongji1"
        },
        区内管理: { url: "", class: "icon iconfont icon-tongji" },
        飞行程序: { url: "", class: "icon iconfont icon-flightSchedule" },
        临时航线: { url: "", class: "icon iconfont icon-hangxian" },
        ARINC424: { url: "", class: "icon iconfont icon-feihangxiaoshi" }
      },
      openURL: "",
      PhoneDia: false,
      codePhon: false,
      auth_time: "",
      // loginShow: true,
      newS: false,
      dynamicS: false,
      noticeS: false,
      isActive: 1,
      newsShow: [],
      trendsShow: [],
      noticeShow: [],
      Boxactive: false,
      boxShadow: "",
      bj: {
        qd: "",
        tj: "",
        zd: ""
      },
      userName: "",
      passWord: "",
      code: "",
      // Color : '#026ab3',
      Red: "Red",
      Black: "Black",
      dialogFormVisible: false,
      form: {
        username: "",
        password: "",
        unit: "",
        department: "",
        name: "",
        id_number: "",
        accessory: "",
        phone: ""
      },
      respassword: "",
      fileList2: [],
      reg_code: "",
      subSys: "",
      // 验证码
      FirstCode: "",
      // 首次登录用户手机号
      phoneNum: "",
      // 首次登录用户id
      IdNum: ""
    };
  },
  methods: {
    // 新闻 动态 公告切换
    newsTab(id) {
      this.isActive = id;
    },
    newsList() {
      if (this.isActive === 1) {
        this.$router.push({ path: "/news/list" });
      } else if (this.isActive === 2) {
        this.$router.push({ path: "/dynamic/list" });
      } else if (this.isActive === 3) {
        this.$router.push({ path: "/notice/list" });
      }
    },
    getNewList() {
      // 新闻
      let params = {};
      var arr = [];
      var num = 0;
      API.get("/newsInfo/FindAllByrelease", params).then(res => {
        //console.log(res.data)
        if (res.data.code == 200) {
          if (res.data.data.length <= 3) {
            this.newsShow = res.data.data;
          } else {
            for (var i = 0; i < 3; i++) {
              arr.push(res.data.data[i]);
            }
            this.newsShow = arr;
            for (var i = 0; i < this.newsShow.length; i++) {
              if (this.newsShow[i].fTop == 1) {
                num++;
              }
            }
            if (num > 0) {
              this.newS = true;
            }
            //console.log(this.newsShow);
          }
        } else {
          //console.log(res.data)
        }
      });
    },
    getTrendsList() {
      // 动态
      let params = {};
      var arr = [];
      var num = 0;
      API.get("/newsInfo/FindAllByrelease", params).then(res => {
        //console.log(res.data)
        if (res.data.code == 200) {
          if (res.data.data.length <= 4) {
            this.trendsShow = res.data.data;
          } else {
            for (var i = 0; i < 4; i++) {
              arr.push(res.data.data[i]);
            }
            this.trendsShow = arr;
            //console.log(this.trendsShow);
            for (var i = 0; i < this.trendsShow.length; i++) {
              if (this.trendsShow[i].fTop == 1) {
                num++;
              }
            }
            if (num > 0) {
              this.dynamicS = true;
            }
          }
        } else {
          //console.log(res.data)
        }
      });
    },
    getNoticeList() {
      //公告
      let params = {};
      var arr = [];
      var num = 0;
      API.get("/notice/FindAllByrelease", params).then(res => {
        //console.log(res.data)
        if (res.data.code == 200) {
          if (res.data.data.length <= 4) {
            this.noticeShow = res.data.data;
          } else {
            for (var i = 0; i < 4; i++) {
              arr.push(res.data.data[i]);
            }
            this.noticeShow = arr;
          }
          //console.log(this.noticeShow);
          for (var i = 0; i < this.noticeShow.length; i++) {
            if (this.noticeShow[i].nTop == 1) {
              num++;
            }
          }
          if (num > 0) {
            this.noticeS = true;
          }
        } else {
          //console.log(res.data)
        }
      });
    },
    newsGo(id) {
      this.$router.push({ name: "newDetails", query: { id: id } });
    },
    noticeGo(id) {
      this.$router.push({ name: "noticeDetails", query: { id: id } });
    },
    dynamicGo(id) {
      this.$router.push({ name: "deynamicDetails", query: { id: id } });
    },
    // 走向建议
    Lookzxjy() {
      //console.log(this.bj)
    },
    // 进入子系统
    subsystem(flag) {
      // alert(flag)
      this.boxShadow = flag;
      let menus = this.indexMenus;
      //遍历从后台拿到的子系统ID 赋值
      for (let i = 0; i < menus.length; i++) {
        if (flag === menus[i].name) {
          this.openURL = this.menuSubsystem[flag].url;
          this.subSys = menus[i].id;
          return;
        } else {
          this.subSys = -1;
        }
      }
    },
    // 登录
    login() {
      if (this.subSys == "") {
        this.$message({
          type: "error",
          message: "请先选择子系统!"
        });
      } else {
        if (!this.userName) {
          this.$message({
            type: "error",
            message: "请输入用户名!"
          });
        } else if (!this.passWord) {
          this.$message({
            type: "error",
            message: "请输入密码!"
          });
        } else {
          // this.boxShadow = '';
          let params = {};
          // 子系统
          params["MenuId"] = this.subSys;
          params["uName"] = this.userName;
          params["uPasswd"] = this.passWord;
          // //console.log(params);
          // this.loginSubsystem("res.data.dat");
          API.post(config.loginURL + "/user/ReceptionLogin", params).then(
            res => {
              //console.log(res.data)
              if (res.data.code == 200) {
                //登录成功后 执行跳转，把数据传过去
                this.loginSubsystem(res.data.data);
                this.passWord = "";
                this.FirstCode = "";
                this.phoneNum = "";
                this.IdNum = "";
              } else if (res.data.code == 10004) {
                this.$message({
                  type: "error",
                  message: res.data.message
                });
              } else if (res.data.code == 10005) {
                this.$message({
                  type: "error",
                  message: res.data.message
                });
              } else if (res.data.code == 10014) {
                this.PhoneDia = true;
                this.phoneNum = res.data.data.uMobilephone;
                this.IdNum = res.data.data.id;
              }
            }
          );
        }
      }
    },

    // 获取验证码、倒计时
    Countdown() {
      this.codePhon = true;
      this.auth_time = 60;
      var auth_timetimer = setInterval(() => {
        this.auth_time--;
        if (this.auth_time <= 0) {
          this.auth_time = "";
          this.codePhon = false;
          clearInterval(auth_timetimer);
        }
      }, 1000);

      let params = {};
      // 验证码
      params["phone"] = this.phoneNum;
      params["type"] = 2;
      // //console.log(params)
      API.get(config.loginURL + "/code/verificationCode", params).then(res => {
        // //console.log(res.data)
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "验证码发送成功!"
          });
        }
      });
    },
    // 校验验证码
    verCode() {
      //console.log(this.FirstCode)
      this.PhoneDia = false;
      let params = {};
      params["code"] = this.FirstCode;
      params["MenuId"] = this.subSys;
      params["uName"] = this.userName;
      params["uPasswd"] = this.passWord;
      //console.log(params)
      API.post(config.loginURL + "/code/checkCode", params).then(res => {
        //console.log(res.data)
        if (res.data.code == 200) {
          if (res.data.message == "验证成功") {
            //登录成功后 执行跳转，把数据传过去
            this.loginSubsystem(res.data.data);
            this.$message({
              type: "success",
              message: res.data.message
            });
            this.passWord = "";
            this.FirstCode = "";
            this.phoneNum = "";
            this.IdNum = "";
          } else {
            this.$message({
              type: "error",
              message: res.data.data
            });
          }
        }
      });
    },
    //执行跳转和存数据
    loginSubsystem(data) {
      storage.setJson("BUser", {
        id: data.id,
        name: data.uName,
        company: "中国国际航空公司",
        url: data.url,
        token: data.jwt
      });
      window.open(this.openURL);
    },
    // 退出
    quit() {
      // this.loginShow = true;
      this.userName = "";
      this.passWord = "";
      this.code = "";
    },
    // 验证码
    validate() {
      //console.log(this.userName)
      let val = /^1[34578]\d{9}$/;
      if (!val.test(this.userName)) {
        this.$message({
          type: "error",
          message: "请输入正确的手机号!"
        });
      } else {
        let params = {};
        params["userName"] = this.userName;
        API.get("static/news.json", params).then(res => {
          if (res.status == 200) {
          } else {
            //console.log(res.data)
          }
        });
      }
    },
    // 注册验证码
    register_validate() {
      //console.log(this.form.phone)
      let val = /^1[34578]\d{9}$/;
      if (!val.test(this.form.phone)) {
        this.$message({
          type: "error",
          message: "请输入正确的手机号!"
        });
      } else {
        let params = {};
        params["form.phone"] = this.form.phone;
        API.get("static/news.json", params).then(res => {
          if (res.status == 200) {
          } else {
            //console.log(res.data)
          }
        });
      }
    },
    //注册
    register() {
      if (!this.form.username) {
        this.$message({
          type: "error",
          message: "请输入用户名!"
        });
        return;
      }
      if (!this.form.password) {
        this.$message({
          type: "error",
          message: "请输入密码!"
        });
        return;
      } else {
        if (this.form.password != this.respassword) {
          this.$message({
            type: "error",
            message: "密码和重复密码不一致!"
          });
          return;
        }
      }
      if (!this.form.unit) {
        this.$message({
          type: "error",
          message: "请输入单位!"
        });
        return;
      }
      if (!this.form.department) {
        this.$message({
          type: "error",
          message: "请输入部门!"
        });
        return;
      }
      if (!this.form.name) {
        this.$message({
          type: "error",
          message: "请输入姓名!"
        });
        return;
      }
      if (!this.form.phone) {
        this.$message({
          type: "error",
          message: "请输入手机号!"
        });
        return;
      } else if (this.form.phone) {
        let val = /^1[34578]\d{9}$/;
        if (!val.test(this.form.phone)) {
          this.$message({
            type: "error",
            message: "请输入正确的手机号!"
          });
          return;
        }
      }
      if (!this.reg_code) {
        this.$message({
          type: "error",
          message: "请输入验证码!"
        });
        return;
      }
      this.dialogFormVisible = false;
      this.form.name = "";
      this.form.unit = "";
      this.form.password = "";
      this.form.phone = "";
      this.form.department = "";
      this.form.id_number = "";
      this.form.accessory = "";
      this.form.username = "";
      this.reg_code = "";
    },
    cancel() {
      this.dialogFormVisible = false;
      this.form.name = "";
      this.form.unit = "";
      this.form.password = "";
      this.form.phone = "";
      this.form.department = "";
      this.form.id_number = "";
      this.form.accessory = "";
      this.form.username = "";
      this.reg_code = "";
    },
    handleRemove(file, fileList) {
      //console.log(file, fileList);
    },
    handlePreview(file) {
      //console.log(file);
    },
    //验证密码是否一致
    verify_pas() {
      if (this.form.password != this.respassword) {
        this.$message({
          type: "error",
          message: "密码和重复密码不一致!"
        });
        return;
      }
    },
    //查询子系统菜单ID
    getIndexMenu() {
      API.get(config.loginURL + "/menu/showListByid", { id: 3 })
        .then(response => {
          if (response.data.code == 200) {
            this.indexMenus = response.data.data;
          } else {
            console.log(response);
            this.$message({
              type: "error",
              message: "子系统菜单查询错误：" + response.data.message
            });
          }
        })
        .catch(error => {
          console.log(error.response);
          this.$message({
            type: "error",
            message: "服务器异常"
          });
        });
    }
  },
  created() {
    this.getNewList();
    this.getTrendsList();
    this.getNoticeList();
    this.getIndexMenu();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-dialog__footer {
  padding: 30px 20px 20px;
}
  .rrr {
    color: #026ab3 !important;
  }
</style>
<style scoped lang="less">
.PhoneForm {
  text-align: left;
  p {
    line-height: 30px;
  }
  .PhoneForm-box {
    margin: 5px 0;
  }

  input {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 35px;
    line-height: 35px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
}

.el-form-item__label {
  font-size: 20px;
}

.el-input {
  width: 80%;
  float: left;
}

.sign-dialog {
  width: 100%;
  .el-dialog__header {
    .el-dialog__title {
      font-size: 18px;
      font-weight: bold;
    }
  }
  .code-btn {
    display: block;
    height: 40px;
    background: #409eff;
    width: 80px;
    float: left;
    color: #fff;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
    margin-left: 10px;
  }
}

.Boxactive {
  background: #fff!important;
  color: #026ab3!important;
  i {
    color: #026ab3!important;
  }
}

.Red {
  color: #cf2727 !important;
}

.Black {
  color: #0b0306 !important;
}

.home-page {
  width: 100%;
  .banner {
    margin-bottom: 30px;
    width: 100%;
    .img {
      width: 100%;
      display: block;
    }
  }
  .newst {
    position: relative;
    .newsts {
      width: 8px;
      height: 8px;
      background: red;
      position: absolute;
      left: 45px;
      top: 20px;
      border-radius: 4px;
    }
  }
  .middle-table {
    .module {
      overflow: hidden;
      margin: 42px auto 30px;
      .cell {
        width: 380px;
        height: 165px;
        cursor: pointer;
        display: block;
        position: relative;
        float: left;
        img {
          width: 100%;
          height: 165px;
        }
        .words {
          position: absolute;
          color: #ffffff;
          font-size: 30px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          -webkit-transform: translate(-50%, -50%);
        }
        &:nth-child(2) {
          margin: 0 30px;
        }
        &:last-child {
          float: right;
        }
      }
    }
    .trends {
      margin-top: 60px;
      height: 352px;
      .title {
        font-size: 24px;
        font-weight: 600;
        height: 72px;
        line-height: 72px;
        color: #026ab3;
        text-align: left;
      }
      .left {
        width: 790px;
        height: 352px;
        float: left;
        .scheme{
          width: 100%;
          height: 275px;
          img {
            width: 100%;
            height: 275px;
          }
        }
      }
      .right-1 {
        width: 380px !important;
      }
      .right {
        width: 400px;
        height: 352px;
        float: right;
        .input-table {
          .cell {
            width: 100%;
            margin-bottom: 20px;
            position: relative;
            line-height: 50px;
            height: 50px;
            .input {
              padding-left: 80px;
              width: 100%;
              height: 50px;
              font-size: 16px;
              box-sizing: border-box;
            }
            .mask {
              position: absolute;
              display: block;
              width: 50px;
              height: 50px;
              background: #026ab3;
              .icon {
                color: #fff;
                font-size: 28px;
              }
            }
            &.button {
              color: #fff;
              text-align: center;
              font-size: 18px;
              cursor: pointer;
              background: #026ab3;
            }
            &:nth-child(3) {
              margin-bottom: 35px;
            }
          }
        }
      }
    }
    .messages {
      position: relative;
      height: 560px;
      .news-bg {
        position: absolute;
        width: 1150px;
        height: 560px;
        background: url(./../assets/images/news-bg.png) no-repeat 0 0;
        -webkit-background-size: 1150px 560px;
        background-size: 1150px 560px;
        top: 0;
        left: -360px;
      }
      .left {
        width: 790px;
        height: 560px;
        position: relative;
        float: left;
        .tab {
          width: 300px;
          height: 80px;
          .item {
            float: left;
            width: 100px;
            cursor: pointer;
            text-align: left;
            line-height: 80px;
            font-size: 18px;
            &.active {
              font-size: 24px;
              line-height: 77px;
              font-weight: 600;
              color: #026ab3;
            }
          }
        }
        .more {
          position: absolute;
          width: 110px;
          height: 36px;
          line-height: 36px;
          font-size: 16px;
          color: #fff;
          background: #c5cbd1;
          right: 30px;
          top: 22px;
          cursor: pointer;
        }
        .tab-content {
          width: 100%;
          .item {
            display: none;
            .list {
              float: left;
              display: block;
              cursor: pointer;
              height: auto;
              margin-right: 18px;
              width: 240px;
              .img {
                width: 240px;
                display: block;
              }
              div {
                text-align: left;
                line-height: 30px;
                font-size: 18px;
                &.title {
                  margin: 19px 0 8px;
                  height: 60px;
                  overflow: hidden;
                  color: #0b0306;
                  font-weight: 600;
                }
                &.article {
                  color: #666666;
                  height: 150px;
                  overflow: hidden;
                }
                &.time {
                  color: #666666;
                  margin-top: 30px;
                  font-weight: 600;
                }
              }
              &:last-child {
                margin: 0;
              }
            }
            &.active {
              display: block;
            }
            &.common {
              height: 480px;
              width: 790px;
              .list {
                clear: both;
                width: 790px;
                height: auto;
                padding-right: 30px;
                box-sizing: border-box;
                text-align: left;
                line-height: 30px;
                font-size: 18px;
                .title {
                  height: 28px;
                  margin: 0;
                  line-height: 28px;
                  overflow: hidden;
                  color: #0b0306;
                  font-weight: 600;
                }
                .article {
                  color: #666666;
                  height: 60px;
                  overflow: hidden;
                }
                .time {
                  color: #666666;
                  margin-top: 2px;
                  height: 30px;
                  text-align: right;
                  font-weight: 600;
                }
              }
            }
          }
        }
      }
      .right {
        width: 400px;
        /*padding: 0 10px;*/
        box-sizing: border-box;
        height: 352px;
        float: right;
        .nav-table {
          overflow: hidden;
          margin-bottom: 15px;
          padding-left: 20px;
          .cell {
            display: block;
            cursor: pointer;
            width: 120px;
            padding-top: 15px;
            height: 120px;
            float: left;
            box-sizing: border-box;
            background: #026ab3;
            color: #fff;
            margin-bottom: 10px;
            .mask {
              width: 48px;
              height: 48px;
              background: #fff;
              margin: 0 auto;
              border-radius: 50%;
              .icon {
                font-size: 40px;
                color: #026ab3;
                line-height: 51px;
              }
            }
            .name {
              font-size: 18px;
              line-height: 45px;
            }
            .icon {
              color: #fff;
              font-size: 48px;
              &.icon-ji {
                font-size: 56px;
              }
            }
            &:nth-child(2) {
              margin: 0 10px 10px;
            }
            &:nth-child(5) {
              margin: 0 10px 10px;
            }
            &:first-child {
              padding-top: 6px;
            }
          }
        }
        .input-table {
          .cell {
            width: 100%;
            margin-bottom: 20px;
            position: relative;
            line-height: 50px;
            overflow: hidden;
            height: 50px;
            .input {
              padding-left: 80px;
              width: 100%;
              height: 50px;
              font-size: 16px;
              box-sizing: border-box;
            }
            .mask {
              position: absolute;
              display: block;
              width: 50px;
              height: 50px;
              background: #026ab3;
              .icon {
                color: #fff;
                font-size: 30px;
              }
            }
            .code {
              padding-left: 15px;
              width: 230px;
              float: left;
            }
            .code-btn {
              display: block;
              height: 50px;
              background: #026ab3;
              width: 128px;
              float: right;
              color: #fff;
              text-align: center;
              font-size: 18px;
              cursor: pointer;
            }
            &.button {
              color: #fff;
              text-align: center;
              font-size: 18px;
              cursor: pointer;
              background: #026ab3;
            }
            &:nth-child(3) {
              margin-bottom: 35px;
            }
          }
        }
      }
    }
  }
  .loginTab {
    width: 380px;
    /*height: 275px;*/
    height: 355px;
    padding-left: 20px;
    p:nth-of-type(1) {
      text-align: center;
      font-size: 16px;
      line-height: 40px;
      margin-top: 100px;
      font-weight: bold;
    }
    p:nth-of-type(2) {
      text-align: center;
      font-size: 14px;
      font-weight: bold;
      color: #026ab3;
      cursor: pointer;
    }
  }
}
</style>
