<template>
  <div class="err">
    <div class="message">
      你访问的页面不存在, <span>{{ count }}</span
      >秒后将自动返回登录页......
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: '',
    }
  },
  created() {
    this.go2home()
  },
  methods: {
    //3秒后返回首页
    go2home() {
      const time_count = 3
      if (!this.timer) {
        this.count = time_count
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= time_count) {
            this.count--
          } else {
            clearInterval(this.timer)
            this.timer = null
            //跳转到首页
            this.$router.push('/')
          }
        }, 1000)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.err {
  position: fixed;
  width: 100%;
  height: 100%;
  // background: url('../../assets/images/404.png') no-repeat center;
  background: url('https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2245376641,583831489&fm=26&gp=0.jpg')
    no-repeat center;

  background-size: cover;
  .message {
    color: blue;
    text-align: center;
    margin-top: 20px;
  }
}
</style>
