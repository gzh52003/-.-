import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import MyHttpServer from "@/network/request.js"

import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

//使用插件
Vue.use(ElementUI);
Vue.use(MyHttpServer);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')