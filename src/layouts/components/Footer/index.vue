<script lang="ts" setup>
const VITE_APP_TEAM = import.meta.env.VITE_APP_TEAM
</script>

<template>
  <footer class="layout-footer">© 2023 By {{ VITE_APP_TEAM }}</footer>
</template>

<style lang="scss" scoped>
.layout-footer {
  width: 100%;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c0c4cc;
}
</style>
