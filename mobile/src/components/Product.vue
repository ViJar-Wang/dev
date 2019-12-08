<template>
  <div>
  <div class="swiper-slide">
    <img :src="API.BASE_SERVER_URL+productDetails.defaultImg" />
  </div>
{{productDetails.name}}

<div class="shop-item-price">
  <span class="line-through nopadding-left"> 市场价:￥<font
    id="price">{{productDetails.price / 100}}</font>
  </span>
  打折价：￥<font id="shopPrice">{{productDetails.shopPrice / 100}}</font>
  <input id="submitPrice" type="hidden"
    value="${productDetails.shopPrice}"> <input
    id="submitOptionValueKeyGroup" type="hidden">
</div>
	<div class="clearfix form-inline nomargin"></div>
								<!-- /FORM -->
								<hr />
								<div class='row'>
									<div class='col-lg-4 col-sm-4'
										style='padding-top: 10px; text-align: right'>购买数量:</div>
									<input type="number"  name="num" />
								</div>

								<div style='text-align: center; margin-top: 20px'>
									<p class='padding-top-8'>
                    <mt-button type="primary">加入购物车</mt-button>
                    <mt-button type="danger">立即购买</mt-button>
									<!-- 	<button class="btn btn-warning product-add-cart sysBuilding noradius">
											加入购物车</button>
										<button class="btn btn-primary product-add-cart sysBuilding noradius">
											立即购买</button> -->
									</p>
								</div>
							</div>
							<!-- /ITEM DESC -->
						</div>


</div>
</template>

<script>
//
// Vue.component(VueQrcode.name, VueQrcode);

  export default {
    name: "Product",
    data() {
      return {
        code:"",
        reviewsList: [],
        optionList: [],
        skuList: [],
        proHot:[],
        productDetails: {
          name: ''
        },
        productId: 0,
        activeName: 'first',
        content: '',
        stars: 0,
        num:1
      }
    },
    watch: {
      '$route' (to, from) {
        this.productId = parseInt(this.$route.query.productId);
        this.productDetail(this.productId);
        this.getReviewsList(this.productId);
        this.getOptionList(this.productId);
        this.proHotData(this.productId);
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
      proHotData(productId){
        let vm = this;
        this.$post(this.API.API_URL_CATALOG_PRODUCTS_HOT,{productId: productId}).then(res => {
          if(res.errorCode == 0 && res.data) {
            vm.proHot = res.data
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
      }
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
