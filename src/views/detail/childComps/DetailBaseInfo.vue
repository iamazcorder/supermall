<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{ goods.title }}</div>
    <div class="info-price">
      <span class="n-price">{{ goods.newPrice }}</span>
      <span class="o-price">{{ goods.oldPrice }}</span>
      <span class="discount" v-if="goods.discount">{{ goods.discount }}</span>
    </div>
    <div class="info-other" v-if="goods.columns[0]">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="info-service">
      <span v-for="index in goods.services.length - 1" :key="index" class="info-service-item">
        <img :src="goods.services[index - 1].icon" alt="">
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>

export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.base-info {
  padding: 8px;
  font-size: 10px;
}

.info-title {
  margin: 8px 0 10px;
  font-weight: 500;
  color: #000;
  font-size: 16px;
}

.n-price {
  color: var(--color-high-text);
  font-size: 20px;
  margin-right: 5px;
}

.o-price {
  font-size: 14px;
  text-decoration: line-through;
}

.info-price {
  position: relative;
}

.discount {
  position: absolute;
  top: 1px;
  left: 110px;
  padding: 2px 4px;
  color: #fff;
  background-color: var(--color-high-text);
  border-radius: 8px;
  font-size: 10px;
}

.info-other {
  margin-top: 10px;
  display: flex;
  /* text-align: center; */
  justify-content: space-between;
  padding: 8px 0;
  color: #ccc;
  font-size: 12px;
  border-bottom: 1px solid rgba(100, 100, 100, .1);
}

.info-service {
  display: flex;
  justify-content: space-between;
  height: 60px;
  line-height: 60px;
}

.info-service-item img {
  width: 14px;
  height: 14px;
}
</style>