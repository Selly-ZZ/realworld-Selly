<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up' }}</h1>
          <p class="text-xs-center">
            <!-- <a href="">Have an account?</a> -->
            <nuxt-link v-if="isLogin" to="/register"
              >Need an account?</nuxt-link
            >
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages" :key="message + index">
                {{ field }} {{ message }}
              </li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="user.username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="eamil"
                placeholder="Email"
                v-model="user.email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
                required
                minlength="8"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? 'Sign in' : 'Sign up' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '@/api/user'
const Cookie = process.client ? require('js-cookie') : undefined //只在客户端加载这个包
export default {
  middleware: ['notAuthenticated'],
  name: 'LoginIndex',
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
      },
      errors: {}, //接口返沪的错误信息
    }
  },
  computed: {
    isLogin() {
      return this.$route.name === 'login'
    },
  },
  methods: {
    async onSubmit() {
      try {
        //提交表单
        const { data } = this.isLogin
          ? await login({ user: this.user })
          : await register({ user: this.user })
        //TODO: 保存用户状态
        this.$store.commit('setUser', data.user)
        //为了防止页面刷新，登录状态丢失，将数据持久化
        console.log(data.user)
        Cookie.set('user', JSON.stringify(data.user))

        this.$router.push('/')
      } catch (err) {
        this.errors = err.response.data.errors
      }
    },
  },
}
</script>

<style></style>
