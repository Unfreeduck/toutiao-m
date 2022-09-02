<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" :immediate-check="false" finished-text="没有更多了" @load="onLoad" offset="50">
        <aricle-item v-for="(obj,index) in list" :key="index" :artObj="obj" @disLikeEv="dislikeFn" @reportEv="reportFn"></aricle-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import AricleItem from '@/views/home/components/AricleItem'
import { getAllArticleListAPI, dislikeArticle, reportArticleAPI } from '@/api/article'
import { Notify } from 'vant'

export default {
  props: {
    channelId: Number
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: Date.now(),
      isLoading: false
    }
  },
  components: {
    AricleItem
  },
  async created() {
    const res = await getAllArticleListAPI({
      channel_id: this.channelId,
      timestamp: this.timestamp
    })
    // 下一段开头时间戳
    this.list = res.data.data.results
    this.timestamp = res.data.data.pre_timestamp
    // console.log(this.list)
  },
  methods: {
    async onLoad() {
      if (this.list.length === 0) {
        this.loading = false
        return
      }
      const res = await getAllArticleListAPI({
        channel_id: this.channelId,
        timestamp: this.timestamp
      })
      this.list.push(...res.data.data.results)
      this.timestamp = res.data.data.pre_timestamp
      this.loading = false
      // 下一段开头时间戳
      if (res.data.data.pre_timestamp === null) {
        this.finished = true
      }
    },
    // 上拉刷新
    async onRefresh() {
      this.list = []
      this.timestamp = Date.now()
      const res = await getAllArticleListAPI({
        channel_id: this.channelId,
        timestamp: this.timestamp
      })
      this.list.push(...res.data.data.results)
      this.timestamp = res.data.data.pre_timestamp

      this.isLoading = false
    },
    // 不感兴趣反馈
    async dislikeFn(id) {
      try {
        await dislikeArticle({
          artId: id
        })
        Notify({ type: 'success', message: '反馈成功' })
      } catch (error) {
        // console.log('ok')
      }
    },
    // 反馈垃圾内容
    async reportFn(id, value) {
      await reportArticleAPI({
        artId: id,
        type: value
      })
      Notify({ type: 'success', message: '举报成功' })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
