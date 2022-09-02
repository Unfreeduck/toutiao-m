import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'// 到指定时间需要的插件
import 'dayjs/locale/zh' // 记成中文

export const timeAgo = (targetTime) => {
  dayjs.extend(relativeTime)
  dayjs.locale('zh')
  const a = dayjs()
  const b = dayjs(targetTime)
  return a.to(b) // 返回多久之前
}

export const formatDate = (dateObj) => {
  return dayjs(dateObj).format('YYYY-MM-DD')
}
