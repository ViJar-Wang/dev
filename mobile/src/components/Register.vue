<template>
	<div class="page js_show">
		<div class="page__hd">
        <h1 class="page__title">用户注册</h1>
        <p class="page__desc" id='smsMsgBox'></p>
    </div>
			<div class="weui-cells__title" style='color:red'>{{errorMsg}}</div>
			<div class="weui-cells weui-cells_form">
				<div class="weui-cell weui-cell_vcode">
					<div class="weui-cell__hd">
						<label class="weui-label">手机号</label>
					</div>
					<div class="weui-cell__bd">
						<input class="weui-input" id='mobile' name='userName' maxlength="11" type="tel"
							placeholder="请输入手机号" v-model='userName'>
					</div>
					<div class="weui-cell__ft">
						<a href="javascript:;" @click='sendSmsCode' class="weui-vcode-btn">获取验证码</a>
					</div>
				</div>

				<div class="weui-cell">
					<div class="weui-cell__hd">
						<label class="weui-label">验证码</label>
					</div>
					<div class="weui-cell__bd">
						<input class="weui-input" maxlength="6" id='smsCode' name='smsCode' v-model="smsCode" type="tel"
							placeholder="请输入验证码">
					</div>
				</div>

				<div class="weui-cell">
					<div class="weui-cell__hd">
						<label class="weui-label">密码</label>
					</div>
					<div class="weui-cell__bd">
						<input class="weui-input" v-model="password" id='password' name='pwd' type="password" placeholder="输入密码">
					</div>
				</div>

				<div class="weui-cell">
					<div class="weui-cell__hd">
						<label class="weui-label">确认密码</label>
					</div>
					<div class="weui-cell__bd">
						<input class="weui-input" v-model="confirmPassword" id='confirmPassword' name='confirmPassword' type="password" placeholder="确认密码">
					</div>
				</div>
			</div>

			<div class="weui-btn-area">
				<a @click="register()" class="weui-btn weui-btn_primary" id='registerButton' href="javascript:;">用户注册</a>
			</div>

		<div class="weui-btn-area">
			<a @click="login()" class="weui-btn weui-btn_default" href="javascript:;" id="showTooltips">用户登录</a>
		</div>

	</div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      errorMsg:'',
      userName:'',
      password:'',
      confirmPassword:'',
      smsCode: ''
    };
  },
  created() {
    var msg = this.$route.params.msg;
    if (msg) {
      this.tips.msg = msg;
    }
  },
  methods: {
    checkMobile(mobile) {
      let vm = this;
      if (mobile == '') {
        vm.Toastr.info("请填写手机号码");
				return false;
			}

			if (/^1[0-9]{10}$/.test(mobile)) {
          if(!/^1[34578]\d{9}$/.test(mobile)) {
	    				vm.Toastr.info("手机号码不正确");
	    				return false;
          }
      } else {
          if(!/^\+\d+$/.test(mobile)) {
              vm.Toastr.info("手机号码不正确");
              return false;
          }
      }
			return true;
		},
    sendSmsCode(){
      let vm = this;
				if (!checkMobile(vm.username)) {
					return;
				}
				//获取短信验证码
				$.ajax({
					  type: 'POST',
					  url: vm.API.SEND_SMS,
					  data: {"userName":vm.userName},
					  dataType: 'json',
					  success: function(resData) {
						  if (resData.errorCode == "0") {
							  vm.smsCode = resData.data;
						  }else if(resData.errorCode == '-2'){
                vm.Toastr.info("您已注册,请登录");
						  }
					  }
				})
    },
    register() {
      let vm = this;
    },
    login(){
      this.$router.push({path:'/Login'});
    },
    showMsg(html){
      this.$messagebox({
        title: '提示信息',
        message: html,
        showCancelButton: false,
        confirmButtonText:"确定"
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
