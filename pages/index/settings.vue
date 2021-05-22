<template>
  <div class="friend">
    <friend-header />

    <nuxt-child />
  </div>
</template>

<script>
import FriendHeader from '@/components/friend/FriendHeader'

export default {
  name: 'Settings',
  components: {
    FriendHeader,
  },
  beforeRouteEnter(to, from, next) {
    if (to.fullPath === '/settings') {
      next('settings/friends')
    } else {
      next()
    }
  },
  async fetch({ store }) {
    await Promise.all([
      store.dispatch('friends/getFriendsList'),
      store.dispatch('friends/getFriendsRequestList'),
    ])
  },
}
</script>

<style scoped></style>
