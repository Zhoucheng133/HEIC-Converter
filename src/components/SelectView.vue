<template>
  <div class="select_bg">
    <Button class="select_button" icon="pi pi-plus" rounded/>
    <div class="label">添加或拖拽文件/目录到这里</div>
  </div>
</template>

<script lang="ts" setup>
import { Button } from 'primevue';
</script>

<style scoped>
.label{
  font-size: 15px;
}
.select_button{
  margin-bottom: 15px;
}
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