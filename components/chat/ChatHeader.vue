<template>
  <div class="chat-header">
    <b-button
      v-if="shouldShowAddMembersButton"
      size="sm"
      class="mb-2"
      variant="secondary"
      v-b-modal.modal-scrollable
    >
      <b-icon icon="person-plus" />
      Add Member
    </b-button>
    <b-modal id="modal-scrollable" centered title="Send room invitation">
      <div class="friend-list">
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
  </div>
</template>

<script>
import ChatInvite from '@/components/chat/ChatInvite'
import { mapGetters } from 'vuex'
import VueBootstrapToastMixin from '@/mixins/vue-bootstrap-toast'

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
  },
  computed: {
    ...mapGetters('friends', ['potentialMembers', 'potentialMembersCount']),
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
  },
}
</script>

<style lang="scss">
.chat-header {
  padding: 10px 15px;
  display: flex;
  width: 100%;
  vertical-align: baseline;
  background: #eee;
  border-radius: 7px;
}

.friend-list {
  max-height: 100%;
  overflow-y: auto;

  &__container {
    list-style: none;
    padding: 0;
    margin: 0;
  }
}
</style>
