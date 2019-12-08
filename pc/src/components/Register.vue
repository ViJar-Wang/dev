<template>
  <div id="app-content">
    <section class="page-header page-header-xs">
      <div class="container">
        <h1>用户注册</h1>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            <a>注册</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </section>
		<section>
			<div class="container">
				<div class="row">
					<div class="col-md-5 col-md-offset-1">
						<img class="img-responsive" src="/static/images/shop/login-png.png">
					</div>
					<div class="col-md-4">
						<h2 class="size-16">用户注册</h2>
						<!-- login form -->
						<form id="registerForm" method="post" action="#">
							<div class="clearfix">
								<div class="form-group">
									<input id="userName" class="form-control" placeholder="手机号码" required="" maxlength="11" />
								</div>
								<div class="form-group">
									<input id="smsCode" class="form-control" placeholder="请输入手机验证码" maxlength="6"  />
								</div>
								<div class="form-group">
									<input type="password" id="pwd" class="form-control" placeholder="密码" required="" maxlength="20"  />
								</div>
								<div class="form-group">
									<input type="password" id="confirmPassword" class="form-control" placeholder="确认密码" required="" maxlength="20"/>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6 col-sm-6 col-xs-6">
									<!-- Inform Tip -->
									<div class="form-tip pt-20">
										<button id="smsBtn" class="btn btn-info noradius" type="button">发送手机验证码</button>
									</div>
								</div>
								<div class="col-md-6 col-sm-6 col-xs-6 text-right">
									<button id="registerBtn" class="btn btn-primary noradius" type="button">注册</button>
								</div>
							</div>
							<div>
								<a href="#">立即登录</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>

  </div>
</template>

<script>
export default {
  name: "Register",
  data() {

  },
  methods: {

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  	.error {
  		font-weight: bold;
  	}
</style>
