<template>
  <div id="app">
    <!-- 页面跳转进行缓存 -->
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <main-tab-bar v-if="$route.meta.showTabBar"></main-tab-bar>
  </div>
</template>
  
  <script>
  import MainTabBar from 'components/content/maintabbar/MainTabBar'
export default {
  name: 'App',
  components: {
    MainTabBar,
  }
}
</script>
  
  <style>
      @import " ./assets/css/base.css" 
  </style>
