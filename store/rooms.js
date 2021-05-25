export const state = () => ({
  roomList: [],
  roomListInvite: [],
})

export const getters = {
  roomList(state) {
    return state.roomList
  },
  roomListInvite(state) {
    return state.roomListInvite
  },
  roomListCount(state) {
    return state.roomList.length
  },
  roomListInviteCount(state) {
    return state.roomListInvite.length
  },
}

export const mutations = {
  SET_ROOM_LIST(state, payload) {
    state.roomList = payload
  },
  SET_ROOM_INVITE_LIST(state, payload) {
    state.roomListInvite = payload
  },
}

export const actions = {
  async getRoomList({ commit }) {
    const response = await this.$axios.$get('/user-rooms')

    commit('SET_ROOM_LIST', response)
  },

  async addMember({ dispatch }, friendId, roomId) {
    await this.$axios.post('/send-room-invite', {
      name: friendId,
      roomId: roomId,
    })

    // await dispatch('getFriendsList')
    // await dispatch('getFriendsRequestList')
    await Promise.all([
      dispatch('getRoomsList'),
      dispatch('getRoomsInviteList'),
    ])
  },

  async acceptRequest({ dispatch }, userIdAccepted) {
    await this.$axios.post('/accept-room-invite', {
      id: userIdAccepted,
    })

    await Promise.all([dispatch('getRoomList'), dispatch('getRoomInviteList')])
  },

  async rejectRequest({ dispatch }, userIdRejected) {
    await this.$axios.post('/reject-room-invite', {
      id: userIdRejected,
    })

    await Promise.all([dispatch('getRoomList'), dispatch('getRoomInviteList')])
  },

  async getRoomInviteList({ commit }) {
    const response = await this.$axios.$get('/get-room-invites')

    commit('SET_ROOM_INVITE_LIST', response)
  },
}
