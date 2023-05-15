import axios from 'axios'
import { LocalStorage } from "quasar";

const journalApi = axios.create({
  baseURL: 'https://vue-demos-45589-default-rtdb.europe-west1.firebasedatabase.app'
})


// los interceptores son una característica de axios
// cada vez que se realiza una petición, se detecta y se intercepta para colocarle el token como parámetro
journalApi.interceptors.request.use((config) => {


  config.params = {
    auth: LocalStorage.getItem('idToken')
  }

  //TODO: ESTO ME VA A HACER FALTA!!

  // config.headers = {
  //     authorization: 'bearer idToken'
  // }

  return config
})

export default journalApi
