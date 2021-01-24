import dayjs from 'dayjs'

/**
 * 时间过滤器
 */
export const data = val => {
  return dayjs(val).format('YYYY-MM-DD')
}
