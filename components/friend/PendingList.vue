<template>
  <div class="pending-list">
    <ul v-if="!!requestsList.length" class="pending-list__container">
      <li v-for="request in requests" :key="request.id">
        <pending-item
          :request="request"
          @friend-request-accepted="updatePendingList"
        />
      </li>
    </ul>
    <span v-else>Add friends</span>
  </div>
</template>

<script>
import PendingItem from '@/components/friend/PendingItem'

export default {
  props: {
    requests: {
      type: Array,
      required: true,
    },
  },
  components: {
    PendingItem,
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
.pending-list {
  max-height: 100%;
  overflow-y: auto;

  &__container {
    list-style: none;
    padding: 0;
    margin: 0;
  }
}
</style>
