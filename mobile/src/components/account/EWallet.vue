<template>
	<div class="page js_show">
		<div class="page__hd">
			<h1 class="page__title">电子钱包充值</h1>
		</div>
		<div class="weui-panel__bd" style="text-align: center;">
						<h2 style="padding: 30px 0 30px 0">当前电子钱包账户余额为：{{userAccount.amount}}</h2>
					</div>
			<div class="weui-cells weui-cells_form">
			<div class="weui-panel__hd">电子钱包充值</div>
				<div class="weui-cell">
					<input type="hidden" name="id">
					<div class="weui-cell__hd">
						<label class="weui-label">充值金额 </label>
					</div>
					<div class="weui-cell__bd">
						<input class="weui-input" maxlength="50" name="account" v-model="account"
							type="text" placeholder="请输入充值金额">
					</div>
          <div class="erro">{{msg}}</div>
				</div>
			</div>

		<div class="weui-btn-area" style='margin-bottom: 20px'>
			<a id="save" class="weui-btn weui-btn_primary"
				href="javascript:void()" @click="recharge">保存</a>
		</div>
		<div class="weui-form-preview" style="margin-bottom: 80px;"></div>
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
