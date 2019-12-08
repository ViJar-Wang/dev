<template>
  <div id="app-content">
    <section class="page-header page-header-xs">
      <div class="container">
        <h1>个人中心</h1>

        <!-- breadcrumbs -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人中心</el-breadcrumb-item>
          <el-breadcrumb-item>充值</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /breadcrumbs -->

        <!-- page tabs -->
        <ul class="page-header-tabs list-inline">
					<li><a href="javascript:void(0);" @click="goto('/account/order','Order')">我的订单</a></li>
          <li><a href="javascript:void(0);" @click="goto('/account/contect','Contect')">常用收货地址</a></li>
					<li><a href="javascript:void(0);" @click="goto('/account/wishlist','Wishlist')">我的收藏</a></li>
					<li><a href="javascript:void(0);" @click="goto('/account/userSetting','UserSetting')">个人设置</a></li>
					<li class="active"><a href="javascript:void(0);" @click="goto('/account/ewallet','EWallet')">充值</a></li>
        </ul>
        <!-- /page tabs -->
      </div>
    </section>
    <section>
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h2 class="panel-title">账户充值</h2>
          </div>
          <br>
          <div class="row">
            <h4 class="text-center">当前电子钱包账户余额为：{{(userAccount.amount).toFixed(2)}}</h4>
          </div>
          <div class="panel-body">
            <fieldset class="margin-top-10">
              <div class="row">
                <div class="form-group col-lg-12">
                  <label for="account">
                    请输入充值金额
                    <span style="color:red">*</span>
                  </label>
                  <el-input
                    type="text"
                    class="required"
                    v-model="account"
                    placeholder="请输入充值金额"
                    maxlength="255"
                  />
                  <div class="erro">{{msg}}</div>
                </div>
              </div>
              <el-button
                type="primary"
                @click="recharge"
                class="pull-right margin-top-20"
                icon="el-icon-circle-plus-outline"
              >充值</el-button>
            </fieldset>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "EWallet",
  data() {
    return {
      account: '',
      msg: null,
      userAccount: {
        amount: 0
      }
    }
  },
  created() {
    this.getUserAccount()
  },
  methods: {
    goto(path, name) {
      this.$router.push({
        path: path,
        name: name
      })
    },
    getUserAccount() {
      var userId = this.Storage.Local.get('User').id;
      var vm = this;
      this.$post(vm.API.API_URL_CUSTOMER_Account,{
        userId:userId
      }).then(res => {
        if(res.errorCode == 0){
          this.userAccount = res.data;
        }
      })
    },
    recharge() {
      if(this.account.length == 0) {
        this.msg = '充值金额不能为空';
      } else if(this.account <= 0) {
        this.msg = '充值金额不能为负数或0'
      } else {
        var vm = this;
        var userId = this.Storage.Local.get('User').id;
        vm.msg = '';
        this.$post(vm.API.API_URL_CUSTOMER_Recharge_Account,{
          userId:userId,
          amount: vm.account,
          updTime: new Date(),
          source: "充值"
        }).then(res => {
          if(res.errorCode == 0 && res.data) {
            vm.account = '';
            vm.getUserAccount();
            vm.Toastr.success("充值成功！");
          }else {
            vm.Toastr.error("充值失败！");
          }
        });

      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
