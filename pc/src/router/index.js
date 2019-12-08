import Vue from 'vue'
import Router from 'vue-router'
import Product from '@/components/Product'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Index from '@/components/Index'
import CategoryProducts from '@/components/CategoryProducts'
import EWallet from '@/components/account/EWallet'
import Wishlist from '@/components/account/Wishlist'
import Contect from '@/components/account/Contect'
import Order from '@/components/account/Order'
import UserSetting from '@/components/account/UserSetting'
import PayResult from '@/components/account/PayResult'
import SearchProducts from '@/components/SearchProducts'
import Cart from '@/components/Cart'
import Payment from '@/components/Payment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Product',
      name: 'Product',
      component: Product
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment
    },
    {
      path: '/searchProducts',
      name: 'SearchProducts',
      component: SearchProducts
    },
    {
      path: '/account/userSetting',
      name: 'UserSetting',
      component: UserSetting
    },
    {
      path: '/account/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/account/contect',
      name: 'Contect',
      component: Contect
    },
    {
      path: '/account/wishlist',
      name: 'Wishlist',
      component: Wishlist
    },
    {
      path: '/account/eWallet',
      name: 'EWallet',
      component: EWallet
    },
    {
      path: '/account/payResult',
      name: 'PayResult',
      component: PayResult
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/CategoryProducts',
      name: 'CategoryProducts',
      component: CategoryProducts
    }
  ]
})
