<template>
		<div class="page tabbar js_show">
			<div class="page__bd" style="height: 100%;">
				<div class="weui-tab">
					<div class="weui-tab__panel" style='padding-bottom:100px'>

						<div class="page__hd">
					        <h1 class="page__title"><i class="fa fa-shopping-cart" aria-hidden="true"></i>我的购物车</h1>
					        <p class="page__desc">当前购物车：{{cart.orderItemList.length}}件商品 合计金额 ¥{{cart.price/100}}元</p>
					    </div>

						<!-- 循环购物车商品开始 -->
							<div class="weui-form-preview" style='margin-bottom:20px' v-for="(z, index) in cart.orderItemList" :key="z.id">
								 <div class="weui-form-preview__bd">
					                <div class="weui-form-preview__item">
					                    <label class="weui-form-preview__label">商品名称</label>
					                    <em class="weui-form-preview__value">
                                <router-link :to="{path:'/Product',query:{productId:z.productList[0].id}}">
                                  {{z.productList[0].name}}
                                </router-link>
                              </a></em>
					                </div>
					                <div class="weui-form-preview__item">
					                    <label class="weui-form-preview__label">单价</label>
					                    <span class="weui-form-preview__value">¥{{z.price/100}}</span>
					                </div>
					                <div class="weui-form-preview__item">
					                    <label class="weui-form-preview__label">数量</label>
					                    <span class="weui-form-preview__value">{{z.quantity}}</span>
					                </div>
					                <c:if test="${!empty z.jsonData}">
						                <div class="weui-form-preview__item">
						                    <label class="weui-form-preview__label">商品选项</label>
						                    <span class="weui-form-preview__value">{{z.jsonData}}</span>
						                </div>
					                </c:if>
						            <div class="weui-form-preview__ft">
						                <a class="weui-form-preview__btn weui-form-preview__btn_primary" @click="removeItem(index)" name="removeItem" href="javascript:">删除</a>
						            </div>
						        </div>
					       </div>

				        <!-- /循环购物车商品结束 -->
					        	<div class="page__bd page__bd_spacing" v-if="cart != null && cart.orderItemList.length!=0">
							        <a href="javascript:void(0)" @click="payCart" id="payCart" class="weui-btn weui-btn_primary">立即支付</a>
							        <a href="javascript:void(0);" @click="removeCartAll" id="removeCart" class="weui-btn weui-btn_warn">清空购物车</a>
						    	</div>
					</div>
				</div>
			</div>
		</div>

</template>

<script>
  export default {
    name: "Cart",
    data() {
      return {
        emptyCart: true,
        cart:{
          price:0,
          orderItemList:[]
        }
      }
    },
    watch: {
      '$route' (to, from) {
        this.getCart();
      }
    },
    created() {
      this.getCart();
    },
    methods: {
      removeItem(index){
        var item = this.cart.orderItemList[index];
        //var total = item.price * item.quantity / 100;
        //删除index位置开始的1个元素
        //this.cart.orderItemList.splice(index,1);
        //this.cart.price = this.cart.price - total;

        let vm = this;
        var user = this.Storage.Local.get("User");
        this.$post(this.API.API_URL_CART_ITEMS_REMOVE,{userId: user.id, orderItem: {id: item.id}}).then(res => {
          if(res.errorCode == 0 && res.data) {
            vm.getCart();
          }
        })
      },
      payCart(){
        this.$router.push({path: '/payment',name: 'Payment'});
/*        let vm = this;
        this.updateOrPay(function(json) {
          if(json.errorCode==0){
            vm.$router.push({path: '/payment',name: 'Payment'});
          } else {
	          vm.Toastr.warning(json.errorMsg);
          }
        }) */
      },
/*      updateCart(){
        let vm = this;
        this.updateOrPay(function(json) {
          if(json.errorCode==0){
            vm.Toastr.success("更新成功");
          } else {
            vm.Toastr.warning("更新失败");
          }
        })
      },
      updateOrPay(obj){
        let vm = this;
        var user = this.Storage.Local.get("User");
        var order={userId:user.id, type:0,orderItemList:this.cart.orderItemList};
        $.ajax({
          type : "POST",
          contentType : 'application/json;charset=utf-8',
          url : vm.API.API_URL_CART_ITEMS_UPDATE,
          data: JSON.stringify(order),
          dataType : "json", //ajax返回值设置为text（json格式也可用它返回，可打印出结果，也可设置成json）
          async : false,
          success : obj,
          error : function(json) {
            vm.Toastr.warning("更新失败");
          }
        });
      },
      changeQty() {
        var sumPrice = 0;
        if (this.cart.orderItemList != null && this.cart.orderItemList.length > 0){
          for (var i = 0;  i < this.cart.orderItemList.length; i++){
            var item = this.cart.orderItemList[i];
            sumPrice += item.price * item.quantity;
          }
        }
        this.cart.price = sumPrice;
      }, */
      removeCartAll(){
        let vm = this;
        var user = this.Storage.Local.get("User");
        this.$post(this.API.API_URL_CART_ITEMS_REMOVEALL,{userId: user.id}).then(res => {
          if(res.errorCode == 0) {
            vm.getCart();
          }
        })
      },
      getCart(){
        let vm = this;
        var user = this.Storage.Local.get("User");
        this.$post(this.API.API_URL_CART,{userId: user.id, type: 1}).then(res => {
          if(res.errorCode == 0 && res.data) {
            vm.cart = res.data
            if (vm.cart.orderItemList != null && vm.cart.orderItemList.length > 0){
              vm.emptyCart = false;
            }else{
              vm.emptyCart = true;
            }
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- <style src="../static/css/swiper.min.css"></style> -->
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
