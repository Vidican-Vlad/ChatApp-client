export default {
  methods: {
    makeToast(variant, message, title) {
      this.$bvToast.toast(message, {
        title,
        variant,
        solid: true,
        autoHideDelay: 1500,
      })
    },

    makeDangerToast(message, title = '') {
      this.makeToast('danger', message, title)
    },

    makeSuccessToast(message, title = '') {
      this.makeToast('success', message, title)
    },

    makeWarningToast(message, title = '') {
      this.makeToast('warning', message, title)
    },

    makeInfoToast(message, title = '') {
      this.makeToast('info', message, title)
    },
  },
}
