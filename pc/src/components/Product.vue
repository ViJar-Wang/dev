<template>
  <div id="app-content">
    <template>
      <!-- /PAGE HEADER -->
      <!-- -->
		<section class="page-header page-header-xs">
			<div class="container">
				<h1>{{productDetails.name}}</h1>
			</div>
		</section>
		<section>
			<div class="container">
				<div class="row">
					<!-- RIGHT -->
					<div class="col-lg-9 col-md-9 col-sm-9">
						<div class="row">
							<!-- IMAGE -->
							<div class="col-lg-6 col-sm-6">
								<div class="thumbnail relative margin-bottom-3">
									<figure id="zoom-primary" class="zoom" data-mode="mouseover">
										<div class="swiper-container swiper-container-horizontal"
											data-space-between='10'>
											<div class="swiper-wrapper">
												<div class="swiper-slide">
                          <img :src="API.BASE_SERVER_URL+productDetails.defaultImg" />
												</div>
														<div class="swiper-slide" v-for="productImage in productDetails.productImageList" :key="'productImage'+productImage.id">
                              <img :src="API.BASE_SERVER_URL+productImage.url" />
														</div>
											</div>
											<div class="swiper-pagination"></div>
										</div>
									</figure>
								</div>
								<!-- Thumbnails (required height:100px) -->
								<div data-for="zoom-primary"
									class="zoom-more owl-carousel owl-padding-3 featured"
									data-plugin-options='{"singleItem": false, "autoPlay": false, "navigation": true, "pagination": false}'></div>
								<!-- /Thumbnails -->
							</div>

							<!-- /IMAGE -->
							<!-- ITEM DESC -->
							<div class="col-lg-6 col-sm-6">
								<!-- buttons -->
								<div class="pull-right">
									<!-- replace data-item-id width the real item ID - used by js/view/demo.shop.js -->
									<a class="btn btn-default add-wishlist sysBuilding"
										href="javascript:void(0);" @click="addWishlist()"
										data-item-id="1" data-toggle="tooltip" title="添加收藏"><i
										class="fa fa-heart nopadding"></i></a>
								</div>
								<!-- /buttons -->

 								<!-- price -->
								<div class="shop-item-price">
									<span class="line-through nopadding-left"> 市场价:￥<font
										id="price">{{productDetails.price / 100}}</font>
									</span>￥<font id="shopPrice">{{productDetails.shopPrice / 100}}</font>
									<input id="submitPrice" type="hidden"
										value="${productDetails.shopPrice}"> <input
										id="submitOptionValueKeyGroup" type="hidden">
								</div>
								<!-- /price -->
								<hr />
								<div class="clearfix margin-bottom-30">
									<span id="inStock" v-show = "productDetails.quantity > 0"
										class="pull-right text-success"><i class="fa fa-check"></i>有货</span>
									<span id="outOfStock" v-show = "productDetails.quantity <= 0"
										class="pull-right text-danger"><i
										class="glyphicon glyphicon-remove"></i>无货</span><strong>商品简介:</strong>{{productDetail.explain}}
								</div>

									<div class="text-center" id="" v-if="optionList && optionList.length>0">
										<h5>请选择购买商品选项</h5>
											<div class='optionGroup' option v-for="option in optionList" :key="'option'+option.id">
												{{option.name}}：
													<span v-for="optionValues in option.optionValuesList" :key="'optionValues'+optionValues.id"
                            :optionId="option.id"
														:optionValueId='optionValues.id'
														:optionValueName='optionValues.name' class='option'>{{optionValues.name}}</span>
											</div>
									</div>

								<!-- /display option -->
								<!-- /countdown -->
								<!-- FORM -->
								<div class="clearfix form-inline nomargin"></div>
								<!-- /FORM -->
								<hr />
								<div class='row'>
									<div class='col-lg-4 col-sm-4'
										style='padding-top: 10px; text-align: right'>购买数量:</div>
									<div class='col-lg-8 col-sm-8 quantityBox'>
		<!-- 改过的 -->								
		<div class="input-group bootstrap-touchspin">
		  <span class="input-group-btn">
			<button  class="btn btn-default bootstrap-touchspin-down" type="button" @click="jian()">-</button>
		  </span>
		  <span class="input-group-addon bootstrap-touchspin-prefix" style="display: none;"></span>
			<input name="number" type="text" value="1" v-model="num" style="width: 50px; display: block;" class="form-control">
		  <span class="input-group-addon bootstrap-touchspin-postfix" style="display: none;"></span>
		  <span class="input-group-btn">
			  <button class="btn btn-default bootstrap-touchspin-up" type="button" @click="jia()">+</button>
		  </span>
		</div>
									</div>
								</div>

								<div style='text-align: center; margin-top: 20px'>
									<p class='padding-top-8'>
										<button class="btn btn-warning product-add-cart sysBuilding noradius" @click="addCart">
											加入购物车</button>
										<button class="btn btn-primary product-add-cart sysBuilding noradius">
											立即购买</button>
									</p>
								</div>
							</div>
							<!-- /ITEM DESC -->
						</div>

            <div>
            <el-tabs v-model="activeName" type="card" >
              <el-tab-pane label="商品描述" name="first">
							<div role="tabpanel" class="tab-pane fade in active"
								id="description">{{productDetails.explain}}</div>
              </el-tab-pane>
              <el-tab-pane :label="'商品评论('+reviewsList.length+')'" name="second">
							<!-- REVIEWS -->
							<div role="tabpanel" class="tab-pane fade in active" id="reviews">
								<!-- REVIEW ITEM -->
									<div class="block margin-bottom-60" v-for="reviews in reviewsList" :key="'review'+reviews.id">
										<div class="media-body">
											<h4 class="media-heading size-14">
												{{reviews.user.nickname}} &ndash;
												<span class="text-muted"> {{reviews.createTime}} </span>&ndash;
												<span class="size-14 text-muted">
																<i class="fa fa-star" v-for="n in reviews.stars" :key="'stars'+n"></i>
																<i class="fa fa-star-o" v-for="n in 5-reviews.stars" :key="'star'+n"></i>
												</span>
											</h4>
											<p>{{reviews.content}}</p>
										</div>
									</div>
								<!-- /REVIEW ITEM -->
								<!-- REVIEW FORM -->
								<h4 class="page-header margin-bottom-40">添加评论</h4>
								<!-- Comment -->
								<div class="margin-bottom-30">
									<textarea v-model="content" id="text" class="form-control"
										rows="6" placeholder="评论内容" maxlength="1000"></textarea>
								</div>
								<!-- Stars -->
								<div class="product-star-vote clearfix">
									<label class="radio pull-left"> <input type="radio"
										v-model="stars" value="1" /><i></i>1星
									</label> <label class="radio pull-left"> <input type="radio"
										v-model="stars" value="2" /><i></i>2星
									</label> <label class="radio pull-left"> <input type="radio"
										v-model="stars" value="3" /><i></i>3星
									</label> <label class="radio pull-left"> <input type="radio"
										v-model="stars" value="4" /><i></i>4星
									</label> <label class="radio pull-left"> <input type="radio"
										v-model="stars" value="5" /><i></i>5星
									</label>
								</div>
								<button @click="addReviews" type="button"
									class="btn btn-primary sysBuilding">
									<i class="fa fa-check"></i>提交
								</button>
								<!-- Send Button -->
								<!-- /REVIEW FORM -->
							</div>
              </el-tab-pane>
            </el-tabs>
            </div>
					</div>
					<!-- LEFT -->
					<div class="col-lg-3 col-md-3 col-sm-3">
						<!-- FEATURED -->
              <div class="margin-bottom-60">
                <h2 class="owl-featured">热销商品</h2>
                <div class="">
