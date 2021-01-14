import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import index from '../views/login/index.vue'
import layout from '@/views/home/layout.vue'

const router = new VueRouter({
  routes: [
    { path: '/login', component: index },
    { path: '/', component: layout },
  ],
})

export default router
