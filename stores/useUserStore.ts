import User from '~/types/user'

interface State {
  user: User | null
  isAuth: boolean
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    user: {
      id: null,
      name: '',
      lastName: '',
    },
    isAuth: false,
  }),
  getters: {
    fullName: (state: State): null | string => {
      if (!state.isAuth || !state.user) { return null }
      return `${state.user.name} ${state.user.lastName}`
    },
  },
  actions: {
    loginUser (data: User): void {
      this.user = data
      this.isAuth = true
    },
    logOut (): void {
      this.isAuth = false
      this.user = null
    },
  },

  persist: true,
})
