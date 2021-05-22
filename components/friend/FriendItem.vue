<template>
  <div class="friend-item">
    <div class="friend-item__icon">
      <b-icon icon="person-square" font-scale="1" />
    </div>
    <div class="friend-item__name">
      {{ friend.username }}
    </div>
    <b-button
      size="sm"
      class="mb-2"
      variant="secondary"
      @click.prevent="removeFriend"
    >
      <b-icon icon="person-x" />
    </b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: this.friend.username,
      },
    }
  },
  props: {
    friend: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async removeFriend() {
      try {
        await this.$store.dispatch('friends/deleteFriend', this.friend)
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style lang="scss">
.friend-item {
  display: flex;
  padding: 10px 15px;
  text-decoration: none;
  vertical-align: baseline;

  &__name {
    font-size: 20px;
    margin-left: 20px;
    border-bottom: 1px solid #e2e2e2;
    flex: 1;
  }

  &__icon {
    font-size: 20px;
    flex: 0 0 64px;
  }
}
</style>
