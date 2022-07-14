import Vue from 'vue'
import App from './App.vue'

import router from './router/index'

Vue.config.productionTip = false

// 所有的组件都可以使用$bus,而Vue实例又有$emit方法和on方法，就可以使用，此时$bus就是我们的Vue实例
// 可以使用$bus.$emit()  $bus.on()
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
