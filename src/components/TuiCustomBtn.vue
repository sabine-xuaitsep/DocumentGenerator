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

function handleEvent() {
  if (props.customBtn.action.match(/[a-z]+:/i)) {
    const btnFn = props.customBtn.action.split(':') as string[];
    if (btnFn[0] === 'tag' || btnFn[0] === 'span') {
      // hidePopups();
      const highlight = props.tuiEditor.getSelectedText();
      const mdText = { 
        tag: `<${btnFn[1]}>${highlight}</${btnFn[1]}>`,
        span: `<span class="${btnFn[1]}">${highlight}</span>`
      };
      props.tuiEditor.replaceSelection(mdText[btnFn[0]]);
    }
    else if (btnFn[0] === 'orphTag') {
      // hidePopups();
      props.tuiEditor.insertText(`<${btnFn[1]}>`);
    }
    else if (btnFn[0] === 'custom') {
      // hidePopups();
      const highlight = props.tuiEditor.getSelectedText();
      const position = props.tuiEditor.getSelection();
      const start = position[0] as number[];
      const end = position[1] as number[];

      // check for critical causing syntax highlighting bugs
      // if selection starts at first char of line
      // && if no text after selection
      props.tuiEditor.setSelection(
        [end[0] , end[1]],
        [end[0] , end[1] + 2]
      );
      const noTextAfterSelection = props.tuiEditor.getSelectedText() === "";
      const criticalCondition = start[1] === 1 && noTextAfterSelection;

      // reset selection to initial position
      props.tuiEditor.setSelection(
        [start[0] , start[1]],
        [end[0] , end[1]]
      );

      // apply a subterfuge if criticalCondition
      const startCharPos = criticalCondition
        ? start[1] + 1
        : start[1];

      // insert customBlock
      // [managed in ToastUiEditor component => customHTMLRenderer]
      props.tuiEditor.replaceSelection(
        `\n$$${btnFn[1]}\n${highlight}\n$$\n`,
        [start[0] , startCharPos],
        [end[0] , end[1]]
      );

      // apply patch to hide subterfuge
      if (criticalCondition && highlight !== "") {
        props.tuiEditor.deleteSelection(
          [start[0] , start[1]],
          [start[0] , start[1] + 1]
        );
      }
    }
    else if (btnFn[0] === 'open') {
      // TODO: manage popups
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
  <span
    ref="customBtnEl"
    class="myTuiCustomBtn"
    :class="customBtn.name"
    @click="handleEvent"
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
