<template>
  <div>
    <p-header></p-header>
    <p-left></p-left>
      <div class="p-content">
          <router-view/>
      </div>
    <p-footer></p-footer>
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
    }
</style>
