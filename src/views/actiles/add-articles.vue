<template>
  <div class="addArticles">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form :model="form" :rules="rules" ref="form" label-width="60px">
        <el-form-item label="标题" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <quill-editor v-model="form.content" :options="editorOption"></quill-editor>
        </el-form-item>

        <el-form-item label="封面" prop="resource">
          <el-radio-group v-model="form.resource">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道" prop="channels_id">
          <el-select v-model="form.channels_id" placeholder="请选择活动区域">
            <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import { reqActilesChannels } from '@/api/actiles.js'

export default {
  components: {
    quillEditor,
  },
  data() {
    return {
      form: {
        name: '', //标题
        content: '', //内容
        resource: '', //封面
        channels_id: '', //频道
      },
      //规则
      rules: {
        name: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        resource: [{ required: true, message: '请选择封面', trigger: 'change' }],
        channels_id: [{ required: true, message: '请选择活动频道', trigger: 'change' }],
      },
      channels: [], //频道列表
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
            ['blockquote', 'code-block'], // 引用  代码块
            [{ header: 1 }, { header: 2 }], // 1、2 级标题
            // [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
            // [{ script: 'sub' }, { script: 'super' }], // 上标/下标
            // [{ indent: '-1' }, { indent: '+1' }], // 缩进
            // [{'direction': 'rtl'}],                         // 文本方向
            // [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
            // [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
            // [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            // [{ font: [] }], // 字体种类
            // [{ align: [] }], // 对齐方式
            // ['clean'], // 清除文本格式
            ['link', 'image', 'video'], // 链接、图片、视频
          ], //工具菜单栏配置
        },
        placeholder: '请在这里输入内容', //提示
        // readyOnly: false, //是否只读
        // theme: 'snow', //主题 snow/bubble
        // syntax: true, //语法检测
      },
    }
  },
  created() {
    this.getChannels()
  },
  methods: {
    onSubmit() {
      console.log(this.form)
      this.$refs.form.validate(valid => {
        if (valid) {
          alert('效验成功!')
        } else {
          console.log('效验失败')
          return false
        }
      })
    },
    async getChannels() {
      let res = await reqActilesChannels()
      // console.log('频道', res)
      this.channels = res.data.data.channels
      console.log(this.channels)
    },
  },
  // async getChannels() {
  //   let res = await reqActilesChannels()
  //   console.log(res)
  // },
}
</script>

<style lang="less" scoped>
//富文本框
/deep/ .ql-editor {
  min-height: 130px;
}
/deep/ .ql-toolbar.ql-snow {
  padding: 0 8px;
}
</style>
