<template>
    <div class="sign-detail">
        <div class="list">
            <br>
            <div class="contain">
                <ul class="current_position">
                    <li>当前位置：</li>
                    <li><router-link :to="{name:'home'}">首页</router-link><i class="icon iconfont icon-youjiantou"></i></li>
                    <li><router-link :to="{name:'sign.list'}">通知报名</router-link><i class="icon iconfont icon-youjiantou"></i></li>
                    <li>详情</li>
                </ul>
            </div>
            <br/>
            <div class="title_hr">
                <div class="banner_hr">
                    <div class="bar_hr"></div>
                </div>
            </div>
            <br/> <br/>
        </div>
        <div class="inner-c detail-table">
            <div class="info">
                <div class="img"><img src="" alt="" class="pic"></div>
                <div class="detail">
                    <div class="title">董卿对自己有多狠？沉迷工作看不见儿子生病，网友：杨幂不要学</div>
                    <div class="time"><i class="icon iconfont icon-shijian"></i>2018-08-20  10:49:45 -- 2018-08-20  10:49:59</div>
                    <div class="address"><i class="icon iconfont icon-dingweiweizhi"></i>北京市东城区毛家湾胡同甲13号</div>
                    <div class="btn" @click="dialogFormVisible = true">在线报名</div>
                    <div class="wechart">
                        <img src="" alt="">
                        <p class="name">扫描二维码报名</p>
                    </div>
                </div>
            </div>
            <div class="nav-tabs">
                <a class="tab" @click="tabActive(1)" :class="{active:active == 1}" href="#detail">会议简介</a>
                <a class="tab" @click="tabActive(2)" :class="{active:active == 2}" href="#unit">主办单位</a>
                <a class="tab" @click="tabActive(3)" :class="{active:active == 3}" href="#join">参会相关单位</a>
                <a class="tab" @click="tabActive(4)" :class="{active:active == 4}" href="#name">会议联系人</a>
                <a class="tab" @click="tabActive(5)" :class="{active:active == 5}" href="#date">会议日程</a>
            </div>
            <div class="nav-content">
                <!--会议简介-->
                <a name="detail"></a>
                <div class="tab">
                  <div class="intro">
                      亚洲和中国是全球经济未来增长的重要引擎，亚洲中金联盟从亚洲角度纵览全球经济格局，分析投资市场新形式，发掘投资新机遇，以实现我国金融业平等协商，兼顾各方利益，反映各方诉求，携手推动更大范围、更高水平、更深层次的大开放、大交流、大融合。
                      “中国金融峰会暨绿色金融颁奖盛典”自首届启动以来至今已成功举办了八届。历届峰会都得到了全国人大、全国政协及相关部委办领导的重视和肯定，并被给予厚望。他们希望能通过我们的活动让更多的金融机构提高树立品牌发展意识，参与社会信用体系建设，共同创造绿色生态金融环境。
                      届时，由亚洲中金联盟、亚洲金融协会、全国商业银行联合会、中国金融诚信联盟、818绿色金融日组委会、《金融天下》杂志社等机构联合主办，以“防控金融风险—共筑创新、诚信、绿色的金融生态圈”为主题的第九届中国金融峰会暨2018年度“绿色金融”颁奖盛典将于2018年8月于上海隆重召开，相关部委领导、亚洲知名企业代表、行业专家将隆重出席，数百家主流媒体共同见证。
                  </div>
                </div>
                <!--主办单位-->
                <a name="unit"></a>
                <div class="tab">
                    <div class="title">主办单位</div>
                    <ul>
                        <li>金融科技公司</li>
                        <li>网贷平台</li>
                        <li>互联网金融</li>
                    </ul>
                </div>
                <!--参会相关单位-->
                <a name="join"></a>
                <div class="tab">
                    <div class="title">参会相关单位</div>
                    <ul>
                        <li>金融科技公司</li>
                        <li>网贷平台</li>
                        <li>互联网金融</li>
                    </ul>
                </div>
                <!--会议联系人-->
                <a name="name"></a>
                <div class="tab">
                    <div class="title">会议联系人</div>
                    <ul>
                        <li>姓名 珍珍</li>
                        <li>微信 Quhanguo123</li>
                        <li>电话 13121349367</li>
                    </ul>
                </div>
                <!--会议日程-->
                <a name="date"></a>
                <div class="tab">
                    <div class="title">会议日程</div>
                    <ul>
                        <li>十二项热点议题直击当前金融业关注焦点</li>
                        <li>1 “一行两会”监管机构改革后，监管职能如何调整</li>
                        <li>2 防范金融风险，着力点在哪里</li>
                        <li>3 绿色金融如何发展</li>
                        <li>4 金融业开放新阶段面临的机遇与挑战</li>
                        <li>5 金融科技和资本市场如何服务实体经济</li>
                        <li>6 金融科技创新引领普惠金融发展</li>
                        <li>7 大数据&人工智能、金融科技&监管科技</li>
                    </ul>
                    <span class="upload">附件点击下载.doc</span>
                </div>
                <!--备注-->
                <div class="tab">
                    <div class="title">备注</div>
                    <ul>
                        <li>请认真填写报名信息，报名信息审核通过后会短信通知详细参会信息。</li>
                    </ul>
                </div>
            </div>
        </div>
        <!--对话框-->
        <el-dialog title="请填写报名表单" :visible.sync="dialogFormVisible" class="sign-dialog">
            <el-form :model="form">
                <el-form-item label="报名形式：" :label-width="formLabelWidth">
                    <el-select v-model="form.shape" placeholder="请选择报名形式">
                        <el-option label="以个人形式报名" value="1"></el-option>
                        <el-option label="以单位集体形式报名" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="参会名称：" :label-width="formLabelWidth">
                    <el-input v-model="form.meeting" autocomplete="off" placeholder="请填写您的真实信息"></el-input>
                </el-form-item>
                <el-form-item label="参会人名称：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" placeholder="请填写您的真实信息"></el-input>
                </el-form-item>
                <el-form-item label="所属单位：" :label-width="formLabelWidth">
                    <el-input v-model="form.unit" autocomplete="off" placeholder="请填写您的真实信息"></el-input>
                </el-form-item>
                <el-form-item label="联系方式：" :label-width="formLabelWidth">
                    <el-input v-model="form.mobile" autocomplete="off" placeholder="请填写您的真实信息"></el-input>
                </el-form-item>
                <el-form-item label="到会日期：" :label-width="formLabelWidth">
                    <el-input v-model="form.date" autocomplete="off" placeholder="请填写您的真实信息"></el-input>
                </el-form-item>
                <el-form-item label="乘坐交通工具：" prop="resource" :label-width="formLabelWidth">
                    <el-radio-group v-model="form.traffic">
                        <el-radio label="1">火车</el-radio>
                        <el-radio label="2">飞机</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="车次：" :label-width="formLabelWidth">
                    <el-input v-model="form.train" autocomplete="off" placeholder="请填写您的真实信息"></el-input>
                </el-form-item>
                <el-form-item label="时间：" :label-width="formLabelWidth">
                    <el-input v-model="form.time" autocomplete="off" placeholder="请填写您的真实信息"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogFormVisible = false" class="confirm">确 定</el-button>
                <el-button @click="dialogFormVisible = false" class="cancel">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        dialogTableVisible: false,
        dialogFormVisible: false,
        active:1,
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
        formLabelWidth: '120px'
      }
    },
    methods:{
      tabActive(id) {
        this.active = id
      }
    },
    created() {

    }
  }
