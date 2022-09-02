<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar fixed title="文章内容">
      <van-icon slot="left" name="arrow-left" @click="$router.back()"></van-icon>
    </van-nav-bar>
    <!-- 文章信息 -->
    <div class="artcle-container">
      <!-- 标题 -->
      <h1 class="art-title">{{list.title}}</h1>

      <!-- 用户信息 -->
      <van-cell center :title="list.aut_name" :label="FormData(list.pubdate)">
        <template #icon>
          <img :src="list.aut_photo" alt="" class="avatar">
        </template>

        <template #default>
          <div>
            <van-button type="info" size="mini" v-if="list.is_followed===true" @click="followFn(true)">已关注</van-button>
            <van-button icon="plus" type="info" size="mini" plain v-else @click="followFn(false)">关注</van-button>
          </div>
        </template>
      </van-cell>

      <!-- 分割线 -->
      <van-divider></van-divider>

      <!-- 内容 -->
      <div class=" art-content" v-html="list.content">
      </div>

      <!-- 分割线 -->
      <van-divider>End</van-divider>

      <!-- 点赞 -->
      <div class="like-box">
        <!-- 用户对文章的态度, -1: 无态度，0-不喜欢，1-点赞-->
        <van-button type="danger" icon="good-job" size="small" v-if="list.attitude===1" @click="loveFn(true)">已点赞</van-button>
        <van-button icon="good-job-o" type="danger" size="small" plain v-else @click="loveFn(false)">点赞</van-button>
      </div>
    </div>
    <!-- 评论 -->
    <div>
      <comment-list></comment-list>
    </div>
  </div>
</template>

<script>
import { getArtcleDetail, userLoveArtAPI, userUnLoveArtAPI } from '@/api/article'
import { userFollowAPI, userUnFollowAPI } from '@/api/user'
import { timeAgo } from '@/utils/date.js'
import CommentList from './CommentList.vue'
export default {
  components: { CommentList },
  data() {
    return {
      list: {}
    }
  },
  name: 'artcleDetail',
  async created() {
    const res = await getArtcleDetail({
      article_id: this.$route.query.art_id
    })
    this.list = res.data.data
    // console.log(this.list)
  },
  methods: {
    FormData: timeAgo,
    // 关注
    async followFn(bool) {
      if (bool === true) {
        // 点击已关注,效果是取关接口,点击后显示关注按钮
        this.list.is_followed = false
        await userUnFollowAPI({
          userId: this.list.aut_id
        })
        // console.log(res)
      } else {
        // 点击未关注，效果是关注接口，点击后显示已关注按钮
        this.list.is_followed = true

        await userFollowAPI({
          userId: this.list.aut_id
        })
        // console.log(res)
      }
    },
    // 点赞
    async loveFn(bool) {
      if (bool === true) {
        // 取消点赞，显示点赞按钮
        this.list.attitude = 0
        await userUnLoveArtAPI({
          article_id: this.list.art_id
        })
        // console.log(res)
      } else {
        // 点赞，显示取消点赞
        this.list.attitude = 1
        await userLoveArtAPI({
          article_id: this.list.art_id
        })
        // console.log(res)
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
}
.artcle-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}
.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
  /deep/ img {
    width: 100%;
  }
  /deep/ pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}
.like-box {
  display: flex;
  justify-content: center;
  padding-bottom: 55px;
}
</style>
