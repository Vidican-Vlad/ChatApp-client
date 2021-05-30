<template>
  <nuxt-link
    class="friend-item"
    style="text-decoration: none; color: inherit"
    :to="dmPath"
  >
    <div class="friend-item__icon">
      <b-icon icon="person-square" font-scale="1" />
    </div>
    <div class="friend-item__name">
      {{ friend.username }}
    </div>
    <b-button
      size="sm"
      class="mb-2"
      variant="danger"
      @click.prevent="removeFriend"
    >
      <b-icon icon="person-x" />
    </b-button>
  </nuxt-link>
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
  computed: {
    dmPath() {
      return `/dms/${this.friend.id}`
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
  color: black;

  &__name {
    font-size: 20px;
    margin-left: 20px;
    border-bottom: 1px solid black;
    flex: 1;
  }

  &__icon {
    font-size: 20px;
    flex: 0 0 20px;
  }
  &:hover {
    background-color: #7f898d;
    cursor: pointer;
  }
}
</style>
