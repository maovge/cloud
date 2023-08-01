/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

/**
 * @param {number} time
 * @param {number} 时1 分2 秒3
 * @param {Boolean} true 时分转秒 false 时间转时分
 * @returns {string}
 */

export function setalltime(time,num,status) {
  let formatTime = ''
  if(status){
    const ms = time * 1000
    const date = new Date(ms)
    // 注意这里是使用的getUTCHours()方法，转换成UTC(协调世界时)时间的小时
    const hour = date.getUTCHours().toString().padStart(2, '0')
    // let hour = date.getHours(); 如果直接使用getHours()方法，则得到的时分秒格式会多出来8个小时（在国内开发基本都是使用的是东八区时间），getHours()方法会把当前的时区给加上。
    const minute = date.getMinutes().toString().padStart(2, '0')
    const second = date.getSeconds().toString().padStart(2, '0')
    formatTime = hour
    if(num >= 2){
      formatTime += ':' + minute
    }
    if(num >= 3){
      formatTime += ':' + second
    }
  }else{
    const times = time.split(':')
    formatTime = ((times[0] * 60) + (times[1] * 1)) * 60
  }
  return formatTime
}

/** 秒转时间
 * @param {number} time
 * @type {Boolean} true 0时0分0秒 false0:0:0
 * @returns {string}
 */

export function formatSeconds(time,type) {
  let secondTime = parseInt(time);// 秒
  let minuteTime = 0;// 分
  let hourTime = 0;// 小时
  let result = ""
  if(secondTime > 59) {//如果秒数大于60，将秒数转换成整数
    //获取分钟，除以60取整数，得到整数分钟
    minuteTime = parseInt(secondTime / 60);
    //获取秒数，秒数取余，得到整数秒数
    secondTime = parseInt(secondTime % 60);
    //如果分钟大于60，将分钟转换成小时
    if(minuteTime > 59) {
      //获取小时，获取分钟除以60，得到整数小时
      hourTime = parseInt(minuteTime / 60);
      //获取小时后取余的分，获取分钟除以60取余的分
      minuteTime = parseInt(minuteTime % 60);
    }
  }
  if(type){
    result = "" + parseInt(secondTime) + "秒";
    if(minuteTime > 0) {
      result = "" + parseInt(minuteTime) + "分" + result;
    }
    if(hourTime > 0) {
      result = "" + parseInt(hourTime) + "小时" + result;
    }
  }else{
    if(secondTime <= 9){
      secondTime = '0'+secondTime
    }
    if(minuteTime <= 9){
      minuteTime = '0'+minuteTime
    }
    if(hourTime <= 9){
      hourTime = '0'+hourTime
    }
    if(minuteTime < 1){
      result = "00:" + secondTime;
    }else{
      result = secondTime
    }
    if(minuteTime > 0) {
      result = "" + minuteTime + ":" + result;
    }
    if(hourTime > 0) {
      result = "" + hourTime + ":" + result;
    }
  }
  return result;
}
