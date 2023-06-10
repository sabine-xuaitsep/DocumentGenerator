<script setup lang="ts">
import type Editor from 'node_modules/@toast-ui/editor/types';
import type { CustomPopupBtn } from './tuiCustomBtns';

const props = defineProps<{
  customPopupBtn: CustomPopupBtn,
  tuiEditor: Editor
}>();

function handleEvent() {
  props.tuiEditor.eventEmitter.emit('closePopup');
}
</script>

<template>
 <button
    ref="CustomPopupBtnEl"
    class="myTuiCustomPopupBtn"
    style="display: block;"
    @click="handleEvent"
  >
    {{ customPopupBtn.name }}
  </button>
</template>

<style scoped lang="scss">
.myTuiCustomPopupBtn {
  background: none;
  border: none;
  height: 28px;
  padding: 0px 14px 0px 15px;
  width: 100%;
  color: #404040;
  font-size: 12px;
  font-weight: bold;
  text-align: left;

  &:hover {
    background-color: #404040;
    color: #fff;
  }
}
</style>
