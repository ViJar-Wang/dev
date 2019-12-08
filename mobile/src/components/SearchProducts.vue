<template>
	<div class='container'>
		<div class="page tabbar js_show">
			<div class="page__bd" style="height: 100%;">
				<div class="weui-tab">
					<div class="weui-tab__panel" style='padding-bottom: 100px'>
						<div class="page__hd">
							<h1 class="page__title">检索关键字:"{{productName}}"</h1>
						</div>
<form action="" v-on:submit.prevent="">
  <mt-search
  v-model="searchValue"
  cancel-text="取消"
  placeholder="搜索"
  @keyup.enter.native="search"
  class="font-size-8"
  style="width:100%;height:auto;"
  >
  </mt-search>
</form>

						<!-- 搜索 -->
<!--            <div>
              <form action="" v-on:submit.prevent="">
                <mt-search
                  v-model="productName"
                  cancel-text="取消"
                  placeholder="搜索"
                  @keyup.enter.native="search"
                  class="font-size-8"
                  style="width:100%;height:auto;">
                </mt-search>
              </form>
            </div>
 -->						<div class='weui-panel weui-panel_access'>
							<div class="weui-panel__bd" id="wishlistDiv">
                <div v-for="product in productListPage.productList" :key="product.id">
                  <router-link :to="{path:'/Product',query:{productId:product.id}}" class="weui-media-box weui-media-box_appmsg">
										<div class="weui-media-box__hd">
                      <img class="weui-media-box__thumb" :src="API.BASE_SERVER_URL+product.defaultImg" />
										</div>
										<div class="weui-media-box__bd">
											<h4 class="weui-media-box__title">{{product.name}}</h4>
											<p class="weui-media-box__desc">
												店面价格 <strong class='link'>￥{{product.shopPrice / 100}}</strong>
												市场价格 <del>￥{{product.price / 100}}</del>
											</p>
										</div>
									</router-link>
								</div>
							</div>
							<div class="weui-panel__ft" id="loadMoreDiv" @click="loadMore()" v-if="productListPage.productList.length>0 && productListPage.totalPage != productListPage.currentPage">
								<a href="javascript:void(0);" class="weui-cell weui-cell_access weui-cell_link">
									<div class="weui-cell__bd">查看更多</div><span class="weui-cell__ft"></span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
    name: "SearchProducts",
    data() {
      return {
        searchValue: '',
        productName: '',
        currentPage: 1,
        total: 0,
        productListPage: []
      }
    },
    watch: {
      '$route' (to, from) {
        this.productName = this.$route.query.productName;
        this.currentPage = parseInt(this.$route.query.currentPage);
        this.getProductList();
      }
    },
    created() {
        this.productName = this.$route.query.productName;
        this.currentPage = parseInt(this.$route.query.currentPage);
        this.getProductList();
    },
    methods: {
      search(){
        if (this.searchValue == ""){
           this.Toastr.info("请输入搜索的内容！");
           return;
        }else{
          this.$router.push({
            path: "/searchProducts",
            name: "SearchProducts",
            query: { productName: this.searchValue }
          });
        }
      },
      addWishlist(productId){
        let vm = this;
        var user = this.Storage.Local.get("User");
        var userid = user.id;
        if (user == null){
            this.Toastr.warning('请登录,只有登录后才能操作!');
        }else{
          this.$post(this.API.API_URL_CUSTOMER_ADD_WISHLIST,{productId: productId, userId: userid}).then(res => {
            if (res.data.success) {
			        vm.Toastr.success(res.data.message);
            } else {
			        vm.Toastr.warning(res.data.message);
            }
          })
        }
      },
      getProductList(){
        let vm = this;
        this.$post(
          this.API.API_URL_CATALOG_SEARCH_PRODUCTS,
          {productName: vm.productName, currentPage: vm.currentPage }
        ).then(res => {
          if(res.errorCode == 0 && res.data) {
            vm.productListPage = res.data;
            vm.currentPage = res.data.currentPage;
          }
        })
      },
      loadMore() {
        let vm = this;
        var userId = this.Storage.Local.get('User').id;
          this.$post(
            this.API.API_URL_CATALOG_SEARCH_PRODUCTS,
            {productName: vm.productName, currentPage: vm.currentPage+1}
          ).then(res => {
            if(res.errorCode == 0){
              for (var i=0; i < res.data.productList.length; i++){
                vm.productListPage.productList.push(res.data.productList[i]);
              }
              vm.currentPage = res.data.currentPage;
              vm.productListPage.totalPage=res.data.totalPage;
              vm.productListPage.currentPage=res.data.currentPage;
//          vm.total = res.data.totalPage * res.data.pageSize;
            }
          })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- <style src="../../static/css/swiper.min.css"></style> -->
<style scoped>
  .optionGroup {
    padding: 10px;
  }

  .option {
    padding: 4px;
    border: 1px solid #8ab933;
    border-radius: 3px;
    margin: 2px;
    cursor: pointer;
  }

  .optionSelected {
    background-color: #8ab933;
    color: #fff;
  }

  .quantityBox > .input-group {
    width: 100px;
  }

  <style>
  .optionGroup {
  	padding: 10px;
  }

  .option {
  	padding: 4px;
  	border: 1px solid #8ab933;
  	border-radius: 3px;
  	display: none;
  }

  .optionSelected {
  	background-color: #8ab933;
  	color: #fff;
  }

  .quantityBox>.input-group {
  	width: 100px;
  }

  .swiper-slide {
  	background-position: center;
  	background-size: cover;
  	width: 300px;
  	height: 300px;
  }

  .swiper-container {
  	width: 300px;
  	height: 300px;
  }

</style>
