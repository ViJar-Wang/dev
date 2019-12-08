import Vue from 'vue'
import Router from 'vue-router'
import Product from '@/components/Product'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Index from '@/components/Index'
import Cart from '@/components/Cart'
import Payment from '@/components/Payment'
import SearchProducts from '@/components/SearchProducts'

import AcccountIndex from '@/components/account/Index'
import EWallet from '@/components/account/EWallet'
import Contect from '@/components/account/Contect'
import Order from '@/components/account/Order'
import Wishlist from '@/components/account/Wishlist'
import UserSetting from '@/components/account/UserSetting'
import Orderdetail from '@/components/account/OrderDetail'

import Test from '@/components/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/account/orderdetail',
      name: 'Orderdetail',
      component: Orderdetail,
      meta: {
        title: '订单详情'
      }
    },
    {
      path: '/Product',
      name: 'Product',
      component: Product,
      meta: {
        title: '商品'
      }
    },
    {
      path: '/searchProducts',
      name: 'SearchProducts',
      component: SearchProducts,
      meta: {
        title: '搜索商品'
      }
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {
        title: '用户登录'
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        title: '用户注册'
      }
    },
    {
      path: '/account/index',
      name: 'AccountIndex',
      component: AcccountIndex,
      meta: {
        title: '会员中心'
      }
    },
    {
      path: '/account/contect',
      name: 'Contect',
      component: Contect,
      meta: {
        title: '常用联系人'
      }
    },
    {
      path: '/account/wishlist',
      name: 'Wishlist',
      component: Wishlist,
      meta: {
        title: '我的收藏'
      }
    },
    {
      path: '/account/order',
      name: 'Order',
      component: Order,
      meta: {
        title: '我的订单'
      }
    },
    {
      path: '/account/userSetting',
      name: 'UserSetting',
      component: UserSetting,
      meta: {
        title: '个人设置'
      }
    },
    {
      path: '/account/ewallet',
      name: 'EWallet',
      component: EWallet,
      meta: {
        title: '电子钱包充值'
      }
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: Cart,
      meta: {
        title: '购物车'
      }
    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment,
      meta: {
        title: '支付'
      }
    },
  ],
	mode:'history'
})
