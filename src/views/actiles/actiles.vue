<template>
  <div>
    <!-- 上边一半 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div>
        <el-form ref="form" :model="form" size="mini">
          <el-form-item label="状态">
            <el-radio-group v-model="form.status">
              <el-radio label="">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核失败</el-radio>
              <el-radio :label="4">已删除</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道">
            <el-select v-model="form.channel_id" placeholder="请选择频道" clearable>
              <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id">{{
                item.name
              }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker
              v-model="form.date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="inquire">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <!-- 下边一半 -->
    <el-card
      class="box-card"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <div slot="header" class="clearfix">根据筛选条件共查询到 {{ total }} 条数据,当前是第 {{ page }} 页：</div>
      <template>
        <el-table :data="actiles" style="width: 100%">
          <!-- 封面 -->
          <el-table-column label="封面" width="180" align="center">
            <template slot-scope="scope">
              <el-image style="width: 150px; height: 100px" :src="scope.row.cover.images[0]">
                <div slot="error">
                  <img src="../../assets/images/error.gif" style="width:150px;height:100px" />
                </div>
              </el-image>
            </template>
          </el-table-column>
          <!-- 标题 -->
          <el-table-column label="标题" width="250" align="center" prop="title"> </el-table-column>
          <!-- 状态 -->
          <el-table-column label="状态" width="180" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status === 0" effect="dark" type="info">草稿</el-tag>
              <el-tag v-if="scope.row.status === 1" effect="dark">待审核</el-tag>
              <el-tag v-if="scope.row.status === 2" effect="dark" type="success">审核通过</el-tag>
              <el-tag v-if="scope.row.status === 3" effect="dark" type="lable">审核失败</el-tag>
              <el-tag v-if="scope.row.status === 4" effect="dark" type="danger">已删除</el-tag>
            </template>
          </el-table-column>
          <!-- 日期 -->
          <el-table-column label="日期" width="180" align="center" prop="pubdate"> </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作" align="center" width="180">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                size="mini"
                @click="editActiles(scope.row.id)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                size="mini"
                @click="deleteActiles(scope.row.id)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div style="text-align:center; margin-top: 20px">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="page"
          :page-size="per_page"
          :total="total"
          @current-change="pageChanger($event)"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { reqActiles, reqActilesChannels, reqDeleditActiles } from '../../api/actiles.js'
// import { date } from '../../utils/utils.js'

export default {
  data() {
    return {
      form: {
        status: '', //文章状态
        channel_id: '', //文章频道
        date: [], //日期
      },
      actiles: [], //文章列表
      total: 0, //文章总条数
      page: 1, //页码
      per_page: 10, //条数
      channels: [], //频道
      loading: false,
      obj: {},
    }
  },
  created() {
    this.getList()
    this.getChannels()
  },
  methods: {
    // 获取数据列表
    async getList() {
      this.loading = true
      // let obj = {
      //   status: this.form.status || null, //文章状态
      //   channel_id: this.form.channel_id || null, //频道id
      //   begin_pubdate: this.form.date[0] || null, //开始时间
      //   end_pubdate: this.form.date[1] || null, //结束时间
      //   page: this.page, //页码
      //   per_page: this.per_page, //每页的条数
      // }
      let res = await reqActiles(this.obj)
      if (res.data.message === 'OK') {
        this.actiles = res.data.data.results //获取数据列表
        this.total = res.data.data.total_count //获取数据总条数
        console.log(this.actiles)
        this.loading = false
      }
    },
    //获取频道
    async getChannels() {
      let res = await reqActilesChannels()
      // console.log('频道', res)
      this.channels = res.data.data.channels
      // console.log(this.channels)
    },
    //分页
    pageChanger(e) {
      this.page = e
      // console.log(this.page)
      this.obj.page = this.page
      this.getList()
    },
    //查询
    inquire() {
      // console.log('点击了查询', this.form.status)
      this.page = 1
      this.obj = {
        status: this.form.status || null, //文章状态
        channel_id: this.form.channel_id || null, //频道id
        begin_pubdate: this.form.date[0] || null, //开始时间
        end_pubdate: this.form.date[1] || null, //结束时间
        page: this.page, //页码
      }
      this.getList()
    },
    // 编辑文章
    editActiles() {
      this.$router.push('/edit')
    },
    // 删除文章
    async deleteActiles(id) {
      console.log('点击文章删除按钮', id)
      let res = await reqDeleditActiles(id)
      console.log(res)
    },
  },
}
</script>

<style lang="less" scoped>
.box-card {
  margin-bottom: 20px;
}
</style>
