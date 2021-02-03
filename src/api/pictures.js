import http from '../utils/request'
/**
 * 获取图片
 */
export const reqImages = paramsObj => {
  return http({
    method: 'get',
    url: '/mp/v1_0/user/images',
    params: paramsObj || {},
  })
}

/**
 * 收藏或者取消收藏
 */
export const reqIsCollected = (id, dateObj) => {
  return http({
    method: 'put',
    url: `/mp/v1_0/user/images/${id}`,
    data: dateObj,
  })
}

/**
 * 删除图片素材
 */
export const reqDelete = id => {
  return http({
    method: 'delete',
    url: `/mp/v1_0/user/images/${id}`,
  })
}
