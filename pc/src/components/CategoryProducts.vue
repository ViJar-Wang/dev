<template>
  <div id="app-content">
		<section class="page-header page-header-xs">
			<div class="container">
				<h1>当前分类：{{categoryObject.name}}</h1>
			</div>
		</section>

		<section>
			<div class="container">
				<div id='page'></div>
				<div class='row'>
				<div class='col-lg-9 col-md-9 col-sm-9 col-lg-push-3 col-md-push-3 col-sm-push-3'>

					<ul class="shop-item-list row list-inline nomargin">

						<!-- 产品-->
						<li class="col-lg-3 col-sm-3" v-for="product in productListPage.productList" :key="product.id">
							<div class="shop-item">
								<div class="thumbnail">
                    <router-link :to="{path:'/Product',query:{productId:product.id}}" class="shop-item-image">
                      <img class="img-responsive" :src="API.BASE_SERVER_URL+product.defaultImg"  />
                    </router-link>
									<div class="shop-option-over">
										<a class="btn btn-default add-wishlist" @click="addWishlist(product.id)" href="javascript:void(0);" data-item-id="1" data-toggle="tooltip" title="添加收藏">
											<i class="fa fa-heart nopadding"></i>
										</a>
									</div>
									<!-- /hover buttons -->
									<!-- product more info -->
									<div class="shop-item-info">
									</div>
									<!-- /product more info -->
								</div>
								<div class="shop-item-summary text-center">
									<h2>{{product.name}}</h2>
									<!-- price -->
									<div class="shop-item-price">
										<span class="line-through">￥{{product.price / 100}}</span>￥{{product.shopPrice / 100}}
									</div>
									<!-- /price -->
								</div>
								<!-- /buttons -->
							</div>
						</li>
						<!-- /产品 -->

					</ul>
					<hr />
					<!-- Pagination Default -->
					<div name="bootpagFooter" class="text-center" v-if="productListPage.productList != null && productListPage.productList.length >0">
            <el-pagination
              @current-change="handleCurrentChange"
              :background="true"
              :current-page="currentPage"
              :page-size="8"
              layout="prev, pager, next"
              :total="total">
            </el-pagination>
          </div>
					<!-- /Pagination Default -->
				</div>

				<div class="col-lg-3 col-md-3 col-sm-3 col-lg-pull-9 col-md-pull-9 col-sm-pull-9">

							<!-- CATEGORIES -->
							<div class="side-nav margin-bottom-60">
								<div class="side-nav-head">
									<button class="fa fa-bars"></button>
									<h4>分类</h4>
								</div>
								<ul class="list-group list-group-bordered list-group-noicon uppercase">
											<li class="list-group-item" v-for="categoryInfo in categoryList" :key="categoryInfo.id">
                        <router-link :to="{path:'/CategoryProducts',query:{categoryId:categoryInfo.id, currentPage:1}}"><span class="size-11 text-muted pull-right"></span>{{categoryInfo.name}}</router-link>
                      </li>
										<li class="list-group-item">
                        <router-link :to="{path:'/CategoryProducts'}"><span class="size-11 text-muted pull-right"></span>查看更多分类 >></router-link>
										</li>
								</ul>
							</div>
						</div>
				</div>
			</div>
		</section>
  </div>
</template>

<script>
  export default {
    name: "CategoryProducts",
    data() {
      return {
        total: 0,
        categoryId: 0,
        currentPage: 1,
        categoryObject: {
          name:''
        },
        productListPage: [],
        categoryList: [],
      }
    },
    watch: {
      '$route' (to, from) {
        this.categoryId = parseInt(this.$route.query.categoryId);
        this.currentPage = parseInt(this.$route.query.currentPage);
        this.getCategory(this.categoryId);
        this.getProductList(this.categoryId, this.currentPage);
        this.getCategoryList(this.categoryId, this.currentPage);
      }
    },
    created() {
        this.categoryId = parseInt(this.$route.query.categoryId);
        this.currentPage = parseInt(this.$route.query.currentPage);

        this.getCategory(this.categoryId);
        this.getProductList(this.categoryId, this.currentPage);
        this.getCategoryList(this.categoryId, this.currentPage);
    },
    methods: {
      handleCurrentChange(val) {
        this.$router.push({path: '/CategoryProducts', query: { categoryId: this.categoryId, currentPage: val }});
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
      getCategory(categoryId){
        this.$post(this.API.API_URL_CATEGORY,{categoryId: categoryId}).then(res => {
          if(res.errorCode == 0 && res.data) {
            this.categoryObject = res.data
          }
        })
      },
      getProductList(categoryId, currentPage){
        this.$post(this.API.API_URL_CATALOG_PRODUCT,{categoryId: categoryId, currentPage: currentPage}).then(res => {
          if(res.errorCode == 0 && res.data) {
            this.productListPage = res.data;
            this.total = res.data.totalCount;
          }
        })
      },
      getCategoryList(categoryId, currentPage){
        this.$post(this.API.API_URL_CATEGORY_CONDITION,{categoryId: categoryId, currentPage: currentPage}).then(res => {
          if(res.errorCode == 0 && res.data) {
            this.categoryList = res.data
          }
        })
      },
    }
  }
</script>

<style>
</style>
