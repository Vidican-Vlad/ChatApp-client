<template>
  <div class="main-page">
    <div class="main-page__sidebar">
      <slot name="sidebar" />
    </div>
    <div class="main-page__chat-area">
      <slot name="chat-area" />
    </div>
  </div>
</template>

<style lang="scss">
body {
  background-color: #2a3d45;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
.main-page {
  height: 618px;
  width: 80%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: '. .';
  margin: 60px auto;
  background: #fff;
  padding: 0;
  border-radius: 7px;
  overflow: hidden;

  &__sidebar {
    border-right: 1px solid #2a2827;
    max-height: inherit;
    background-color: #d3d5d4;
    overflow: hidden;
  }
  &__chat-area {
    max-height: 100%;
    background-color: #d3d5d4;
    overflow: hidden;
  }
}
</style>
