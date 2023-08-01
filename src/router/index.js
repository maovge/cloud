import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: '登录',
    redirect: '/login',
    meta: {
      title: '登录',
      keepAlive:false
    },
    children: [
      {
        path: '/login',
        name: '登录',
        component: () => import('@/views/login'),
        meta: {
          title: '登录',
          keepAlive:false,
          iscache:false
        },
      },
      {
        path: '/home',
        name: '首页',
        component: () => import('@/views/home/index'),
        meta: {
          title: '首页',
          keepAlive:true,
          iscache:true
        },
      },
      {
        path: '/user_info',
        name: '账户信息',
        component: () => import('@/views/user_info/index'),
        meta: {
          title: '账户信息',
          keepAlive:true,
          iscache:true
        },
      },
      {
        path: '/user_edit',
        name: '修改账户信息',
        component: () => import('@/views/user_edit/index'),
        meta: {
          title: '修改账户信息',
          keepAlive:true,
          iscache:false
        },
      },
      {
        path: '/user_password',
        name: '修改密码',
        component: () => import('@/views/user_password/index'),
        meta: {
          title: '修改密码',
          keepAlive:true,
          iscache:false
        },
      },
      {
        path: '/goods',
        name: '商品管理',
        component: () => import('@/views/goods/index'),
        meta: {
          title: '商品管理',
          keepAlive:true,
          iscache:true
        },
      },
      {
        path: '/goods_add',
        name: '添加商品',
        component: () => import('@/views/goods_add/index'),
        meta: {
          title: '添加商品',
          keepAlive:true,
          iscache:false
        },
      },
      {
        path: '/goods_details',
        name: '商品详情',
        component: () => import('@/views/goods_details/index'),
        meta: {
          title: '商品详情',
          keepAlive:true,
          iscache:false
        },
      },
      {
        path: '/goods_class',
        name: '商品分类',
        component: () => import('@/views/goods_class/index'),
        meta: {
          title: '商品分类',
          keepAlive:true,
          iscache:true
        },
      },
      {
        path: '/inventory',
        name: '库存管理',
        component: () => import('@/views/inventory/index'),
        meta: {
          title: '库存管理',
          keepAlive:true,
          iscache:true
        },
      },
      {
        path: '/store_add',
        name: '添加仓库',
        component: () => import('@/views/store_add/index'),
        meta: {
          title: '添加仓库',
          keepAlive:true,
          iscache:false
        },
      },
      {
        path: '/store_details',
        name: '仓库详情',
        component: () => import('@/views/store_details/index'),
        meta: {
          title: '仓库详情',
          keepAlive:true,
          iscache:false
        },
      },
      {
        path: '/store_inventory',
        name: '仓库盘点',
        component: () => import('@/views/store_inventory/index'),
        meta: {
          title: '仓库盘点',
          keepAlive:true,
          iscache:true
        },
      },
      {
        path: '/enter_details',
        name: '入库单',
        component: () => import('@/views/enter_details/index'),
        meta: {
          title: '入库单',
          keepAlive:true,
          iscache:true
        },
      },
      {
        path: '/enter_add',
        name: '添加入库单',
        component: () => import('@/views/enter_add/index'),
        meta: {
          title: '添加入库单',
          keepAlive:true,
          iscache:false
        },
      },
      {
        path: '/gout_add',
        name: '添加出库单',
        component: () => import('@/views/gout_add/index'),
        meta: {
          title: '添加出库单',
          keepAlive:true,
          iscache:false
        },
      },
      {
        path: '/drop_details',
        name: '盘点单',
        component: () => import('@/views/drop_details/index'),
        meta: {
          title: '盘点单',
          keepAlive:true,
          iscache:true
        },
      },
      {
        path: '/shop',
        name: '门店管理',
        component: () => import('@/views/shop/index'),
        meta: {
          title: '门店管理',
          keepAlive:true,
          iscache:true
        },
      },
      {
        path: '/shop_details',
        name: '门店详情',
        component: () => import('@/views/shop_details/index'),
        meta: {
          title: '门店详情',
          keepAlive:true,
          iscache:true
        },
      },
      {
        path: '/shop_time',
        name: '营业时间',
        component: () => import('@/views/shop_time/index'),
        meta: {
          title: '营业时间',
          keepAlive:true,
          iscache:true
        },
      },
      {
        path: '/shop_staff',
        name: '店员管理',
        component: () => import('@/views/shop_staff/index'),
        meta: {
          title: '店员管理',
          keepAlive:true,
          iscache:true
        },
      },
      {
        path: '/staff_add',
        name: '添加店员',
        component: () => import('@/views/staff_add/index'),
        meta: {
          title: '添加店员',
          keepAlive:true,
          iscache:false
        },
      },
      {
        path: '/shop_hardware',
        name: '硬件配置',
        component: () => import('@/views/shop_hardware/index'),
        meta: {
          title: '硬件配置',
          keepAlive:true,
          iscache:true
        },
      },
      {
        path: '/hardware_add',
        name: '添加硬件',
        component: () => import('@/views/hardware_add/index'),
        meta: {
          title: '添加硬件',
          keepAlive:true,
          iscache:false
        },
      },
      {
        path: '/hardware_edit',
        name: '硬件信息',
        component: () => import('@/views/hardware_edit/index'),
        meta: {
          title: '硬件信息',
          keepAlive:true,
          iscache:false
        },
      },
      {
        path: '/shop_monitor',
        name: '监控管理',
        component: () => import('@/views/shop_monitor/index'),
        meta: {
          title: '监控管理',
          keepAlive:true,
          iscache:false
        },
      },
      {
        path: '/monitor_details',
        name: '历史记录',
        component: () => import('@/views/monitor_details/index'),
        meta: {
          title: '历史记录',
          keepAlive:true,
          iscache:false
        },
      },
      {
        path: '/monitor_playback',
        name: '监控回放',
        component: () => import('@/views/monitor_playback/index'),
        meta: {
          title: '监控回放',
          keepAlive:true,
          iscache:false
        },
      },
      {
        path: '/shop_goods',
        name: '货架管理',
        component: () => import('@/views/shop_goods/index'),
        meta: {
          title: '货架管理',
          keepAlive:true,
          iscache:true
        },
      },
      {
        path: '/shop_displace',
        name: '更换商品',
        component: () => import('@/views/shop_displace/index'),
        meta: {
          title: '更换商品',
          keepAlive:true,
          iscache:false
        },
      },
      {
        path: '/shop_inventory',
        name: '门店盘点',
        component: () => import('@/views/shop_inventory/index'),
        meta: {
          title: '门店盘点',
          keepAlive:true,
          iscache:true
        },
      },
      {
        path: '/shop_inventory_add',
        name: '商品盘点',
        component: () => import('@/views/shop_inventory_add/index'),
        meta: {
          title: '商品盘点',
          keepAlive:true,
          iscache:true
        },
      },
      {
        path: '/shop_inventory_details',
        name: '盘点详情',
        component: () => import('@/views/shop_inventory_details/index'),
        meta: {
          title: '盘点详情',
          keepAlive:true,
          iscache:false
        },
      },
      {
        path: '/shop_inventory_order',
        name: '订单详情',
        component: () => import('@/views/shop_inventory_order/index'),
        meta: {
          title: '订单详情',
          keepAlive:true,
          iscache:false
        },
      },
      {
        path: '/shop_access',
        name: '到访记录',
        component: () => import('@/views/shop_access/index'),
        meta: {
          title: '到访记录',
          keepAlive:true,
          iscache:true
        },
      },
      {
        path: '/shop_access_details',
        name: '详细信息',
        component: () => import('@/views/shop_access_details/index'),
        meta: {
          title: '详细信息',
          keepAlive:true,
          iscache:false
        },
      },
      {
        path: '/shop_setup',
        name: '门店配置',
        component: () => import('@/views/shop_setup/index'),
        meta: {
          title: '门店配置',
          keepAlive:true,
          iscache:false
        },
      },
      {
        path: '/guard',
        name: '值守管理',
        component: () => import('@/views/guard/index'),
        meta: {
          title: '值守管理',
          keepAlive:true,
          iscache:true
        },
      },
      {
        path: '/order_list',
        name: '订单管理',
        component: () => import('@/views/order_list/index'),
        meta: {
          title: '订单管理',
          keepAlive:true,
          iscache:true
        },
      },
      {
        path: '/order_details',
        name: '订单详情',
        component: () => import('@/views/order_details/index'),
        meta: {
          title: '订单详情',
          keepAlive:true,
          iscache:false
        },
      },
      {
        path: '/strategy',
        name: '策略管理',
        component: () => import('@/views/strategy/index'),
        meta: {
          title: '策略管理',
          keepAlive:true,
          iscache:false
        },
      },
      {
        path: '/strategy_collection',
        name: '门店收款策略',
        component: () => import('@/views/strategy_collection/index'),
        meta: {
          title: '门店收款策略',
          keepAlive:true,
          iscache:true
        },
      },
      {
        path: '/subordinate',
        name: '角色管理',
        component: () => import('@/views/subordinate/index'),
        meta: {
          title: '角色管理',
          keepAlive:true,
          iscache:true
        },
      },
      {
        path: '/subordinate_add',
        name: '添加角色',
        component: () => import('@/views/subordinate_add/index'),
        meta: {
          title: '添加角色',
          keepAlive:true,
          iscache:false
        },
      },
      {
        path: '/subordinate_details',
        name: '角色详情',
        component: () => import('@/views/subordinate_details/index'),
        meta: {
          title: '角色详情',
          keepAlive:true,
          iscache:false
        },
      },
      


    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior (to, from, savedPosition) {

    if(savedPosition){
      if(to.path != '/monitor_details'){
        window.scrollTo(0, 0)
        return
      }
      return savedPosition
    }else{
      return savedPosition
    }
  }
})

export default router
