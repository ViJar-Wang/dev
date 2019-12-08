<template>
	<div id="app-content">
		<template>
			<div class="page tabbar js_show">
				<div class="page__bd" style="height: 100%;">
					<div class="weui-tab">
						<div class="weui-tab__panel" style='padding-bottom: 100px'>

							<form action="" v-on:submit.prevent="">
								<mt-search v-model="searchValue" cancel-text="取消" placeholder="搜索" @keyup.enter.native="search" class="font-size-8"
								 style="width:100%;height:auto;">
								</mt-search>
							</form>

							<!-- 搜索
						<div class="weui-search-bar" id="searchBar">
							<form id="searchForm" action="${root}/mobile/product/search" onsubmit="return searchKeyword();" method="get"  class="weui-search-bar__form">
								<div class="weui-search-bar__box">
									<i class="weui-icon-search"></i>
									<input type="text" class="weui-search-bar__input" id="searchInput" placeholder="搜索">
									<input type="hidden" id="encodeKeyword" name="keyword">
									<a href="javascript:" class="weui-icon-clear" id="searchClear"></a>
								</div>
								<label class="weui-search-bar__label" id="searchText"
									style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);">
									<i class="weui-icon-search"></i> <span>搜索</span>
								</label>
							</form>
							<a href="javascript:" class="weui-search-bar__cancel-btn" id="searchCancel">取消</a>
						</div>
-->
							<!-- 分类开始 -->
							<div class='weui-panel weui-panel_access' v-for="category in categoryList" :key="category.id">
								<div class="weui-panel__hd">{{category.name}}</div>
								<div class="weui-panel__bd" v-for="product in category.productRelationList" :key="product.id">
									<router-link :to="{path:'/Product',query:{productId:product.id}}" class="weui-media-box weui-media-box_appmsg">
										<div class="weui-media-box__hd">
											<img class="weui-media-box__thumb" :src="API.BASE_SERVER_URL+product.defaultImg" />
										</div>
										<div class="weui-media-box__bd">
											<h4 class="weui-media-box__title">{{product.name}}</h4>
											<p class="weui-media-box__desc">
												店面价格 <strong class='link'>￥{{product.shopPrice / 100}}</strong>
												市场价格 <del>￥{{product.price / 100}}</del>
											</p>
										</div>
									</router-link>
								</div>

								<router-link :to="{path:'/searchProducts', query:{categoryId:category.id,categoryName:category.name,currentPage:3}}" class="weui-media-box weui-media-box_appmsg">
																		<div class="weui-cell__bd">查看更多</div><span class="weui-cell__ft"></span>
								                </router-link>
							</div>
							<!-- /分类结束 -->
						</div>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				searchValue: '',
				categoryList: []
			}
		},
		created() {
			this.getIndexProducts();
		},
		methods: {
			search() {
				if (this.searchValue == "") {
					this.Toastr.info("请输入搜索的内容！");
					return;
				} else {
					this.$router.push({
						path: "/searchProducts",
						name: "SearchProducts",
						query: {
							productName: this.searchValue
						}
					});
				}
			},
			getIndexProducts() {
				let vm = this;
				this.$post(this.API.API_URL_CATALOG_INDEX_PRODUCTS, {
					pageSize: 3
				}).then(res => {
					if (res.errorCode == 0 && res.data) {
						vm.categoryList = res.data
					}
				})
			},
			getCatalog(id) {
				let vm = this;
				this.$post(this.API_URL_CATALOG_PRODUC, {
					categoryId: id,
					currentPage: 1
				}).then(res => {
					if (res.errorCode == 0 && res.data) {
						console.log(res.data)
					}
				})
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
