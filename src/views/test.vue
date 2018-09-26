<template>
    <div class="test-page">
        <div class="lists">
            <el-table
                    :data="tableData"
                    border>
                <el-table-column
                        type="index"
                        label="序号"
                        class="column">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="航线编号">
                </el-table-column>
                <el-table-column
                        prop="province"
                        label="航线名称">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="数据源">
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small">地图展示</el-button>
                        <el-button type="text" size="small">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
  export default {
    name: '',
    components:{  },
    data(){
      return {
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
      handleClick(row,idx) {
        this.airwayPic = true
        console.log(row,idx)
      },
      detailClick(row,idx) {
        this.airwayDetail = true
      }
    },
    created() {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .lists {
        width:100%;
        margin:0 auto;
        min-width: 1200px;
    }
</style>
