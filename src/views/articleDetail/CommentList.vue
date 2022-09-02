<template>
  <div>
    <!-- 评论列表 -->
    <div class="cmt-list" :class="{'art-cmt-container-1':isShow,'art-cmt-container-2':!isShow}">

      <van-list v-model="loading" :finished="finished" finished-text="没有评论了" @load="onLoad" :immediate-check="false">
        <!-- 评论的Item项 -->
        <div class="cmt-item" v-for="item in commitList" :key="item.com_id">
          <!-- 头部 -->
          <div class="cmt-header">
            <!-- 头部左侧 -->
            <div class="cmt-header-left">
              <img :src="item.aut_photo" alt="" class="avatar">
              <span class="uname">{{item.aut_name}}</span>
            </div>
            <!-- 头部右侧 -->
            <div class="cmt-header-right">
              <van-icon name="like" size="16" color="red" v-if="item.is_liking===true" @click="likeFn(true,item)" />
              <van-icon name="like-o" size="16" color="gray" v-else @click="likeFn(false,item)" />
            </div>
          </div>
          <!-- 主体区域 -->
          <div class="cmt-body">
            {{item.content}}
          </div>
          <!-- 底部 -->
          <div class="cmt-footer">{{FormData(item.pubdate)}}</div>
        </div>
      </van-list>
    </div>

    <!-- 发表评论区域 -->
    <div>
      <!-- 发表评论 -->
      <div class="add-cmt-box van-hairline--top" v-if="isShow===true">
        <van-icon name="arrow-left" size="0.48rem" />
        <div class="ipt-cmt-div" @click="toggleShow">发表评论</div>
        <div class="icon-box">
          <van-badge :content="totalCount===0?'':totalCount" max="99">
            <van-icon name="comment-o" size="0.5333334rem" @click="commitClickFn" />
          </van-badge>
          <van-icon name="star-o" size="0.5333334rem" />
          <van-icon name="share-o" size="0.5333334rem" @click="showShare = true" />
        </div>
      </div>
      <!-- 评论2 -->
      <div class="cmt-box van-hairline--top" v-else>
        <textarea placeholder="友善评论、理性发言、阳光心灵" v-fofo @blur="blurFn" v-model.trim="comText"></textarea>
        <van-button type="default" :disabled='comText.length===0' @click="sendFn">发布</van-button>
      </div>
    </div>

    <!-- 分享 -->
    <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
  </div>
</template>

<script>
import { getCommitListAPI, loveCommitAPI, unLoveCommitAPI, commitSendAPI } from '@/api/article'
import { timeAgo } from '@/utils/date.js'
import { Toast } from 'vant'
export default {
  data() {
    return {
      offset: null, // 偏移量评论id
      commitList: [], // 评论列表
      totalCount: '', // 评论数量
      isShow: true,
      comText: '',
      loading: false,
      finished: false,
      lastId: null,
      // 分享
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ]
    }
  },
  async created() {
    const res = await getCommitListAPI({
      id: this.$route.query.art_id
      // offset: this.offset
    })
    this.commitList = res.data.data.results
    this.totalCount = res.data.data.total_count // 评论总数量
    this.lastId = res.data.data.last_id // 分页
  },
  methods: {
    FormData: timeAgo,
    // 不喜欢心心点击 变喜欢
    async likeFn(bool, commitItem) {
      if (bool === true) {
        commitItem.is_liking = false
        await unLoveCommitAPI({
          commit_id: commitItem.com_id
        })
      } else {
        commitItem.is_liking = true
        await loveCommitAPI({
          commit_id: commitItem.com_id
        })
      }
    },
    toggleShow() {
      this.isShow = false
    },
    // 评论按钮点击跳转评论列表处
    commitClickFn() {
      // const artHeight = document.querySelector('.artcle-container').scrollHeight
      // window.scrollTo(0, artHeight)

      document.querySelector('.like-box').scrollIntoView({
        behavior: 'smooth'
      })
    },
    // 失去焦点
    blurFn() {
      setTimeout(() => {
        this.isShow = true
        this.comText = ''
      }, 0)
    },
    async sendFn() {
      // console.log(this.comText)
      const res = await commitSendAPI({
        id: this.$route.query.art_id,
        content: this.comText
      })
      // console.log(res)
      this.commitList.unshift(res.data.data.new_obj)
      this.totalCount++
    },
    async onLoad() {
      // if (this.commitList.length > 0) {
      const res = await getCommitListAPI({
        id: this.$route.query.art_id,
        offset: this.lastId
      })
      this.commitList = [...this.commitList, ...res.data.data.results]
      this.totalCount = res.data.data.total_count // 评论总数量
      this.lastId = res.data.data.last_id // 分页
      if (res.data.data.last_id === null) {
        this.finished = true
      }

      this.loading = false
      // } else {
      //   this.loading = false
      // }
    },
    // 分享
    onSelect(option) {
      Toast(option.name)
      this.showShare = false
    }
  }
}
</script>

<style lang="less" scoped>
.cmt-list {
  padding: 10px;
  // background-color: powderblue;
  .cmt-item {
    padding: 15px 0;
    + .cmt-item {
      border-top: 1px solid #f8f8f8;
    }
    .cmt-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .cmt-header-left {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          background-color: pink;
          border-radius: 50%;
          margin-left: 15px;
        }
        .uname {
          font-size: 12px;
        }
      }
    }
    .cmt-body {
      font-size: 14px;
      line-height: 28px;
      text-indent: 2em;
      margin-top: 6px;
      word-break: break-all;
    }
    .cmt-footer {
      font-size: 12px;
      color: gray;
      margin-top: 10px;
    }
  }
}

// 评论
.art-cmt-container-1 {
  padding-bottom: 46px;
}
.art-cmt-container-2 {
  padding-bottom: 92px;
}
.add-cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  line-height: 46;
  padding-left: 10px;
  .ipt-cmt-div {
    flex: 1;
    border: 1px solid #efefef;
    border-radius: 15px;
    height: 30px;
    font-size: 12px;
    line-height: 30;
    padding-left: 15px;
    margin-left: 10px;
    background-color: #f8f8f8;
  }
  .icon-box {
    padding: 0 15px;
    width: 30%;
    display: flex;
    justify-content: space-between;
    line-height: 0;
  }
}

.child {
  width: 20px;
  height: 20px;
  background-color: #f2f3f5;
}

.cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding-left: 10px;
  box-sizing: border-box;
  background-color: white;
  textarea {
    flex: 1;
    height: 66%;
    border: 1px soild #efefef;
    background-color: #f8f8f8;
    resize: none;
    border-radius: 6px;
    padding: 5px;
  }
  .van-button {
    height: 100%;
    border: none;
  }
}
</style>
