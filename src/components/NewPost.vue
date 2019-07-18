<template>
    <v-card
    class="my-4"
    >
        <v-form>
        <v-textarea
            class="pa-4"
            v-model="postContent"
            label="Say something to the world..."
            solo
            auto-grow
            flat
        ></v-textarea>
        <v-divider></v-divider>
        <v-toolbar
        card
        color="white"
        dark
        >
        
        <v-toolbar-title>
            <v-btn 
            color="orange darken-4"
            @click="postNew"
            >
                Speak out
                <!-- <v-icon>send</v-icon> -->
            </v-btn>
        </v-toolbar-title>
        
        </v-toolbar>
        </v-form>
    </v-card>
</template>

<script>
import * as postService from '@/services/PostService.js'
import store from '../store'

export default {
    data() {
        return {
            postContent: null,
        }
    },
    methods: {
        async postNew() {
            const content = {
                "post": {
                    "content": this.postContent
                }
            }
            await postService.createPost(content)
            .then(res => {
                console.log('Success!')
                console.log('REs: ', res)
                store.commit('storePost', {
                    post: {
                        author: 'You',
                        content: this.postContent,
                        ups: 0,
                        downs: 0,
                        time: 'now'
                    }
                })
            })
            .catch(err => {
                console.log('Err: ', err.response.data)
            })
        }
    }
}
</script>
