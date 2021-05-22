<template>
  <div class="pending-item">
    <div class="pending-item__icon">
      <b-icon icon="person-square" font-scale="1" />
    </div>
    <div class="pending-item__name">
      {{ request.username }}
    </div>
    <b-button
      size="sm"
      class="mb-2"
      variant="Succes"
      @click.prevent="acceptRequest"
    >
      <b-icon icon="check2" />
    </b-button>
    <b-button
      size="sm"
      class="mb-2"
      variant="Danger"
      @click.prevent="rejectFriendRequest"
    >
      <b-icon icon="x-lg" />
    </b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: this.request.username,
      },
    }
  },
  props: {
    request: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async acceptRequest() {
      try {
        await this.$axios.post('/accept-request', {
          ...this.form,
        })
        this.$emit('friend-request-accepted', this.request)
      } catch (e) {
        console.log(e)
      }
    },
    rejectFriendRequest() {},
  },
}
</script>

<style lang="scss">
.pending-item {
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
