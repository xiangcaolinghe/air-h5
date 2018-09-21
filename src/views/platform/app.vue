<template>
  <div>
    <p-header>
        <div slot="right-view">
            <router-view/>
        </div>
    </p-header>
      <!--<div class="p-content">-->
          <!--<div class="view">-->

          <!--</div>-->
      <!--</div>-->
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

  .footer{
    margin-top: 890px;
  }
</style>
