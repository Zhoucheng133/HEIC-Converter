<template>
  <div class="item_body">
    <i class="bi bi-clock icon" v-if="props.taskItem.status==ConvertStatus.wait" />
    <i class="bi bi-check-circle icon" v-else-if="props.taskItem.status==ConvertStatus.done" />
    <i class="bi bi-x-circle icon" v-else-if="props.taskItem.status==ConvertStatus.error" />
    <i class="bi bi-exclamation-circle icon" v-else-if="props.taskItem.status==ConvertStatus.exist" />
    <div class="file_info">
      <div class="name">{{ props.taskItem.name }}</div>
      <div class="path">{{ props.taskItem.path }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ConvertStatus } from '../store';
const props = defineProps(["taskItem"])

</script>

<style scoped>
.name{
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.icon{
  margin-right: 10px;
  margin-left: 5px;
}
.path{
  font-size: 13px;
  color: grey;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.file_info{
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
}
.item_body{
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
}
</style>