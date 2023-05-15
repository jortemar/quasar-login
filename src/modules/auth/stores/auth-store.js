import { defineStore } from "pinia";
import authApi from "src/api/authApi"
import { LocalStorage } from "quasar";

// import { ref } from "vue";
// import router from "../router";
// import myFetch from ""

export const useAuthStore = defineStore('auth', {
  state: () => ({
    status: 'authenticating',
    user: null,
    idToken: null,
    refreshToken: null
  }),

  getters: {
    currentState: (state) => state.status,
    username: (state) => state.user?.name || ''  // si existe coge el name. Si no, un string vacío
  },

  actions: {
    async createUser(user) {
      const { name, email, password } = user
      try {
        // El data no devuelve el nombre, así que actualizamos para añadírselo al objeto como displayName
        const { data } = await authApi.post(':signUp', { email, password, returnSecureToken: true })
        const { idToken, refreshToken } = data
        await authApi.post(':update', { displayName: name, idToken, refreshToken })
        delete user.password
        return { ok: true }
      }
      catch (error) {
        return { ok: false, message: error.response.data.error.message }
      }
    },

    async signInUser(user) {
      const { email, password } = user

      try {
        const { data } = await authApi.post(':signInWithPassword', { email, password, returnSecureToken: true })
        const { displayName, idToken, refreshToken } = data
        user.name = displayName

        this.loginUser(user, idToken, refreshToken)

        return { ok: true }

      } catch (error) {
        return { ok: false, message: error.response.data.error.message }
      }
    },

    async checkAuthentication() {
      const idToken = LocalStorage.getItem('idToken')
      const refreshToken = LocalStorage.getItem('refreshToken')

      if (!idToken) {
        this.logout()
        return { ok: false, message: 'No hay token' }
      }

      try {
        const { data } = await authApi.post(':lookup', { idToken })
        const { displayName, email } = data.users[0]
        const user = {
          name: displayName,
          email
        }

        this.loginUser(user, idToken, refreshToken)
        return { ok: true }
      }
      catch (error) {
        this.logout()
        return { ok: false, message: error.response.data.error.message }
      }
    },

    async logout() {
      this.user = null
      this.idToken = null
      this.refreshToken = null
      this.status = 'not-authenticated'

      LocalStorage.remove('idToken')
      LocalStorage.remove('refreshToken')
    },

    loginUser(user, idToken, refreshToken) {
      if (idToken) {
        LocalStorage.set('idToken', idToken)
        this.idToken = idToken
      }

      if (refreshToken) {
        LocalStorage.set('refreshToken', refreshToken)
        this.refreshToken = refreshToken
      }

      this.user = user
      this.status = 'authenticated'
    },

    logout() {
      this.user = null
      this.idToken = null
      this.refreshToken = null
      this.status = 'not-authenticated'

      LocalStorage.remove('idToken')
      LocalStorage.remove('refreshToken')
    }
  }
})
