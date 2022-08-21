<template>
  <div class="home-container">

    <!-- tab导航栏 -->
    <div class="main">
      <van-tabs v-model="active" animated sticky>
        <van-tab :title='item.name' v-for="item in userChannelList" :key="item.id">{{item.name}}</van-tab>
      </van-tabs>
    </div>
    <!-- /tab导航栏 -->
  </div>
</template>

<script>
import { getUserChannelsAPI } from '@/api/user'
export default {
  data() {
    return {
      active: 0,
      userChannelList: []
    }
  },
  name: 'HomeIndex',
  async created() {
    const res = await getUserChannelsAPI()
    this.userChannelList = res.data.data.channels
    console.log(this.userChannelList)
  },
  methods: {}
}
</script>

<style lang='less' scoped>
</style>
