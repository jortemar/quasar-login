import { useAuthStore } from '../stores/auth-store'
import { computed } from 'vue'

const useAuth = () => {
  const store = useAuthStore()

  const createUser = async (user) => {
    const resp = await store.createUser(user)
    return resp
  }

  const loginUser = async (user) => {
    const resp = await store.signInUser(user)
    return resp
  }

  // esta función habrá que usarla cuando, en alguna acción
  // determinada, deseemos comprobar la autenticación del usuario
  const checkAuthStatus = async () => {
    const resp = await store.checkAuthentication()
    return resp
  }

  const logout = () => {
    store.logout()
    // store.commit('journal/clearEntries')   // se puede hacer el logout con un window.location. Al hacerse el refresh del navegador web se purga el estado
  }

  return {
    createUser,
    loginUser,
    checkAuthStatus,
    logout,

    authStatus: computed(() => store.currentState),
    username: computed(() => store.username)
  }
}

export default useAuth
