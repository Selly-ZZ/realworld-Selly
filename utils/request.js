/**
 * 基于axios创建模块
 */
import axios from 'axios'
const request = axios.create({
  baseURL: 'https://conduit.productionready.io',
})
//请求拦截器,任何请求都需要走请求拦截器，可以做一些统一的操作，例如统一设置token
// request.interceptors.request.use(
//   function(config) {
//     config.headers = `Token `
//     //返回config请求配置对象
//     return config
//   },
//   function(error) {
//     //如果请求失败，走这个逻辑（此时请求还没有发出去）
//     return Promise.reject(error)
//   }
// )
//响应拦截器
export default request
