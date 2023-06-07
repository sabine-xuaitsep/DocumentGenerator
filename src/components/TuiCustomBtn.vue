<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type Editor from 'node_modules/@toast-ui/editor/types';
import type { CustomBtns } from './tuiCustomBtns';

const props = defineProps<{
  customBtn: CustomBtns,
  tuiEditor: Editor
}>()

// DOM refs
const customBtnEl = ref();


onMounted(() => {
  const btn = {
    name: props.customBtn.name,
    el: customBtnEl.value,
    tooltip: props.customBtn.tooltip
  };

  if (props.customBtn.index) {
    props.tuiEditor.insertToolbarItem(
      props.customBtn.index, btn
    );
  } else {
    props.tuiEditor.insertToolbarItem(
      { groupIndex: -1,  itemIndex: -1 }, btn
    );
  }
});
</script>

<template>
  <span
    ref="customBtnEl"
    class="myTuiCustomBtn"
    :class="customBtn.name"
  >
    <font-awesome-icon :icon="customBtn.faIcon" />
  </span>
</template>

<style scoped lang="scss">
.myTuiCustomBtn {
  display: block;
  height: 32px;
  width: 32px;
  cursor: pointer;
  border: 1px solid #f7f9fc;
  border-radius: 3px;
  color: #555;
  text-align: center;

  &:hover {
    background-color: #fefefe;
    border-color: #dadde6;
  }

  &.fontSize {
    line-height: 28px;
  }

  &.lineBreak svg {
    transform: rotate(90deg);
  }
}
</style>
