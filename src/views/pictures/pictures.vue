<template>
  <div class="pictures">
    <el-card class="box-card">
      <!-- 卡片头部 -->
      <div slot="header" class="clearfix">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 卡片内容 -->
      <!-- 上面 -->
      <div class="top">
        <div class="left">
          <div>
            <el-radio-group v-model="fleg" size="mini" @change="changeValue">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <el-button type="success" size="mini" class="right" @click="dialogVisible = true">上传图片素材</el-button>
      </div>

      <!-- 下面 -->
      <el-row :gutter="10">
        <el-col v-for="item in imagesList" :key="item.id" :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
          <el-image style="width: 100%; height: 180px" :src="item.url" fit="cover"></el-image>
          <div class="bottom">
            <i
              class="el-icon-star-off"
              :class="{ active: item.is_collected }"
              @click="collect(item.id, item.is_collected)"
            ></i>
            <i class="el-icon-delete" @click="del(item.id)"></i>
          </div>
        </el-col>
      </el-row>

      <!-- 分页 -->
      <div style="text-align:center;margin-top:20px">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
          @current-change="changePage($event)"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- 弹出层 -->
    <el-dialog title="请选择图片" :visible.sync="dialogVisible" width="30%" :append-to-body="true">
      <el-upload
        class="avatar-uploader"
        :action="$http.defaults.baseURL + '/mp/v1_0/user/images'"
        :headers="headers"
        name="image"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <el-image
          v-if="imageUrl"
          :src="imageUrl"
          style="width: auto; height: 180px"
          fit="cover"
          @load="loadImage"
        ></el-image>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { reqImages, reqIsCollected, reqDelete } from '@/api/pictures.js'
import { getUser } from '@/utils/storage.js'
export default {
  data() {
    return {
      imagesList: [], // 图片列表
      fleg: false,  //全部或者收藏的默认值
      total: 0,  //总条数
      page: 1, //页码
      pageSize: 10, //每页的条数
      obj: {}, 
      dialogVisible: false, //加载图片的弹窗是否显示
      imageUrl: '',
      //设置请求头
      headers: {
        Authorization: `Bearer ${getUser().token}`,
      },
    }
  },
  created() {
    this.getImages()
  },
  methods: {
    //获取图片列表
    async getImages() {
      this.obj.per_page = this.pageSize
      let res = await reqImages(this.obj)
      console.log(res.data)
      this.imagesList = res.data.data.results
      this.total = res.data.data.total_count
      console.log(this.imagesList, this.total)
    },
    //全部或收藏
    changeValue() {
      this.obj.collect = this.fleg //全部或者分页
      this.obj.page = this.page //回到第一页
      this.getImages()
    },
    //分页
    changePage(e) {
      console.log(e)
      this.obj.page = e
      this.getImages()
    },
    //收藏
    async collect(id, is_collected) {
      let obj = {
        collect: !is_collected,
      }
      // console.log(id, obj)
      let res = await reqIsCollected(id, obj)
      // console.log('收藏或取消收藏', res)
      let { status, data } = res
      // console.log('状态', status)
      if (status === 201) {
        if (data.message === 'OK') {
          // console.log(data.message)
          this.$message.success('操作成功')
          this.getImages()
        }
      }
    },

    //删除图片素材
    del(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          reqDelete(id).then(res => {
            console.log('删除', res)
            let { status } = res
            if (status === 204) {
              this.$message.success('删除成功')
              this.getImages()
            }
          })
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除',
          // })
          this.$message.info('已取消删除')
        })
    },
    //上传成功时的函数
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw)
      console.log('图片', res)
      this.imageUrl = res.data.url
      this.getImages()
      this.$message.success('上传成功')
    },
    //图片上传前设置
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    //图片加载成功时触发
    loadImage() {
      setTimeout(() => {
        this.dialogVisible = false
        this.imageUrl = null //显示完清空
      }, 3000)
    },
  },
}
</script>

<style lang="less" scoped>
.pictures {
  // position: fixed;
  // width: 100%;
  // height: 100%;
  background-color: yellow;
  .top {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-col {
    position: relative;
    box-sizing: border-box;
  }
  .bottom {
    position: absolute;
    height: 30px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: space-around;
    align-items: center;
    opacity: 0;
    i {
      color: #fff;
    }
    .active {
      color: red;
    }
  }
  .el-col:hover .bottom {
    opacity: 1;
  }
}
/deep/.avatar-uploader /deep/ .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
</style>
