<template>
  <div class="friend-list">
    <ul v-if="!!friends.length" class="friend-list__container">
      <li v-for="friend in friends" :key="friend.id">
        <friend-item
          :friend="friend"
          v-on:friend-removed="removeFriendUpdate"
        />
      </li>
    </ul>
    <span v-else>Add friends</span>
  </div>
</template>

<script>
import FriendItem from '@/components/friend/FriendItem'

export default {
  props: {
    friends: {
      type: Array,
      required: true,
    },
  },
  methods: {
    removeFriendUpdate(newFriend) {
      // todo show a flash message
    },
  },
  components: {
    FriendItem,
  },
}
</script>

<style lang="scss">
.friend-list {
  max-height: 100%;
  overflow-y: auto;

  &__container {
    list-style: none;
    padding: 0;
    margin: 0;
  }
}
</style>
