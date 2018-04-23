import Vue from 'vue'
import Router from 'vue-router'
import goods from '@/components/goods/goods'
import comments from '@/components/comments/comments'
import shops from '@/components/shops/shops'
Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'goods'
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/comments',
      name: 'comments',
      component: comments
    },
    {
      path: '/shops',
      name: 'shops',
      component: shops
    }
  ]
})
