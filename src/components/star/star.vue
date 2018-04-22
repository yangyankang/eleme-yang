<template>
  <div class="star" :class="starType">
    <span class="star-item" v-for="(itemClass,index) in itemClasses" :key="index" :class="itemClass"></span>
  </div>
</template>

<script>
const LEN = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'
export default {
  name: 'star',
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType () {
      return 'star-' + this.size
    },
    itemClasses () {
      let result = [] // 返回的数组
      let score = Math.floor(this.score * 2) / 2// 过滤掉.5的
      let hasDecimal = score % 1 !== 0// 判断是否是.5的
      let intel = Math.floor(score)// 向下先取出整数部分
      for (let i = 0; i < intel; i++) { // 先填充整数部分
        result.push(CLS_ON)
      }
      if (hasDecimal) { // 添加半星星部分
        result.push(CLS_HALF)
      }
      while (result.length < LEN) { // 当前星星的数组长度小于5，就往里添加空星星知道等于5为止
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/style/mixin";
.star {
  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }
  &.star-48 {
    .star-item {
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 100% 100%;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        @include bg-image('star48_on');
      }
      &.half {
        @include bg-image('star48_half');
      }
      &.off {
        @include bg-image('star48_off');
      }
    }
  }
  &.star-36 {
    .star-item {
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 100% 100%;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        @include bg-image('star36_on');
      }
      &.half {
        @include bg-image('star36_half');
      }
      &.off {
        @include bg-image('star36_off');
      }
    }
  }
  &.star-24 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 100% 100%;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        @include bg-image('star24_on');
      }
      &.half {
        @include bg-image('star24_half');
      }
      &.off {
        @include bg-image('star24_off');
      }
    }
  }
}
</style>
