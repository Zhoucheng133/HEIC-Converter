<template>
  <div class="select_bg">
    <div class="label">拖拽文件/目录到这里</div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.select_bg{
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  -webkit-user-select: none;
  flex-direction: column;
}
</style>