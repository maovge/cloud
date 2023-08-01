import request from '@/util/request.js'

/*
* 获取直播链接
* @data{
    deviceSerial 设备序列号
    channelNo 通道号，非必选，默认为1
    protocol 流播放协议，1-ezopen、2-hls、3-rtmp、4-flv，默认为1
    code ezopen协议地址的设备的视频加密密码
    expireTime 过期时长，单位秒；针对hls/rtmp/flv设置有效期，相对时间；30秒-720天
    type 地址的类型，1-预览，2-本地录像回放，3-云存储录像回放，非必选，默认为1；回放仅支持rtmp、ezopen、flv协议
    quality 视频清晰度，1-高清（主码流）、2-流畅（子码流）
    startTime 本地录像/云存储录像回放开始时间,云存储开始结束时间必须在同一天，示例：2019-12-01 00:00:00
    stopTime 本地录像/云存储录像回放结束时间,云存储开始结束时间必须在同一天，示例：2019-12-01 23:59:59
    supportH265 请判断播放端是否要求播放视频为H265编码格式,1表示需要，0表示不要求
    playbackSpeed 回放倍速。倍速为 -1（ 支持的最大倍速）、0.5、1、2、4、8、16；仅支持protocol为4-flv，且type为2-本地录像回放（ 部分设备可能不支持16倍速） 或者 3-云存储录像回放
    gbchannel 国标设备的通道编号，视频通道编号ID
  }
 */
export function getAddress(data) {
  return request({
    url: '/management/fluorite.live/getAddress',
    method: 'post',
    data
  })
}

/*
* 开启设备视频加密
* @data{
    deviceSerial 设备序列号
  }
 */
export function encryptOn(data) {
  return request({
    url: '/management/fluorite.live/encryptOn',
    method: 'post',
    data
  })
}

/*
* 关闭设备视频加密
* @data{
    deviceSerial 设备序列号
  }
 */
export function encryptOff(data) {
  return request({
    url: '/management/fluorite.live/encryptOff',
    method: 'post',
    data
  })
}


