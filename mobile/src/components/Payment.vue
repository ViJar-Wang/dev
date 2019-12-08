<template>
		<div class="page tabbar js_show">
			<div class="page__bd" style="height: 100%;">
				<div class="weui-tab">
					<div class="weui-tab__panel" style='padding-bottom: 100px'>

						<div class="page__hd">
							<h1 class="page__title">支付</h1>
							<p class="page__desc">当前支付：{{payment.orderItemList.length}}件商品
								合计金额 ￥{{payment.price/100}}元</p>
						</div>
						<div class="weui-form-preview__bd">
							<div class="weui-form-preview__item">
								<label class="weui-form-preview__label">订单合计金额</label> <em
									class="weui-form-preview__value">￥{{payment.price/100}}元</em>
							</div>
						</div>
						<div class="weui-form-preview__bd">
              <div v-for="z in payment.orderItemList" :key="z.id">
								<div class="weui-form-preview__item">
									<label class="weui-form-preview__label">商品名称</label> <span
										class="weui-form-preview__value" style='font-size: 11px'>{{z.productList[0].name}}</span>
								</div>
								<div class="weui-form-preview__item">
									<label class="weui-form-preview__label">单价</label> <span
										class="weui-form-preview__value">￥{{z.price/100}}元</span>
								</div>
								<div class="weui-form-preview__item">
									<label class="weui-form-preview__label">数量</label> <span
										class="weui-form-preview__value">{{z.quantity}}</span>
								</div>
									<div class="weui-form-preview__item" v-if="z.jsonData != null">
										<label class="weui-form-preview__label">商品选项</label> <span
											class="weui-form-preview__value">{{z.jsonData}}</span>
									</div>
							</div>
						</div>
						<div class="weui-cells__title">
							<a href='javascript:;' class='link'>选择联系人</a>
						</div>
						<div class='weui-cells weui-cells_form'>
							<div class="weui-cell weui-cell_select">
								<div class="weui-cell__bd">
									<select id="contect" class="weui-select" name="select" @change="changeContact()">
                    <option v-for="(z,index) in payment.contectList" selected="selected" :value="index" v-if="z.contactFlag==1" :key="z.id">
                    {{z.name}}
                    </option>
                    <option v-for="(z,index) in payment.contectList" :value="index" v-if="z.contactFlag!=1" :key="z.id">
                    {{z.name}}
                    </option>
									</select>
								</div>
							</div>
						</div>
						<div class="weui-cells__title" style='text-align: right'>
							<!-- 		            		<a id='addContactButton' href='javascript:;' class='link'>新增联系人</a> -->
						</div>
						<div class='weui-cells weui-cells_form' style="display: none"
							id='contactForm'>
							<div class="weui-cell">
								<div class="weui-cell__hd">
									<label class="weui-label">联系人姓名</label>
								</div>
								<div class="weui-cell__bd">
									<input class="weui-input" type="text" placeholder="联系人姓名"
										maxlength="10">
								</div>
							</div>
							<div class="weui-cell">
								<div class="weui-cell__hd">
									<label class="weui-label">联系人电话</label>
								</div>
								<div class="weui-cell__bd">
									<input class="weui-input" type="tel" placeholder="联系人电话"
										maxlength="11">
								</div>
							</div>

							<div class="weui-cell">
								<div class="weui-cell__hd">
									<label class="weui-label">联系人地址</label>
								</div>
								<div class="weui-cell__bd">
									<input class="weui-input" type="tel" placeholder="联系人地址"
										maxlength="100">
								</div>
							</div>
							<div class="weui-cell">
								<a href="javascript:;"
									class="weui-btn weui-btn_mini weui-btn_default">保存联系人</a>
							</div>
						</div>

						<div class="weui-cells__title">
							<a href='javascript:;' class='link'>选择支付类型</a>
						</div>
						<div class='weui-cells weui-cells_form'>
							<div class="weui-cell weui-cell_select">
								<div class="weui-cell__bd">
									<select class="weui-select" name="select1" v-model="paymentType">
										<option value="0">支付宝支付</option>
										<option value="1">微信支付</option>
										<option selected="selected" value="2">电子钱包支付</option>
									</select>
								</div>
							</div>
						</div>
						<div class="page__bd page__bd_spacing" style='margin-top: 20px'>
							<a @click="payOrder" href="javascript:;" class="weui-btn weui-btn_primary">立即支付</a>
						</div>
					</div>
				</div>
			</div>
		</div>
