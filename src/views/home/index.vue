<template>
  <div class="home-container">

    <!-- tab导航栏 -->
    <div class="main">
      <van-tabs v-model="channelId" animated sticky>
        <van-tab :name="channel.id" animated :title='channel.name' v-for="channel in userChannelList" :key="channel.id">
          <article-list :channelId='channelId'></article-list>
        </van-tab>
      </van-tabs>
      <van-icon name="wap-nav" class="moreChannels" @click="showPopup" />
    </div>
    <!-- /tab导航栏 -->

    <!-- 频道管理 -->
    <van-popup class="channel_popup" v-model="show">
      <channel-edit ref="editRef" @channelIdEv="channelChangeFn" @closeEv="closeFn" :userList="userChannelList" :unCheckList="unCheckChannelList" @addChannelEv="addChannelFn" @removeChannelEv="removeChannelFn" />
    </van-popup>
    <!--/ 频道管理 -->
  </div>
</template>

<script>
import { getUserChannelsAPI, getAllChannelsAPI, updateChannelsAPI, removeTheChannelAPI } from '@/api/user'
import ArticleList from './components/ArticleList.vue'
import ChannelEdit from '@/views/home/ChannelEdit'

export default {
  components: { ArticleList, ChannelEdit },
  data() {
    return {
      channelId: 0,
      userChannelList: [],
      allChannelList: [],
      show: false
    }
  },
  name: 'HomeIndex',
  async created() {
    // 获取用户频道列表
    const res = await getUserChannelsAPI()
    this.userChannelList = res.data.data.channels

    //  获取全部频道列表
    const res2 = await getAllChannelsAPI()
    this.allChannelList = res2.data.data.channels
  },
  methods: {
    showPopup() {
      this.show = true
    },
    // 获取文章列表数据
    channelChangeFn(id) {
      this.channelId = id
    },
    // 添加频道
    async addChannelFn(channelObj) {
      this.userChannelList.push(channelObj)
      // 发送最新数组给后台
      const newArr = this.userChannelList.filter(obj => obj.id !== 0)
      const theNewArr = newArr.map((obj, index) => {
        const newObj = { ...obj }
        delete newObj.name
        newObj.seq = index
        return newObj
      })
      await updateChannelsAPI({
        channels: theNewArr
      })
    },
    // 删除频道
    async removeChannelFn(channelObj) {
      const index = this.userChannelList.findIndex(obj => obj.id === channelObj.id)
      this.userChannelList.splice(index, 1)
      // console.log(this.userChannelList)
      await removeTheChannelAPI({
        channelId: channelObj.id
      })
      // console.log(res)
    },
    // 关闭
    closeFn() {
      this.show = false
      // 编辑状态复原
      this.$refs.editRef.isEdit = false
    }
  },
  computed: {
    unCheckChannelList() {
      //
      const newArr = this.allChannelList.filter(obj => {
        const index = this.userChannelList.findIndex(item => {
          return item.id === obj.id
        })

        // 找到了
        if (index > -1) {
          return false
        } else {
          return true
        }
      })
      return newArr
    }
  }
}
</script>

<style lang='less' scoped>
.home-container {
  padding-bottom: 50px;
}
.main {
  position: relative;
  /deep/ .van-tabs__line {
    background-color: #007bff;
  }
  /deep/ .van-tabs__wrap {
    padding-right: 40px;
    background-color: #fff;
  }
  // +图标
  .moreChannels {
    position: absolute;
    top: 10px;
    right: 8px;
    z-index: 999;
  }
}
.channel_popup {
  width: 100vw;
  height: 100vh;
}
</style>
