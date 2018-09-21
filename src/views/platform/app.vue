<template>
  <div>
    <p-header></p-header>
      <div class="p-content">
          <!--<p-left></p-left>-->
          <div class="view">
              <router-view/>
          </div>
      </div>
    <div class="footer">
      <p-footer></p-footer>
    </div>
  </div>
</template>

<script>
  import PHeader from './../../components/pheader.vue'
  import PFooter from './../../components/pfooter.vue'
  import PLeft from './../../components/leftnavigation.vue'
  export default {
    name: '',
    components:{ PHeader,PLeft,PFooter },
    created() {

    }
  }
</script>

<style lang="less">
    .p-content {
        width:100%;
        display: flex;
        .view {
            flex: 1;
        }
    }
  .footer{
    margin-top: 890px;
  }
</style>
