//store/modules/auth.js

import api from '@/utils/api';

const state = {
  user: null,
}
const getters = {
  isAuthenticated: state => !!state.user,    
  stateUser: state => state.user,
  stateToken: state => state.token,
}

const actions = {
  async signup({dispatch}, form) {
    await api.post('signup', form)
    let UserForm = new FormData()
    UserForm.append('email', form.user.email)
    UserForm.append('password', form.user.password)
    await dispatch('logIn', UserForm)
  },
  async logIn({commit}, data) {
    await api.post('login', data)
      .then(async res => {
        await commit('setUser', res.data.data.attributes.email)
        await commit('setToken', res.headers.authorization)
      })
      .catch(err => console.log(err))
  },
  async logOut({commit}){
    let user = null
    commit('logout', user)
  }
}
const mutations = {
  setUser(state, email){
    state.user = email
  },
  setToken(state, token){
    state.token = token
  },
  logout(state){
    state.user = null
  },
}
export default {
  state,
  getters,
  actions,
  mutations
};
