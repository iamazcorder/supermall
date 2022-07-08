<template>
    <swiper>
        <swiper-item v-for="(item, index) in banners" :key="index">
            <a :href="item.link">
                <img :src="item.image" alt="">
            </a>
        </swiper-item>
    </swiper>
</template>

<script>
// 导入轮播图组件
import { Swiper, SwiperItem } from 'components/common/swiper/index'
export default {
    name: "HomeSwiper",
    components: {
        Swiper,
        SwiperItem
    },
    data: function () {
        return {
        }
    },
    props: {
        banners: {
            type: Array,
            // 当属性为数组或者是对象时，默认值必须是一个函数的返回值
            default() {
                return []
            }
        }
    }
}
</script>

<style>
</style>