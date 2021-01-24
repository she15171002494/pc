<template>
  <div class="pictures">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>素材管理</el-breadcrumb-item>
    </el-breadcrumb>
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
  </div>
</template>

<script>
export default {}
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
        background-color: blue;
        color: #fff;
      }
    }
  }
}
</style>
