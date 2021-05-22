export const state = () => ({
  friendsList: [],
  friendRequestsList: [],
})

export const getters = {
  friendsList(state) {
    return state.friendsList
  },
  friendRequestList(state) {
    return state.friendRequestsList
  },
  friendsListCount(state) {
    return state.friendsList.length
  },
  friendsRequestListCount(state) {
    return state.friendRequestsList.length
  },
}

export const mutations = {
  SET_FRIENDS_LIST(state, payload) {
    state.friendsList = payload
  },
  SET_FRIEND_REQUEST_LIST(state, payload) {
    state.friendRequestsList = payload
  },
}

export const actions = {
  async getFriendsList({ commit }) {
    const response = await this.$axios.$get('/user-friends')

    commit('SET_FRIENDS_LIST', response)
  },

  async deleteFriend({ dispatch }, friend) {
    await this.$axios.post('/remove-friend', {
      id: friend.friend_id,
    })

    await dispatch('getFriendsList')
  },

  async addFriend({ dispatch }, friendNameToAdd) {
    await this.$axios.post('/add-friend', {
      name: friendNameToAdd,
    })

    // await dispatch('getFriendsList')
    // await dispatch('getFriendsRequestList')
    await Promise.all([
      dispatch('getFriendsList'),
      dispatch('getFriendsRequestList'),
    ])
  },

  async getFriendsRequestList({ commit }) {
    const response = await this.$axios.$get('/user-requests')

    commit('SET_FRIEND_REQUEST_LIST', response)
  },
}
