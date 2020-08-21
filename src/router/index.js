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
          }, {
            path: 'del',
            name: 'UserDel',
            component: () => import( /* webpackChunkName: "about" */ '../views/user/UserDel.vue')
          }, {
            path: 'updata',
            name: 'UserUpdata',
            component: () => import( /* webpackChunkName: "about" */ '../views/user/UserUpdata.vue')
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
          path: "updata",
          name: "LibraryUpdata",
          component: () => import("../views/library/LibraryUpdata.vue")
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
            path: "add",
            name: "OrderAdd",
            component: () => import("../views/order/OrderAdd.vue"),
          },
          {
            path: "del",
            name: "OrderDel",
            component: () => import("../views/order/OrderDel.vue"),
          },
          {
            path: "updata",
            name: "OrderUpdata",
            component: () => import("../views/order/OrderUpdata.vue"),
          },
          {
            path: "find",
            name: "OrderFind",
            component: () => import("../views/order/OrderFind.vue"),
          },
        ]
      }
    ]
  },



]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router