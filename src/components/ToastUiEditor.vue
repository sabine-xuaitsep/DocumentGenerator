<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Editor, { type HTMLMdNode } from '@/../node_modules/@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import type { HTMLToken } from 'node_modules/@toast-ui/editor/types/toastmark';

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
        mark: (node, { entering }) => handleHtmlInlineRenderer(node, entering, 'mark'),
        small: (node, { entering }) => handleHtmlInlineRenderer(node, entering, 'small'),
        span: (node, { entering }) => handleHtmlInlineRenderer(node, entering, 'span'),
        sup: (node, { entering }) => handleHtmlInlineRenderer(node, entering, 'sup'),
        u: (node, { entering }) => handleHtmlInlineRenderer(node, entering, 'u')
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

function handleHtmlInlineRenderer(
    node: HTMLMdNode, entering: boolean, tag: string
  ): HTMLToken {
  return entering
    ? { type: 'openTag', tagName: tag, attributes: node.attrs }
    : { type: 'closeTag', tagName: tag };
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
