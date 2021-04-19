<template>
  <vertical-align-in-page>
    <div class="login">
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

        <b-form-group id="input-group-2" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.password"
            placeholder="Password"
            type="password"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
          <b-form-checkbox-group
            v-model="form.checked"
            id="checkboxes-4"
            :aria-describedby="ariaDescribedby"
          >
            <b-form-checkbox value="me">Check me out</b-form-checkbox>
            <b-form-checkbox value="that">Check that out</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
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
        await this.$router.replace('/')
      } catch (e) {
        console.log(e)
      }
    },
    onReset() {},
  },
}
</script>
<style>
.login {
}
</style>
