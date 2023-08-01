import request from '@/util/request.js'

// 获取用户信息
export function getMineInfo(data) {
  return request({
    url: '/management/common/getMineInfo',
    method: 'POST',
    data
  })
}