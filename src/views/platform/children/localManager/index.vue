<template>
    <div class="local-index">
        <div class="title">处理流程图</div>
        <div class="flow"><img src="./../../../../assets/images/flow-local.jpg" alt="" class="img"></div>
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

<style lang="less">
    .local-index {
        .title {
            font-size: 20px;
            text-align: left;
            font-weight: 600;
            line-height: 85px;
        }
        .flow {
            background: #fff;
            width:100%;
            padding:50px;
            box-sizing:border-box;
            .img {
                width:100%;
                display: block;
            }
        }
    }
</style>
