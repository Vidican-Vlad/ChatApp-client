<template>
  <div class="chat-header">
    <b-button size="sm" class="ml-1" variant="dark" v-b-modal.modal-scrollable>
      <b-icon icon="person-lines-fill" />
      Show members {{ groupMembersCount }}
    </b-button>
    <b-modal
      id="modal-scrollable"
      centered
      title="Members"
      header-bg-variant="secondary"
      header-text-variant="dark"
      body-bg-variant="secondary"
      body-text-variant="dark"
      footer-bg-variant="secondary"
      footer-text-variant="dark"
    >
      <div class="member-list">
        <ul v-if="!!groupMembers.length" class="friend-list__container">
          <li v-for="groupMember in groupMembers" :key="groupMember.id">
            <chat-member :friend="groupMember" :roomId="roomId" />
          </li>
        </ul>
        <span v-else>Add friends</span>
      </div>
      <template #modal-footer="{ cancel }">
        <b-button size="sm" variant="danger" @click="cancel()">
          Cancel
        </b-button>
      </template>
    </b-modal>
    <b-button
      v-if="shouldShowAddMembersButton"
      size="sm"
      class="ml-1"
      variant="dark"
      v-b-modal.modal-scrollable-1
    >
      <b-icon icon="person-plus" />
      Add Members
    </b-button>
    <b-modal
      id="modal-scrollable-1"
      centered
      title="Send room invitation"
      header-bg-variant="secondary"
      header-text-variant="dark"
      body-bg-variant="secondary"
      body-text-variant="dark"
      footer-bg-variant="secondary"
      footer-text-variant="dark"
    >
      <div class="members-list">
        <ul v-if="!!potentialMembers.length" class="friend-list__container">
          <li
            v-for="potentialMember in potentialMembers"
            :key="potentialMember.id"
          >
            <chat-invite :friend="potentialMember" :roomId="roomId" />
          </li>
        </ul>
        <span v-else>Add friends</span>
      </div>
      <template #modal-footer="{ cancel }">
        <b-button size="sm" variant="danger" @click="cancel()">
          Cancel
        </b-button>
      </template>
    </b-modal>
    <b-button
      size="sm"
      class="ml-1"
      variant="danger"
      @click.prevent="leaveRoom"
    >
      Leave group
    </b-button>
  </div>
</template>

<script>
import ChatInvite from '@/components/chat/ChatInvite'
import { mapGetters } from 'vuex'
import VueBootstrapToastMixin from '@/mixins/vue-bootstrap-toast'
import ChatMember from '@/components/chat/ChatMember'

export default {
  data() {
    return {
      friends: [],
      form: {
        name: '',
      },
      showSuccessMessage: false,
    }
  },
  mixins: [VueBootstrapToastMixin],
  props: {
    roomId: {
      type: String,
      required: true,
    },
  },
  components: {
    ChatInvite,
    ChatMember,
  },
  computed: {
    ...mapGetters('friends', [
      'potentialMembers',
      'potentialMembersCount',
      'groupMembers',
      'groupMembersCount',
    ]),
    ...mapGetters('rooms', ['roomList']),
    activeRoom() {
      return this.roomList.find((room) => room.id === parseInt(this.roomId, 10))
    },
    shouldShowAddMembersButton() {
      if (this.activeRoom) {
        return this.activeRoom.owner_id === this.$auth.user.id
      }
      return false
    },
  },
  async mounted() {
    await this.fetchFriends()
    await this.fetchMembers()
  },

  methods: {
    onReset() {
      this.form = {
        name: '',
      }
      this.showSuccessMessage = false
    },

    async fetchFriends() {
      this.isLoadingFriends = true
      try {
        await this.$store.dispatch(
          'friends/getPotentialMembersList',
          this.roomId
        )
      } catch (error) {
        this.makeDangerToast('Fetching the list of potential members failed')
        console.log(error)
      }

      this.isLoadingFriends = false
    },
    async leaveRoom() {
      await this.$axios.post('/leave-room', {
        id: this.roomId,
      })
      await this.$store.dispatch('rooms/getRoomList')
      await this.$router.push({
        name: 'index-settings-friends',
      })
    },
    async fetchMembers() {
      this.isLoadingMembers = true
      try {
        await this.$store.dispatch('friends/getGroupMembers', this.roomId)
      } catch (error) {
        this.makeDangerToast('Fetching the list of group members failed')
        console.log(error)
      }

      this.isLoadingMembers = false
    },
  },
}
</script>

<style lang="scss">
.chat-header {
  padding: 10px 15px;
  display: flex;
  width: 100%;
  vertical-align: baseline;
  background: #6c757d;
  border-radius: 7px;
}

.member-list {
  max-height: 300px;
  overflow-y: auto;

  &__container {
    list-style: none;
    padding: 0;
    margin: 0;
  }
}
</style>
