<template>
  <div id="app-content">
		<section class="page-header page-header-xs">
			<div class="container">
				<h1>个人中心</h1>
				<!-- breadcrumbs -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人中心</el-breadcrumb-item>
          <el-breadcrumb-item>我的订单</el-breadcrumb-item>
        </el-breadcrumb>
				<!-- /breadcrumbs -->

				<!-- page tabs -->
				<ul class="page-header-tabs list-inline">
					<li class="active"><a href="javascript:void(0);" @click="goto('/account/order','Order')">我的订单</a></li>
          <li><a href="javascript:void(0);" @click="goto('/account/contect','Contect')">常用收货地址</a></li>
					<li><a href="javascript:void(0);" @click="goto('/account/wishlist','Wishlist')">我的收藏</a></li>
					<li><a href="javascript:void(0);" @click="goto('/account/userSetting','UserSetting')">个人设置</a></li>
					<li><a href="javascript:void(0);" @click="goto('/account/ewallet','EWallet')">充值</a></li>
				</ul>
				<!-- /page tabs -->
			</div>
		</section>
		<section>
			<div class="container">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h2 class="panel-title">我的订单</h2>
					</div>
					<div class="panel-body">
						<p>
							<span>全部订单</span> <span>未支付订单</span> <span>支付订单</span>
						</p>
					</div>

					<table class="table">
						<thead>
							<tr>
								<th>订单编号</th>
								<th>联系人姓名</th>
								<th>联系人电话</th>
								<th>订单状态</th>
								<th>订单金额</th>
							</tr>
						</thead>
						<tbody id="tbody">
								<tr v-for="z in orderList.orderListData" :key="z.id">
									<td><a href="javascript:void(0)" onclick="orderitem(this)">{{z.orderNum}}</a></td>
									<td>{{z.contactName}}</td>
									<td>{{z.contactMobile}}</td>
									<td v-if="z.status==0 || z.status==null">订单编辑中</td>
									<td v-if="z.status==1">已下单</td>
									<td v-if="z.status==2">配送中</td>
									<td v-if="z.status==3">配送完成</td>
									<td v-if="z.status==4">订单取消</td>
									<td>{{z.price/100}}</td>
								</tr>
						</tbody>
					</table>
					<div id="bootpag" class="pull-right">
            <el-pagination
              @current-change="handleCurrentChange"
              :background="true"
              :current-page="currentPage"
              :page-size="pageSize"
              layout="prev, pager, next"
              :total="total">
            </el-pagination>
          </div>
				</div>
      </div>
		</section>
  </div>
</template>

<script>

export default {
  name: "Order",
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      orderList:[]
    }
  },
  watch: {
    '$route' (to, from) {
      this.getOrder();
    }
  },
  created() {
    this.getOrder()
  },
  methods: {
    handleCurrentChange(val) {
      this.$router.push({path: '/account/order', query: { currentPage: val }});
    },
    goto(path, name) {
      this.$router.push({
        path: path,
        name: name
      })
    },
    getOrder() {
      var userId = this.Storage.Local.get('User').id;
      var vm = this;
      this.$post(vm.API.API_URL_ORDERS,{
        userId:userId,
        type: 0
      }).then(res => {
        if(res.errorCode == 0){
          vm.currentPage = res.data.nowPage;
          vm.total = vm.pageSize * res.data.pageCount;
          vm.orderList = res.data;
        }
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- <style src="../../../static/css/bootstrap.min.css"></style>
<style src="../../../static/css/essentials.css"></style>
<style src="../../../static/css/layout.css"></style>
<style src="../../../static/css/header-1.css"></style>
<style src="../../../static/css/layout-shop.css"></style> -->
<style scoped>
</style>
