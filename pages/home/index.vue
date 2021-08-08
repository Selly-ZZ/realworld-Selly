<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduitTEST</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="user" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{ active: tab === 'your_feed' }"
                  :to="{ name: 'home', query: { tab: 'your_feed' } }"
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{ active: tab === 'global_feed' }"
                  :to="{ name: 'home', query: { tab: 'global_feed' } }"
                  >Global Feed</nuxt-link
                >
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'tag' }"
                  :to="{ name: 'home', query: { tab: 'tag', tag: tag } }"
                  >#{{ tag }}</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username,
                  },
                }"
                ><img :src="article.author.image"
              /></nuxt-link>
              <div class="info">
                <nuxt-link
                  class="author"
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username,
                    },
                  }"
                  >{{ article.author.username }}</nuxt-link
                >
                <span class="date">{{
                  article.createdAt | date('MMM DD,YYYY')
                }}</span>
              </div>
              <button
                :class="{ active: article.favorited }"
                class="btn btn-outline-primary btn-sm pull-xs-right"
                @click="onFavorite(article)"
                :disabled="article.favoriteDisabled"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              :to="{
                name: 'article',
                params: {
                  slug: article.slug,
                },
              }"
              class="preview-link"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
          <!-- 分页列表 -->
          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                v-for="item in totalPage"
                :key="item"
                :class="{ active: item === page }"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: { page: item, tag, tab },
                  }"
                  >{{ item }}</nuxt-link
                >
              </li>
            </ul>
          </nav>
          <!-- /分页列表 -->
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                :to="{
                  name: 'home',
                  query: {
                    tag: item,
                    tab: 'tag',
                  },
                }"
                class="tag-pill tag-default"
                v-for="item in tags"
                :key="item"
                >{{ item }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getArticles,
  getFeedArticles,
  addFavorite,
  deleteFavorite,
} from '@/api/article'
import { getTags } from '@/api/tag'
import { mapState } from 'vuex'
export default {
  name: 'HomeIndex',
  watchQuery: ['page', 'tag', 'tab'],
  async asyncData({ query, store }) {
    //需要SEO
    const page = Number.parseInt(query.page || 1),
      limit = 10,
      tag = query.tag,
      tab = query.tab || 'global_feed'
    const loadArticles =
      store.state.user && tab === 'your_feed' ? getFeedArticles : getArticles
    const [articleRes, tagRes] = await Promise.all([
      loadArticles({ limit, offset: (page - 1) * limit, tag }),
      getTags(),
    ])
    const { articles, articlesCount } = articleRes.data
    articles.forEach((article) => {
      article.favoriteDisabled = false
    })
    const { tags } = tagRes.data
    return {
      articles,
      articlesCount,
      limit,
      page,
      tags,
      tag,
      tab,
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    },
    ...mapState(['user']),
  },
  methods: {
    async onFavorite(article) {
      article.favoriteDisabled = true
      console.log(article)
      if (article.favorited) {
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount--
      } else {
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount++
      }
      article.favoriteDisabled = false
    },
  },
}
</script>

<style></style>
