<template>
  <div class="friend">
    <friend-header
      v-on:friend-added="addFriendUpdate"
      v-on:switch-to="switchList"
    />
    <friend-list
      v-if="ShowFriends"
      :friends="friends"
      :isLoadingFriends="isLoadingFriends"
    />
    <pending-list
      v-else
      :requests="requests"
      :isLoadingFriends="isLoadingFriends"
    ></pending-list>
  </div>
</template>

<script>
import FriendHeader from '@/components/friend/FriendHeader'
import FriendList from '~/components/friend/FriendList'
import PendingList from '@/components/friend/PendingList'

export default {
  data() {
    return {
      requests: [],
      ShowFriends: true,
      friends: [],
      isLoadingFriends: true,
    }
  },
  async mounted() {
    await this.fetchFriends()
    await this.fetchRequests()
  },
  components: {
    PendingList,
    FriendHeader,
    FriendList,
  },
  methods: {
    async fetchFriends() {
      try {
        const response = await this.$axios.$get('/user-friends')
        this.friends = [...response]
        this.isLoadingFriends = false
      } catch (e) {
        console.log(this.friends)
      }
    },
    async fetchRequests() {
      try {
        const response = await this.$axios.$get('/user-requests')
        this.requests = [...response]
        this.isLoadingFriends = false
      } catch (e) {
        console.log(this.requests)
      }
    },

    switchList() {
      this.ShowFriends = !this.ShowFriends
    },

    addFriendUpdate(newFriend) {
      this.friends = [...this.friends, newFriend]
    },
  },
}
</script>

<style>
.friend {
  max-height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
