<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import TuiCustomPopupBtn from '@/components/TuiCustomPopupBtn.vue';
import type Editor from 'node_modules/@toast-ui/editor/types';
import type { CustomPopupBtn } from './tuiCustomPopups';

const props = defineProps<{
  customPopup: CustomPopupBtn[],
  popupName: String,
  tuiEditor: Editor
}>();

// DOM el & refs
const bindedBtn = document.querySelector(`.myTuiCustomBtn.${props.popupName}`) as HTMLElement;
const toolbarContainer = document.querySelector('.toastui-editor-defaultUI-toolbar') as HTMLElement;
const customPopupEl = ref();

const popupStyle = reactive ({
  display: 'block',
  left: '',
  top: ''
});

onMounted(() => {
  const toolbarHeight = Number(window.getComputedStyle(toolbarContainer).height.slice(0, -2));
  const initialpopupPosTop = Number(window.getComputedStyle(customPopupEl.value).top.slice(0, -2));
  popupStyle.top = `${ toolbarHeight + initialpopupPosTop - 3 }px`;

  if (popupStyle.left === '') {
    popupStyle.left = `${bindedBtn.getBoundingClientRect().x}px`;
  }
})

</script>

<template>
  <div
    ref="customPopupEl"
    class="toastui-editor-popup myTuiCustomPopup"
    :style="popupStyle"
  >
    <div class="toastui-editor-popup-body">
      <TuiCustomPopupBtn
        v-for="(btn, i) in customPopup" :key="i"
        :customPopupBtn="btn"
        :tuiEditor="tuiEditor"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.toastui-editor-popup.myTuiCustomPopup {
  // position: relative;
  width: auto;

  .toastui-editor-popup-body {
    padding: .5em 0 .5em 0;
  }

  button {
    background: none;
    border: none;
    height: 28px;
    padding: 0px 14px 0px 15px;
    width: 100%;
    color: #404040;
    font-size: 12px;
    font-weight: bold;
    text-align: left;
  }

  button:hover {
    background-color: #404040;
    color: #fff;
  }
}
</style>
