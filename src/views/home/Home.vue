<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <!-- 最终在大组件上呈现的小组件必须是完全封装好的 -->
        <home-swiper :banners="banners"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control :titles="['流行', '新款', '精选']" class="tab-control"></tab-control>
        <ul>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li>列表</li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
</template>

<script>
// 导入请求的数据
// 导入封装好的Home数据的请求
import {
    getHomeMultidata,
    getHomeGoods
} from '@/network/home'

// 公共组件
// 导入的NavBar组件
import NavBar from 'components/common/navbar/NavBar'
// 导入TabControl组件
import TabControl from 'components/content/tabControl/TabControl.vue'

// 子组件
// 导入最终效果的轮播图组件
import HomeSwiper from './childComps/HomeSwiper'
// 导入推荐模块组件
import RecommendView from './childComps/RecommendView.vue'
// 导入特性组件
import FeatureView from './childComps/FeatureView.vue'

export default {
    name: "Home",
    components: {
        NavBar,
        TabControl,
        HomeSwiper,
        RecommendView,
        FeatureView,
    },
    data() {
        return {
            banners: [],
            recommends: [],
            // 商品列表的数据存放模型 ，把从服务器获取的数据存放到这里面
            goods: {
                pop: { page: 0, list: [] },
                new: { page: 0, list: [] },
                sell: { page: 0, list: [] }
            }
        }
    },
    // 在组件创建好的时候就请求数据
    // 请求数据要在home的根组件请求，再传递给子组件，而不是子组件自己去获取
    created() {
        // 1.请求多个数据
        getHomeMultidata().then(res => {
            this.banners = res.data.data.banner.list
            this.recommends = res.data.data.recommend.list
        }),
        // 2.请求商品数据
        getHomeGoods('pop', 1).then(res => {
            console.log(res);
        })
    }
}
</script>

<style>
#home {
    padding-top: 44px;
}

.home-nav {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 9;
    background-color: var(--color-tint);
    color: #fff;
}

.tab-control {
    /* 这个属性用于页面滚动到一定高度时就 固定住*/
    position: sticky;
    /* 在navbar下面固定住，44是navbar的高度 */
    /* top看的是距离页面顶部的高度 */
    top: 44px;
}
</style>