<template>
  <pending-list :requests="friendRequestList" />
</template>

<script>
import PendingList from '@/components/friend/PendingList'

import { mapGetters } from 'vuex'

export default {
  name: 'Friends',
  components: {
    PendingList,
  },
  computed: {
    ...mapGetters('friends', ['friendRequestList']),
  },
}
</script>
