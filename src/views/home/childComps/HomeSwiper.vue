<template>
    <swiper>
        <swiper-item v-for="(item, index) in banners" :key="index">
            <a :href="item.link">
                <img :src="item.image" @load="swiperImgLoad">
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
            isLoad: false  //类似于节流阀
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
    },
    methods: {
        swiperImgLoad() {
            if (!this.isLoad) {
                this.$emit('swiperImgLoad')   //事件只需要发送一次
                this.isLoad = !this.isLoad
            }
        }
    }
}
</script>

<style>
</style>