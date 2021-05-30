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
  background-color: #d3d5d4;

  &__container {
    background-color: #d3d5d4;
    list-style: none;
    padding: 0;
    margin: 0;
  }
}
</style>
