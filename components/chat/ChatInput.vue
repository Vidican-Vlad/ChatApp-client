<template>
  <b-textarea
    v-model="message"
    class="chat-input__textarea"
    bg-variant="dark"
    @keyup.prevent="submit"
    @keydown="preventNewLine"
  ></b-textarea>
</template>
<script>
export default {
  data() {
    return {
      message: '',
    }
  },
  methods: {
    submit(event) {
      if (event.keyCode === 13 && this.message.length) {
        this.$emit('onSubmitMessage', this.message)
        this.message = ''
      }
    },
    preventNewLine(event) {
      if (this.isEnterKey(event)) {
        event.preventDefault()
      }
    },
    isEnterKey(event) {
      return event.keyCode === 13
    },
  },
}
</script>
<style>
.chat-input__textarea {
  background-color: #d3d5d4;
}
</style>
