<template>
  <div id="app">
    <header-comp></header-comp>
    <div class="tab">
      <div class="tab-item">商品</div>
      <div class="tab-item">评论</div>
      <div class="tab-item">商家</div>
    </div>
  </div>
</template>

<script>
import headerComp from './components/header/header'

export default {
  name: 'App',
  components: {
    headerComp
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
  #app {
    .tab {
      display: flex;
      height: 40px;
      line-height: 40px;
      .tab-item {
        text-align: center;
        flex: 1;
      }
    }
  }
</style>
