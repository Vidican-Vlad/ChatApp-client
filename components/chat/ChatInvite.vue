<template>
  <div class="chat-invite">
    <div class="chat-invite__icon">
      <b-icon icon="person-square" font-scale="1" />
    </div>
    <div class="chat-invite__name">
      {{ friend.username }}
    </div>
    <b-button
      size="sm"
      class="ml-1"
      variant="success"
      @click.prevent="sendRoomInvite"
    >
      <b-icon icon="box-arrow-in-right" />
    </b-button>
  </div>
</template>

<script>
import VueBootstrapToastMixin from '@/mixins/vue-bootstrap-toast'

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
  mixins: [VueBootstrapToastMixin],
  methods: {
    async sendRoomInvite() {
      try {
        await this.$axios.post('/send-room-invite', {
          roomId: this.roomId,
          friendId: this.friend.friend_id,
        })
        this.makeSuccessToast('Successfully invited member to this room')
        await this.$store.dispatch(
          'friends/getPotentialMembersList',
          this.roomId
        )
      } catch (e) {
        this.makeDangerToast('Sending room invite to user failed')
        console.log(e)
      }
    },
  },
}
</script>

<style lang="scss">
.chat-invite {
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
