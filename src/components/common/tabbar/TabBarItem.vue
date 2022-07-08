<template>
    <div class="tab-bar-item" @click="itemClick">
        <div v-if="!isActive">
            <slot name="item-icon"></slot>
        </div>
        <div v-else>
            <slot name="item-active-icon"></slot>
        </div>
        <div :style="activeStyle">
            <slot name="item-text"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "TabBarItem",
    props: {
        path: String,
        activeColor: {
            type: String,
            default: 'red'
        }
    },
    data() {
        return {
        }
    },
    computed: {
        isActive() {
            return this.$route.path == this.path
        },
        activeStyle() {
            return this.isActive?{color:this.activeColor}:{}
        }
    },
    methods: {
        itemClick() {
            this.$router.replace(this.path)
            // console.log('itemclick');
            // this.isActive=!isActive
        }
    }
}
</script>

<style>
    .tab-bar-item {
    flex: 1;
    height: 49px;
    /* line-height: 49px; */
    text-align: center;
    font-size: 12px;
    vertical-align: middle;
}
    .tab-bar-item img {
        width: 20px;
        height: 20px;
        margin-top: 8px;
    }
</style>