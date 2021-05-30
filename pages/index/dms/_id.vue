<template>
  <chat-drawer :friendship-id="dmId" :key="dmId" :type="'dm'" />
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
