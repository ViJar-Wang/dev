<template>
  <div>
    <div id="topBar">
      <template v-if="user!=null">
        <el-menu :default-active="'2'" class="el-menu-demo" mode="horizontal">
          <el-submenu index="2" style="float: right">
            <template slot="title">
              <i class="fa fa-user hidden-xs"></i> 会员中心
            </template>
            <el-menu-item index="2-1">
              <li>
                <a tabindex="-1" @click="goto('/account/order','Order')">
                  <i class="fa fa-history"></i>订单历史
                </a>
              </li>
            </el-menu-item>
            <el-menu-item index="2-2">
              <li>
                <a tabindex="-1" @click="goto('account/wishlist','Wishlist')">
                  <i class="fa fa-bookmark"></i>收藏夹
                </a>
              </li>
            </el-menu-item>
            <el-menu-item index="2-3">
              <li>
                <a tabindex="-1" @click="goto('/account/contect','Contect')">
                  <i class="fa fa-edit"></i>常用收货地址
                </a>
              </li>
            </el-menu-item>
            <el-menu-item index="2-4">
              <li>
                <a tabindex="-1" @click="goto('/account/user_setting','UserSetting')">
                  <i class="fa fa-cog"></i>个人设置
                </a>
              </li>
            </el-menu-item>
            <el-menu-item index="2-5">
              <li>
                <a tabindex="-1" @click="goto('/account/ewallet','EWallet')">
                  <i class="fa fa-money"></i>充值
                </a>
              </li>
            </el-menu-item>
            <el-menu-item index="2-6">
              <li>
                <a tabindex="-1" @click="logout">
                  <i class="fa fa-sign-out"></i>退出
                </a>
              </li>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="3" style="float: right">
            <li class="text-welcome hidden-xs">
              <template v-if="user.id">欢迎</template>
              <strong v-if="user.nickname">{{user.nickname}}</strong>
              <strong v-else>{{user.userName}}</strong>
            </li>
          </el-menu-item>
        </el-menu>
      </template>
      <template v-else>
        <el-menu :default-active="'2'" router class="el-menu-demo" mode="horizontal">
          <el-menu-item style="float: right" index="/register">
            <router-link to class="sysBuilding">注册</router-link>
          </el-menu-item>
          <el-menu-item style="float: right" index="/login">
            <router-link to class="sysBuilding">登录</router-link>
          </el-menu-item>
        </el-menu>
      </template>
    </div>
  <div id="header" class="sticky clearfix">
  	<!-- TOP NAV -->
  	<header id="topNav">
  		<div class="container">

  			<!-- Mobile Menu Button -->
  			<button class="btn btn-mobile" data-toggle="collapse"
  				data-target=".nav-main-collapse">
  				<i class="fa fa-bars"></i>
  			</button>

  			<!-- BUTTONS -->
  			<ul class="pull-right nav nav-pills nav-second-main">

  				<!-- QUICK SHOP CART -->
  				<li class="quick-cart"><a href="javascript:void(0)" @click="showCart()"> <span
  						id="cartItems" class="badge badge-aqua btn-xs badge-corner">{{cartCount}}</span>
 							<i class="fa fa-shopping-cart" v-if="user != null"></i>
  				</a>
  					<div class="quick-cart-box" v-show="cartShowFlag">
  						<h4>购物车</h4>
  						<div id="divCart" class="quick-cart-wrapper">
<!--  							<a id="cartnoitems" class="text-center" href="javascript:void(0)"
  								style="display: none">
  								<h6>0 ITEMS ON YOUR CART</h6>
  							</a> -->
              <a href="javascript:void(0)" v-for="z in cart.orderItemList" :key="z.id" @click="gotoCart(z.productList[0].id)">
                <img :src="API.BASE_SERVER_URL+z.productList[0].defaultImg" width="45" height="45" alt="" />
                <h6>
                  <span>{{z.quantity}}</span>{{z.productList[0].name}}
                </h6>
                <small>{{(z.price*z.quantity)/100}}</small></a>
  						</div>
  						<!-- quick cart footer -->
  						<div class="quick-cart-footer clearfix">
  							<a href="javascript:void(0)" @click="showCartItem()"
  								class="btn btn-primary btn-xs pull-right">VIEW CART</a> <span
  								id="sumprice" class="pull-left">¥{{cart.price/100}}</span>
  						</div>
  						<!-- /quick cart footer -->
  					</div></li>
  				<!-- /QUICK SHOP CART -->
  			</ul>
  			<div class='row'>
  				<div class='col-lg-3 col-sm-3'>
            <router-link :to="{path:'/'}"  class="logo pull-left">
              <img src="../../../static/images/logo.gif" />
            </router-link>
  				</div>
  				<div class='col-lg-6 col-sm-6' style='padding-top: 30px'>
  					<div class="search-box" style="display: block;">
  							<div class="input-group">
  								<input type="text" v-model='productName' placeholder="请输入查询关键字" class="form-control">
