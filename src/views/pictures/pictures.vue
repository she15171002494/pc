<template>
  <div class="pictures">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <div class="header">
        <div class="left">
          <span>全部</span>
          <span class="active">收藏</span>
        </div>
        <el-button type="success" size="mini" class="right">上传图片素材</el-button>
      </div>
      <div class="center">
        <div class="demo-image">
          <div class="block" v-for="fit in fits" :key="fit">
            <el-image style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped>
.pictures {
  // position: fixed;
  // width: 100%;
  // height: 100%;
  background-color: yellow;
  .header {
    width: 100%;
    height: 40px;
    background-color: pink;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      border: 1px solid #000;
      border-radius: 5px;
      display: flex;
      span {
        display: block;
        padding: 5px 10px;
      }
      .active {
        background-color: #0077ff;
        color: #fff;
      }
    }
  }
}
</style>
