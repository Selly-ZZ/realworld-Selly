/**
 * Nuxt.js配置文件
 */
module.exports = {
  router: {
    linkActiveClass: 'active',
    //自定义路由表规则
    extendRoutes(routes, resolve) {
      routes.splice(0) //清楚默认生成的路由表
      routes.push(
        ...[
          {
            path: '/',
            component: resolve(__dirname, 'pages/layout/'),
            children: [
              {
                path: '',
                name: 'home',
                component: resolve(__dirname, 'pages/home/'),
              },
              {
                path: '/login',
                name: 'login',
                component: resolve(__dirname, 'pages/login/'),
              },
              {
                path: '/register',
                name: 'register',
                component: resolve(__dirname, 'pages/login/'),
              },
              {
                path: '/profile/:username',
                name: 'profile',
                component: resolve(__dirname, 'pages/profile/'),
              },
              {
                path: '/settings',
                name: 'settings',
                component: resolve(__dirname, 'pages/settings/'),
              },
              {
                path: '/editor',
                name: 'editor',
                component: resolve(__dirname, 'pages/editor/'),
              },
              {
                path: '/article/:slug',
                name: 'article',
                component: resolve(__dirname, 'pages/article/'),
              },
            ],
          },
        ]
      )
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3306,
  },
  //注册插件
  plugins: ['~/plugins/request.js', '~/plugins/dayjs.js'],
}
