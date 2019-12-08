<template>
	<div class="page js_show" style='padding-bottom:100px'>
		<div class="page__bd" style="height: 100%;">
			<div class="weui-tab">
				<div class="weui-navbar">
					<div class="weui-navbar__item" style="background-color: #008800; color: white;">
						订单编号:{{orderNum}}
					</div>
				</div>
				<div class="weui-tab__panel">
					<div class="weui-form-preview">

						<div class="weui-panel weui-panel_access">
							<table><tr>
							<td style="width:50%;">
							<div class="weui-panel__hd">订单金额</div>
							</td>
							<td style="width:50%;">{{orderInfo.price / 100}}</td>
							</tr>
							</table>
						</div>
						<div class="weui-panel weui-panel_access">
							<table><tr class="weui-panel__hd">
							<td style="width:50%;">
							订单时间
							</td>
							<td style="width:50%;">{{orderInfo.createTime}}</td>
							</tr>
							<tr class="weui-panel__hd">
							<td style="width:50%;">
							订单状态
							</td>
							<td v-if="orderInfo.status==0 || orderInfo.status==null">订单编辑中</td>
							<td v-if="orderInfo.status==1">已下单</td>
							<td v-if="orderInfo.status==2">配送中</td>
							<td v-if="orderInfo.status==3">配送完成</td>
							<td v-if="orderInfo.status==4">订单取消</td>
							</tr>
							<tr class="weui-panel__hd">
							<td style="width:50%;">
							联系人
							</td>
							<td style="width:50%;">{{orderInfo.contactName}}</td>
							</tr>
							<tr class="weui-panel__hd">
							<td style="width:50%;">
							联系电话
							</td>
							<td style="width:50%;">{{orderInfo.contactMobile}}</td>
							</tr>
							<tr class="weui-panel__hd">
							<td style="width:50%;">
							物流单号
							</td>
							<td style="width:50%;"></td>
							</tr>
							<tr class="weui-panel__hd">
							<td style="width:50%;">
							物流公司
							</td>
							<td style="width:50%;"></td>
							</tr>
							</table>
						</div>
						<div style="background-color:#EAEAEA; height: 20px;">
							
						</div>
						<div class="weui-panel weui-panel_access">
							<table>
								<tr class="weui-panel__hd">
									<td>商品名称</td><td>{{product.name}}</td>
								</tr>
								<tr class="weui-panel__hd">
									<td>单价</td><td>{{product.price}}</td>
								</tr>
								<tr class="weui-panel__hd">
									<td>数量</td><td>{{orderitem.quantity}}</td>
								</tr>
								<tr class="weui-panel__hd">
									<td>金额</td><td>{{orderitem.price / 100}}</td>
								</tr>
							</table>
						</div>
					</div>
				
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				orderNum: "",
				orderInfo:"",
				product:"",
				orderitem:""
			}
		},
		mounted() {
			this.getOrderitem();
		},
		methods: {
			getOrderitem() {
				var vm = this;
				var userId = vm.Storage.Local.get('User').id;
				this.orderNum = vm.$route.query.orderNum;
				this.$post(vm.API.API_URL_ORDER_DETAIL, {
					userId: userId,
					type: 0,
					orderNum: this.orderNum
				}).then(res => {
					if (res.errorCode == "0" && res.data) {
						this.orderInfo = res.data
						// this.product =  this.orderitem.productList[0];
						this.orderitem = res.data.orderItemList[0];
						this.product = res.data.orderItemList[0].productList[0];
						
					}
				})
			}
		}
	};
</script>
<style scoped>

</style>
