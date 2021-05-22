<template>
  <b-textarea
    v-model="message"
    class="chat-input__textarea"
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
    preventNewLine(event){
      if(this.isEnterKey(event))
      {
        event.preventDefault();
      }
    },
    isEnterKey(event){
      return event.keyCode === 13;
    }
  },
}
</script>
