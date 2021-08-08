import axios from 'axios'
/**
 * 基于axios创建模块
 */
export const request = axios.create({
  baseURL: 'http://realworld.api.fed.lagounews.com',
})
//通过插件机制获取上下文对象
//插件导出函数必须作为默认成员
export default ({ store }) => {
  console.log(123456)
  //请求拦截器,任何请求都需要走请求拦截器，可以做一些统一的操作，例如统一设置token
  request.interceptors.request.use(
    function(config) {
      const { user } = store.state
      if (user && user.token) {
        config.headers.Authorization = `Token ${user.token}`
      }
      //返回config请求配置对象
      return config
    },
    function(error) {
      //如果请求失败，走这个逻辑（此时请求还没有发出去）
      return Promise.reject(error)
    }
  )
}
