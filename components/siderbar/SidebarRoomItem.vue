<template>
  <nuxt-link class="sidebar-room-item" :to="roomPath">
    <div class="sidebar-room-item__icon">
      <b-icon icon="people-fill" font-scale="1" />
    </div>
    <div class="sidebar-room-item__name">
      {{ room.name }}
    </div>
  </nuxt-link>
</template>
<script>
export default {
  props: {
    room: {
      type: Object,
      required: true,
    },
  },
  computed: {
    roomPath() {
      return `/${this.room.id}`
    },
  },
}
</script>
<style lang="scss">
.sidebar-room-item {
  display: flex;
  padding: 10px 15px;
  text-decoration: none;
  vertical-align: baseline;
  transition: .3s ease;

  &__name {
    font-size: 20px;
    margin-left: 20px;
    border-bottom: 1px solid #e2e2e2;
    flex: 1;
  }

  &__icon {
    font-size: 20px;
    flex: 0 0 64px;
  }
  &__icon,
  &__name {
    color:black;
  }
  
}
</style>
