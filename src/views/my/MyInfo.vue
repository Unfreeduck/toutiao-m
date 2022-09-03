<template>
  <div>
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />
    <!-- 信息 -->
    <div class="main">
      <van-cell-group>
        <van-cell title="头像" is-link>
          <template #default>
            <van-image class="avatar" round fit="cover" :src="profileObj.photo" @click="imageClickFn" />
            <input type="file" ref="iptFile" v-show="false" accept="image/*" @change="onFileChange" />
          </template>
        </van-cell>
        <van-cell title="姓名" :value="profileObj.name" is-link @click="changeName" to="/editname" />
        <van-cell title="生日" :value="profileObj.birthday" is-link @click="isShow" />
        <van-cell title="个性签名" :label="profileObj.intro===null?'暂无签名':profileObj.intro" is-link @click="changeSignature" to="/editsignature" />
      </van-cell-group>
      <van-popup v-model="show" position="bottom" :style="{ height: '45%' }">
        <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" @cancel="dateCancelFn" @confirm="confirmFn" />
      </van-popup>
    </div>
  </div>
</template>

<script>
import { userProfileAPI, updateUserPhotoAPI, updateUserInfoAPI } from '@/api/user'
import bus from '@/components/eventBus'
import { formatDate } from '@/utils/date.js'
export default {
  data() {
    return {
      profileObj: {}, // 用户基本资料
      show: false,
      minDate: new Date(1920, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(2021, 0, 17)
    }
  },
  async created() {
    const res = await userProfileAPI()
    this.profileObj = res.data.data
  },
  methods: {
    async onFileChange(e) {
      if (e.target.files.length === 0) return // 没有选择图片直接return
      // 创建formdata
      const theFd = new FormData()
      theFd.append('photo', e.target.files[0])
      const res = await updateUserPhotoAPI(theFd)
      this.profileObj.photo = res.data.data.photo
    },
    imageClickFn() {
      this.$refs.iptFile.click()
    },
    changeName() {
      bus.$emit('sendMyName', this.profileObj.name)
    },
    changeSignature() {
      bus.$emit('sendSignature', this.profileObj.intro)
    },
    isShow() {
      this.show = true
      this.currentDate = new Date(this.profileObj.birthday)
    },
    async confirmFn() {
      await updateUserInfoAPI({
        birthday: formatDate(this.currentDate)
      })
      this.show = false
      this.profileObj.birthday = formatDate(this.currentDate)
    },
    dateCancelFn() {
      this.show = false
    }
  },
  beforeDestroy() {
    this.changeName()
    this.changeSignature()
  }
}
</script>

<style lang='less' scoped>
/deep/.van-cell::after {
  border: none;
}
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
}
.main {
  /deep/ .van-cell {
    padding: 20px 10px;
    align-items: center;
  }
  /deep/ .van-cell__title {
    font-size: 16px;
  }
}
.avatar {
  width: 33px;
  height: 33px;
}
</style>
