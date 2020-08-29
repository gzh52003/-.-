import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import request from "./network/request"
//导入自定义面包屑组件(也就是一个组件对象！)
import myBread from "@/components/commom/myBread.vue"

import 'element-ui/lib/theme-chalk/index.css';
import "@/assets/css/reset.css"

Vue.config.productionTip = false

//使用插件
//使用elememtUI框架
Vue.use(ElementUI);

//使用axios封装的一个请求
Vue.prototype.$request = request

//定义一个全局的面包屑组件
Vue.component(myBread.name, myBread)

import router from "@/router/index"

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')