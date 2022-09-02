import axios from 'axios'
import store from '@/store'
import { Notify } from 'vant'
import router from '@/router'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})

// 请求拦截器
request.interceptors.request.use(function(config) {
  // 请求发起会经过这里
  // config本次请求的配置对象
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 一定要返回
  return config
}, function(error) {
  // 请求失败，会进入这里
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function(response) {
  // 一定要返回
  return response
}, function(error) {
  if (error.response.status === 401) {
    Notify({ type: 'warning', message: '身份已过期' })
    router.replace('/login')
  }
  // 响应失败，会进入这里
  return Promise.reject(error)
})
export default request
