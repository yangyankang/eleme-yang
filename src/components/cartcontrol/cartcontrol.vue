<template>
  <div class="cartconrol">
    <transition name="rotate">
      <div class="cart-decrease" @click.stop.prevent="decreaseCount($event)" v-show="food.count > 0">
        <span class="icon-remove_circle_outline inner"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">
      {{food.count}}
    </div>
    <div class="cart-add" @click.stop.prevent="addCount($event)">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cartcontrol',
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCount (event) { // 增加
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        this.$set(this.food, 'count', 0)
      }
      this.food.count++
      this.$root.eventHub.$emit('cart.add', event.target)
    },
    decreaseCount (event) { // 减少
      if (!event._constructed || !this.food.count) {
        return
      }
      this.food.count--
      console.log(this.food.count)
    }
  }
}
</script>

<style lang="scss" scoped>
  .cartconrol {
    .cart-decrease {
      display: inline-block;
      padding: 6px;
      transition: all .4s linear;
      .inner {
        line-height: 24px;
        font-size: 24px;
        color: rgb(0,160,220);
        transition: all 0.4s linear;
      }
      &.rotate-enter-active, &.rotate-leave-active {
        transform: translate3d(0,0,0);
        .inner {
          display: inline-block;
          transform: rotate(0);
        }
      }
      &.rotate-enter, &.rotate-leave-active {
        transform: translate3d(24px,0,0);
        opacity: 0;
        .inner {
          transform: rotate(360deg);
        }
      }
     }
    .cart-count {
      display: inline-block;
      vertical-align: top;
      font-size: 10px;
      color: rgb(147,153,159);
      line-height: 24px;
      text-align: center;
      padding: 6px 0;
    }
    .cart-add {
      display: inline-block;
      vertical-align: top;
      font-size: 24px;
      color: rgb(0,160,220);
      line-height: 24px;
      padding: 6px;
    }
  }
</style>
