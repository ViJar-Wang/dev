<template>
  <div id="app-content">
		<section class="page-header page-header-xs">
			<div class="container">
				<h1>个人中心</h1>
				<!-- breadcrumbs -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人中心</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
				<!-- /breadcrumbs -->

				<!-- page tabs -->
				<ul class="page-header-tabs list-inline">
					<li><a href="javascript:void(0);" @click="goto('/account/order','Order')">我的订单</a></li>
					<li><a href="javascript:void(0);" @click="goto('/account/contect','Contect')">常用收货地址</a></li>
					<li><a href="javascript:void(0);" @click="goto('/account/wishlist','Wishlist')">我的收藏</a></li>
					<li class="active"><a href="javascript:void(0);" @click="goto('/account/userSetting','UserSetting')">个人设置</a></li>
					<li><a href="javascript:void(0);" @click="goto('/account/ewallet','EWallet')">充值</a></li>
				</ul>
				<!-- /page tabs -->
			</div>
		</section>

		<section>
			<div class="container">

				<div class="panel panel-default">
					<div class="panel-heading">
						<h2 class="panel-title">个人信息设置</h2>
					</div>

					<fieldset class="padding-40 ">
						<div class="row">
							<h3 class='text-center'>个人信息</h3>
							<form id="userBasicFrom" onsubmit="return false;">
								<div class="col-md-6 col-sm-6">
									<label for="nickName">昵称 </label> <input id="nickName"
										name="nickName" type="text" class="form-control required"
										v-model="userBasic.nickname">
								</div>
								<div class="col-md-6 col-sm-6">
									<label for="email">Email </label> <input id="email" name="email"
										type="text" class="form-control required"
										v-model="userBasic.email">
								</div>
							</form>
						</div>
						<button @click="editBasic"
							class="btn btn-success margin-top-20 pull-right noradius">保存</button>
					</fieldset>

					<hr />
					<h3 class='text-center'>修改密码</h3>
					<fieldset class="padding-40 ">
						<div class="row">
							<form id="userPwdFrom" onsubmit="return false;">
								<div class="col-md-12 col-sm-12">
									<label for="oldpassword">输入当前密码 </label> <input id="oldpassword"
										name="oldpassword" type="password" v-model="oldPassword"
										class="form-control required">
								</div>
								<div class="col-md-6 col-sm-6">
									<label for="password">新的密码 </label>
									<input id="password" name="password" type="password" v-model="password" class="form-control required">
								</div>
								<div class="col-md-6 col-sm-6">
									<label for="rpassword">确认密码 </label> <input id="rpassword"
										name="rpassword" type="password" v-model="rpassword" class="form-control required">
								</div>
							</form>
						</div>
						<button @click="editPassword" class="btn btn-success margin-top-20 pull-right noradius">保存</button>
					</fieldset>
				</div>
			</div>
		</section>

  </div>
</template>

<script>

export default {
  name: "UserSetting",
  data() {
    return {
      oldPassword:'',
      password: '',
      rpassword: '',
      userBasic:{
        pwd:'',
        nickname:'',
        email:''
      }
    }
  },
  created() {
    this.getUserinfo()
  },
  methods: {
    goto(path, name) {
      this.$router.push({
        path: path,
        name: name
      })
    },
    getUserinfo() {
      var userId = this.Storage.Local.get('User').id;
      var vm = this;
      this.$post(vm.API.API_URL_CUSTOMER_BASIC,{
        userId:userId
      }).then(res => {
        if(res.errorCode == 0){
          vm.userBasic = res.data;
        }
      })
    },
    editBasic(){
      var userId = this.Storage.Local.get('User').id;
      var vm = this;
      this.$post(vm.API.API_URL_UPDATE_CUSTOMER,{
        id:userId,
        nickname: vm.userBasic.nickname,
        email: vm.userBasic.email
      }).then(res => {
				if (res.data.success) {
          vm.Toastr.success(res.data.message);
        } else {
          vm.Toastr.warning(res.data.message);
        }
      })
    },
    editPassword(){
      var userId = this.Storage.Local.get('User').id;
      var vm = this;
      if(this.oldPassword.length == 0) {
        vm.Toastr.warning('旧密码不能为空');
      } else if(this.rpassword.length == 0) {
        vm.Toastr.warning('新密码不能为空');
      } else {
        this.$post(vm.API.API_URL_CHANGE_PASSWORD,{
          userId:userId,
          oldpassword: vm.oldPassword,
          rpassword: vm.rpassword
        }).then(res => {
          if (res.data.success) {
            vm.Toastr.success(res.data.message);
          } else {
            vm.Toastr.warning(res.data.message);
          }
        })
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- <style src="../../../static/css/bootstrap.min.css"></style>
<style src="../../../static/css/essentials.css"></style>
<style src="../../../static/css/layout.css"></style>
<style src="../../../static/css/header-1.css"></style>
<style src="../../../static/css/layout-shop.css"></style> -->
<style scoped>
</style>
