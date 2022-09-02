<template>
  <div>
    <van-cell @click="cellClickFn(artObj.art_id)">
      <!-- 标题 -->
      <template #title>
        <div class="title-box">
          <span>{{artObj.title}}</span>
          <!-- 图片 -->
          <img v-if="artObj.cover.type===1" class="thumb" :src="artObj.cover.images[0]" alt="">
        </div>

        <!-- 三图 -->
        <div class="thumb-box" v-if="artObj.cover.type>1">
          <img class="thumb" v-for="(imgUrl, index) in artObj.cover.images" :key="index" :src="imgUrl" alt="">
        </div>
      </template>

      <!-- 描述 -->
      <template #label>
        <div class="label-box">
          <div>
            <span>{{artObj.aut_name}}</span>
            <span>{{artObj.comm_count}}评论</span>
            <span>{{formatTime(artObj.pubdate)}}</span>
          </div>
          <!-- 反馈按钮 -->
          <van-icon name="cross" @click.stop="show = true"></van-icon>
        </div>
      </template>
    </van-cell>

    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" get-container="body" :cancel-text="bottomText" @cancel="cancelFn" @close="closeFn" />
  </div>
</template>

<script>
import { firstActions, secondActions } from '@/api/report'

import { timeAgo } from '@/utils/date'

export default {
  props: {
    artObj: Object
  },
  data() {
    return {
      show: false,
      actions: firstActions,
      bottomText: '取消' // 底部取消按钮
    }
  },
  created() {
    // console.log(this.artObj)
  },
  methods: {
    formatTime: timeAgo,
    // 反馈面板-选项事件
    onSelect(action, item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      // this.show = false
      // Toast(item.name)
      if (action.name === '反馈垃圾信息') {
        this.actions = secondActions
        this.bottomText = '返回'
      } else if (action.name === '不感兴趣') {
        this.$emit('disLikeEv', this.artObj.art_id)
        // console.log(this.artObj.art_id)
        this.show = false
      } else {
        this.$emit('reportEv', this.artObj.art_id, action.value)
        this.show = false
      }
    },
    // 反馈面板 底部按钮
    cancelFn() {
      if (this.bottomText === '返回') {
        this.show = true
        this.actions = firstActions
        this.bottomText = '取消'
      }
    },
    // 关闭面板出发事件
    closeFn() {
      this.actions = firstActions
      this.bottomText = '取消'
    },
    async cellClickFn(id) {
      this.$router.push({
        path: `/detail?art_id=${id}`
      })
    }
  }
}
</script>

<style lang='less' scoped>
// 标题样式
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
// label样式
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;

  // 文章信息
  span {
    margin: 0 3px;
    &:first-child {
      margin-left: 0;
    }
  }
}
// 图片样式
.thumb {
  width: 113px;
  height: 70px;
  background-color: #fff;
  object-fit: cover;
}
// 三图，图片容器
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
