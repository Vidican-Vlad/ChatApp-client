<template>
  <div class="room-invite-item">
    <div class="room-invite-item__icon">
      <b-icon icon="person-square" font-scale="1" />
    </div>
    <div class="room-invite-item__name">
      {{ request.name }}
    </div>
    <b-button
      size="sm"
      class="ml-1"
      variant="success"
      @click.prevent="acceptInvite"
    >
      <b-icon icon="check2" />
    </b-button>
    <b-button
      size="sm"
      class="ml-1"
      variant="danger"
      @click.prevent="rejectInvite"
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
        name: this.request.name,
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
    async acceptInvite() {
      console.log(this.request.id)
      try {
        await this.$axios.$post('/accept-room-invite', {
          id: this.request.id,
        })
        await Promise.all([
          this.$store.dispatch('rooms/getRoomList'),
          this.$store.dispatch('rooms/getRoomInviteList'),
        ])
      } catch (e) {
        console.log(e)
      }
    },
    async rejectInvite() {
      console.log(this.request.id)
      try {
        await this.$axios.$post('/reject-room-invite', {
          id: this.request.id,
        })
        await this.$store.dispatch('rooms/getRoomInviteList')
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style lang="scss">
.room-invite-item {
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
