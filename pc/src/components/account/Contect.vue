<template>
	<div id="app-content">
		<section class="page-header page-header-xs">
			<div class="container">
				<h1>个人中心</h1>
				<!-- breadcrumbs -->
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>个人中心</el-breadcrumb-item>
					<el-breadcrumb-item>常用收货地址</el-breadcrumb-item>
				</el-breadcrumb>

				<!-- /breadcrumbs -->

				<!-- page tabs -->
				<ul class="page-header-tabs list-inline">
					<li><a href="javascript:void(0);" @click="goto('/account/order','Order')">我的订单</a></li>
					<li class="active"><a href="javascript:void(0);" @click="goto('/account/contect','Contect')">常用收货地址</a></li>
					<li><a href="javascript:void(0);" @click="goto('/account/wishlist','Wishlist')">我的收藏</a></li>
					<li><a href="javascript:void(0);" @click="goto('/account/userSetting','UserSetting')">个人设置</a></li>
					<li><a href="javascript:void(0);" @click="goto('/account/ewallet','EWallet')">充值</a></li>
				</ul>
				<!-- /page tabs -->
			</div>
		</section>
		<section>
			<div class="container">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h2 class="panel-title">常用</h2>
					</div>


					<table class="table">
						<thead>
							<tr>
								<th>默认联系人</th>
								<th>联系人姓名</th>
								<th>联系人电话</th>
								<th>联系人地址</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody id="tbody">
							<tr v-for="contect in contectList">
								<td v-if="contect.contactFlag==1"><input type="radio" name="con" @click="changeDefult(contect.id)" checked="checked" /></td>
								<td v-else><input name="con" @click="changeDefult(contect.id)" type="radio" /></td>
								<td>{{contect.name}}</td>
								<td>{{contect.mobile}}</td>
								<td>{{contect.address}}</td>
								<td><a @click="updataContect(contect.id)">编辑</a>&nbsp;<a @click="delContect(contect.id)">删除</a></td>
							</tr>
						</tbody>
					</table>
					<div id="bootpag" class="pull-right">
						<el-pagination @current-change="handleCurrentChange" :background="true" :current-page="currentPage" :page-size="pageSize"
						 layout="prev, pager, next" :total="total">
						</el-pagination>
					</div>
					<fieldset class="padding-40 ">
						<div class="row">
							<form id="contectInfo" onsubmit="return false;">
								<div class="col-md-12 col-sm-12">
									<label for="name">姓名* </label> <input id="name" name="name" type="text" v-model="name" class="form-control required">
								</div>
								<div class="col-md-6 col-sm-6">
									<label for="moble">电话* </label>
									<input id="moble" name="moble" type="text" v-model="moble" class="form-control required">
								</div>
								<div class="col-md-6 col-sm-6">
									<label for="adress">地址* </label> <input id="adress" name="adress" type="text" v-model="adress" class="form-control required">
								</div>
							</form>
						</div>
						<button @click="addContect()" class="btn btn-success margin-top-20 pull-right noradius">保存</button>
					</fieldset>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	export default {
		name: "Contect",
		data() {
			return {
				currentPage: 1,
				pageSize: 10,
				total: 0,
				contectList: "",
				name: "",
				moble: "",
				adress: ""
			}
		},
		created() {
			this.getContect();
		},
		methods: {
			updataContect(id){
				var conetct = null;
				console.log(this.contectList)
				for(var i = 0;i<this.contectList.length;i++){
					if(this.contectList[i].id == id){
						conetct = this.contectList[i];
					}
				}
				this.name = conetct.name;
				this.moble = conetct.mobile;
				this.adress = conetct.address;
				var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
				if (this.moble == "") {
					alert("手机号不能为空")
				} else if (this.name == "") {
					alert("姓名不能为空")
				} else if (this.adress == "") {
					alert("地址不能为空")
				} else if(!mobile.test(this.moble) || this.moble.length!=11){
					alert("手机格式不正确");
				}else{				
					var user = this.Storage.Local.get("User");
					var userid = user.id;
					this.$post(this.API_URL_CONTECT_UPDATE, {
						userId: userid,
						mobile: this.moble,
						address: this.adress,
						name: this.name,
						contactFlag:conetct.contactFlag,
						id:id
					}).then(res => {
						if (res.errorCode == "0") {
							this.getContect();
						}
					})
				}
			},
			addContect() {
				 var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
				if (this.moble == "") {
					alert("手机号不能为空")
				} else if (this.name == "") {
					alert("姓名不能为空")
				} else if (this.adress == "") {
					alert("地址不能为空")
				} else if(!mobile.test(this.moble) || this.moble.length!=11){
					alert("手机格式不正确");
				}else{				
					var user = this.Storage.Local.get("User");
					var userid = user.id;
					this.$post(this.API.API_URL_CONTECT_ADD, {
						userId: userid,
						mobile: this.moble,
						address: this.adress,
						name: this.name
					}).then(res => {
						if (res.errorCode == "0") {
							this.getContect();
						}
					})
				}

			},
			delContect(id) {
				var user = this.Storage.Local.get("User");
				var userid = user.id;
				this.$post(this.API.API_URL_CONTECT_REMOVE, {
					userId: userid,
					id: id
				}).then(res => {
					if (res.errorCode == "0") {
						this.getContect();
					}
				})
			},
			changeDefult(id) {
				var user = this.Storage.Local.get("User");
				var userid = user.id;
				this.$post(this.API.API_URL_CONTECT_DEFAULT, {
					userId: userid,
					id: id,
					contactFlag: 1
				}).then(res => {
					if (res.errorCode == "0") {
						this.getContect();
					}
				})

			},
			handleCurrentChange(val) {
				this.$router.push({
					path: '/account/centect',
					query: {
						currentPage: val
					}
				});
			},
			goto(path, name) {
				this.$router.push({
					path: path,
					name: name
				})
			},
			getContect() {
				var user = this.Storage.Local.get("User");
				var userid = user.id;
				this.$post(this.API.API_URL_CONTECT, {
					userId: userid
				}).then(res => {
					if (res.errorCode == "0") {
						this.currentPage = res.data.currentPage;
						this.contectList = res.data.contectList;
					}
				})
			}
		}
	};
</script>

<style scoped>
</style>
