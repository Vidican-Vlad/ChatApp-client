<template>
  <b-card bg-variant="secondary" class="chat-drawer" no-body>
    <template #header>
      <chat-header v-if="shouldShowHeader" :roomId="roomId" />
    </template>
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
import ChatHeader from '@/components/chat/ChatHeader'
import ChatInput from '~/components/chat/ChatInput'
import ChatMessagesList from '~/components/chat/ChatMessagesList'

export default {
  props: {
    roomId: {
      type: String,
    },
    friendshipId: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  components: {
    ChatInput,
    ChatMessagesList,
    ChatHeader,
  },
  data() {
    return {
      messages: [],
    }
  },
  computed: {
    shouldShowHeader() {
      return this.type === 'room'
    },
  },
  async mounted() {
    if (this.type === 'room') {
      console.log(this.roomId)
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
    } else {
      console.log(this.friendshipId)
      const response = await this.$axios.get(
        `/dm-messages/${this.friendshipId}`
      )

      console.log(response)

      this.messages = response.data

      const chat = this.$ws.subscribe(`dm:${this.friendshipId}`)

      chat.on('ready', () => {})

      chat.on('message', (message) => {
        this.messages.push(message)
      })

      chat.on('error', (error) => {
        console.log(error)
      })

      chat.on('close', () => {})
    }
  },
  destroyed() {
    if (this.type === 'room') {
      this.$ws.getSubscription(`chat:${this.roomId}`).close()
    } else {
      this.$ws.getSubscription(`dm:${this.friendshipId}`).close()
    }
  },
  methods: {
    onSubmitMessage(newMessage) {
      if (this.type === 'room') {
        this.$ws.getSubscription(`chat:${this.roomId}`).emit('message', {
          message: newMessage,
          senderId: this.$auth.user.id,
        })
      } else {
        this.$ws.getSubscription(`dm:${this.friendshipId}`).emit('message', {
          message: newMessage,
          senderId: this.$auth.user.id,
        })
        console.log(newMessage)
      }
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
