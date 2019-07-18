import axios from 'axios'
import * as auth from './AuthServices'

export function http() {
    return axios.create({
        baseURL: `${window.location.protocol}//${window.location.hostname}:5000/api`,
        headers: {
            Authorization: auth.getToken()
        }
    })
}