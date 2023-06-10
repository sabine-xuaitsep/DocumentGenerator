<script setup lang="ts">
import type Editor from 'node_modules/@toast-ui/editor/types';
import type { CustomPopupBtn } from './tuiCustomPopups';

const props = defineProps<{
  customPopupBtn: CustomPopupBtn,
  tuiEditor: Editor
}>();
</script>

<template>
 <button
    ref="CustomPopupBtnEl"
    style="display: block;"
  >
    {{ customPopupBtn.name }}
  </button>
</template>

<style scoped lang="scss">

</style>
