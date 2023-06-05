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
  editorHeight : {
    type: String,
    required: false,
    default: '500px',
  },
});
const emit = defineEmits([
  'update:tuiMdValue',
  'update:tuiHtmlValue'
]);
const editor = ref();

let tuiEditor: Editor;
onMounted(() => {
  tuiEditor = new Editor({
    el: editor.value,
    height: props.editorHeight,
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
});
</script>

<template>
  <div ref="editor"></div>
</template>

<style>
div.toastui-editor-md-tab-container {
  display: none !important;
}
</style>
