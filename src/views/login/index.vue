<template>
  <div class="login-content">
    <div class="form-box">
      <div class="login-logo"></div>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="form.xieyi">我已阅读并且同意协议</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="restForm()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reqUserLogin } from '@/api/user.js'
export default {
  data() {
    return {
      form: {
        mobile: '13911111111', //手机号
        code: '246810', //验证码
        xieyi: false,
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: ['change', 'blur'] },
          { pattern: /^1\d{10}$/, message: '长度在 6 到 11 个字符', trigger: ['change', 'blur'] },
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: ['change', 'blur'] },
          { pattern: /^\d{6}$/, message: '长度在 3 到 6 个字符', trigger: ['change', 'blur'] },
        ],
      },
    }
  },
  methods: {
    async restForm() {
      try {
        console.log('点击了')
        if (!this.form.xieyi) {
          this.$message.error('请阅读并同意该协议')
          return
        } else {
          // let res = await this.$http.post('/mp/v1_0/authorizations', this.form)
          // console.log(res.data)
          // let { message, data } = res.data
          // console.log(message, data)
          // if (message === 'OK') {
          //   console.log('登录成功')
          //   this.$message.success('登录成功')
          //   localStorage.setItem('token', data.token)
          // }
          let res = await reqUserLogin(this.form)
          console.log(res.data)
          // let { message, data } = res.data
          // console.log(message, data) = res.data
          if (res.data.message === 'OK') {
            console.log('登录成功')
            this.$message.success('登录成功')
            localStorage.setItem('token', res.data.data.token)
            this.$router.push('/')
          }
        }
      } catch {
        console.log('登录失效')
        this.$message.error('用户名或密码错误')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.login-content {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../../assets/images/login_bg.jpg');
  background-size: cover;
  .form-box {
    width: 300px;
    padding: 20px;
    background-color: #fff;
    .login-logo {
      width: 259px;
      height: 57px;
      background: url('../../assets/images/logo_index.png');
      background-size: cover;
      margin: 0 auto;
      margin-bottom: 10px;
    }
  }
}
</style>
