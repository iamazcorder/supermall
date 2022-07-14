<template>
    <div class="nav-bar">
        <!-- 插槽最好用div给包起来 -->
        <div class="left">
            <slot name="left"></slot>
        </div>
        <div class="center">
            <slot name="center"></slot>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "NavBar",
}
</script>

<style scoped>
.nav-bar {
    display: flex;
    /* position: fixed;
    top: 0;
    left: 0;
    right: 0; */
    /* 导航高度一般为44 */
    height: 44px;
    line-height: 44px;
    text-align: center;
    /* 盒子阴影 */
    box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
}

.left,
.right {
    width: 60px;
}

.center {
    flex: 1;
}
</style>