<template v-for="p,index in proHot" >
                  <template v-if="index<3">
                  <img :src="API.BASE_SERVER_URL+p.defaultImg" style="width: 100px;height: 100px;"/>
                  <span>{{p.name}}</span>
                  </template>
                </div>
              </div>
						<!-- /FEATURED -->
						<!-- HTML BLOCK -->
					</div>
				</div>
			</div>
		</section>
    </template>
  </div>
</template>

<script>
  export default {
    name: "Product",
    data() {
      return {
		num:1,
        reviewsList: [],
        optionList: [],
        skuList: [],
        productDetails: {
          name: ''
        },
        productId: 0,
        activeName: 'first',
        content: '',
        stars: 0
      }
    },
    watch: {
      '$route' (to, from) {
        this.productId = parseInt(this.$route.query.productId);
        this.productDetail(this.productId);
        this.getReviewsList(this.productId);
        this.getOptionList(this.productId);
      }
    },
    created() {
        this.productId = parseInt(this.$route.query.productId);
        this.productDetail(this.productId);
        this.getReviewsList(this.productId);
        this.getOptionList(this.productId);
		this.proHotData(this.productId);
    },
    methods: {
		proHotData(productId){
		        let vm = this;
		        this.$post(this.API.API_URL_CATALOG_PRODUCTS_HOT,{productId: productId}).then(res => {
		          if(res.errorCode == 0 && res.data) {
		            vm.proHot = res.data
		          }
		        })
		      },
      addWishlist(){
        let vm = this;
        var user = this.Storage.Local.get("User");
        var userid = user.id;
        if (user == null){
            this.Toastr.warning('请登录,只有登录后才能操作!');
        }else{
          this.$post(this.API.API_URL_CUSTOMER_ADD_WISHLIST,{productId: vm.productId, userId: userid}).then(res => {
            if (res.data.success) {
			        vm.Toastr.success(res.data.message);
            } else {
			        vm.Toastr.warning(res.data.message);
            }
          })
        }
      },
      addReviews() {
        let vm = this;
        var content = this.content;
        var productId = this.productDetails.id;
        var user = this.Storage.Local.get("User");
        var userid = user.id;
        var stars = this.stars;
        this.$post(this.API.API_URL_CATALOG_ADD_REVIEW,{productId: productId, userId: userid, content: content, stars: stars}).then(res => {
          if(res.errorCode == 0 && res.data) {
              vm.Toastr.info('添加评论成功！');
          }
        })
      },
      getOptionList(){
        let vm = this;
        var productId = this.productDetails.id;
        this.$post(this.API.API_URL_CATALOG_PRODUCT_OPTION,{productId: productId}).then(res => {
          if(res.errorCode == 0 && res.data) {
            vm.optionList = res.data
          }
        })
      },
      getReviewsList(productId) {
        let vm = this;
        this.$post(this.API.API_URL_CATALOG_SHOW_REVIEW,{productId: productId}).then(res => {
          if(res.errorCode == 0 && res.data) {
            vm.reviewsList = res.data
          }
        })
      },
      productDetail(productId) {
        let vm = this;
        this.$post(this.API.API_URL_CATALOG_PRODUCT_DETAILS,{productId: productId}).then(res => {
          if(res.errorCode == 0 && res.data) {
            vm.productDetails = res.data
          }
        })
      },
      getSku(optionValueKeyGroup) {
        if (this.skuList != null) {
          for(var index in this.skuList) {
            if (this.skuList[index].optionValueKeyGroup == optionValueKeyGroup) {
              return this.skuList[index].id;
            }
          }
        }
        return null;
      },
      getJsonData(optionValueKeyGroup) {
        if (this.skuList != null) {
          for(var index in this.skuList) {
            if (this.skuList[index].optionValueKeyGroup == optionValueKeyGroup) {
              return this.skuList[index].skuJson;
            }
          }
        }
        return null;
      },
 //改过的
	  jian(){
		  if(this.num>1){
			  this.num = this.num - 1;
		  }
	  },
	  jia(){
		  this.num = this.num + 1;
	  },
		addCart(){
			let vm = this;
			var user = this.Storage.Local.get("User");
			var userid = user.id;
			this.$post(this.API.API_URL_CART_ADD,{
				userId:userid,
				type:1,
				orderItem:{
					productId:vm.productDetails.id,
					quantity:vm.num,
					optionValueKeyGroup: "",
					skuId: null,
					jsonData: null,
					userId: userid
				}
			}).then(res => {
				  if(res.errorCode == 0) {
						vm.Toastr.success("已经成功加入购物车！");
						window.location.reload();
				  }else{
					  vm.Toastr.warning("失败！");
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
