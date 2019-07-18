<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm8 offset-sm2>
        <NewPost v-if="$store.state.isLoggedIn"/>
        <v-card
          class="mx-auto my-4"
          color="#fff"
          light
          v-for="(post, index) in $store.state.posts"
          :key="index"
        >
          <v-card-title>
            <span class="title font-weight-light">{{ post.author }}</span>
          </v-card-title>

          <v-card-text class="headline font-weight-bold">
            {{ post.content }}
          </v-card-text>

          <v-card-actions>
            <v-list-tile class="grow">
              <v-list-tile-content>
                <v-list-tile-title>Working</v-list-tile-title>
              </v-list-tile-content>

              <v-layout
                align-center
                justify-end
              >
                <v-btn icon @click="show = !show">
                  <v-icon>keyboard_arrow_up</v-icon>
                </v-btn>
                <span class="subheading mr-2">9090</span>
                <span class="mr-1">·</span>
                <v-btn icon @click="show = !show">
                  <v-icon>keyboard_arrow_down</v-icon>
                </v-btn>
                <span class="subheading">45</span>
              </v-layout>
            </v-list-tile>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import NewPost from '@/components/NewPost'
import * as postService from '@/services/PostService.js'
import store from '../store'

export default {
  components: {
    NewPost
  },
  data() {
    return {
      username: this.$store.state.username,
      pagination: 1
    }
  },
  methods: {
    loadMore() {
      postService.getMorePosts(this.pagination, 4)
      .then(res => {
        this.pagination = this.pagination + 1
        console.log(res.data.posts)
        store.commit('loadMore', {
          posts: res.data.posts
        })
      })
    }
  },
  created() {
    postService.getMorePosts(1, 4)
    .then(res => {
      this.pagination = this.pagination + 1
      store.commit('updatePostsList', {
        posts: res.data.posts
      })
    })
  },
  mounted() {

    // implement infinite scroll
    window.onscroll = () => {
      let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight
      if (bottomOfWindow) {
        // load more posts
        this.loadMore()
      }
    }
  }
}
</script>
