<template>
  <div class="friend-header">
    <b-button size="sm" class="mb-2" variant="secondary" to="/settings/friends"
      >Friends {{ friendsListCount }}
    </b-button>
    <b-button size="sm" class="mb-2" variant="secondary" to="/settings/pending"
      >Pending {{ friendsRequestListCount }}
    </b-button>
    <b-button
      size="sm"
      class="mb-2"
      variant="secondary"
      to="/settings/room-invite"
      >Room Invites
    </b-button>
    <b-button
      size="sm"
      class="mb-2"
      variant="secondary"
      v-b-modal.modal-center-2
    >
      <b-icon icon="person-plus" />
      Add Friend
    </b-button>
    <b-modal id="modal-center-2" centered title="Add friend">
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
  },
}
</script>

<style>
.friend-header {
  padding: 10px 15px;
  display: flex;
  width: 100%;
  vertical-align: baseline;
  background: #eee;
  border-radius: 7px;
}
</style>
