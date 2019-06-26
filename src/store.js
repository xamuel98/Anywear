import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)



const state = {
    currentUser: null,
    currentChannel: null,
    isPrivate: false
}



const mutations = {
    SET_USER(state, user) {
        state.currentUser = user
    },
    SET_CURRENT_DISCUSS(state, discuss) {
        state.currentChannel = discuss
    },
    SET_PRIVATE(state, isPrivate) {
        state.isPrivate = isPrivate
    }
}


const actions = {
    setUser({commit}, user) {
        commit("SET_USER", user)
    },
    setCurrentDiscuss({commit}, discuss) {
        commit("SET_CURRENT_DISCUSS", discuss)
    },
    setPrivate({commit}, isPrivate) {
        commit("SET_PRIVATE", isPrivate)
    }
}  


const getters = {
    currentUser: state => state.currentUser,
    currentChannel: state => state.currentChannel,
    isPrivate: state => state.isPrivate
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})