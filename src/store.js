import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from './services/AuthServices'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    username: null,
    userId: null,
    posts: []
  },
  mutations: {
    authenticate(state) {
      state.isLoggedIn = auth.isLoggedIn()
      if (state.isLoggedIn) {
        state.username = auth.getUser().username
        state.userId = auth.getUser().userId
      } else {
        state.username = null
        state.userId = null
      }
    },
    storePost(state, { post }) {
      state.posts.unshift(post)
    },
    updatePostsList(state, { posts }) {
      state.posts = posts
    },
    loadMore(state, { posts }) {
      for (let post of posts) {
        state.posts.push(post)
      }
    }
  },
  actions: {
    authenticate(context) {
      context.commit('authenticate')
    }
  }
})
