<template>
  <div class="chat-member">
    <div class="chat-member__icon">
      <b-icon icon="person-square" font-scale="1" />
    </div>
    <div class="chat-member__name">
      {{ friend.username }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    roomId: {
      type: String,
      required: true,
    },
    friend: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.chat-member {
  display: flex;
  padding: 10px 15px;
  text-decoration: none;
  vertical-align: baseline;

  &__name {
    font-size: 20px;
    margin-left: 10px;
    border-bottom: 1px solid #e2e2e2;
    flex: 1;
  }

  &__icon {
    flex: 0 0 20px;
  }
}
</style>
