<template>
  <div class="item_body" @click="visible=true;">
    <i class="bi bi-clock icon" v-if="props.taskItem.status==ConvertStatus.wait" />
    <i class="bi bi-check-circle icon" v-else-if="props.taskItem.status==ConvertStatus.done" />
    <i class="bi bi-x-circle icon" v-else-if="props.taskItem.status==ConvertStatus.error" />
    <i class="bi bi-exclamation-circle icon" v-else-if="props.taskItem.status==ConvertStatus.exist" />
    <div class="file_info">
      <div class="name">{{ props.taskItem.name }}</div>
      <div class="path">{{ props.taskItem.path }}</div>
    </div>
  </div>

  <Dialog v-model:visible="visible" modal :header="$t('taskInfo')" :closable="false" :style="{width: '20rem'}" :draggable="false" style="user-select: none;">
    <div class="info_content">
      <div>{{ $t("fileName") }}</div>
      <div>{{ props.taskItem.name }}</div>
      <div>{{ $t("filePath") }}</div>
      <div>{{ props.taskItem.path }}</div>
      <div>{{ $t("status") }}</div>
      <div>
        <Tag severity="secondary" :value="$t('waiting')" v-if="props.taskItem.status==ConvertStatus.wait"></Tag>
        <Tag severity="success" :value="$t('finished')" v-else-if="props.taskItem.status==ConvertStatus.done"></Tag>
        <Tag severity="warn" :value="$t('exist')" v-else-if="props.taskItem.status==ConvertStatus.exist"></Tag>
        <Tag severity="danger" :value="$t('err')" v-else></Tag>
      </div>
      <div>{{ $t("outputInfo") }}</div>
      <div>{{ props.taskItem.message }}</div>
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" :label="$t('ok')" severity="secondary" @click="visible = false" size="small"></Button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ConvertStatus } from '../store';
import { Dialog, Button, Tag } from 'primevue';
const props = defineProps(["taskItem"])

let visible=ref(false);

</script>

<style scoped>
.info_content{
  width: 100%;
  display: grid;
  grid-template-columns: 100px auto;
  row-gap: 5px;
  overflow-wrap: anywhere;
  font-size: 14px;
  align-items: center;
}
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
  cursor: pointer;
}
</style>