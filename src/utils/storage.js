//本地储存相关的
const user = 'hm-tt-userInfo'

/**
 * 保存用户信息到本地
 */
export const setUser = userInfo => {
  localStorage.setItem(user, JSON.stringify(userInfo))
}

/**
 * 从本地获取用户信息
 */
export const getUser = () => {
  return JSON.parse(localStorage.getItem(user)) || {}
}

/**
 * 从本地删除用户信息
 */
export const removeUser = () => {
  localStorage.removeItem(user)
}
