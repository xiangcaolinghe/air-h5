<template>
  <div class="nav_left">
    <div class="">
      <ul>
        <li><a href="javascript:;"><div><div>月度上报流程</div></div></a></li>
        <li><a href="javascript:;"><div><div>上报数据导入</div></div></a></li>
        <li><a href="javascript:;"><div><div>上报数据管理</div></div></a></li>
        <li><a href="javascript:;"><div><div>上报数据统计</div></div></a></li>
        <li><a href="javascript:;"><div><div>批复数据导入</div></div></a></li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'PLeft'
    }
</script>

<style lang="less" scoped>
  .nav_left{
    background-color: #003b64;
    width: 16%;
    min-height: 880px;
    font-weight: bolder;
    font-size: 18px;
  }
  .nav_list{
    background-color: #026ab3;
    width: 70%;
    height: 100%;
    float: right;
  }
  .nav_left li{
    list-style: none;
    height: 85px;
  }
  .nav_left li a div{
   height: 100%;
  }
  .nav_left li a div div{
    height: 50%;
  }
  .nav_left li a div div{
    margin-left: 20px;
    padding-top: 30px;
  }
  a,a:hover{
    text-decoration:none;//去掉下划线
    color: #a3afbc;
  }
  li div:hover{
    color: #003b64;
    background-color: white;
  }
</style>
