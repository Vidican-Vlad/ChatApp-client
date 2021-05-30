<template>
  <div class="friend-header">
    <b-button size="sm" class="ml-1" variant="dark" to="/settings/friends"
      >Friends {{ friendsListCount }}
    </b-button>
    <b-button size="sm" class="ml-1" variant="dark" to="/settings/pending"
      >Pending {{ friendsRequestListCount }}
    </b-button>
    <b-button size="sm" class="ml-1" variant="dark" to="/settings/room-invite"
      >Room Invites {{ roomListInviteCount }}
    </b-button>
    <b-button size="sm" class="ml-1" variant="dark" v-b-modal.modal-center-2>
      <b-icon icon="person-plus" />
      Add Friend
    </b-button>
    <b-modal
      id="modal-center-2"
      centered
      title="Add friend"
      header-bg-variant="secondary"
      header-text-variant="dark"
      body-bg-variant="secondary"
      body-text-variant="dark"
      footer-bg-variant="secondary"
      footer-text-variant="dark"
    >
      <b-form @submit.prevent>
        <b-form-group id="input-group-1" label-for="input-">
          <b-form-input
            id="input-2"
            v-model="form.name"
            type="text"
            placeholder="Friend name"
            required
          ></b-form-input>
        </b-form-group>
      </b-form>
      <template #modal-footer>
        <b-button size="sm" @click="addFriend" variant="success"> Add</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      form: {
        name: '',
      },
      showSuccessMessage: false,
    }
  },
  methods: {
    onReset() {
      this.form = {
        name: '',
      }
      this.showSuccessMessage = false
    },
    async addFriend() {
      try {
        await this.$store.dispatch('friends/addFriend', this.form.name)
        this.onReset()
        this.$bvModal.hide('modal-center-2')
      } catch (e) {
        console.log(e)
      }
    },
  },
  computed: {
    ...mapGetters('friends', ['friendsListCount', 'friendsRequestListCount']),
    ...mapGetters('rooms', ['roomListInviteCount']),
  },
}
</script>

<style>
.friend-header {
  padding: 10px 15px;
  display: flex;
  width: 100%;
  vertical-align: baseline;
  background: #7f898d;
}
</style>
