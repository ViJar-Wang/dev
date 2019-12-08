<template>
	<div class="page js_show">
		<div class="page__hd">
			<h1 class="page__title">会员设置</h1>
		</div>

		<div class="weui-cells weui-cells_form">
			<div class="weui-panel__hd">完善基本信息</div>

			<form id="userBasicFrom" onsubmit="return false;">
				<div class="weui-cell">
					<div class="weui-cell__hd">
						<label class="weui-label">昵称</label>
					</div>
					<div class="weui-cell__bd">
						<input class="weui-input" v-model="userBasic.nickname" type="text" placeholder="昵称" maxlength="20" name="nickName">
					</div>
				</div>

				<div class="weui-cell">
					<div class="weui-cell__hd">
						<label class="weui-label">Email</label>
					</div>
					<div class="weui-cell__bd">
						<input class="weui-input" v-model="userBasic.email" type="text" placeholder="Email" maxlength="50" name="email">
					</div>
				</div>
			</form>
		</div>

		<div class="weui-btn-area" style='margin-bottom: 20px' id="editBasic">
				<button @click="editBasic" class="weui-btn weui-btn_primary">保存</button>
		</div>

		<div class="weui-cells weui-cells_form">
			<div class="weui-panel__hd">密码修改</div>
			<form id="userPwdFrom" onsubmit="return false;">
				<div class="weui-cell">
					<div class="weui-cell__hd">
						<label class="weui-label">原始密码</label>
					</div>
					<div class="weui-cell__bd">
						<input class="weui-input" type="password" placeholder="原始密码" maxlength="20" name="oldpassword"  v-model="oldPassword">
					</div>
				</div>

				<div class="weui-cell">
					<div class="weui-cell__hd">
						<label class="weui-label">新密码</label>
					</div>
					<div class="weui-cell__bd">
						<input class="weui-input"  v-model="password" type="password" placeholder="新密码" maxlength="20" name="password">
					</div>
				</div>

				<div class="weui-cell">
					<div class="weui-cell__hd">
						<label class="weui-label">确认密码</label>
					</div>
					<div class="weui-cell__bd">
						<input class="weui-input"  v-model="rpassword" type="password" placeholder="确认密码" maxlength="20" name="rpassword">
					</div>
				</div>
			</form>
		</div>

		<div class="weui-btn-area" style='margin-bottom: 20px' id="editPwd">
      <button @click="editPassword" class="weui-btn weui-btn_primary">保存</button>
		</div>

		<div class="weui-cells weui-cells_form">
			<div class="weui-panel__hd">拍照上传头像</div>
        <input type="file" accept="image/*" @change="takePhoto($event)" name="file">
      </div>
    </div>
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
    },
    takePhoto(e){
      //拍照功能---上传头像
      var file=e.target.files[0]//获取文件对象
      var fd=new FormData()//构造formdata对象
      fd.append('file',file)//向formdata里面存放键值对
      //fd.append('uid',this.$store.getters.getUid)//向formdata里面存放键值对，this.$store.getters.getUid是用户的uid
      this.$post("http://127.0.0.1:7000/me/upAvatar",fd).then(res=>{
        if(res.data.code===1){
           //如果上传成功，则获取图片的地址
          this.getAvatar()
        }
      })
    },
  }
}
</script>

<style scoped>
</style>
