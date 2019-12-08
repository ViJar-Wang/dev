<template>
  <div id="app-content">
    <template>
		<section>
			<div class="container">
				<div id='page'></div>
				<div class='row'>

				<div class='col-lg-9 col-md-9 col-sm-9 col-lg-push-3 col-md-push-3 col-sm-push-3'>

        <section v-for="category in categoryRelationList" :key="category.id">
          {{category.name}}
					<div class="divider divider-border divider-center"><!-- divider -->
						<i class="fa fa-users"></i>
					</div>
					<ul class="shop-item-list row list-inline nomargin">
						<!-- 产品-->
						<li class="col-lg-3 col-sm-3" v-for="product in category.productRelationList" :key="product.id">
							<div class="shop-item">
								<div class="thumbnail">
									<!-- product image(s) -->
<!-- 									<a class="shop-item-image" @click="gotoProduct(product.id)"> -->
                  <router-link :to="{path:'/Product',query:{productId:product.id}}" class="shop-item-image">
                    <img class="img-responsive" :src="API.BASE_SERVER_URL+product.defaultImg"  />
                  </router-link>
<!-- 									</a> -->
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
          </section>

					<hr />
					<!-- Pagination Default -->
					<div name="bootpagFooter" class="text-center"></div>
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
<!--                        <a href="${root}/pc/category/${categoryInfo.id}/page/1" ><span class="size-11 text-muted pull-right"></span>{{categoryInfo.name}}</a> -->
                        <router-link :to="{path:'/CategoryProducts',query:{categoryId:categoryInfo.id, currentPage:1}}"><span class="size-11 text-muted pull-right"></span>{{categoryInfo.name}}</router-link>
                      </li>
										<li class="list-group-item">
<!-- 											<a href="${root}/pc/category/category" >
												<span class="size-11 text-muted pull-right"></span>
												查看更多分类 >>
											</a>
 -->                        <router-link :to="{path:'/CategoryProducts'}"><span class="size-11 text-muted pull-right"></span>查看更多分类 >></router-link>
										</li>
								</ul>
							</div>

							<!-- /CATEGORIES -->

						</div>
				</div>
			</div>
		</section>
    </template>
  </div>
</template>

<script>
  export default {
    name: "Index",
    data() {
      return {
        categoryList: [],
        categoryRelationList: [],
      }
    },
    watch: {
      '$route' (to, from) {
        this.getCategoryRelationList();
        this.getCategoryList();
      }
    },
    mounted() {
      this.getCategoryRelationList();
      this.getCategoryList();
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
      gotoProduct(productId){
        this.$router.push({
          path: "/Product",
          name: "Proudct",
          params: {
            productId: productId
          }
        });
      },
      getCategoryList(){
        this.$post(this.API.API_URL_CATEGORY_CONDITION,{}).then(res => {
          if(res.errorCode == 0 && res.data) {
            this.categoryList = res.data
          }
        })
      },
      getCategoryRelationList(){
        this.$post(this.API.API_URL_CATALOG_INDEX_PRODUCTS,{pageSize: 8}).then(res => {
          if(res.errorCode == 0 && res.data) {
            this.categoryRelationList = res.data
          }
        })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
