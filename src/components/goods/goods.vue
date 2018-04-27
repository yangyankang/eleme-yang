<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods"  :key="index" :class="index==menuCurrentIndex?'menu-item-selected menu-item':'menu-item'" @click="menuClick(index, $event)">
          <span class="text">
            <iconMap v-show="item.type>0" :iconType="item.type"></iconMap>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="(item,i) in goods" class="food-list food-list-hook" :key="i">
          <h1>{{item.name}}</h1>
          <ul>
            <li v-for="(food, index) in item.foods" class="food-item" @click="goDetail(food)" :key="index">
              <div class="icon">
                <img width="57" height="57" :src="food.icon"/>
              </div>
              <div class="content">
                <h2>{{food.name}}</h2>
                <p class="description" v-show="food.description">{{food.description}}</p>
                <div class="sell-info">
                  <span class="sellCount">月售{{food.sellCount}}份</span>
                  <span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="newPrice"><span class="unit">￥</span>{{food.price}}</span>
                  <span v-show="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cart-control :food="food"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopeCar :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectedFoods"></shopeCar>
    <FoodDetail :food="selectedFood" v-if="selectedFood" ref="foodDetail"></FoodDetail>
  </div>
</template>
<script>
import iconMap from '../iconMap/iconMap'
import shopeCar from '../shopCar/shopeCar'
import FoodDetail from '../foodDetail/foodDetail'
import CartControl from '../cartcontrol/cartcontrol'
import BScroll from 'better-scroll'
export default {
  name: 'goods',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      heightList: [],
      scrollY: 0,
      selectedFood: ''
    }
  },
  components: {
    iconMap,
    shopeCar,
    CartControl,
    FoodDetail
  },
  computed: {
    menuCurrentIndex () { // 左边菜单栏当前索引
      for (let i = 0; i < this.heightList.length; i++) {
        let curDomHeight = this.heightList[i]
        let nextDomHeight = this.heightList[i + 1]
        if (!nextDomHeight || (this.scrollY >= curDomHeight && this.scrollY < nextDomHeight)) {
          return i
        }
      }
      return 0
    },
    selectedFoods () { // 选中的food项
      let foods = []
      for (let good of this.goods) {
        for (let food of good.foods) {
          if (food.count) { // 如果存在count就放到foods数组中
            foods.push(food)
          }
        }
      }
      return foods
    }
  },
  methods: {
    _initScroll () { // 初始化滚动
      this.menuWrapper = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodsWrapper = new BScroll(this.$refs.foodsWrapper, {
        probeType: 3,
        click: true
      })
      this.foodsWrapper.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _caculateHeight () { // 计算高度
      let foodList = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook')
      let height = 0
      this.heightList.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let foodItem = foodList[i]
        height += foodItem.clientHeight
        this.heightList.push(height)
      }
    },
    menuClick (index, event) { // 点击菜单滚动索引所对应的高度数组
      if (!event._constructed) { // 移动端特有
        return false
      }
      this.foodsWrapper.scrollTo(0, -this.heightList[index], 300)
    },
    goDetail (food) { // 点击单个商品将food传入到商品详情页
      this.selectedFood = food
      console.log(food)
      this.$nextTick(() => {
        this.$refs.foodDetail.showToggle()
      })
    }
  },
  created () {
    this.$axios({
      method: 'get',
      url: 'http://192.168.1.10:81/static/data.json'
    })
      .then(rs => {
        this.goods = rs.data.goods
        this.$nextTick(() => { // dom加载完成并且数据渲染完成后执行
          this._initScroll()
          this._caculateHeight()
        })
      })
  }
}
</script>

<style lang="scss" scoped>
.goods {
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
    margin-top: 2px;
    .menu-item {
      position: relative;
      display: table;
      height: 54px;
      line-height: 14px;
      width: 56px;
      padding: 0 12px;
      &:last-child:after {
        content: none;
      }
      &.menu-item-selected {
        background: white;
        font-weight: 700;
        margin-top: -1px;
        &:after {
          border: none;
        }
      }
    }
    .menu-item:after {
      position: absolute;
      content: '';
      left: 12px;
      width: 56px;
      bottom: 0;
      border-bottom: 1px solid rgba(7,17,27,0.1);
    }
    .menu-item {
      .text {
        display: table-cell;
        vertical-align: middle;
        font-size: 12px;
        font-weight: 200;
        white-space: normal;
        line-height: 14px;
        .iconMap {
          vertical-align: middle;
        }
      }
    }
  }
  .foods-wrapper {
    flex: 1;
    margin-top: 2px;
    .food-list {
      h1 {
        height: 26px;
        line-height: 26px;
        padding-left: 12px;
        font-size: 12px;
        color: rgb(147,153,159);
        background: #f3f5f7;
        border-left: 2px solid #d9dde1;
      }
      .food-item {
        position: relative;
        display: flex;
        margin: 0 18px;
        padding: 18px 0;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        .icon {
          flex: 0 0 57px;
        }
        &:last-child {
          border-bottom: none;
        }
        .content {
          flex: 1;
          padding-left: 10px;
          h2 {
            margin: 2px 0 8px 0;
            font-size: 14px;
            line-height: 14px;
            height: 14px;
            font-weight: 700;
          }
          .sell-info,.description {
            font-size: 10px;
            color: rgb(147,153,159);
            line-height: 10px;
            .sellCount {
              margin-right: 4px;
            }
          }
          .description {
            font-size: 10px;
            margin-bottom: 8px;
            line-height: 12px;
          }
          .price {
            font-size: 10px;
            font-weight: 700;
            line-height: 24px;
            .newprice {
              font-size: 14px;
              color: rgb(240,20,20);
              .unit {
                font-size: 10px;
                font-weight: normal;
              }
            }
            .oldPrice {
              text-decoration: line-through;
              color: rgb(147,153,159);
              padding-left: 4px;
            }
          }
        }
      }
    }
  }
  .cartcontrol-wrapper {
    position: absolute;
    right: 0;
    bottom: 12px;
    z-index: 20;
  }
}
</style>
