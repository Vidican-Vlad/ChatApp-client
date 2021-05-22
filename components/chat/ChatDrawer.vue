<template>
  <b-card class="chat-drawer" no-body>
    <template #header></template>
    <template #default>
      <chat-messages-list
        :messages="messages"
        class="chat-drawer__messages-list"
      />
    </template>
    <template #footer>
      <chat-input @onSubmitMessage="onSubmitMessage" />
    </template>
  </b-card>
</template>

<script>
import ChatInput from '~/components/chat/ChatInput'
import ChatMessagesList from '~/components/chat/ChatMessagesList'

export default {
  props: {
    roomId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'dm',
    },
  },
  components: {
    ChatInput,
    ChatMessagesList,
  },
  data() {
    return {
      messages: [],
    }
  },
  async mounted() {
    const response = await this.$axios.get(`/room-messages/${this.roomId}`)

    console.log(response)

    this.messages = response.data

    const chat = this.$ws.subscribe(`chat:${this.roomId}`)

    chat.on('ready', () => {})

    chat.on('message', (message) => {
      this.messages.push(message)
    })

    chat.on('error', (error) => {
      console.log(error)
    })

    chat.on('close', () => {})
  },
  destroyed() {
    this.$ws.getSubscription(`chat:${this.roomId}`).close()
  },
  methods: {
    onSubmitMessage(newMessage) {
      this.$ws.getSubscription(`chat:${this.roomId}`).emit('message', {
        message: newMessage,
        senderId: this.$auth.user.id,
      })
    },
  },
}
</script>
<style lang="scss">
.chat-drawer {
  height: 100%;
  width: 100%;
}
</style>
