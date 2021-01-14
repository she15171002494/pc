import http from '@/utils/request'

export const reqUserLogin = data => {
  return http({
    method: 'post',
    url: '/mp/v1_0/authorizations',
    data,
  })
}
