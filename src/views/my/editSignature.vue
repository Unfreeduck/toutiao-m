<template>
  <div class="body">
    <van-nav-bar title="个性签名" left-arrow right-text="保存" @click-right="onClickRight" @click-left="$router.back()" />

    <div class="prompt">
      <van-cell-group class="input-group">
        <!-- <van-field v-model="signature" class="input" clearable v-fofo placeholder="你随便改,我都无所谓。" show-word-limit /> -->
        <van-field class="input" v-model="signature" rows="2" autosize type="textarea" v-fofo maxlength="50" placeholder="你随便改,我都无所谓。" show-word-limit />
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
      signature: '' // 签名
    }
  },
  created() {
    bus.$on('sendSignature', data => {
      if (data === null) {
        this.signature = '暂无签名'
      } else {
        this.signature = data
      }
    })
  },
  methods: {
    async onClickRight() {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]{1,7}$/
      if (reg.test(this.signature) === true) {
        // 通过校验
        // 调用接口
        await updateUserInfoAPI({
          intro: this.signature
        })
        this.$toast('修改成功!')
      } else {
        this.$toast('你有问题!')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.van-hairline--top-bottom::after {
  border: none;
}
.van-hairline-unset--top-bottom::after {
  border: none;
}
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
  .prompt {
    p {
      padding: 30px 0px 10px 20px;
      // background-color: pink;
      font-size: 12px;
      color: #b3b3b3;
    }
    .van-cell {
      width: auto;
      margin: 15px;
      background-color: #f9f9f9;
      border-radius: 10px;
      border: 0;
    }
  }
}
</style>
