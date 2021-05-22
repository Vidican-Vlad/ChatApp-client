<template>
  <div class="chat-messages-list">
    <template v-for="(message, index) in messages">
      <chat-message
        :key="index"
        :message="message"
        class="chat-messages-list_message"
      />
    </template>
  </div>
</template>
<script>
import ChatMessage from '~/components/chat/ChatMessage'

export default {
  components: {
    ChatMessage,
  },
  props: {
    messages: {
      type: Array,
      required: true,
    },
  },
}
</script>
<style lang="scss">
.chat-messages-list {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  padding: 0 15px;
  &__message {
    margin-bottom: 20px;
  }
}
</style>
