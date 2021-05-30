<template>
  <chat-drawer :room-id="roomId" :key="roomId" :type="'room'" />
</template>

<script>
import ChatDrawer from '@/components/chat/ChatDrawer.vue'

export default {
  components: {
    ChatDrawer,
  },
  computed: {
    roomId() {
      return this.$route.params.id
    },
  },
}
</script>