</template>

<script>
export default {
  name: "Payment",
  data() {
      return {
        paymentType:2,
        contactFlagIndex:0,
        totalPrice:0,
        emptyCart: true,
        payment:{
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
    changeContact(){
      var index = document.getElementById("contect").value;
      this.contactFlagIndex = parseInt(index);
    },
    payOrder(){
      if (this.paymentType==2){
        payOrderByEwallet();
      }else{
        payTreasure(this.paymentType);
      }
    },
    payOrderByEwallet(){
      let vm = this;
      var userId = this.Storage.Local.get('User').id;
      var account={
        amount: this.payment.price,
        userId: userId,
        source: '商城消费',
        updTime: new Date()
      }
      $.ajax({
        type : "POST",
        contentType : 'application/json;charset=utf-8',
        url : vm.API.API_URL_CUSTOMER_Pay_Order,
        data: JSON.stringify(account),
        dataType : "json", //ajax返回值设置为text（json格式也可用它返回，可打印出结果，也可设置成json）
        async : false,
        success : function(json) {
          //errorCode为0则为成功
          if(json.errorCode==0){
            vm.$router.push({path:'/account/order',name:'Order'});
//            vm.$router.push({path:'/account/payResult',name:'PayResult', query:{payResult:json.data}});
          }else{
            vm.Toastr.success("支付失败");
          }
        },
        error : function(json) {
          vm.Toastr.success("支付失败");
        }
      });
    },
    payTreasure(Obj){
      let vm = this;
      var user = this.Storage.Local.get("User");
      var order = {
        userId:user.id,
        contect: {
          id:0,
          paymentType:0
        }
      };

      order.contect.id=this.payment.contectList[this.contactFlagIndex].id;
      order.contect.paymentType=Obj;

//      console.log(order.contect);
      $.ajax({
        type : "POST",
        contentType : 'application/json;charset=utf-8',
        url : vm.API.API_URL_ORDER_PAYMENT,
        data: JSON.stringify(order),
        dataType : "json", //ajax返回值设置为text（json格式也可用它返回，可打印出结果，也可设置成json）
        async : false,
        success : function(json) {
          //errorCode为0则为成功
          if(json.errorCode==0){
            vm.Toastr.success("支付成功，2秒钟后跳转到订单历史");
            setTimeout(function(){
                vm.$router.push({path:'/account/order',name:'Order'});
//              window.location.href="${pageContext.request.contextPath}/pc/account/order/list?${_csrf.parameterName}=${_csrf.token}";
            }, 2000);
          }else{
            vm.Toastr.success("支付失败");
          }
        },
        error : function(json) {
          vm.Toastr.success("支付失败");
        }
      });
    },
    getCart(){
        let vm = this;
        var user = this.Storage.Local.get("User");
        this.$post(this.API.API_URL_CART,{userId: user.id, type: 1}).then(res => {
          if(res.errorCode == 0 && res.data) {
            vm.payment = res.data
            if (vm.payment.orderItemList != null && vm.payment.orderItemList.length > 0){
              vm.emptyCart = false;
            }else{
              vm.emptyCart = true;
            }
            for (var i =0; i<this.payment.contectList.length; i++){
              if (vm.payment.contectList[i].contactFlag ==1){
                vm.contactFlagIndex = i;
                break;
              }
            }
          }
        })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
