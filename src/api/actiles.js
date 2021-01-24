//文章相关
import http from '../utils/request'

/**
 * 文章列表
 */
export const reqActiles = date => {
  return http({
    method: 'get',
    url: '/mp/v1_0/articles',
    params: date || {},
  })
}

/**
 * 文章频道
 */
export const reqActilesChannels = () => {
  return http({
    methods: 'get',
    url: '/mp/v1_0/channels',
  })
}
