import Vue from 'vue'
import VueRouter from "vue-router"

import $request from "../network/request"

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
    meta: {
      title: "登录"
    },
    component: () => import("../views/regLogin/Login.vue")
  },
  { //首页
    path: "/home",
    name: "Home",
    component: () => import("../views/home/Home.vue"),
    meta: {
      title: "首页",
      requiresAuth: true
    },
    children: [
      // 用户相关路由 
      { //用户默认首页
        path: "/user",
        name: "User",
        meta: {
          title: "用户管理"
        },
        component: () => import("../views/user/UserHome.vue"),
        children: [{
            path: "/",
            redirect: "list"
          },
          {
            path: 'list',
            name: 'UserList',
            meta: {
              title: "用户列表"
            },
            component: () => import('../views/user/UserList.vue')
          }, {
            path: 'updata',
            name: 'UserUpdata',
            meta: {
              title: "用户更新"
            },
            component: () => import('../views/user/UserUpdata.vue')
          }
        ]
      },
      // 图书管理相关路由
      {
        path: "/library",
        name: "Library",
        meta: {
          title: "图书管理"
        },
        component: () => import("../views/library/LibraryHome.vue"),
        children: [{
          path: "/",
          redirect: "list"
        }, {
          path: "list",
          name: "LibraryList",
          meta: {
            title: "图书列表"
          },
          component: () => import("../views/library/LibraryList.vue")
        }, {
          path: "add",
          name: "LibraryAdd",
          meta: {
            title: "图书添加"
          },
          component: () => import("../views/library/LibraryAdd.vue")
        }, {
          path: "type",
          name: "LibraryType",
          meta: {
            title: "图书分类"
          },
          component: () => import("../views/library/LibraryType.vue")
        }]
      },
      //订单管理相关路由
      {
        path: "/order",
        meta: {
          title: "订单管理"
        },
        component: () => import("../views/order/OrderHome.vue"),
        children: [{
          path: "/",
          redirect: "list"
        }, {
          path: "list",
          name: "OrderList",
          meta: {
            title: "订单列表"
          },
          component: () => import("../views/order/OrderList.vue"),
        }, {
          path: "updata",
          name: "OrderUpdata",
          meta: {
            title: "订单更新"
          },
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

router.beforeEach(function (to, from, next) {
  //判断目标路由是否需要登录 才可访问！
  //当匹配的路由 项之中 有这个授权请求 那么就先从本地拿一下 本地的存储用户信息！
  if (to.matched.some(item => item.meta.requiresAuth)) {
    let userInfo = localStorage.getItem('userInfo') || {};
    // let token = localStorage.getItem('token') || {};

    try {
      userInfo = JSON.parse(userInfo)
    } catch (err) {
      userInfo = {}
    }
    // 判断当前用户信息是否包含token
    if (userInfo.authorization) {
      //发起请求 验证token是否过期
      $request.get("/jwtverify", {
          params: {
            authorization: userInfo.authorization
          }
        })
        .then(res => {
          // console.log("我是data啊", res.data.code)
          if (res.data.code === 1) {
            next()
          } else {
            next({
              path: "/login",
              query: {
                redirectTo: to.fullPath
              }
            })
          }
        })
      next();
    } else {
      next({
        path: "/login",
        query: {
          // 跳转到登录页面，并传递目标页面路径
          redirectTo: to.fullPath
        }
      })
    }
  } else {
    next();
  }

})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router