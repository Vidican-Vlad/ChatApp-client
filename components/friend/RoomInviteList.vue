<template>
  <div class="room-invite-list">
    <ul v-if="!!requestsList.length" class="room-invite-list__container">
      <li v-for="request in requests" :key="request.id">
        <room-invite-item
          :request="request"
          @room-request-accepted="updatePendingList"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import RoomInviteItem from '@/components/friend/RoomInviteItem'

export default {
  props: {
    requests: {
      type: Array,
      required: true,
    },
  },
  components: {
    RoomInviteItem,
  },
  computed: {
    requestsList() {
      return this.requests
    },
  },
  methods: {
    updatePendingList(requestToBeRemoved) {
      this.$emit(
        'update-list-of-requests',
        this.requests.filter(
          (friendRequest) => friendRequest.id !== requestToBeRemoved.id
        )
      )
    },
  },
}
</script>

<style lang="scss">
.room-invite-list {
  max-height: 100%;
  overflow-y: auto;
  background-color: #d3d5d4;

  &__container {
    list-style: none;
    background-color: #d3d5d4;
    padding: 0;
    margin: 0;
  }
}
</style>
