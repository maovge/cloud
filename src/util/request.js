/**
 *  @author 小周
 * @description  接口封装
*/
import axios from 'axios'
import { baseApi } from '@/config'
import qs from 'qs'

const service = axios.create({
  baseURL: baseApi, // url
  // withCredentials: false, // 是否携带cookie信息，保持session的一致
  timeout: 60000, // 超时时长60S
})

// request拦截器 request interceptor
service.interceptors.request.use(config => {
  const token = sessionStorage.getItem('authToken')
  const pathname = window.location.pathname
  if(pathname != '/login'){
    if (token) {
      config.headers['token'] = token
    }
  }

  return config
},error => {
  return Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(response => {
  const res = qs.parse(response.data)
  console.log(res)
  // if(res.state && res.state === 200) {
  return Promise.resolve(res) // 进行中
  // } else {
  //   return Promise.reject(res) // 失败
  // }
},error =>{
  console.log(error)
  if(error.response.state){
    switch(error.response.state){
      case 401: // 未登录
        sessionStorage.removeItem('authToken')
        router.push({ path: '/login' });
        break
      case 403: // 登录过期
        sessionStorage.removeItem('authToken')
        router.push({ path: '/login' });
        break
    }
    return Promise.reject(error.response)
  }
})

export default service
