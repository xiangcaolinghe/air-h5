<template>
    <div class="airway-list-page">
        <div class="search-table">

        </div>
    </div>
</template>

<script>
  export default {
    name: '',
    components:{  },
    data(){
      return {
        search:{
          start:'',
          end:'',
          code:'',
          middle:''
        },
        airwayPic:false,
        airwayDetail:false,
        checkList:[],
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      }
    },
    methods:{
      
    },
    created() {

    }
  }
</script>
<style lang="less">
    .airway-list-page {

    }
</style>
