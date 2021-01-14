import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import http from '@/utils/request.js'

Vue.config.productionTip = false

Vue.use(ElementUI)
//引入基本样式
import '@/style/index.less'

//挂载到原型上
Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
