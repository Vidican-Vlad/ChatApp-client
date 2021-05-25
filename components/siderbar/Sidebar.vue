<template>
  <div class="sidebar">
    <sidebar-header
      v-on:room-created="newRoomCreated"
      v-on:room-left="roomLeft"
    />
    <sidebar-list :rooms="roomList" :isLoadingRooms="isLoadingRooms" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SidebarHeader from '@/components/siderbar/SidebarHeader'
import SidebarList from '~/components/siderbar/SidebarList'

export default {
  data() {
    return {
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
      this.isLoadingRooms = true
      await this.$store.dispatch('rooms/getRoomList')
      await this.$store.dispatch('dms/getDmsList')
      this.isLoadingRooms = false
    },
    newRoomCreated(newRoom) {
      this.$store.dispatch('rooms/getRoomList')
      this.$router.push({ name: 'index-id', params: { id: newRoom.id } })
    },
    roomLeft() {
      this.$store.dispatch('rooms/getRoomList')
    },
  },
  computed: {
    ...mapGetters('rooms', ['roomList']),
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
