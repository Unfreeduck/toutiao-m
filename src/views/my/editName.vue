<template>
  <div class="body">
    <van-nav-bar title="昵称" left-arrow right-text="保存" @click-right="onClickRight" @click-left="$router.back()" />

    <div class="prompt">
      <p>昵称长度限制2~24个字符内</p>
      <van-cell-group>
        <van-field v-model="userName" clearable v-fofo placeholder="你随便改,我都无所谓。" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import bus from '@/components/eventBus'
import { updateUserInfoAPI } from '@/api/user'
export default {
  data() {
    return {
      userName: ''
    }
  },
  created() {
    bus.$on('sendMyName', data => {
      this.userName = data
    })
  },
  methods: {
    async onClickRight() {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]{1,7}$/
      if (reg.test(this.userName) === true) {
        // 通过校验
        // 调用接口
        await updateUserInfoAPI({
          name: this.userName
        })
        this.$toast('修改成功!')
      } else {
        this.$toast('1~7位字符,你不会相信上面的字吧')
      }
    }
  }
}
</script>

<style lang='less' scoped>
/deep/ .van-nav-bar__left {
  font-size: 20px;
  .van-icon-arrow-left:before {
    color: black;
  }
  /deep/ .van-nav-bar__right {
    /deep/ .van-nav-bar__text {
      color: black;
    }
  }
}
.body {
  background-color: #fbfbfb;
  height: 100vh;
  .prompt {
    p {
      padding: 30px 0px 5px 16px;
      margin: 0;
      // background-color: pink;
      font-size: 12px;
      color: #b3b3b3;
    }
  }
}
</style>
