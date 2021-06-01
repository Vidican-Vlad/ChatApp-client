<template>
  <vertical-align-in-page>
    <div class="login">
      <div class="login-text">Log In</div>
      <br />
      <div class="label_text">Username:</div>
      <b-form @submit.prevent="onSubmit" @reset="onReset">
        <b-form-group id="input-group-1" label-for="input-">
          <b-form-input
            id="input-1"
            v-model="form.username"
            type="text"
            placeholder="Username"
            required
          ></b-form-input>
        </b-form-group>

        <div class="label_text">Password:</div>
        <b-form-group id="input-group-2" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.password"
            placeholder="Password"
            type="password"
            required
          ></b-form-input>
        </b-form-group>
        <b-row>
          <b-col class="text-left"
            ><b-form-checkbox value="me">Remember me</b-form-checkbox>
            <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
              <b-form-checkbox-group
                v-model="form.checked"
                id="checkboxes-4"
                :aria-describedby="ariaDescribedby"
              >
              </b-form-checkbox-group> </b-form-group
          ></b-col>
          <a class="text_left" href="/auth/register">Register here</a><br />
        </b-row>
        <b-row>
          <b-col class="text-left" value="me"
            ><b-button type="submit" variant="primary">Submit</b-button></b-col
          >
        </b-row>
      </b-form>
    </div>
  </vertical-align-in-page>
</template>
<script>
import VerticalAlignInPage from '@/components/VerticalAlignInPage'

export default {
  auth: 'guest',
  components: {
    VerticalAlignInPage,
  },
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
    }
  },

  methods: {
    async onSubmit() {
      try {
        await this.$auth.loginWith('laravelJWT', {
          data: {
            username: this.form.username,
            password: this.form.password,
          },
        })
        await this.$router.replace('/settings/friends')
      } catch (e) {
        console.log(e)
      }
    },
    onReset() {},
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
.label_text {
  text-align: left;
  font-size: 17px;
}
.login-text {
  font-size: 30px;
  padding-top: 20px;
}
.login {
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
.text_left {
  padding-right: 1rem;
}
</style>
