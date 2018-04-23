<template>
  <div class="shopCart">
    <div class="shopCart">
      <div class="content">
        <div class="content-left" @click="listToggle">
          <div class="logo-wrapper">
            <div class="badge" v-show="totalCount">
              {{totalCount}}
            </div>
            <div class="logo" :class="{'active':totalPrice}">
              <i class="icon-shopping_cart"></i>
            </div>
          </div>
          <div class="price" :class="{'active':totalPrice}">
            ￥{{totalPrice}}
          </div>
          <div class="desc">
            另需要配送费￥{{deliveryPrice}}元
          </div>
        </div>
        <div class="content-right" :class="{'enough':totalPrice>=minPrice}">
          {{payDesc}}
        </div>
      </div>
      <div class="ball-container">
<!--        <transition name="drop" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter" v-for="(ball,index) in balls" :key="index">-->
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        <!--</transition>-->
      </div>
      <transition name="transHeight">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="setEmpty()">清空</span>
          </div>
          <div class="list-content" ref="foodlist">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price * food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade-backdrop">
      <div class="backdrop" v-show="showBackdrop" @click="hideBackdrop"></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'shopeCar'
}
</script>

<style lang="scss" scoped>

</style>
