<template>
  <div id="app">
    <header-comp :seller="seller"></header-comp>
    <div class="tab">
      <div class="tab-item">
        <router-link :to="{path: 'goods'}">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path: 'comments'}">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path: 'shops'}">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
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
      seller: {}
    }
  },
  methods: {
    getData () {
      this.$axios({
        method: 'get',
        url: 'http://localhost:8080/static/data.json'
      })
        .then(rs => {
          this.seller = rs.data.seller
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang="scss">
  @import "common/style/index";
  #app {
    .tab {
      display: flex;
      @include border-1px(rgba(7,17,27,0.1));
      .tab-item {
        text-align: center;
        flex: 1;
        height: 40px;
        line-height: 40px;
        a {
          display: block;
          font-size: 14px;
          color: rgb(77,85,93);
          &.active {
            color: rgb(255,20,20);
          }
        }
      }
    }
  }
</style>