</script>
<style lang="less">
    .sign-dialog {
        .el-dialog {
            position: relative;
            width: 1200px;
            .el-dialog__body {
                padding:40px 252px 40px 150px;
                .el-form-item__label {
                    font-size: 18px;
                    color:#000;
                    width:150px !important;
                }
                .el-form-item__content {
                    margin-left: 150px !important;
                }
                .el-select {
                    position: relative;
                    font-size: 14px;
                    display: inline-block;
                    width: 100%;
                    .el-input__inner {
                        color: #da422a;
                    }
                }
                .el-radio-group {
                    text-align: left;
                    font-size: 18px;
                    width:100%;
                    .el-radio__input.is-checked .el-radio__inner {
                        border-color: #da422a;
                        background: #da422a;
                    }
                    .el-radio__input.is-checked+.el-radio__label {
                        color:#da422a;
                    }
                }
            }
            .dialog-footer {
                text-align: center;
                .confirm {
                    margin-right: 75px;
                    background-color: #da422a;
                    border-color: #da422a;
                }
                .cancel {
                    background-color: #e99082;
                    border-color: #e99082;
                    color:#fff;
                }
            }
        }
    }
    .el-select-dropdown.el-popper {
        .el-select-dropdown__item.selected {
            color: #da422a;
        }
    }
