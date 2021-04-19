import * as url from "url";

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ChatApp-client',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
    ],
    link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://auth.nuxtjs.org/guide/setup/
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://localhost:3333',
    headers: {
      common: {
        'Accept': 'application/json'
      },
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  router: {
    middleware: ['auth']
  },

  auth: {
    strategies: {
      'laravelJWT': {
        provider: 'laravel/jwt',
        url: 'http://localhost:3333',
        endpoints: {
          login: {
            url: '/auth/login'
          },
          logout: {
            url: '/auth/logout',
          },
          refresh: {
            url: '/auth/refresh',
          },
          user: {
            url: '/auth/user',
          }
        },
        token: {
          property: 'token',
          maxAge: 60 * 60
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 20160 * 60
        },
      },
    },
    redirect: {
      login: '/auth/login',
      logout: '/',
      callback: '/auth/login',
      home: '/'
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
