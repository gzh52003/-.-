import axios from "axios";

let request = axios.create({
  baseURL: "http://localhost:2003/api",
  withCredentials: true
})

export default request;