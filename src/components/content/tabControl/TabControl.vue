<template>
    <div class="tab-control">
        <!-- 当使用组件只需修改里面的内容，则不用插槽，直接将内容作为子组件的属性传进来 -->
        <div v-for="(item, index) in titles" :key="index" class="tab-control-item" @click="itemClick(index)">
            <span :class="{ active: index === currentIndex }">{{ item }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "TabControl",
    props: {
        titles: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            currentIndex: 0
        }
    },
    methods: {
        itemClick(index) {
            this.currentIndex = index
            // 子传父，监听自定义事件
            this.$emit('tabClick',this.currentIndex)
        }
    }
}
</script>

<style scoped>

.tab-control {
    display: flex;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 15px;
    background-color: #fff;
}

.tab-control-item {
    flex: 1;
}

.tab-control-item span {
    padding: 5px;
}

.active {
    color: var(--color-high-text);
    border-bottom: 3px solid var(--color-high-text);
}
</style>