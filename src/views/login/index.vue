<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar">
      <van-icon slot="left" name="arrow-left" @click="$router.back()" />
    </van-nav-bar>

    <!-- text -->
    <div class="text">短信登录</div>
    <!-- /text -->
    <!-- 登录表单 -->
    <div class="login">
      <van-form ref="loginForm" @submit="onSubmit">
        <van-field class="login-input" v-model="user.mobile" name="mobile" placeholder="请输入手机号" :rules="userFormRules.mobile" type="number" maxlength="11">
        </van-field>
        <van-field class="login-input" v-model="user.code" name="code" placeholder="请输入验证码" :rules="userFormRules.code" type="number" maxlength="6">
          <template #button>
            <van-count-down :time="1000*60" format="ss s" v-if="isCountDownShow" @finish="isCountDownShow=false" />
            <van-button v-else native-type="button" class="send-sms-btn" size="small" round type="default" @click="onSendSms">发送验证码</van-button>
          </template>
        </van-field>

        <div class="login-btn-wrap">
          <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
        </div>
      </van-form>
    </div>
    <!-- /登录表单 -->
  </div>

</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  data() {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      userFormRules: {
        mobile: [
          { required: true, message: '手机号不为空', trigger: 'onBlur' },
          { pattern: /1[3|5|7|8]\d{9}/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '验证码不为空', trigger: 'onBlur' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false
    }
  },
  name: 'LoginIndex',
  components: {},
  props: '',
  methods: {
    async onSubmit() {
      // 表单验证
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续时间，默认2秒,如果为0则持续展示
      })
      // 提交表单请求登录
      try {
        const { data } = await login(this.user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        // 登录成功跳转
        this.$router.back()
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.fail('手机号或者验证码错误')
        } else {
          this.$toast.fail('登录失败,请稍后重试')
        }
      }
      // 根据请求响应结果处理后续操作
    },
    async onSendSms() {
      // 校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (error) {
        return console.log(error)
      }
      // 请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast.success('发送成功')
        // 显示倒计时
        this.isCountDownShow = true
      } catch (error) {
        this.isCountDownShow = false
        if (error.response.status === 429) {
          this.$toast.fail('发送太频繁,请稍后再试')
        } else {
          this.$toast.fail('我也不知道怎么回事')
        }
      }
    }
  }
}
</script>

<style lang='less' scoped>
.login-container {
  .text {
    padding: 40px 20px;
    // background-color: pink;
    font-size: 24px;
  }
  .toutiao {
    font-size: 37px;
    color: #666;
  }
  .login {
    padding: 0 20px;
    margin-top: 20px;
    .login-input {
      padding-left: 10px;
    }
    .send-sms-btn {
      width: 80px;
      height: 23px;
      line-height: 23px;
      // background-color: #ededed;
      font-size: 12px;
      color: #666;
      border: none;
    }
    .login-btn-wrap {
      padding: 53px 33px;
      .login-btn {
        background-color: #6db4fb;
        border: none;
      }
    }
  }
}
</style>
