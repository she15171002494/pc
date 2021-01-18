//个人信息相关的
import http from '@/utils/request'

/**
 * 登录
 */
export const reqUserLogin = data => {
  return http({
    method: 'post',
    url: '/mp/v1_0/authorizations',
    data,
  })
}

/**
 * 获取个人资料
 */
export const reqUserInfo = () => {
  return http({
    method: 'get',
    url: '/mp/v1_0/user/profile',
    // headers: {
    //   Authorization: token,
    // },
  })
}
