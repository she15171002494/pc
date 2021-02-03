import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import { getUser } from '@/utils/storage.js'

import index from '@/views/login/index.vue'
import layout from '@/views/layout/layout.vue'
import home from '@/views/home'
import actiles from '@/views/actiles/actiles.vue'
import addArticle from '@/views/actiles/add-articles.vue'
import edit from '../views/actiles/edit.vue'
import pictures from '@/views/pictures/pictures.vue'
import comment from '@/views/comment/comment.vue'
import fans from '@/views/fans/fans.vue'
import settings from '@/views/settings/settings.vue'
import err from '@/views/404/err.vue'

const router = new VueRouter({
  routes: [
    { path: '/login', component: index }, //登录页
    {
      path: '/',
      component: layout, //首页
      children: [
        { path: '', component: home }, //默认页
        { path: '/actiles', component: actiles }, //文章列表
        { path: '/addArticle', component: addArticle }, //发布文章
        { path: '/edit', component: edit }, //编辑文章
        { path: '/pictures', component: pictures }, //素材管理
        { path: '/comment', component: comment }, //评论管理
        { path: '/fans', component: fans }, //粉丝管理
        { path: '/settings', component: settings }, //账户设置
      ],
    },
    { path: '*', component: err }, //404报错页面
  ],
})

//路由守卫
router.beforeEach((to, from, next) => {
  let userInfo = getUser()
  if (to.path === '/login' || userInfo.token) {
    next()
  } else {
    next('/login')
  }
})

export default router
