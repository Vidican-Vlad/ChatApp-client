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
      class="ml-1"
      variant="success"
      @click.prevent="acceptFriend"
    >
      <b-icon icon="check2" />
    </b-button>
    <b-button
      size="sm"
      class="ml-1"
      variant="danger"
      @click.prevent="rejectFriend"
    >
      <b-icon icon="x-square" />
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
    async acceptFriend() {
      try {
        await this.$store.dispatch('friends/acceptRequest', this.form.name)
      } catch (e) {
        console.log(e)
      }
    },
    async rejectFriend() {
      try {
        await this.$store.dispatch('friends/rejectRequest', this.form.name)
      } catch (e) {
        console.log(e)
      }
    },
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
    margin-left: 10px;
    border-bottom: 1px solid #e2e2e2;
    flex: 1;
  }

  &__icon {
    flex: 0 0 20px;
  }
}
</style>
