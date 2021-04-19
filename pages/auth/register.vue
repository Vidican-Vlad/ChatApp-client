<template>
  <vertical-align-in-page>
    <b-form
      v-if="!showSuccessMessage"
      @submit.prevent="onSubmit"
      @reset="onReset"
    >
      <b-form-group id="input-group-1" label-for="input-">
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="text"
          placeholder="Email address"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label-for="input-">
        <b-form-input
          id="input-2"
          v-model="form.username"
          type="text"
          placeholder="Username"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.password"
          placeholder="Password"
          type="password"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label-for="input-3">
        <b-form-input
          id="input-4"
          v-model="form.password_confirmation"
          placeholder="Confirm password"
          type="password"
          required
        ></b-form-input>
        <div v-if="shouldShowPasswordMatch">
          <b-alert v-if="passwordMatch" variant="success" show>
            your password matched
          </b-alert>
          <b-alert v-else variant="danger" show>
            your passwords didn't match
          </b-alert>
        </div>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-alert v-else variant="success" show>{{ showSuccessMessage }}</b-alert>
  </vertical-align-in-page>
</template>

<script>
import VerticalAlignInPage from '@/components/VerticalAlignInPage'

export default {
  components: { VerticalAlignInPage },
  auth: 'guest',
  data() {
    return {
      form: {
        username: '',
        password: '',
        password_confirmation: '',
        email: '',
      },
      showSuccessMessage: false,
    }
  },
  computed: {
    passwordMatch() {
      return this.form.password === this.form.password_confirmation
    },
    shouldShowPasswordMatch() {
      return this.form.password.length || this.form.password_confirmation.length
    },
  },
  methods: {
    async onSubmit() {
      try {
        const {
          data: { message },
        } = await this.$axios.post('/auth/register', {
          ...this.form,
        })
        this.showSuccessMessage = message
        this.onReset()
      } catch (e) {
        console.log(e)
      }
    },
    onReset() {
      this.form = {
        username: '',
        password: '',
        password_confirmation: '',
        email: '',
      }
    },
  },
}
</script>
