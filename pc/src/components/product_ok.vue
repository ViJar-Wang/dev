<template>
  <div id="app-content">
    <template>
      <!-- /PAGE HEADER -->
      <!-- -->
      <section>
        <div class="container">
          <div class="row">
            <!-- LEFT -->
            <div class="col-lg-3 col-md-3 col-sm-3">
              <!-- FEATURED -->
              <div class="margin-bottom-60">
                <h2 class="owl-featured">热销商品</h2>
                <div class="">
                  <div>
                    <!-- SLIDE -->
                    <ul class="list-unstyled nomargin nopadding text-left">
                      <template v-if="productHots && productHots.length>0">
                        <li v-for="item in productHots" :key="item.id" class="clearfix">
                          <!-- item -->
                          <div class="thumbnail featured clearfix pull-left">
                            <a>
                              <img :src="API.BASE_SERVER_URL+item.defaultImg" width="80" height="80"
                                   alt="featured item">
                            </a>
                          </div>
                          <!-- 热销商品名称 -->
                          <a class="block size-12">{{item.name}}</a>
                          <!-- 热销商品价格 -->
                          <div class="size-18 text-left padding-top-8">￥{{(item.shopPrice/100).toFixed(1)}}</div>
                          <span class="line-through nopadding-left">市场价:￥{{(item.price/100).toFixed(1)}}</span>
                        </li>
                      </template>
                      <!-- /item -->
                    </ul>
                  </div>
                  <!-- /SLIDE -->
                </div>
              </div>
              <!-- /FEATURED -->
              <!-- HTML BLOCK -->
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        productHots: []
      }
    },
    created() {
      var param = {id: 935};
//      this.productList(param.id,1,3);
      this.hotProductList(1,3);
    },
    methods: {
      productList(productId,hot,pagesize) {
        this.$get(this.API.API_URL_CATALOG_PRODUCTS_HOT+'/'+productId+'/hot/'+hot+'/pagesize/'+pagesize).then(res => {
          if(res.errorCode == 0 && res.data) {
            this.productHots = res.data
          }
        })
      },
      hotProductList(hot,pagesize) {
        this.$post(this.API.API_URL_CATALOG_PRODUCTS_HOT,{pageSize: pagesize}).then(res => {
          if(res.errorCode == 0 && res.data) {
            this.productHots = res.data
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .optionGroup {
    padding: 10px;
  }

  .option {
    padding: 4px;
    border: 1px solid #8ab933;
    border-radius: 3px;
    margin: 2px;
    cursor: pointer;
  }

  .optionSelected {
    background-color: #8ab933;
    color: #fff;
  }

  .quantityBox > .input-group {
    width: 100px;
  }
</style>
