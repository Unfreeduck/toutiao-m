<template>
  <div class="my-container">

    <!-- 已登录头部 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" round fit="cover" :src="userInfo.photo" />
          <div class="user-info">
            <span class="name">{{userInfo.name}}</span>
            <span class="intro">{{userInfo.intro}}</span>
          </div>
        </div>
        <div class="right">
          <van-button size="mini" round to="/myinfo">编辑资料</van-button>
        </div>
      </div>

      <div class="data-status">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- /已登录头部 -->

    <!-- 为登录头部 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="@/assets/mobile.png" alt="">
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- /为登录头部 -->

    <!-- 导航 -->
    <van-grid class="grid-nav" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- /导航 -->

    <van-cell title="消息通知" is-link />
    <van-cell title="小拉同学" is-link />
    <van-cell v-if="user" class="logout-cell" title="退出登录" @click="onLogout" clickable />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  data() {
    return {
      userInfo: {} // 用户信息
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    if (this.user) {
      this.loadUserInfo()
    }
  },
  methods: {
    onLogout() {
      // 退出提示
      this.$dialog
        .confirm({
          title: '确认退出吗'
        })
        .then(() => {
          // on confirm
          // console.log('确认执行')
          // 确认退出 ：清除登录状态（容器中的user和本地存储中的user）
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
          // console.log('out')
        })
    },
    async loadUserInfo() {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
        // console.log(this.userInfo)
      } catch (error) {
        this.$toast('获取失败')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.my-container {
  .header {
    height: 180px;
    background: url('~@/assets/banner.png') center;
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 66px;
        height: 66px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 14px;
        color: #fff;
      }
    }
  }

  .user-info {
    .base-info {
      height: 115px;
      padding: 38px 16px 16px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .user-info {
          display: flex;
          flex-direction: column;
          .name {
            font-size: 16px;
            color: #fff;
          }
          .intro {
            font-size: 12px;
            color: #fff;
          }
        }
        .avatar {
          width: 66px;
          height: 66px;
          border: 4px solid #fff;
          margin-right: 12px;
        }
      }
      .right {
        display: flex;
        align-items: center;
        .van-button--default {
          color: #959595;
        }
      }
    }
    .data-status {
      // height: 130px;
      display: flex;
      .data-item {
        height: 65px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 18px;
        }
        .text {
          font-size: 12px;
        }
      }
    }
  }

  .grid-nav {
    .grid-item {
      height: 70px;
      i.toutiao {
        font-size: 24px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 14px;
      }
    }
  }
  .logout-cell {
    margin-top: 10px;
    color: #eb5253;
    text-align: center;
  }
}
</style>
