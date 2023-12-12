import axios from "axios"


export const API_URL = `https://cloud-api.yandex.net/v1`

const $api = axios.create({
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `OAuth ${localStorage.getItem('oAuthToken')}`
    return config
})

export default $api