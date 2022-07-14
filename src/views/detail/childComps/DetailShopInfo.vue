<template>
  <div class="shop-info" v-if="Object.keys(shop) !== 0">
    <div class="shop-top">
      <img :src="shop.logo" alt="">
      <span class="title">{{ shop.name }}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">{{ sellsCount }}</div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">{{ shop.goodsCount }}</div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{ item.name }}</td>
            <td class="score" :class="{ 'score-better': item.isBetter }">{{ item.score }}</td>
            <td class="better" :class="{ 'better-more': item.isBetter }"><span>{{ item.isBetter ? '高' : '低' }}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    sellsCount() {
      const value = this.shop.sells;
      return value < 10000 ? value : parseInt(value / 10000) + '万'
    }
  }
}
</script>

<style scoped>
.shop-info {
  padding: 25px 8px;
  border-top: 5px solid #f2f5f8;
  border-bottom: 5px solid #f2f5f8;
}

.shop-top {
  padding-bottom: 15px;
}

.shop-top img {
  width: 45px;
  vertical-align: middle;
  margin-right: 10px;
  border-radius: 45px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.shop-middle {
  display: flex;
  /* 侧轴上面居中显示 */
  align-items: center;
}

.shop-middle-item {
  flex: 1;
}

.shop-middle-left {
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}

.sells-text,
.goods-text {
  font-size: 12px;
  margin-top: 8px;
}

.shop-middle-right {
  display: flex;
  justify-content: center;
  font-size: 12px;
}

.shop-middle-right td {
  padding: 3px 2px;
}


.score {
  color: #5ea732;
}

.score-better {
  color: #f13e3a;
}

.better span {
  background-color: #5ea732;
  color: #fff;
}

.better-more span {
  background-color: #f13e3a;
}

.shop-bottom {
  display: flex;
  justify-content: center;
  margin-top: 8px;
}

.enter-shop {
  width: 150px;
  height: 30px;
  font-size: 14px;
  border-radius: 10px;
  background-color: #f2f5f8;
  text-align: center;
  line-height: 30px;
}
</style>