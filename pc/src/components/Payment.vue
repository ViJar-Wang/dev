<template>
  <div id="app-content">
    <template>
      <!-- /PAGE HEADER -->
      <!-- -->
		<section class="page-header page-header-xs">
			<div class="container">
				<h1>我的购物车</h1>
				<ol class="breadcrumb">
					<li><a href="${root}/pc/index">首页</a></li>
					<li>购物车</li>
				</ol>
			</div>
		</section>
		<!-- /PAGE HEADER -->
		<!-- 购物车 -->
		<section>
			<div class="container">
				<div class="row">
					<div class="col-lg-9 col-sm-8">
						<form class="cartContent clearfix" method="post" action="#">
							<div v-if="!this.cart">
								购物车里无商品，随便看看，优惠多多，赶紧抢购吧！
							</div>
							<div id="cartContent" v-if="this.cart.price != 0">
									<div class="item head clearfix">
										<span class="cart_img"></span> <span
											class="product_name size-13 bold">产品名称</span> <span
											class="remove_item size-13 bold"></span> <span
											class="total_price size-13 bold">合计价格</span> 
											<span class="qty size-13 bold"></span>
											<span
											class="qty size-13 bold">数量</span>
									</div>
									<div v-for="order in this.cart.orderItemList" :key="order.id">
										
										<div class="item head clearfix" v-for="p in order.productList" :key="p.id">
											<span class="cart_img" style="float: left;"><img width="50px;" :src="API.BASE_SERVER_URL+p.defaultImg"/></span> <span
												class="product_name size-13 bold">{{p.name}}</span> 
												<span class="remove_item size-13 bold"></span> <span
												class="total_price size-13 bold">￥{{order.price*order.quantity/100}}</span>
												
												<span>
													&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
													{{order.quantity}}&nbsp;×&nbsp;￥{{order.price/100}}
												</span>
												
										</div>
										
									</div>
								<!-- /update cart -->
								<div class="clearfix"></div>
								
							</div>
							
						</form>
						
					</div>
					<div style="float: right;background: wheat;width: 200px;" v-if="this.cart.price != 0">
						<span>商品总价：￥{{this.cart.price/100}}</span><br />
						<span>物流费用：包邮</span>
						<hr />
						<span>合计金额：￥{{this.cart.price/100}}</span>
						<br />
						<br />
						<br />
						
					</div>
				</div>
				<div>
					<table>
						<tr v-for="contect in this.cart.contectList" :key="contect.id">
							<td>
								<input type="radio"/>
								姓名：{{contect.name}} &nbsp;联系电话：{{contect.mobile}} &nbsp;地址：{{contect.address}}
							</td>
						</tr>
					</table>
				</div>
				<hr />
				<div>
					<a href="#" @click="PayOrder">电子钱包</a>
				</div>
				<!-- /CART -->
			</div>
		</section>

    </template>
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
        let vm = this;
        this.updateOrPay(function(json) {
          if(json.errorCode==0){
            vm.$router.push({path: '/payment',name: 'Payment'});
//            window.location.href="payment";
          } else {
	          vm.Toastr.warning(json.errorMsg);
          }
        })
      },
      updateCart(order){
        let vm = this;
        var user = this.Storage.Local.get("User");
        var userid = user.id;
        this.$post(this.API.API_URL_CART_ITEMS_UPDATE,{
        	userId:userid,
        	type:1,
        	orderItemList:order
        }).then(res => {
        	  if(res.errorCode == 0) {
        			vm.Toastr.success("更新成功！");
					this.getCart();
        	  }else{
        		  vm.Toastr.warning("失败！");
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
      },
      removeCartAll(){
        let vm = this;
        var user = this.Storage.Local.get("User");
        var userid = user.id;
        this.$post(this.API.API_URL_CART_ITEMS_REMOVEALL,{
        	userId:userid,
        }).then(res => {
        	  if(res.errorCode == 0) {
					this.getCart();
        	  }else{
        		  vm.Toastr.warning("失败！");
        	  }
        })
      },
      getCart(){
        let vm = this;
        var user = this.Storage.Local.get("User");
		var userid = user.id;
        this.$post(this.API.API_URL_CART,{
			userId: userid,
			type: 1
		}).then(res => {
          if(res.errorCode == 0 && res.data) {
            vm.cart = res.data
			console.log(vm.cart.orderItemList[0].id)
            if (vm.cart.orderItemList != null && vm.cart.orderItemList.length > 0){
              vm.emptyCart = false;
            }else{
              vm.emptyCart = true;
            }
          }
        })
      },
	  PayOrder(){
		  let vm = this;
		  var user = this.Storage.Local.get("User");
		  var userid = user.id;
		  this.$post(this.API.API_URL_CUSTOMER_Pay_Order,{
		  	userId: userid,
		  	amount: -vm.cart.price,
			source:"商城消费",
			updTime:""
		  }).then(res => {
		    if(res.errorCode == 0) {
		      vm.Toastr.success("支付成功！");
			  this.$router.push({
				  path:"/account/order",
				  name:"Order"
			  });
			  vm.removeCartAll();
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
