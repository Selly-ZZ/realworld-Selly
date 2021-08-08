//在服务端渲染期间运行的都是同一个实例
const cookieparser = process.server ? require('cookieparser') : undefined

//为了防止冲突，无比把state定义成一个函数，返回数据对象
export const state = () => {
  return {
    //当前登录用户的登录状态
    user: null,
  }
}

export const mutations = {
  setUser(state, data) {
    state.user = data
  },
}

export const actions = {
  //一个特殊的action方法，这个action会在服务端渲染期间自动调用
  //初始化容器数据，以及传递数据给客户端使用

  nuxtServerInit({ commit }, { req }) {
    let user = null
    //如果请求头中有Cookie
    if (req.headers.cookie) {
      try {
        //使用cookiepaser把cookie字符串转化为Javascript对象
        const parsed = cookieparser.parse(req.headers.cookie)
        user = parsed.user ? JSON.parse(parsed.user) : null
      } catch (err) {
        console.dir(err)
      }
    }
    //提交mutation修改state状态
    commit('setUser', user)
  },
}
