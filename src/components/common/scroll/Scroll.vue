<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import PullUp from '@better-scroll/pull-up'  //实现上拉加载的插件
import ObserveDOM from '@better-scroll/observe-dom'  //Enable detection of content and content child DOM changes

BScroll.use(PullUp)
BScroll.use(ObserveDOM)

export default {
    name: "Scroll",
    data() {
        return {
            scroll: null
        }
    },
    props: {
        probeType: {
            type: Number,
            default: 0
        },
        pullUpLoad: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        // 通过类获取的元素是不准确的，因为别的组件也可能有同样的类，所以要通过ref获取dom元素（父组件访问子组件）
        this.scroll = new BScroll(this.$refs.wrapper, {
            // 实现监听页面滚动
            probeType: this.probeType,
            // 实现上拉加载
            pullUpLoad: this.pullUpLoad,
            observeDOM: true,
            click: true  //加上这个属性页面内的点击事件才不会被屏蔽
        })

        // 监听页面滚动
        this.scroll.on('scroll', (position) => {
            // console.log(position);
            this.$emit('scroll', position)
        })
        //监听上拉加载
        this.scroll.on('pullingUp', () => {
            console.log('加载完成')
            this.$emit('pullUpLoad')
        })
    },
    methods: {
        scrollTo(x, y, time = 300) {    //参数可设为默认值
            this.scroll.scrollTo(x, y, time)
        },
        finishPullUp() {
            this.scroll.finishPullUp()
        }
    }
}
</script>

<style>
</style>