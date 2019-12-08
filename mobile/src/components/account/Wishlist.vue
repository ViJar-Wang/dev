<template>
	<div class="page js_show">
		<div class="weui-tab__panel" style='padding-bottom: 100px'>
			<div class="page__hd">
				<h1 class="page__title">我的收藏</h1>
			</div>
			<div class="weui-panel weui-panel_access">
					<div class="weui-panel__bd" style="text-align: center;" v-if="wishlistPage.wishlist.length == 0">
						<h2 style="padding: 30px 0 30px 0">暂无数据！</h2>
					</div>
					<div id="wishlistDiv" class="weui-panel__bd" v-if="wishlistPage.wishlist.length > 0">
            <div v-for="wishlistObj in wishlistPage.wishlist" :key="wishlistObj.id">
              <router-link :to="{path:'/Product',query:{productId:wishlistObj.product.id}}" class="weui-media-box weui-media-box_appmsg">
								<div class="weui-media-box__hd" v-if="wishlistObj.product.defaultImg != null">
                  <img class="weui-media-box__thumb" :src="API.BASE_SERVER_URL+wishlistObj.product.defaultImg"/>
								</div>
								<div class="weui-media-box__bd">
									<h4 class="weui-media-box__title">{{wishlistObj.product.name}}</h4>
									<p class="weui-media-box__desc">
										店内价格：
										<span style='color: green'>￥{{wishlistObj.product.shopPrice / 100}}元</span>
										市场价格：<del>￥{{wishlistObj.product.price / 100}}元</del>
									</p>
								</div>
							</router-link>
            </div>
					</div>
						<div id="loadMoreDiv" class="weui-panel__ft" v-if="wishlistPage.totalPage != wishlistPage.currentPage">
							<a href="javascript:void(0);" @click="loadMore" class="weui-cell weui-cell_access weui-cell_link">
								<div class="weui-cell__bd">查看更多</div><span class="weui-cell__ft"></span>
							</a>
						</div>
			</div>
		</div>
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
    loadMore() {
      let vm = this;
      var userId = this.Storage.Local.get('User').id;
      this.$post(vm.API.API_URL_CUSTOMER_WISHLIST,{
        userId:userId,
        currentPage: vm.currentPage + 1
      }).then(res => {
        if(res.errorCode == 0){
          for (var i=0; i < res.data.wishlist.length; i++){
            vm.wishlistPage.wishlist.push(res.data.wishlist[i]);
          }
          vm.currentPage= res.data.currentPage;
          vm.wishlistPage.totalPage=res.data.totalPage;
          vm.wishlistPage.currentPage=res.data.currentPage;
//          vm.total = res.data.totalPage * res.data.pageSize;
        }
      })
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- <style src="../../../static/css/bootstrap.min.css"></style>
<style src="../../../static/css/essentials.css"></style>
<style src="../../../static/css/layout.css"></style>
<style src="../../../static/css/header-1.css"></style>
<style src="../../../static/css/layout-shop.css"></style> -->
<style scoped>
</style>
