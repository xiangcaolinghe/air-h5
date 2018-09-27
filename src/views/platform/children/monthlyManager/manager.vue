<template>
    <div class="container">
      <div class="select_div">
        <div>
          <table>
            <tr>
              <td>
                <div>
                  出发城市：<el-input v-model="startCity" class="i_input" placeholder="请输入内容"/><br/><br/>
                  到达城市：<el-input v-model="endCity" class="i_input" placeholder="请输入内容"/>
                </div>
              </td>
              <td class="select_middle"><br/></td>
              <td>
                <div>
                  匹配类型：
                  <el-checkbox v-model="matching">走向</el-checkbox>
                  <el-checkbox v-model="matching">起点</el-checkbox>
                  <el-checkbox v-model="matching">终点</el-checkbox>
                  <el-checkbox v-model="matching">起止点</el-checkbox><br/><br/>
                </div>
                <div>
                  数据状态：
                  <el-checkbox v-model="matching">已合并</el-checkbox>
                  <el-checkbox v-model="matching">已处理</el-checkbox>
                  <el-checkbox v-model="matching">特别关注</el-checkbox>
                  <el-checkbox v-model="matching">已删除</el-checkbox><br/><br/>
                </div>
                <div>
                  对比数据：
                  <el-checkbox v-model="matching">一号规定</el-checkbox>
                  <el-checkbox v-model="matching">历史批复</el-checkbox>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
</template>

<script>
    /*import ElTable from "element-ui/packages/table/src/table";*/

    export default {
      /*components: {ElTable},
      name: "manager.vue"*/
      data(){
        return{
          startCity: '',
          endCity: '',
          matching: ''
        }
      }
    }
</script>
<style lang="less">
  .el-checkbox__label {
    font-size: 18px;
    color: #333333;
  }
</style>
<style lang="less" scoped>
  .container{
    margin-top: 60px;
    width: 100%;
    height: 100%;
    font-weight: normal;
    font-size: 18px;
    .select_div{
      width: 100%;
      text-align: left;
      div{
        font-size: 18px;
        color: #333333;
        width: 100%;
        table{
          td{
            div{
              .i_input{
                width: 300px;
              }
              .el-checkbox{
                font-size: 18px;
              }
            }
          }
          .select_middle{
            width: 30px;
          }
        }
      }

    }
  }
</style>
