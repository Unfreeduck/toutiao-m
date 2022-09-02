<template>
  <div class="channel-edit">
    <!-- 返回nav -->
    <van-nav-bar>
      <template #left>
        <van-icon name="arrow-left" color="#000" size="0.625rem" @click="closeFn" />
      </template>

      <!-- 频道信息 -->
    </van-nav-bar>
    <van-cell :border=" false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button class="edit-btn" type="danger" plain round size="mini" @click="editFn">{{ isEdit ? '完成' : '编辑' }}</van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item class="grid-item" v-for="obj in userList" :key="obj.id" @click="userClickFn(obj)">
        <van-icon v-show="isEdit&&obj.id!==0" slot="icon" name="clear">
        </van-icon>
        <span class="text" slot="text">{{ obj.name }}</span>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item class="grid-item" v-for="obj in unCheckList" :key="obj.id" @click="moreFn(obj)">
        <van-icon v-show="isEdit" slot="icon" name="plus" class="icon">
        </van-icon>
        <span class="text" slot="text">{{ obj.name }}</span>
      </van-grid-item>
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    userList: Array,
    unCheckList: Array
  },
  data() {
    return {
      isEdit: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    editFn() {
      this.isEdit = !this.isEdit
    },
    // 添加
    moreFn(channelObj) {
      if (this.isEdit === true) {
        this.$emit('addChannelEv', channelObj)
      }
    },
    // 减少
    userClickFn(channelObj) {
      if (this.isEdit === true) {
        if (channelObj.id !== 0) {
          this.$emit('removeChannelEv', channelObj)
        }
      } else {
        this.$emit('closeEv')
        this.$emit('channelIdEv', channelObj.id)
        // console.log(channelObj.id)
      }
    },
    // 返回主页
    closeFn() {
      this.$emit('closeEv')
      // this.isEdit = false
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 22px 0;
  .title-text {
    font-size: 16px;
    color: #333333;
  }

  .edit-btn {
    width: 52px;
    height: 24px;
    font-size: 13px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  /deep/ .grid-item {
    width: 80px;
    height: 43px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 14px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -5px;
        top: -5px;
        font-size: 15px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        font-size: 12px;
        .van-icon-plus {
          margin-right: 3px;
        }
      }
    }
  }
}
</style>
