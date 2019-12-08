<template>
  <div class="page-tabbar">
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="首页">
        <router-link :to="{path:'/'}">
          <i class="fa fa-home weui-tabbar__icon" aria-hidden="true"></i>
          <p class="weui-tabbar__label">首页</p>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="购物车">
        <router-link :to="{path:'/Cart'}">
          <span id="cartCount" class="cornerMark">{{cartCount}}</span>
          <i class="fa fa-shopping-cart weui-tabbar__icon " aria-hidden="true"></i>
          <p class="weui-tabbar__label">购物车</p>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="会员中心">
        <a href="javascript:void(0);" @click="gotoAccountCenter()">
          <i class="fa fa-user weui-tabbar__icon" aria-hidden="true"></i>
          <p class="weui-tabbar__label">会员中心</p>
        </a>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      selected:"首页",
      user: null,
      cartCount: ""
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
    this.getCartCount();
  },
  methods: {
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
    gotoAccountCenter(){
      let vm = this;
      var user = this.Storage.Local.get("User");
      console.log(user);
      if (user != null){
        this.$router.push({path:'/account/index'});
      }else{
        this.$router.push({path:'/Login'});
      }
    }
  }
};


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cornerMark {
  	display: inline-block;
  	padding: 0.1rem 0.25rem 0.14rem 0.30rem;
  	font-size: 0.6rem;
  	line-height: 1;
  	color: #ffffff;
  	background-color: rgba(239, 28, 16, 0.7);
  	border-radius: 5rem;
  	position: absolute;
  	margin-left: 1rem;
  }

</style>
