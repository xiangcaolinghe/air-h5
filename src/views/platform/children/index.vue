<template>
    <div class="p-index">
        <div class="title">季度申请进度预览</div>
        <div class="intro">2018年夏秋季班级航线批复已下发，请各公司注意查看通知公告</div>
        <ul class="progress-table">
            <li class="cell">
                <i class="icon iconfont icon-yuanhuan"></i>
                <div class="step">1.公司申报</div>
            </li>
            <li class="cell">
                <i class="icon iconfont icon-yuanhuan"></i>
                <div class="step">2.审核</div>
            </li>
            <li class="cell">
                <i class="icon iconfont icon-yuanhuan"></i>
                <div class="step">3.上报并等待批复</div>
            </li>
            <li class="cell">
                <i class="icon iconfont icon-yuanhuan"></i>
                <div class="step">4.核对并上发批复</div>
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: '',
    components:{  },
    created() {

    }
  }
</script>

<style lang="less" scoped>
    .p-index {
        width:100%;
        .title {
            padding-top: 40px;
            line-height: 48px;
            font-size: 22px;
            color:#003b64;
            text-align: left;
            font-weight: 600;
        }
        .intro {
            color:#ff2020;
            font-size: 18px;
            text-align: left;
            line-height: 40px;
        }
    }
</style>
