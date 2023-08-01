import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
import collection from './util/collection'
import Loadin from './components/Loading'

import { createApp } from 'vue'
import { Toast } from 'vant'
import { Dialog } from 'vant'
import { useRoute } from 'vue-router'

// toast 样式
import 'vant/es/toast/style'
import 'vant/es/dialog/style'

// 移动端适配
import 'lib-flexible/flexible.js';

// 引入全局样式
import '@/assets/scss/index.scss';

// 全局引入按需引入UI库 vant
import { vantPlugins } from './plugins/vant.js';

// cookies
import VueCookies from 'vue-cookies'

// 省市区
import province  from '@/util/province'



router.beforeEach((to, from, next) => {
  // 获取token
  const token = sessionStorage.getItem('authToken');
  console.log('token:',token)
  collection.scroll = true
  // 判断是否需要登录
  if(to.meta.keepAlive) {
    if(token) {
      next();
    }else{
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 记住要访问的页面路由地址，后面登录后跳转会用到该值
      })
    }
  }else{
    next();
  }
})



// 为避免Cannot read properties of undefined (reading 'globalProperties')
// 需要将crateApp和mount分开，将全局绑定内容夹在中间
const app = createApp(App)

/*
* $cookies
* $cookies.isKey("xxxxx") 检测
* $cookies.remove("xxxxx") 删除
* $cookies.config("xxxxx") 设置时长
* $cookies.set("xxxxx",xxxxx) 存储
* get('xxxxx') 获取
 */
app.config.globalProperties = {
  $cookies: VueCookies, // $cookies
  $qs: qs, // $qs
  collection: collection, // 全局变量
  $store: store,
  province:province, // 省市区
}


// 全局组件
app.component('Loadin', Loadin)

app.use(store)
.use(Toast)
.use(Dialog)
.use(router)
.use(vantPlugins)
.use(useRoute)
.mount('#app');
