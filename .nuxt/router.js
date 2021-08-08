import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _64f001ca = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _66804110 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _69c02958 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _58fbf850 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _2dfe87d4 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _7c8db544 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _8b6771b6 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _64f001ca,
    children: [{
      path: "",
      component: _66804110,
      name: "home"
    }, {
      path: "/login",
      component: _69c02958,
      name: "login"
    }, {
      path: "/register",
      component: _69c02958,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _58fbf850,
      name: "profile"
    }, {
      path: "/settings",
      component: _2dfe87d4,
      name: "settings"
    }, {
      path: "/editor",
      component: _7c8db544,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _8b6771b6,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
