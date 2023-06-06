<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Editor from './../../node_modules/@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';

const props = defineProps({
  tuiMdValue: {
    type: String,
    required: false,
    default: '',
  },
});
const emit = defineEmits([
  'update:tuiMdValue',
  'update:tuiHtmlValue'
]);

// DOM refs
const editor = ref();

onMounted(() => {
  setTuiEditor();
});

function setTuiEditor() {
  const tuiEditor = new Editor({
    el: editor.value,
    height: undefined,
    hideModeSwitch: true,
    initialEditType: 'markdown',
    initialValue: props.tuiMdValue,
    placeholder: 'Type your text here...',
    previewStyle: 'tab',
    usageStatistics: false,
    events: {
      change: () => {
        emit('update:tuiMdValue', tuiEditor.getMarkdown());
        emit('update:tuiHtmlValue', tuiEditor.getHTML());
      },
    },
  });
}
</script>

<template>
  <div ref="editor"></div>
</template>

<style>
div.toastui-editor-md-tab-container {
  display: none !important;
}
</style>
