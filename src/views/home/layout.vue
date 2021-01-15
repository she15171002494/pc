<template>
  <div id="layout-container">
    <el-container>
      <!-- 左边侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- <el-aside width="'200px"> -->
        <div class="top" :class="{ active: isCollapse }"></div>
        <div class="buttom">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="#002033"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse="isCollapse"
            :collapse-transition="false"
          >
            <el-menu-item index="1">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-document"></i>
              <span slot="title">内容管理</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-picture"></i>
              <span slot="title">素材管理</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-s-promotion"></i>
              <span slot="title">发布文章</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-chat-dot-round"></i>
              <span slot="title">评论管理</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-setting"></i>
              <span slot="title">粉丝管理</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-setting"></i>
              <span slot="title">个人设置</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <!-- 右边 -->
      <el-container>
        <!-- 右边头部 -->
        <el-header>
          <div class="left" @click="clickToggle">
            <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
            <span>江苏科技教育有限公司</span>
          </div>
          <div class="right">
            <img :src="info.photo" alt="" />
            <el-dropdown>
              <span class="el-dropdown-link">
                <span>{{ info.name }}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <!-- 右边底部 -->
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { reqUserInfo } from '@/api/user.js'
export default {
  data() {
    return {
      isCollapse: false,
      token: '',
      info: {},
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    async getInfo() {
      this.token = 'Bearer' + ' ' + localStorage.getItem('token')
      console.log(this.token)
      let res = await reqUserInfo(this.token)
      this.info = res.data.data
      console.log(this.info)
    },
    clickToggle() {
      this.isCollapse = !this.isCollapse
    },
  },
}
</script>

<style lang="less" scoped>
#layout-container {
  position: fixed;
  width: 100%;
  height: 100%;
  .el-container {
    width: 100%;
    height: 100%;
    .el-aside {
      background-color: #002033;
      .top {
        height: 60px;
        background: url('../../assets/images/logo_admin.png') no-repeat center;
        background-size: 140px auto;
      }
      .active {
        background: url('../../assets/images/logo_admin_01.png') no-repeat center;
        background-size: 40px auto;
      }
      .el-menu {
        border-right: none;
      }
    }
    .el-header {
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .right {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          display: block;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
    }
    .el-main {
      background-color: yellow;
    }
  }
}
</style>
