<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TuiCustomPopupBtn from './TuiCustomPopupBtn.vue';
import type Editor from 'node_modules/@toast-ui/editor/types';
import type { CustomBtns } from './tuiCustomBtns';

const props = defineProps<{
  customBtn: CustomBtns,
  tuiEditor: Editor
}>();

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

  if (props.customBtn.action === 'popup' && !popupReady.value) {
    popupReady.value = true;
  }

  if (props.customBtn.action.match(/[a-z]+:/i)) {

    const btnFn = props.customBtn.action.split(':') as string[];
    
    if (btnFn[0] === 'custom') {
      const highlight = props.tuiEditor.getSelectedText();
      const position = props.tuiEditor.getSelection();
      const start = position[0] as number[];
      const end = position[1] as number[];

      // check for critical causing syntax highlighting bugs
      // if selection starts at first char of line
      // && if no text after selection
      props.tuiEditor.setSelection(
        [ end[0], end[1] ],
        [ end[0], end[1] + 2 ]
      );
      const noTextAfterSelection = props.tuiEditor.getSelectedText() === "";
      const criticalCondition = start[1] === 1 && noTextAfterSelection;

      // reset selection to initial position
      props.tuiEditor.setSelection(
        [ start[0], start[1] ],
        [ end[0], end[1] ]
      );

      // apply a subterfuge if criticalCondition
      const startCharPos = criticalCondition
        ? start[1] + 1
        : start[1];

      // insert customBlock
      // [managed in ToastUiEditor component => customHTMLRenderer]
      props.tuiEditor.replaceSelection(
        `\n$$${btnFn[1]}\n${highlight}\n$$\n`,
        [ start[0], startCharPos ],
        [ end[0], end[1] ]
      );

      // apply patch to hide subterfuge
      if (criticalCondition && highlight !== "") {
        props.tuiEditor.deleteSelection(
          [ start[0], start[1] ],
          [ start[0], start[1] + 1 ]
        );
      }
    }
    else if (
        btnFn[0] === 'orphTag'
        || btnFn[0] === 'span'
        || btnFn[0] === 'tag'
      ) {
      const highlight = props.tuiEditor.getSelectedText();
      const mdText = {
        orphTag: `<${btnFn[1]}>`,
        span: `<span class="${btnFn[1]}">${highlight}</span>`,
        tag: `<${btnFn[1]}>${highlight}</${btnFn[1]}>`
      };
      props.tuiEditor.insertText(mdText[btnFn[0]]);
    }
    else {
      return;
    }
  }
  // else if (props.customBtn.action === 'erase') {
  //   props.tuiEditor.reset();
  // } 
  else {
    return;
  }
  return false;
}
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
}
</style>
