import axios from 'axios'
const http = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net', //基地址
})

export default http
