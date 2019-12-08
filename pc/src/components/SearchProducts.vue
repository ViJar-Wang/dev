<template>
  <div id="app-content">
    <template>
		<section class="page-header page-header-xs">
			<div class="container">
				<h1>查询关键字："{{productName}}"</h1>
			</div>
		</section>
		<section>
			<div class="container">
				<!-- /LIST OPTIONS -->
				<ul class="shop-item-list row list-inline nomargin">
					<!-- 产品-->
					<li class="col-lg-3 col-sm-3" v-for="product in productListPage.productList" :key="product.id">
						<div class="shop-item">
							<div class="thumbnail">
								<!-- product image(s) -->
                   <router-link :to="{path:'/Product',query:{productId:product.id}}" class="shop-item-image">
                              <img :src="API.BASE_SERVER_URL+product.defaultImg" />
                  </router-link>
								<!-- /product image(s) -->
								<!-- hover buttons -->
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
				<div name="bootpagFooter" class="text-center">
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
		</section>
    </template>
  </div>
</template>

<script>
  export default {
    name: "SearchProduct",
    data() {
      return {
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
      handleCurrentChange(val) {
        this.$router.push({path: '/SearchProducts', query: { productName: this.productName, currentPage: val }});
      },
      getProductList(){
        let vm = this;
        this.$post(
          this.API.API_URL_CATALOG_SEARCH_PRODUCTS,
          {productName: vm.productName, currentPage: vm.currentPage }
        ).then(res => {
          if(res.errorCode == 0 && res.data) {
            vm.productListPage = res.data;
            vm.total = res.data.totalCount;
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="../../static/css/swiper.min.css"></style>
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
