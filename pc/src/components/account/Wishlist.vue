<template>
  <div id="app-content">
		<section class="page-header page-header-xs">
			<div class="container">
				<h1>个人中心</h1>
				<!-- breadcrumbs -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人中心</el-breadcrumb-item>
          <el-breadcrumb-item>我的收藏</el-breadcrumb-item>
        </el-breadcrumb>
				<!-- /breadcrumbs -->

				<!-- page tabs -->
				<ul class="page-header-tabs list-inline">
					<li><a href="javascript:void(0);" @click="goto('/account/order','Order')">我的订单</a></li>
          <li><a href="javascript:void(0);" @click="goto('/account/contect','Contect')">常用收货地址</a></li>
					<li class="active"><a href="javascript:void(0);" @click="goto('/account/wishlist','Wishlist')">我的收藏</a></li>
					<li><a href="javascript:void(0);" @click="goto('/account/userSetting','UserSetting')">个人设置</a></li>
					<li><a href="javascript:void(0);" @click="goto('/account/ewallet','EWallet')">充值</a></li>
				</ul>
				<!-- /page tabs -->
			</div>
		</section>
		<section style="padding-top: 25px">
			<div class="container">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h2 class="panel-title">个人收藏</h2>
					</div>
						<fieldset class="padding-40 " v-if="!wishlistPage.wishlist">
							<div class="row">
								<h4>暂无数据！</h4>
							</div>
						</fieldset>
						<table class="table margin-top-20" v-if="wishlistPage.wishlist">
							<thead>
								<tr>
									<th>商品名称</th>
									<th class="text-center">市场价格</th>
									<th class="text-center">店内价格</th>
									<th class="text-center">操作</th>
								</tr>
							</thead>
							<tbody>
									<tr v-for="wishlistObj in wishlistPage.wishlist" :key="wishlistObj.product.id">
										<td>
											<img class="weui-media-box__thumb" style="width: 65px; height: 65px" :src="API.BASE_SERVER_URL+wishlistObj.product.defaultImg" >
											{{wishlistObj.product.name}}
										</td>
										<td class="text-center">
											<span class="line-through">
												￥{{wishlistObj.product.price / 100}}
											</span>
										</td>
										<td class="text-center">￥{{wishlistObj.product.shopPrice / 100}}</td>
										<td class="text-center">
											<a href="javascript:void(0);" @click="deleteById(wishlistObj.id)">删除收藏</a>
                      <router-link :to="{path:'/Product',query:{productId:wishlistObj.product.id}}" class="shop-item-image">
                        查看商品
                      </router-link>
										</td>
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
  name: "Wishlist",
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      wishlistPage:[]
    }
  },
  watch: {
    '$route' (to, from) {
      this.currentPage = parseInt(this.$route.query.currentPage);
      this.getWishlist()
    }
  },
  created() {
    this.currentPage = parseInt(this.$route.query.currentPage);
    this.getWishlist()
  },
  methods: {
    goto(path, name) {
      this.$router.push({
        path: path,
        name: name
      })
    },
    handleCurrentChange(val) {
      this.$router.push({path: '/account/wishlist', query: { currentPage: val }});
    },
    getWishlist() {
      var userId = this.Storage.Local.get('User').id;
      var vm = this;
      this.$post(vm.API.API_URL_CUSTOMER_WISHLIST,{
        userId:userId,
        currentPage: vm.currentPage
      }).then(res => {
        if(res.errorCode == 0){
          vm.wishlistPage = res.data;
          vm.total = res.data.totalPage * res.data.pageSize;
        }
      })
    },
    deleteById(id) {
      var userId = this.Storage.Local.get('User').id;
      let vm = this;
      this.$post(vm.API.API_URL_CUSTOMER_REMOVE_WISHLIST,{
        userId: userId,
        wishlisId: id
      }).then(res => {
				if(res.errorCode==0){
					window.location.reload();
				}else{
					this.Toastr.info("删除失败!");
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