<!--                  <input type='hidden' name='keyword' value="${keyword}" id='encodeKeyword'> -->
                  <span class="input-group-btn">
  									<button @click="searchProduct()" class="btn btn-primary" type="button">搜索</button>
  								</span>
  							</div>
  					</div>
  				</div>
  			</div>
  		</div>
  	</header>
  </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      productName: "",
      user: null,
      cartCount: "",
      cartList: null,
      cartShowFlag: false,
      cart:{
        price:0,
        orderItemList:[]
      }
    };
  },
  computed: {
    getUser() {
      return this.$store.state.user;
    },
    cartCountFromStore() {
      return this.$store.state.cartCount;
    }
  },
  created() {
    var user = this.Storage.Local.get("User");
    this.displayUserInfo(user);
    this.getCartCount();
    this.getCart();
  },
  methods: {
    gotoCart(productId){
       this.$router.push({path:'/Product',query:{productId:productId}});
    },
    showCart(){
      this.cartShowFlag = true;
      console.log("---------------");
				var _quick_cart_box = jQuery('li.quick-cart div.quick-cart-box');
				if (_quick_cart_box.is(":visible")) {
					_quick_cart_box.fadeOut(300);
				} else {
					_quick_cart_box.fadeIn(300);
					//divCart("${root}","?${_csrf.parameterName}=${_csrf.token}");
				}
    },
    showCartItem(){
        var _quick_cart_box = jQuery('li.quick-cart div.quick-cart-box');
				_quick_cart_box.fadeOut(300);
        this.cartShowFlag = false;
        this.$router.push({path: "/Cart",name: "Cart"});
    },
    getCartCount(){
      let vm = this;
      var user = this.Storage.Local.get("User");
      if (user){
        this.$post(this.API.API_URL_CART_COUNT,{id: user.id}).then(res => {
          if (res) {
            vm.cartCount = res.data;
          }
        })
      }
    },
    getCart(){
        let vm = this;
        var user = this.Storage.Local.get("User");
        if (user != null){
          this.$post(this.API.API_URL_CART,{userId: user.id, type: 1}).then(res => {
            if(res.errorCode == 0 && res.data) {
              vm.cart = res.data
            }
          })
        }
    },
    searchProduct() {
      var path = this.$route.path;
//      console.log("------searchProduct-------");
/*      if (path == "/searchProducts") {
        this.$store.commit("setKeyword", this.productName);
      } else { */
        if (this.productName) {
          this.$router.push({
            path: "/searchProducts",
            name: "SearchProducts",
            query: { productName: this.productName }
          });
/*          var params = {
            name: this.productName
          };
          this.Storage.Session.set("data", params); */
        }
//      }
    },
    logout() {
      this.user = null;
      this.Storage.Local.remove("User");
      this.cartCount = "";
      if (this.$route.path.indexOf("/account") != -1) {
        this.$router.push({
          path: "/login",
          name: "Login",
          params: {
            msg: "您还未登录，请登录！"
          }
        });
      }
    },
    displayUserInfo(user) {
      this.user = user;
    },
    hidePanel(e) {
      if (!this.$refs.box.contains(e.target)) {
        this.cartShowFlag = false;
        document.removeEventListener("click", this.hidePanel, false);
      }
    },
    goto(path, name, val) {
      this.$router.push({
        path: path,
        name: name
      });
      if (val) {
        this.Storage.Session.set("data", {
          id: val
        });
      }
      if (path == "/account/cart") {
        this.cartShowFlag = false;
      }
    },
    viewCartProduct(productId) {
      if (this.$route.path == "/product") {
        this.$store.commit("setCartProductId", productId);
      } else {
        this.goto("/product", "Product", productId);
      }
    },hiddenshow(){

    }
  },
  watch: {
    getUser: function(newVal, oldVal) {
      this.displayUserInfo(newVal);
      this.getCartCount();
    },
    cartCountFromStore: function(newVal, oldVal) {
      if (this.cartCount != newVal) {
        this.getCartCount();
      }
    }
  }
};
</script>

<style scoped>
.showCart {
  display: block !important;
}
</style>
