<template>
  <div class="sidebar-header">
    <div class="sidebar-header__icon-user">
      <span class="sidebar-header__user">{{ username }} </span>
      <br />
      <b-button
        size="sm"
        class="mb-2 sidebar-header_icon-menu"
        variant="dark"
        v-b-modal.modal-center
      >
        <b-icon icon="plus-square" />
      </b-button>
      <b-modal
        id="modal-center"
        centered
        title="Create or join room"
        header-bg-variant="secondary"
        header-text-variant="dark"
        body-bg-variant="secondary"
        body-text-variant="dark"
        footer-bg-variant="secondary"
        footer-text-variant="dark"
      >
        <b-form v-if="!showSuccessMessage">
          <b-form-group id="input-group-1" label-for="input-">
            <b-form-input
              id="input-1"
              v-model="form.name"
              type="text"
              placeholder="Room name"
              required
            ></b-form-input>
          </b-form-group>
        </b-form>
        <template #modal-footer>
          <b-button size="sm" variant="success" @click.prevent="onSubmit">
            Create
          </b-button>
          <b-button size="sm" variant="danger" @click.prevent="leaveRoom">
            Leave
          </b-button>
        </template>
      </b-modal>
      <b-button
        size="sm"
        class="mb-2 sidebar-header_icon-menu"
        variant="dark"
        to="/settings/friends"
      >
        <b-icon icon="person-lines-fill" />
      </b-button>
      <b-button
        size="sm"
        class="mb-2 sidebar-header_icon-menu"
        variant="danger"
        @click.prevent="logout"
      >
        <b-icon icon="box-arrow-right" />
      </b-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: '',
      },
      showSuccessMessage: false,
    }
  },
  computed: {
    username() {
      return this.$auth.user.username
    },
  },
  methods: {
    async onSubmit() {
      try {
        const {
          data: { message, newRoom },
        } = await this.$axios.post('/create-room', {
          ...this.form,
        })
        this.showSuccessMessage = message
        this.onReset()
        this.$bvModal.hide('modal-center')
        this.$emit('room-created', newRoom)
      } catch (e) {
        console.log(e)
      }
    },
    onReset() {
      console.log(this.form)
      this.form = {
        name: '',
      }
      this.showSuccessMessage = false
    },
    async leaveRoom() {
      try {
        const {
          data: { room },
        } = await this.$axios.post('/leave-room', {
          ...this.form,
        })
        this.onReset()
        this.$bvModal.hide('modal-center')
        this.$emit('room-left', room)
      } catch (e) {
        console.log(e)
      }
    },
    async logout() {
      await this.$auth.logout()
      this.$router.push({
        name: 'auth-login',
      })
    },
  },
}
</script>

<style lang="scss">
.sidebar-header {
  padding: 10px 15px;
  display: flex;
  vertical-align: baseline;
  background: #7f898d;
  transition: 0.3s ease;

  &__icon-user {
    width: 100%;
    padding: 10px 20px 20px 20px;
  }

  &__icon {
    color: gray;
    margin-right: 10px;
  }

  &__user {
    font-size: 20px;
    color: #d3d5d4;
  }

  &__icon,
  &__user {
    vertical-align: middle !important;
  }
  &__icon-menu {
    margin-top: 10px;
    font-size: 25px;
    margin-left: 14px;
  }
}
</style>
