import { http } from './HttpServices'

export function createPost(content) {
    return http().post('/post', content)
}

export function getAllPosts() {
    return http().get('/post')
}

export function getMorePosts(p, n) {
    return http().get(`/more/?p=${p}&n=${n}`)
}