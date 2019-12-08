<template>
	<div class="page js_show">
		<div class="page__hd">
			<h1 class="page__title">会员中心</h1>
		</div>
		<div class="weui-grids">
        <router-link :to="{path:'/account/order'}" class="weui-grid" >
            <div class="weui-grid__icon">
                <img src="../../../static/image/Shopping-bag-3@3x.png" alt="">
            </div>
            <p class="weui-grid__label">订单历史</p>
        </router-link>
        <router-link :to="{path:'/account/contect'}" class="weui-grid" >
            <div class="weui-grid__icon">
                <img src="../../../static//image/User-V@3x.png" alt="">
            </div>
            <p class="weui-grid__label">常用联系人</p>
        </router-link>
        <router-link :to="{path:'/account/wishlist',query:{currentPage:1}}" class="weui-grid" >
            <div class="weui-grid__icon">
                <img src="../../../static/image/Tag-2@3x.png" alt="">
            </div>
            <p class="weui-grid__label">我的收藏</p>
        </router-link>
        <router-link :to="{path:'/account/userSetting'}" class="weui-grid" >
            <div class="weui-grid__icon">
                <img src="../../../static/image/Settings-3@3x.png" alt="">
            </div>
            <p class="weui-grid__label">会员设置</p>
        </router-link>
        <router-link :to="{path:'/account/ewallet'}" class="weui-grid" >
            <div class="weui-grid__icon">
                <img src="../../../static/image/Settings-3@3x.png" alt="">
            </div>
            <p class="weui-grid__label">电子钱包充值</p>
        </router-link>
        <a href="javascript:void(0)" @click="logout" class="weui-grid">
            <div class="weui-grid__icon">
              <img src="../../../static/image/Lock-square@3x.png" alt="" />
            </div>
            <p class="weui-grid__label">退出</p>
        </a>
    </div>
	</div>
 </template>

<script>
export default {
  name: "AccountIndex",
  data() {
    return {
      account: '',
      msg: null,
      userAccount: {
        amount: 0
      }
    }
  },
  created() {
    this.getUserAccount()
  },
  methods: {
    getUserAccount() {
      var userId = this.Storage.Local.get('User').id;
      var vm = this;
      this.$post(vm.API.API_URL_CUSTOMER_Account,{
        userId:userId
      }).then(res => {
        if(res.errorCode == 0){
          this.userAccount = res.data;
        }
      })
    },
    recharge() {
      if(this.account.length == 0) {
        this.msg = '充值金额不能为空';
      } else if(this.account <= 0) {
        this.msg = '充值金额不能为负数或0'
      } else {
        var vm = this;
        var userId = this.Storage.Local.get('User').id;
        vm.msg = '';
        this.$post(vm.API.API_URL_CUSTOMER_Recharge_Account,{
          userId:userId,
          amount: vm.account
        }).then(res => {
          if(res.errorCode == 0 && res.data) {
            vm.account = '';
            vm.getUserAccount();
            vm.Toastr.success("充值成功！");
          }else {
            vm.Toastr.error("充值失败！");
          }
        });
      }
    },
    logout() {
//      this.user = null;
      this.Storage.Local.remove("User");
      this.cartCount = "";
//      if (this.$route.path.indexOf("/account") != -1) {
        this.$router.push({
          path: "/login",
          name: "Login"
        });
//      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
