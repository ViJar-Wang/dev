<template>
  <div id="app-content">
		<section class="page-header page-header-xs">
			<div class="container">
				<h1>支付</h1>

				<ol class="breadcrumb">
					<li><a href="${root}/pc/index">首页</a></li>
					<li>支付</li>
				</ol>
			</div>
		</section>
		<!-- /PAGE HEADER -->
		<!-- 购物车 -->
		<section>
			<div class="container">
				<!-- CART -->
				<fieldset class="margin-top-10">
					<div class="row">
						<!-- LEFT -->
						<div class="col-lg-9 col-sm-8">
							<div v-if="payResult ==1">
								<strong style='font-size: 20px'>订单支付成功！</strong>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <router-link :to="{path:'/account/order',name:'Order'}" style='font-size: 16px' >
                  到个人中心查看订单>>
                </router-link>
							</div>
							<div v-if="payResult == -1">
								<strong style='font-size: 20px'>余额不足，订单支付失败！</strong>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <router-link :to="{path:'/account/eWallet',name:'Order'}" style='font-size: 16px' >
                  去充值>>
                </router-link>
							</div>
						</div>
						<!-- RIGHT -->
						<div class="col-lg-3 col-sm-4"></div>
					</div>
				</fieldset>
			</div>
		</section>
  </div>
</template>

<script>
export default {
  name: "PayResult",
  data() {
    return {
      payResult:0,
    }
  },
  watch: {
    '$route' (to, from) {
      this.payResult = this.$route.query.payResult;
    }
  },
  created() {
    this.payResult = this.$route.query.payResult;
  },
  methods: {

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
