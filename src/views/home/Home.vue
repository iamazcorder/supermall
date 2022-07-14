<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control"
            v-show="isTabShow">
        </tab-control>
        <!-- 专门封装一个依赖于BSroll实现页面滚动的组件 -->
        <scroll class="content" ref="scroll" @scroll="contentScroll" @pullUpLoad="loadMore" :probe-type="3"
            :pull-up-load="true">
            <!-- 最终在大组件上呈现的小组件必须是完全封装好的 -->
            <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
            <recommend-view :recommends="recommends"></recommend-view>
            <feature-view></feature-view>
            <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2" v-show="!isTabShow">
            </tab-control>
            <goods-list :goods="showGoods"></goods-list>
        </scroll>
        <!-- 监听组件 -->
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
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
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl.vue'
import Scroll from 'components/common/scroll/Scroll.vue'

import GoodsList from 'components/content/goods/GoodsList.vue'
import BackTop from 'components/content/backTop/BackTop.vue'


// 子组件
// 导入最终效果的轮播图组件
import HomeSwiper from './childComps/HomeSwiper'
// 导入推荐模块组件
import RecommendView from './childComps/RecommendView.vue'
// 导入特性组件
import FeatureView from './childComps/FeatureView.vue'

// 导入公共的方法
import { debounce } from 'common/utils'


export default {
    name: "Home",
    components: {
        NavBar,
        TabControl,
        HomeSwiper,
        RecommendView,
        FeatureView,
        GoodsList,
        Scroll,
        BackTop
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
            },
            currentType: 'pop',
            isShowBackTop: false,
            tabOffset: 0,
            isTabShow: false,
            saveY: 0
        }
    },
    computed: {
        showGoods() {
            return this.goods[this.currentType].list
        }
    },
    // 在组件创建好的时候就请求数据
    // 请求数据要在home的根组件请求，再传递给子组件，而不是子组件自己去获取
    // 在created里面只写具体的逻辑，相关执行的代码定义到methods里面
    created() {
        // 1.请求多个数据
        this.getHomeMultidata()
        // 2.请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')

        // 3.组件创建完就开始监听商品图片是否加载完成
        // this.$bus.$on('itemImgLoad', () => {
        //     this.$refs.scroll.refresh()
        // })
    },
    mounted() {
        // 1.GoodsListItem的图片加载完成的事件监听
        const refresh = debounce(this.$refs.scroll.refresh, 200)
        this.$bus.$on('itemImgLoad', () => {
            refresh()
        })
    },
    activated() {
        this.$refs.scroll.refresh()
        this.$refs.scroll.scrollTo(0, this.saveY, 0)
    },
    deactivated() {
        this.saveY = this.$refs.scroll.getScrollY()
    },
    methods: {
        // 网络请求相关的方法
        getHomeMultidata() {
            getHomeMultidata().then(res => {
                this.banners = res.data.data.banner.list
                this.recommends = res.data.data.recommend.list
            })
        },
        getHomeGoods(type) {
            const page = this.goods[type].page + 1   //对象的属性是一个变量，对象名[属性名]
            getHomeGoods(type, page).then(res => {
                console.log(res);
                // 获取每一页的数据，依次push到this.goods[type].list里面
                // ...+数组能直接把数组里面的内容直接展开
                this.goods[type].list.push(...res.data.data.list)
                // 每次获取数据成功后，页码数都要加一
                this.goods[type].page += 1
                // 每次获取数据成功后，重新开启scroll对上拉加载更多的监听
                this.$refs.scroll.finishPullUp()
            })
        },


        // 事件监听相关的方法
        tabClick(currentIndex) {
            switch (currentIndex) {
                case 0:
                    this.currentType = 'pop'
                    break
                case 1:
                    this.currentType = 'new'
                    break
                case 2:
                    this.currentType = 'sell'
            }
            this.$refs.tabControl1.currentIndex = currentIndex
            this.$refs.tabControl2.currentIndex = currentIndex
        },
        backClick() {
            // 访问scroll组件里面的BScroll实例(父组件访问子组件)
            this.$refs.scroll.scrollTo(0, 0, 300)
        },
        contentScroll(position) {
            // if (position.y <= -1000) {
            //     this.isShowBackTop = true;
            // } else {
            //     this.isShowBackTop = false;
            // }
            // this.isShowBackTop = position.y < -1000 ? true : false
            // 1.判断backTop是否显示
            this.isShowBackTop = position.y < -1000

            // 2.判断TabControl是否吸顶
            if (position.y <= -this.tabOffset) {
                this.isTabShow = true
            } else {
                this.isTabShow = false
            }
        },
        loadMore() {
            this.getHomeGoods(this.currentType)
        },
        // 获取tabControl的offsetTop
        swiperImgLoad() {
            this.tabOffset = this.$refs.tabControl2.$el.offsetTop
            console.log(this.tabOffset)
        }
    }
}
</script>

<style scoped>





#home {
    /* vh为视口高度 */
    height: 100vh;
}

.home-nav {
    /* 此时用的是BScroll来实现滚动，不是原生的滚动，不会跟随一起滚动，所以滚动不影响nav，不需要固定定位 */
    /* position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 9; */
    background-color: var(--color-tint);
    color: #fff;
}

/* .tab-control {
                这个属性用于页面滚动到一定高度时就 固定住
                使用了Better-Scroll，这个属性就无效了
                position: sticky;
                在navbar下面固定住，44是navbar的高度
                top看的是距离页面顶部的高度
                top: 44px; 
                z-index: 9; 
            } */

.content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
}

/* .content {
                设置页面可以滚动的高度
                height: calc(100% - 93px);
                margin-top: 44px;
                overflow: hidden;
            } */
.tab-control {
    position: relative;
    z-index: 2;
    /* z-index只对定位的元素有效果 */
}
</style>