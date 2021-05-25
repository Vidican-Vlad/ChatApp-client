<template>
  <room-invite-list :requests="roomListInvite" />
</template>

<script>
import { mapGetters } from 'vuex'
import RoomInviteList from '@/components/friend/RoomInviteList'

export default {
  name: 'RoomInvite',
  async fetch() {
    await this.fetchRooms()
  },
  methods: {
    async fetchRooms() {
      await this.$store.dispatch('rooms/getRoomInviteList')
    },
  },
  components: {
    RoomInviteList,
  },
  computed: {
    ...mapGetters('rooms', ['roomListInvite']),
  },
}
</script>
