<template>
  <div>
    <b-header>
        <div slot="right-view">
            <router-view/>
        </div>
    </b-header>
    <div class="footer">
      <p-footer></p-footer>
    </div>
  </div>
</template>

<script>
  import BHeader from './../../components/bheader.vue'
  import PFooter from './../../components/pfooter.vue'
  export default {
    name: '',
    components:{ BHeader,PFooter },
    created() {

    }
  }
</script>

<style lang="less">
</style>
