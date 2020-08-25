import axios from "axios";
const MyHttpServer = {} //我的请求对象(插件名)


MyHttpServer.install = (Vue) => {
  axios.defaults.baseURL = "http://localhost:2003/api"
  //  添加实例方法
  Vue.prototype.$request = axios;
}


export default MyHttpServer;