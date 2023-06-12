<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TuiCustomPopupBtn from './TuiCustomPopupBtn.vue';
import handleBtnAction from '@/services/handleBtnAction';
import type Editor from 'node_modules/@toast-ui/editor/types';
import type { CustomBtn } from '@/components/tuiCustomBtns';

const props = defineProps<{
  customBtn: CustomBtn,
  tuiEditor: Editor
}>();

const emit = defineEmits([
  'update-doc-color'
]);

// DOM refs
const customBtnEl = ref();
const customPopupEl = ref();


const isPopup = ref(props.customBtn.popupBtns);
const popupReady = ref(false);

onMounted(() => {
  const btn = {
    name: props.customBtn.name,
    el: customBtnEl.value,
    tooltip: props.customBtn.tooltip
  };

  if (isPopup.value) {
    Object.assign(btn, { popup: {
      body: customPopupEl.value,
      className: `myTuiCustomPopup ${props.customBtn.name}`,
      style: { width: 'auto' }
    }});
  }

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

function handleEvent() {
  if (props.customBtn.action.match(/[a-z]+:/i)) {
    handleBtnAction(props.customBtn, props.tuiEditor);
  }
  else if (
      props.customBtn.action === 'popup' 
      && !popupReady.value
    ) {
    popupReady.value = true;
  }
  // else if (props.customBtn.action === 'erase') {
  //   props.tuiEditor.reset();
  // } 
  else {
    return;
  }
  return false;
}

function updateDocColor(e: string) {
  emit('update-doc-color', e);
}

// props.tuiEditor.addCommand('markdown', 'test', commandTest);
// function commandTest(e) {
//   console.log(e);
//   props.tuiEditor.insertText("coucou");
// }

</script>

<template>
  <div>
    <button
      ref="customBtnEl"
      class="myTuiCustomBtn"
      :class="customBtn.name"
      @click="handleEvent"
    >
      <font-awesome-icon :icon="customBtn.faIcon" />
      <!-- <font-awesome-icon :icon="customBtn.faIcon" rotation=90 /> -->
    </button>
    <div
      v-if="isPopup"
      ref="customPopupEl"
    >
      <TuiCustomPopupBtn 
        v-if="popupReady"
        v-for="(btn, i) in customBtn.popupBtns" :key="i"
        :customPopupBtn="btn"
        :tuiEditor="tuiEditor"
        @update-doc-color="updateDocColor($event)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.myTuiCustomBtn {
  background: none;
  display: block;
  margin: 0;
  color: #555;

  svg {
    position: relative;
    top: 1px;
    height: 18px;
    width: 18px;
  }

  &.lineBreak svg {
    transform: rotate(90deg);
  }

  &.tableStyle svg {
    color: #BBB;
  }
}
</style>
