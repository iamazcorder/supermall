<template>
  <div id="detail" class="detail">
    <detail-nav-bar></detail-nav-bar>
    <scroll :probeType="3" :pullUpLoad="true" class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imagesLoad="imagesLoad"></detail-goods-info>
    </scroll>
  </div>
</template>

<script>
// 导入公共组件
import DetailNavBar from './childComps/DetailNavBar.vue'
import Scroll from 'components/common/scroll/Scroll.vue'

// 导入子组件
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'

// 导入数据请求的模块
import { getDetail, Goods, Shop } from 'network/detail.js'

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo
  },
  data() {
    return {
      iid: null,
      topImages: null,
      goods: {},
      shop: {},
      detailInfo: {}
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid
    // 2.根据iid请求对应的数据
    getDetail(this.iid).then((res) => {
      // 1.获取顶部的图片轮播图
      this.topImages = res.data.result.itemInfo.topImages
      // 2.获取商品基本信息
      const result = res.data.result
      this.goods = new Goods(result.itemInfo, result.columns, result.shopInfo.services)
      // 3.获取店铺信息
      this.shop = new Shop(result.shopInfo)
      // 4.获取详情信息
      this.detailInfo = result.detailInfo
    })
  },
  mounted() {
    this.$refs.scroll.refresh()
  },
  methods: {
    imagesLoad() {
      this.$refs.scroll.refresh()
    }
  }
}
</script>

<style scoped>
.detail {
  height: 100vh;
}

.content {
  height: 100vh;
  overflow: hidden;
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
}
</style>