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
              <div class="text"  v-show="!food.count" @click="addCart($event)">加入购物车</div>
            </transition>
          </div>
          <cartcontrol :food="food" v-show="food.count > 0"></cartcontrol>
        </div>
        <Split></Split>
        <div class="desc">
          <div class="title">商品介绍</div>
          <div class="content">{{food.info}}</div>
        </div>
        <Split></Split>
        <div class="evaluation">
          <div class="title">
            商品评价
          </div>
          <div class="classify">
            <span v-for="(item,index) in classifyArr" class="item" :class="{'active':item.active,'bad':index==2,'badActive':item.active&&index==2}" :key="index" @click="filterEvel(item)">
              {{item.name}}<span class="count">{{item.count}}</span>
            </span>
          </div>
          <div class="switch" @click="evelflag=!evelflag">
              <span class="icon-check_circle" :class="{'on':evelflag}"></span>
              <span class="text">只看有内容的评价</span>
          </div>
               <!-- <div class="evel-list">
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
                </div>-->
          </div>
      </div>
    </div>
  </transition>
</template>

<script>
import cartcontrol from '../cartcontrol/cartcontrol'
import Split from '../split/split'
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
      showDetail: false, // 商品详情展示状态
      classifyArr: [{
        name: '全部',
        count: this.food.ratings.length,
        active: true
      }, {
        name: '推荐',
        count: this.food.ratings.filter((data) => data.rateType === 0).length,
        active: false
      }, {
        name: '吐槽',
        count: this.food.ratings.filter((data) => data.rateType).length,
        active: false
      }],
      evelflag: true
    }
  },
  components: {
    cartcontrol,
    Split
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
    },
    addCart (event) {
      if (!event._constructed) {
        return
      }
      this.$set(this.food, 'count', 1)
    },
    filterEvel (item) {
      this.classifyArr.forEach((classItem) => {
        classItem.active = false
      })
      item.active = true
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
        .cartconrol {
          position: absolute;
          right: 12px;
          bottom: 12px;
        }
      }
      .desc {
        padding: 18px;
        .title {
          font-size: 14px;
          font-weight: 500;
          color: #07111b;
          margin-bottom: 6px;
        }
        .content {
          font-size: 12px;
          font-weight: 200;
          color: rgb(77,85,93);
          line-height: 24px;
          padding: 0 8px;
        }
      }
      .evaluation {
        padding: 18px 0;
        position: relative;
        .title {
          padding-left: 18px;
          font-size: 14px;
          font-weight: 500;
          color: #07111b;
        }
        .classify {
          padding: 18px 0;
          margin: 0 18px;
          border-bottom: 1px solid rgba(7,17,27,0.1);
          .item {
            display: inline-block;
            font-size: 12px;
            padding: 8px 12px;
            line-height: 16px;
            background: rgba(0,160,220,0.2);
            color: rgb(77,85,95);
            margin-right: 8px;
            .count {
              font-size: 8px;
              padding-left: 2px;
            }
            &.active {
              color: white;
              background: rgb(0,169,220);
            }
            &.bad {
              background: rgba(77,85,93,0.2);
            }
            &.badActive {
              background: #4d555d;
            }
          }
        }
        .switch {
          font-size: 12px;
          width: 100%;
          padding: 12px 0 12px 18px;
          color: rgb(147,153,159);
          border-bottom: 1px solid rgba(7,17,27,0.1);
          .icon-check_circle {
            font-size: 24px;
            vertical-align: middle;
            &.on {
              color: #00c850;
            }
          }
        }
      }
    }
  }
</style>
