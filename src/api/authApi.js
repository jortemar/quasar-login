import axios from 'axios'

const authApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params: {
        key: 'AIzaSyBt3Qy5_ickEisRoHsfzPhjUbL5FCbx7Ww'
    }
})

export default authApi
