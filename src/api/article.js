import request from '@/utils/request'

// 获取文章列表
export const getAllArticleListAPI = (params) => {
  return request({
    url: '/v1_0/articles',
    params
  })
}

// 对文章不感兴趣
export const dislikeArticle = ({ artId }) => {
  return request({
    url: '/v1_0/article/dislikes',
    method: 'POST',
    data: {
      target: artId
    }
  })
}

// 文章举报
export const reportArticleAPI = ({ artId, type }) => {
  return request({
    url: '/v1_0/article/reports',
    method: 'POST',
    data: {
      target: artId,
      type: type,
      remark: ''
    }
  })
}

// 获取文章详情
export const getArtcleDetail = ({ article_id }) => {
  return request({
    url: `/v1_0/articles/${article_id}`
  })
}

// 对文章点赞
export const userLoveArtAPI = ({ article_id }) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target: article_id
    }
  })
}

export const userUnLoveArtAPI = ({ article_id }) => {
  return request({
    url: `/v1_0/article/likings/${article_id}`,
    method: 'DELETE'
  })
}

// 获取评论列表
export const getCommitListAPI = ({ id, offset = null, limit = 10 }) => {
  return request({
    url: '/v1_0/comments',
    method: 'GET',
    params: {
      type: 'a',
      source: id,
      offset,
      limit

    }
  })
}

// 对评论点赞
export const loveCommitAPI = ({ commit_id }) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: commit_id
    }
  })
}
// 对评论不点赞
export const unLoveCommitAPI = ({ commit_id }) => {
  return request({
    url: `/v1_0/comment/likings/${commit_id}`,
    method: 'DELETE'
  })
}

// 发布评论
export const commitSendAPI = ({ id, content, art_id = null }) => {
  const obj = {
    target: id,
    content
  }
  if (art_id !== null) {
    obj.art_id = art_id
  }

  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: obj
  })
}
