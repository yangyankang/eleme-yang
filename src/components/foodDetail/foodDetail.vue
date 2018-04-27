<template>
  <transition name="move">
    <div class="detailWrapper" v-show="showDetail" ref="detailWrapper">
      <div class="foodDetail">
        <div class="back" @click="showToggle()">
          <i class="icon-arrow_lift"></i>
        </div>
        <img :src="food.image" height="425" width="100%">
        <div class="info">
          <div class="title">{{food.name}}</div>
          <div class="desc">
            <span>月售{{food.sellCount}}</span>
            <span>好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="unit">￥</span>{{food.price}}
            <span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="shopCart">
            <transition name="fade">
              <div class="text"  v-show="!food.count">加入购物车</div><!--@click="addCart($event)"-->
            </transition>
          </div>
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <!--      <div class="divider"></div>
              <div class="desc">
                <div class="title">商品介绍</div>
                <div class="content">{{food.info}}</div>
              </div>
              <div class="divider"></div>
              <div class="evaluation">
                <div class="title">
                  商品评价
                </div>
                <div class="classify">
                    <span v-for="(item,index) in classifyArr" class="item" :class="{'active':item.active,'bad':index==2,'badActive':item.active&&index==2}" :key="index">&lt;!&ndash; @click="filterEvel(item)"&ndash;&gt;
                      {{item.name}}<span class="count">{{item.count}}</span>
                    </span>
                </div>
                <div class="switch">&lt;!&ndash;@click="evelflag=!evelflag"&ndash;&gt;
                  <span class="icon-check_circle"></span>&lt;!&ndash; :class="{'on':evelflag}"&ndash;&gt;
                  <span class="text">只看有内容的评价</span>
                </div>
                <div class="evel-list">
                  <ul>
                    <li class="evel" v-for="(evel,index) in evelArr" :key="index">
                      <div class="userInfo">
                        <div class="time">{{evel.rateTime | time}}</div>
                        <div class="user">
                          <span>{{evel.username}}</span>
                          <span class="avatar"><img :src="evel.avatar" width="12" height="12"></span>
                        </div>
                      </div>
                      <div class="content">
                        <span class="icon" :class="evel.rateType?'icon-thumb_down':'icon-thumb_up'"></span>
                        <span class="text">{{evel.text}}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>-->
      </div>
    </div>
  </transition>
</template>

<script>
import cartcontrol from '../cartcontrol/cartcontrol'
import BScroll from 'better-scroll'
export default {
  name: 'foodDetail',
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      showDetail: false // 商品详情展示状态
    }
  },
  components: {
    cartcontrol
  },
  methods: {
    showToggle () { // 展示详情切换
      this.showDetail = !this.showDetail
      if (this.showDetail) {
        this.$nextTick(() => {
          this._initScroll()
        })
      }
    },
    _initScroll () { // better-scroll初始化
      if (!this.detailWrapper) { // 不存在就实例化better-scroll
        this.detailWrapper = new BScroll(this.$refs.detailWrapper, {
          click: true
        })
      } else { // 存在就重新刷新
        this.detailWrapper.refresh()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .detailWrapper {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    width: 100%;
    background: white;
    transition: all 0.4s ease;
    &.move-enter-active, &.move-leave {
      transform: translate3d(0, 0, 0)
    }
    &.move-enter, &.move-leave-active {
      transform: translate3d(100%, 0, 0)
    }
    .foodDetail {
      .back {
        position: absolute;
        color: white;
        top: 12px;
        left: 6px;
        font-size: 20px;
        padding: 10px;
      }
      .info {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        padding: 18px;
        .title {
          font-size: 14px;
          font-weight: 700;
          color: rgb(7,17,27);
          line-height: 14px;
        }
        .desc {
          display: flex;
          padding: 0;
          padding-top: 8px;
          font-size: 10px;
          color: rgb(147,153,159);
          line-height: 10px;
          span:last-child {
            padding-left: 12px;
          }
        }
        .price {
          display: flex;
          padding-top: 18px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240,20,20);
          line-height: 24px;
          .unit {
            font-size: 10px;
            font-weight: normal;
          }
          .oldPrice {
            padding-left: 12px;
            font-size: 10px;
            font-weight: normal;
            color: rgb(147,153,159);
            line-height: 24px;
          }
        }
        .shopCart {
          position: absolute;
          right: 18px;
          bottom: 18px;
          height: 24px;
          text-align: center;
          z-index: 2;
          .text {
            box-sizing: border-box;
            height: 100%;
            line-height: 24px;
            color: white;
            font-size: 10px;
            padding: 0 12px;
            border-radius: 12px;
            background: rgb(0,160,220);
            &.fade-enter-active,&.fade-leave-active{
              transition: opacity .2s;
            }
            &.fade-enter,&.fade-leave-active{
              opacity: 0;
            }
          }
        }
        .cartcontrol {
          position: absolute;
          right: 12px;
          bottom: 12px;
        }
      }
    }
  }
</style>
