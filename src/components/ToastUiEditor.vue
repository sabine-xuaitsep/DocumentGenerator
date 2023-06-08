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
    },
    customHTMLRenderer: {
      htmlInline: {
        mark(node, { entering }) {
          return entering
            ? { type: 'openTag', tagName: 'mark', attributes: node.attrs }
            : { type: 'closeTag', tagName: 'mark' };
        },
        small(node, { entering }) {
          return entering
            ? { type: 'openTag', tagName: 'small', attributes: node.attrs }
            : { type: 'closeTag', tagName: 'small' };
        },
        span(node, { entering }) {
          return entering
            ? { type: 'openTag', tagName: 'span', attributes: node.attrs }
            : { type: 'closeTag', tagName: 'span' };
        },
        sup(node, { entering }) {
          return entering
            ? { type: 'openTag', tagName: 'sup', attributes: node.attrs }
            : { type: 'closeTag', tagName: 'sup' };
        },
        u(node, { entering }) {
          return entering
            ? { type: 'openTag', tagName: 'u', attributes: node.attrs }
            : { type: 'closeTag', tagName: 'u' };
        },
      },
      // customBlock: declare with $$div & close with $$
      divCtr(node) {
        return [
          { type: 'openTag', tagName: 'div', outerNewLine: true },
          { type: 'html', content: node.literal ?? '' },
          { type: 'closeTag', tagName: 'div', outerNewLine: true }
        ];
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
