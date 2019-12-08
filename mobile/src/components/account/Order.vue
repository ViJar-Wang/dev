<template>
	<div class="page js_show" style='padding-bottom:100px'>
		<div class="page__bd" style="height: 100%;">
			<div class="weui-tab">
				<div class="weui-navbar">
					<div class="weui-navbar__item">
						全部订单
					</div>
				</div>
				<div class="weui-tab__panel">
					<div class="weui-form-preview">

						<div class="weui-cells" v-for="(order,index) in orderList">
							<table v-if="index < more ">
								<tr>
									<td style="width: 50%;">订单金额</td>
									<td>{{order.price / 100}}</td>
								</tr>
								<tr>
									<td> 订单编号</td>
									<td>{{order.orderNum}}</td>
								</tr>
								<tr>
									<td> 订单时间</td>
									<td>{{order.orderNum}}</td>
								</tr>
								<tr>
									<td> 订单状态</td>
									<td v-if="order.status==0 || order.status==null">订单编辑中</td>
									<td v-if="order.status==1">已下单</td>
									<td v-if="order.status==2">配送中</td>
									<td v-if="order.status==3">配送完成</td>
									<td v-if="order.status==4">订单取消</td>
								</tr>
								<tr>
									<td> 联系人</td>
									<td>{{order.contactName}}</td>
								</tr>
								<tr>
									<td> 联系人电话</td>
									<td>{{order.contactMobile}}</td>
								</tr>
								<tr>
									<td colspan="2" style="color: #008800;text-align: center;">
										<router-link :to="{path:'/account/orderdetail',query:{orderNum:order.orderNum}}">查看订单明细</router-link>
									</td>
								</tr>
							</table>
						</div>
					</div>
					<div class="weui-panel__ft">
						<a href="javascript:void(0);" @click="showmore()" class="weui-cell weui-cell_access weui-cell_link">
							<div class="weui-cell__bd">查看更多</div><span class="weui-cell__ft"></span>
						</a>
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
				orderList: [],
				more:10
			}
		},
		created() {
			this.getOrders();
		},
		methods: {
			getOrders() {
				var vm = this;
				var userId = vm.Storage.Local.get('User').id;
				vm.$post(vm.API.API_URL_ORDERS, {
					userId: userId,
					type: 0
				}).then(res => {
					if (res.errorCode == "0" && res.data) {
						this.orderList = res.data.orderListData
					}
				})
			},showmore(){
				this.more = this.orderList.length-1;
			}
		}
	};
</script>
<style scoped>

</style>
