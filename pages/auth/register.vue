<template>
  <vertical-align-in-page>
    <div class="register">
      <div class="login-text">Register</div>
      <br />
      <b-form
        v-if="!showSuccessMessage"
        @submit.prevent="onSubmit"
        @reset="onReset"
      >
        <div class="label_text">Email:</div>
        <b-form-group id="input-group-1" label-for="input-">
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="text"
            placeholder="Email address"
            required
          ></b-form-input>
        </b-form-group>
        <div class="label_text">Username:</div>
        <b-form-group id="input-group-2" label-for="input-">
          <b-form-input
            id="input-2"
            v-model="form.username"
            type="text"
            placeholder="Username"
            required
          ></b-form-input>
        </b-form-group>
        <div class="label_text">Password:</div>
        <b-form-group id="input-group-3" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="form.password"
            placeholder="Password"
            type="password"
            required
          ></b-form-input>
        </b-form-group>
        <div class="label_text">Password Confirmation:</div>
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
        <b-form-group>
          <div class="label_text">Recovery Question:</div>
          <b-form-select id="input-5" v-model="form.question_id" required>
            <option selected>Select question</option>
            <option value="1">What was your first car?</option>
            <option value="2">What is the name of your first pet?</option>
            <option value="3">What is your mother's maiden name?</option>
            <option value="4">What elementary school did you attend?</option>
            <option value="5">
              What is the name of the town where you were born?
            </option>
          </b-form-select>
        </b-form-group>
        <div class="form-group">
          <div class="label_text">Recovery Answer:</div>
          <b-form-input
            id="input-6"
            v-model="form.answer"
            placeholder="Recovery Answer"
            type="text"
            required
          ></b-form-input>
        </div>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
      <b-alert v-else variant="success" show>{{ showSuccessMessage }}</b-alert>
    </div>
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
        question_id: '',
        answer: '',
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
        this.$router.push({
          name: 'auth-login',
        })
      } catch (e) {
        console.log(e)
      }
    },
    onReset() {
      console.log(this.form)
      this.form = {
        username: '',
        password: '',
        password_confirmation: '',
        email: '',
        question_id: '',
        answer: '',
      }
    },
  },
}
</script>
<style>
html,
body {
  margin: 0;
  padding: 0;
  background-color: #2a3d45;
  height: 100vh;
}
.register {
  display: block;
  background-color: #d3d5d4;
  margin: 2rem 0 4rem 0;
  padding: 1rem;
  padding-top: 0;
  position: relative;
  min-width: 10%;
  width: 40%;
  text-align: center;
  margin: 0;
  margin-bottom: 1rem;
  color: #7f898d;
  border: 1px solid #9c9c9c;
  border-radius: 7px;
}
.label_text {
  text-align: left;
  font-size: 17px;
}
.login-text {
  font-size: 30px;
  padding-top: 20px;
}
</style>
