<template>
  <div class="vertical-align">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'VerticalAlign',
}
</script>

<style>
.vertical-align {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
