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
        <div class="notice">
            <div class="title">通知公告 <span class="more">更多</span></div>
            <div class="n-lists">
                <div class="n-list">
                    <i class="icon iconfont icon-ep--"></i>
                    2018年5月新增班机航线批复
                </div>
            </div>
        </div>
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
        .progress-table {
            width:900px;
            height:3px;
            position: relative;
            background: #003b64;
            margin:54px auto 160px;
            .cell {
                width:25%;
                top:-15px;
                position: absolute;
                .icon {
                    font-size: 30px;
                    padding: 0 10px;
                    background: #f8f8f8;
                    color:#003b64;
                }
                .step {
                    margin: 46px auto 0;
                    background: #003b64;
                    color:#fff;
                    line-height: 40px;
                    text-align: center;
                    height:40px;
                    width:110px;
                    font-size: 16px;
                }
                &:nth-child(1) {
                    left:0;
                    transform: translateX(-50%);
                 }
                &:nth-child(2) {
                     left:33%;
                     transform: translateX(-50%);
                 }
                &:nth-child(3) {
                     left:66%;
                     transform: translateX(-50%);
                     .step {
                         width:188px;
                     }
                 }
                &:nth-child(4) {
                     right:0;
                     transform: translateX(50%);
                    .step {
                        width:188px;
                    }
                 }
            }
        }
        .notice {
            .title {
                padding:0;
                position: relative;
                .more {
                    position: absolute;
                    top:50%;
                    right:0;
                    width:85px;
                    height:40px;
                    line-height: 40px;
                    background: #003b64;
                    font-size: 18px;
                    text-align: center;
                    color:#fff;
                    cursor: pointer;
                }
            }
            .n-lists {
                width:100%;
                .n-list {
                    height:56px;
                    line-height: 56px;
                    cursor: pointer;
                    color:#000;
                    text-align: left;
                    border-bottom: 1px solid #ccc;
                    .icon {
                        font-size: 22px;
                        margin:0 30px 0 10px;
                        color:#666;
                        font-weight: 500;
                    }
                    &:hover {
                         color:#666;
                     }
                }
            }
        }
    }
</style>
