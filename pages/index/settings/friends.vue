<template>
  <friend-list :friends="friendsList" />
</template>

<script>
import FriendList from '@/components/friend/FriendList'
import { mapGetters } from 'vuex'

export default {
  name: 'Friends',
  components: {
    FriendList,
  },

  computed: {
    ...mapGetters('friends', ['friendsList']),
  },
}
</script>
