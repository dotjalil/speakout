import { http } from './HttpServices'
import jwt from 'jsonwebtoken'
import store from '../store';

export function login(user) {
    return http().post('/auth', user)
    .then(res => {
        console.log('res: ', res)
        if (res) {
            setToken(res.data.token)
        }
    })
}

function setToken(token) {
    localStorage.setItem('token', token)
    store.dispatch('authenticate')
}

export function isLoggedIn() {
    const token = localStorage.getItem('token')
    return token !== null
}

export function getUser() {
    const decodedToken = jwt.decode(localStorage.getItem('token'))
    console.log('token decoded: ', decodedToken)
    if (!decodedToken) {
        return null
    }
    
    return {
        username: decodedToken.user.username,
        userId: decodedToken.user.userId
    }
}

export function getToken() {
    return localStorage.getItem('token')
}