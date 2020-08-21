import axios from "axios"

const MyHttpServer = {}
MyHttpServer.install = function (Vue) {
  axios.defaults.baseURL = "http://localhost:2003/api"
  //  添加实例方法
  Vue.prototype.$request = axios;
}
export default MyHttpServer;