// 用户请求模块
import request from '@/utils/request'

// import store from '@/store'

export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

// 发送验证吗
// 每个手机号，每分钟一次
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
// 获取用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
    // 发送请求头数据
    // headers: {
    //   // 注意：接口需要授权才能访问
    //   // Bearer后面有个空格
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

// 获取用户频道
export const getUserChannelsAPI = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}
// 获取全部频道
export const getAllChannelsAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}
// 更新覆盖频道
export const updateChannelsAPI = ({ channels }) =>
  request({
    url: '/v1_0/user/channels',
    method: 'PUT',
    data: {
      channels
    }
  })
// 删除用户指定的方法
export const removeTheChannelAPI = ({ channelId }) =>
  request({
    url: `/v1_0/user/channels/${channelId}`,
    method: 'DELETE'
  })

// 关注取消用户关注
export const userFollowAPI = ({ userId }) =>
  request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: userId
    }
  })

export const userUnFollowAPI = ({ userId }) =>
  request({
    url: `/v1_0/user/followings/${userId}`,
    method: 'DELETE'

  })

// 获取编辑用户信息
export const userProfileAPI = () => {
  return request({
    url: '/v1_0/user/profile',
    method: 'GET'
  })
}
// 用户更新头像
export const updateUserPhotoAPI = (fd) => request({
  url: '/v1_0/user/photo',
  method: 'PATCH',
  data: fd

})
// 更新用户信息
export const updateUserInfoAPI = (dataObj) => {
  // 判断值
  const obj = {
    name: '', // 昵称
    gender: 0, // 性别，0-男，1-女
    birthday: '', // 生日，格式'2018-12-20'
    intro: '' // 个人介绍
  }
  for (const prop in obj) {
    if (dataObj[prop] === undefined) {
      delete dataObj[prop]
    } else {
      obj[prop] = dataObj[prop]
    }
  }
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH', // 局部更新
    data: obj
    // {
    //   name, // 昵称
    //   gender, // 性别，0-男，1-女
    //   birthday, // 生日，格式'2018-12-20'
    //   intro // 个人介绍
    // }
  })
}
