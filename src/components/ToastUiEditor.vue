<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Editor from '@/../node_modules/@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';

const props = defineProps({
  tuiMdValue: {
    type: String,
    required: false,
    default: '',
  }
});

const emit = defineEmits([
  'update-tui-md-value',
  'update-tui-html-value',
  'tui-editor'
]);

// DOM refs
const editor = ref();

// ToastUiEditor instance
let tuiEditor: Editor;

// initial toolbar
// each [] is separated with divider on render
const toolbarItems = [
  [ "heading", "bold", "italic" ],
  [ "hr" ],
  [ "table", "ul", "ol", "task", "link", "image" ]
];


onMounted(() => {
  setTuiEditor();
  if (tuiEditor.getMarkdown() !== "") {
    emit('update-tui-html-value', tuiEditor.getHTML());
  }
});

function setTuiEditor() {
  tuiEditor = new Editor({
    el: editor.value,
    height: undefined,
    hideModeSwitch: true,
    initialEditType: 'markdown',
    initialValue: props.tuiMdValue,
    placeholder: 'Start typing...',
    previewStyle: 'tab',
    toolbarItems: toolbarItems,
    usageStatistics: false,
    events: {
      change: () => {
        emit('update-tui-md-value', tuiEditor.getMarkdown());
        emit('update-tui-html-value', tuiEditor.getHTML());
      },
    }
  });
  emit('tui-editor', tuiEditor);
}
</script>

<template>
  <div
    ref="editor"
  ></div>
</template>

<style>
div.toastui-editor-md-tab-container {
  display: none !important;
}
</style>
