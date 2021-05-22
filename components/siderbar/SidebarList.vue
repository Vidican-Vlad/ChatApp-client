<template>
  <div class="sidebar-list">
    <ul v-if="!isLoadingRooms" class="sidebar-list__container">
      <li v-for="room in rooms" :key="room.id">
        <sidebar-room-item :room="room" />
      </li>
    </ul>
    <span v-else>Loading rooms</span>
  </div>
</template>
<script>
import SidebarRoomItem from '@/components/siderbar/SidebarRoomItem'

export default {
  props: {
    rooms: {
      type: Array,
      required: true,
    },

    isLoadingRooms:{
      type: Boolean,
      required: true,
    }
  },
  components: {
    SidebarRoomItem,
  },
}
</script>
<style lang="scss">
.sidebar-list {
  max-height: 100%;
  overflow-y: auto;
  
  &__container {
    list-style: none;
    padding: 0;
    margin: 0;
    &:hover{
    color: blue;
    cursor: pointer;
  }
  }
  
}
</style>
