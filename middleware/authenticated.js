/**
 * 校验是否登录的中间件
 */
export default function({ store, redirect }) {
  //如果未登录
  if (!store.state.user) {
    return redirect('/login')
  }
}