</style>
<style lang="less" scoped>
    @import '../../assets/styles/list.less';
    .title_hr{
        background-color: #f8f8f8;
        height: 10px;
        width: 100%;
    }
    .banner_hr{
        width: 1200px;
        position: inherit;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        height: inherit;
    }
    .bar_hr{
        background-color: #026ab3;
        height: 100%;
        width: 27%;
    }
    .detail-table {
        .info {
            width:100%;
            margin-bottom: 52px;
            background: #fff;
            height:320px;
            .img {
                float: left;
                width:574px;
                height:320px;
            }
            .detail {
                width:626px;
                text-align: left;
                float: left;
                padding:0 25px;
                box-sizing: border-box;
                height:320px;
                .title {
                    height:116px;
                    font-size: 26px;
                    color:#026ab3;
                    font-weight: 600;
                    display: table-cell;
                    vertical-align:middle
                }
                .time {
                    font-size: 16px;
                    color:#666666;
                    font-weight: normal;
                    line-height: 42px;
                }
                .icon {
                    color:#026ab3;
                    font-size: 20px;
                    margin-right: 20px;
                }
                .address {
                    font-size: 16px;
                    color:#666666;
                    line-height: 42px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;

                }
                .btn {
                    width:136px;
                    height:46px;
                    line-height: 46px;
                    color:#fff;
                    margin-top: 28px;
                    font-size: 18px;
                    cursor: pointer;
                    background: #da422a;
                    font-weight: 600;
                    text-align: center;
                }
                .wechart {
                    width:110px;
                    text-align: center;
                    float: right;
                    .img {
                        width:74px;
                        height:74px;
                        margin:0 auto;
                        display: block;
                        margin-bottom: 10px;
                    }
                    .name {
                        font-size: 14px;
                        color:#000;
                    }
                }
            }
        }
        .nav-tabs {
            width: 100%;
            height:86px;
            margin-bottom: 20px;
            background: #fff;
            line-height: 86px;
            text-align: center;
            .tab {
                width:224px;
                cursor: pointer;
                color:#000;
                font-size: 24px;
                float: left;
                &.active {
                    color:#026ab3;
                    font-weight: 600;
                    position:relative;
                    &:after {
                        content: '';
                        display: block;
                        width:100%;
                        position: absolute;
                        bottom:0;
                        background: #026ab3;
                        left:0;
                        height:2px;
                     }
                 }
            }
        }
        .nav-content {
            .tab {
                width:100%;
                background: #fff;
                text-align: left;
                padding:14px 30px;
                box-sizing: border-box;
                margin-bottom: 20px;
                .intro {
                    font-size: 18px;
                    color:#666666;
                }
                .title {
                    padding-left: 36px;
                    box-sizing: border-box;
                    position: relative;
                    margin-bottom: 10px;
                    font-size: 24px;
                    font-weight: 600;
                    &:before {
                        content: '';
                        display: block;
                        position: absolute;
                        width:3px;
                        top:50%;
                        transform: translateY(-50%);
                        -webkit-transform: translateY(-50%);
                        background: #026ab3;
                        left:0;
                        height:24px;
                     }
                }
                ul {
                    padding-left: 16px;
                    box-sizing: border-box;
                    list-style: disc;
                    li {
                        line-height: 34px;
                        font-size: 18px;
                        color:#666;
                    }
                }
                .upload {
                    font-size: 18px;
                    color:#da422a;
                    cursor: pointer;
                    text-decoration: underline;
                    font-weight: 600;
                    line-height: 60px;
                }
            }
        }
    }
</style>

