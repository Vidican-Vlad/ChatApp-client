<template>
  <chat-drawer :room-id="dmId" :key="dmId" />
</template>

<script>
import ChatDrawer from '@/components/chat/ChatDrawer'
export default {
  name: 'DirectMessage',
  components: {
    ChatDrawer,
  },
  computed: {
    dmId() {
      return this.$route.params.id
    },
  },
}
</script>
