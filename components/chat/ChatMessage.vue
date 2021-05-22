<template>
  <b-row class="chat-message">
    <b-col
      sm="12"
      class="chat-message__text"
      v-bind:class="{
        'chat-message__text--owner': message.sender.id === $auth.user.id,
      }"
    >
      <div class="chat-message__container">
        <div class="chat-message__time-username">
          <div class="chat-message__username">
            {{ message.sender.username }}
          </div>
          <div class="chat-message__time-text" v-if="timeStamp">
            {{ $moment(message.created_at).fromNow() }}
          </div>
          <div class="chat-message__time-text" v-else>
            {{ $moment(message.created_at).calendar() }}
          </div>
        </div>
        <div class="chat-message__message">{{ message.content }}</div>
      </div>
    </b-col>
  </b-row>
</template>
<script>
export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  computed: {
    timeStamp() {
      return this.$moment(this.$moment(this.message.created_at)).isAfter(
        this.$moment().subtract(1, 'days')
      )
    },
  },
}
</script>

<style lang="scss">
.chat-message {
  $main: &;
  margin: 10px 0px;

  &__container {
    padding: 10px 14px;
    background: #eee;
    border-radius: 9px;
    display: inline-block;
    text-align: left;
  }

  &__text {
    text-align: left;

    &--owner {
      text-align: right;
      #{$main}__container {
        background: rgb(171, 236, 245);
      }
    }
  }
  &__message {
    white-space: normal;
    word-break: break-word;
  }
  &__time-username {
    display: flex;
    align-items: baseline;
  }
  &__time-text {
    margin-left: 5px;
    font-size: 10px;
  }
  &__username {
    font-weight: bold;
  }
}
</style>
