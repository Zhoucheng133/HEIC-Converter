<template>
  <div>
    {{ props.taskItem.path }}
  </div>
</template>

<script setup lang="ts">

const props = defineProps(["taskItem"])

</script>