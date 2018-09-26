<template>
  <div>
    <b-header>
        <div slot="right-view">
            <router-view/>
        </div>
    </b-header>
      <b-footer></b-footer>
  </div>
</template>

<script>
  import BHeader from './../../components/bheader.vue'
  import BFooter from './../../components/bfooter.vue'
  export default {
    name: '',
    components:{ BHeader,BFooter },
    created() {

    }
  }
</script>

<style lang="less">
</style>
