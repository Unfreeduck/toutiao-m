<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />

    <!-- 标签导航栏 -->
    <van-tabbar class="layout-tabber" route placeholder>
      <van-tabbar-item to="/layout/home">
        <i slot="icon" class="toutiao toutiao-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/layout/my">
        <i slot="icon" class="toutiao toutiao-wode"></i>
        <span class="text">{{$store.state.user ?'我的':'未登录'}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data() {
    return {
      // active: 0
    }
  }
}
</script>

<style lang='less' scoped>
.layout-container {
  .layout-tabber {
    i.toutiao {
      font-size: 20px;
    }
  }
}
</style>
