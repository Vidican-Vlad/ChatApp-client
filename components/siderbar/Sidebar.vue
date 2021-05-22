<template>
  <div class="sidebar">
    <sidebar-header
      v-on:room-created="newRoomCreated"
      v-on:room-joined="newRoomJoined"
      v-on:room-left="roomLeft"
    />
    <sidebar-list :rooms="rooms" :isLoadingRooms="isLoadingRooms" />
  </div>
</template>
<script>
import SidebarHeader from '@/components/siderbar/SidebarHeader'
import SidebarList from '~/components/siderbar/SidebarList'

export default {
  data() {
    return {
      rooms: [],
      isLoadingRooms: true,
    }
  },
  components: {
    SidebarHeader,
    SidebarList,
  },
  async mounted() {
    await this.fetchRooms()
  },
  methods: {
    async fetchRooms() {
      try {
        const response = await this.$axios.$get('/user-rooms')
        this.rooms = [...response]
        this.isLoadingRooms = false
      } catch (e) {
        console.log(e)
      }
    },
    newRoomCreated(newRoom) {
      this.rooms = [...this.rooms, newRoom]
      this.$router.push({ name: 'index-id', params: { id: newRoom.id } })
    },
    newRoomJoined(room) {
      this.newRoomCreated(room)
    },
    roomLeft(room) {
      const index = this.rooms.indexOf(room)
      this.rooms.splice(index, 1)
    },
  },
}
</script>

<style lang="scss">
.sidebar {
  max-height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
