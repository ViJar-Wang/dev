<template>
	<div class="page js_show">
		<div class="page__hd">
        <h1 class="page__title">用户登录</h1>
    </div>
    	<div class="weui-cells__title" style='color:red'>{{loginError}}</div>
		<div class="weui-cells weui-cells_form">

			<div class="weui-cell">
				<div class="weui-cell__hd">
					<label class="weui-label">手机号</label>
				</div>
				<div class="weui-cell__bd">
					<input class="weui-input" maxlength="11" type="tel" id='mobile' name="userName"
						placeholder="请输入手机号" v-model='user.userName'>
				</div>
			</div>

			<div class="weui-cell">
				<div class="weui-cell__hd">
					<label class="weui-label">密码</label>
				</div>
				<div class="weui-cell__bd">
					<input class="weui-input" v-model="user.pwd" type="password" name="pwd" id="password" placeholder="输入密码">
				</div>
			</div>

      <div class="weui-btn-area">
        <a @click="login" class="weui-btn weui-btn_primary" href="javascript:void(0)" id="loginButton">用户登录</a>
      </div>
    </div>

		<div class="weui-btn-area">
      <a @click="register" class="weui-btn weui-btn_default" href="javascript:void(0)">用户注册</a>
<!-- 			<a class="weui-btn weui-btn_default" href="mobile/register" />用户注册</a> -->
		</div>

		<div class="weui-cells__tips"><a class='link' href='/mobile/forget_password' />找回密码</a></div>

		<!-- 错误消息 -->
<!-- 		<div class="js_dialog" id="msgBox" style="opacity: 0; display: none;">
            <div class="weui-mask"></div>
            <div class="weui-dialog">
                <div class="weui-dialog__bd">...</div>
                <div class="weui-dialog__ft">
                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">确认</a>
                </div>
            </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {
        userName: "",
        pwd: ""
      },
      tips: {
        msg: "",
        userNameErr: null,
        pwdErr: null
      },
      loginError:''
    };
  },
  created() {
    var msg = this.$route.params.msg;
    if (msg) {
      this.tips.msg = msg;
    }
  },
  methods: {
    login() {
      let vm = this;
      var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
      if (!this.user.userName && !this.user.pwd) {
/*        this.tips.userNameErr = "请输入手机号码！";
        this.tips.pwdErr = "请输入密码！"; */
        vm.showMsg("请输入手机号码和密码!");
      } else if (!this.user.userName) {
/*        this.tips.userNameErr = "请输入手机号码！";
        this.tips.pwdErr = null;
 */        vm.showMsg("请输入手机号码");
      } else if (
        !mobile.test(this.user.userName) &&
        this.user.userName.length != 11
      ) {
/*        this.tips.userNameErr = "请正确填写您的手机号码！";
        this.tips.pwdErr = null; */
        vm.showMsg("请正确填写您的手机号码");
      } else if (this.user.userName.length > 11) {
/*        this.tips.userNameErr = "手机号码不能超过11位！！";
        this.tips.pwdErr = null; */
        vm.showMsg("手机号码不能超过11位！！");
      } else if (!this.user.pwd) {
/*        this.tips.userNameErr = null;
        this.tips.pwdErr = "请输入密码！"; */
        vm.showMsg("请输入密码");
      } else {
/*        this.tips.userNameErr = null;
        this.tips.pwdErr = null; */
        vm.$post(vm.API.API_URL_LOGIN, {
          userName: vm.user.userName,
          pwd: vm.user.pwd
        }).then(res => {
          if (res.errorCode == 0 && res.data != null) {
            vm.tips.msg = "";
            var user = {
              id: res.data.id,
              userName: res.data.userName,
              nickname: res.data.nickname
            };
            vm.Storage.Local.set("User", user);
            vm.$store.commit("setUser", user);
            vm.$router.push({path: "/"});
          } else {
            vm.showMsg("登录失败");
          }
        });
      }
    },
    register(){
      this.$router.push({path:'/register'});
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
