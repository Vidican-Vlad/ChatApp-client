<template>
    <div class="chat">
      <div class="chat__message-drawer"></div>
      <textarea
        class="chat__message-input"
        placeholder="Type your message"
      ></textarea>
    </div>
</template>
<script>
import VerticalAlignInPage from '@/components/VerticalAlignInPage'
import Ws from '@adonisjs/websocket-client'

const ws = Ws('ws://localhost:3333')

export default {
  name: '',
  chat: null,
  components: {
    VerticalAlignInPage,
  },
  data() {
    return {
      isConnected: false,
      messages: [],
    }
  },
  mounted() {
    ws.connect()
    ws.on('open', () => {
      this.isConnected = true
    })

    ws.on('close', () => {
      this.isConnected = false
    })

    this.chat = ws.subscribe('chat')

    this.chat.on('ready', () => {
      this.chat.emit('message', 'hello')
    })

    this.chat.on('error', (error) => {
      console.log(error)
    })

    this.chat.on('close', () => {})
  },
}
</script>

<style lang="scss">
.chat {
  width: 100%;
  max-width: 500px;
  max-height: 100%;

  &__message-drawer {
    height: 200px;
    overflow-y: scroll;
  }
}
</style>
