import Vue from 'vue'
import VueRouter from "vue-router"


Vue.use(VueRouter)

let routes = [{
    path: "/",
    redirect: "/login",
    hidden: true
  },
  // 登录和注册 
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/regLogin/Login.vue")
  }, {
    path: "/reg",
    name: "Reg",
    component: () => import("../views/regLogin/Reg.vue")
  },
  { //首页
    path: "/home",
    component: () => import("../views/home/Home.vue"),
    children: [
      // 用户相关路由 
      { //用户默认首页
        path: "/user",
        name: "User",
        component: () => import("../views/user/UserHome.vue"),
        children: [{
            path: "/",
            redirect: "list"
          },
          {
            path: 'list',
            name: 'UserList',
            component: () => import('../views/user/UserList.vue')
          },
          {
            path: 'add',
            name: 'UserAdd',
            component: () => import('../views/user/UserAdd.vue')
          }
        ]
      },
      // 图书管理相关路由
      {
        path: "/library",
        name: "Library",
        component: () => import("../views/library/LibraryHome.vue"),
        children: [{
          path: "/",
          redirect: "list"
        }, {
          path: "list",
          name: "LibraryList",
          component: () => import("../views/library/LibraryList.vue")
        }, {
          path: "add",
          name: "LibraryAdd",
          component: () => import("../views/library/LibraryAdd.vue")
        }, {
          path: "type",
          name: "LibraryType",
          component: () => import("../views/library/LibraryType.vue")
        }]
      },
      //订单管理相关路由
      {
        path: "/order",
        component: () => import("../views/order/OrderHome.vue"),
        children: [{
          path: "/",
          redirect: "list"
        }, {
          path: "list",
          name: "OrderList",
          component: () => import("../views/order/OrderList.vue"),
        }, {
          path: "updata",
          name: "OrderUpdata",
          component: () => import("../views/order/OrderUpdata.vue"),
        }, ]
      }
    ]
  },
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router