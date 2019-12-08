<template>
	<div class="page js_show">
		<div class="page__hd">
			<h1 class="page__title">常用联系人</h1>
		</div>
			<div class="weui-cells weui-cells_form">
				<div class="weui-cell">
					<input type="hidden" name="id">
					<div class="weui-cell__hd">
						<label class="weui-label">联系人姓名</label>
					</div>
					<div class="weui-cell__bd">
						<input class="weui-input" v-model="name" maxlength="50" name="name" type="text" placeholder="联系人姓名">
					</div>
					<div class="erro"></div>
				</div>
				<div class="weui-cell">
					<div class="weui-cell__hd">
						<label class="weui-label">联系人电话</label>
					</div>
					<div class="weui-cell__bd">
						<input class="weui-input" v-model="mobile" maxlength="11" name="mobile" type="tel" placeholder="联系人电话">
					</div>
					<div class="erro"></div>
				</div>
				<div class="weui-cell">
					<div class="weui-cell__hd">
						<label class="weui-label">联系人地址</label>
					</div>
					<div class="weui-cell__bd">
						<input class="weui-input" v-model="address" name="address" maxlength="255" type="text" placeholder="联系人地址">
					</div>
					<div class="erro"></div>
				</div>
			</div>

		<div class="weui-btn-area" style='margin-bottom:20px'>
			<a @click="saveContect()" id="save" class="weui-btn weui-btn_primary" href="javascript:void(0)">保存</a>
		</div>
			<div class="weui-form-preview" v-for="(z,index) in accountList.data" :key="z.id">
				<div class="weui-form-preview__bd">
					<div class="weui-form-preview__item">
						<label class="weui-form-preview__label">联系人</label>
						<span class="weui-form-preview__value">{{z.name}}</span>
					</div>
					<div class="weui-form-preview__item">
						<label class="weui-form-preview__label">联系人电话</label>
						<span class="weui-form-preview__value">{{z.mobile}}</span>
					</div>
					<div class="weui-form-preview__item">
						<label class="weui-form-preview__label">联系人地址</label>
						<span class="weui-form-preview__value">{{z.address}}</span>
					</div>
					<div class="weui-form-preview__item">
						<label class="weui-form-preview__label">操作</label>
						<span class="weui-form-preview__value">
						<a href="javascript:void(0);" @click="changeById(index)">编辑</a>
						<a href="javascript:void(0);" @click="deleteById(z.id)">删除</a>
						<a href="javascript:void(0);" @click="setDefault(z.id)">设为默认联系人</a></span>
					</div>
				</div>
			</div>

		<div class="weui-form-preview" style="margin-bottom: 80px;"></div>
	</div>
</template>

<script>
export default {
  name: "Contect",
  data() {
    return {
      id: 0,
      name: '',
      mobile: '',
      contactFlag: 0,
      address: '',
      accountList:null
    }
  },
  created() {
    this.getContect()
  },
  methods: {
    goto(path, name) {
      this.$router.push({
        path: path,
        name: name
      })
    },
    getContect() {
      var userId = this.Storage.Local.get('User').id;
      var vm = this;
      this.$post(vm.API.API_URL_CONTECT,{
        userId:userId
      }).then(res => {
        if(res.errorCode == 0){
          this.accountList = res.data;
        }
      })
    },
    saveContect(){
      var userId = this.Storage.Local.get('User').id;
      var vm = this;
      if (this.id == 0){
        this.$post(vm.API.API_URL_CONTECT_ADD,{
          userId:userId,
          name: vm.name,
          mobile: vm.mobile,
          address: vm.address
        }).then(res => {
          if(res.data==true){
            vm.Toastr.success("保存成功！");
            window.location.reload();
          }else{
            vm.Toastr.info("联系人至多添加5人!");
          }
        })
      }else{
        this.$post(vm.API.API_URL_CONTECT_UPDATE,{
          id: vm.id,
          userId:userId,
          name: vm.name,
          mobile: vm.mobile,
          address: vm.address,
          contactFlag: vm.contactFlag
        }).then(res => {
          if(res.data==true){
            vm.Toastr.success("保存成功！");
            window.location.reload();
          }else{
            vm.Toastr.info("联系人至多添加5人!");
          }
        })
      }
    },
    setDefault(id){
      let vm = this;
      var userId = this.Storage.Local.get('User').id;
        this.$post(vm.API.API_URL_CONTECT_DEFAULT,{
          id: id,
          userId:userId,
          contactFlag: 1
        }).then(res => {
          if(res.errorCode==0){
            vm.Toastr.info("保存成功!");
          }else{
            vm.Toastr.info("保存失败!");
          }
        })
    },
    changeById(index) {
        this.id = this.accountList.data[index].id;
        this.name = this.accountList.data[index].name;
        this.mobile = this.accountList.data[index].mobile;
        this.address = this.accountList.data[index].address;
        this.contactFlag = this.accountList.data[index].contactFlag;
    },
    deleteById(id) {
      var userId = this.Storage.Local.get('User').id;
      let vm = this;
      this.$post(vm.API.API_URL_CONTECT_REMOVE,{
        userId:userId,
        id: id
      }).then(res => {
				if(res.errorCode==0){
					window.location.reload();
				}else{
					this.Toastr.info("删除失败!");
				}
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
