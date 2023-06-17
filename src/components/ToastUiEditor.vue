<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import Editor, { 
  type CustomHTMLRenderer, 
  type EditorOptions, 
  type HTMLMdNode, 
  type MdNode 
} from '@/../node_modules/@toast-ui/editor';
import type { 
  CustomBlockMdNode, 
  HTMLToken 
} from 'node_modules/@toast-ui/editor/types/toastmark';
import { findAllCustomActions } from '@/components/tuiCustomBtns';
import store from '@/services/store';
import '@toast-ui/editor/dist/toastui-editor.css';

const emit = defineEmits([
  'update-tui-html-value',
  'tui-editor'
]);

// DOM refs
const editor = ref();

// ToastUiEditor instance & options
let tuiEditor: Editor;
let tuiOptions: EditorOptions;

// initial toolbar
// each [] is separated with divider on render
const toolbarItems = [
  [ "heading", "bold", "italic" ],
  [ "hr" ],
  [ "table", "ul", "ol", "link", "image" ]
];

// inject user status & user status mutation
const activeUser = 
  inject('activeUser') as 
  { value: boolean };
const updateUserActivity = 
  inject('updateUserActivity') as 
  (value: boolean) => void;

// bind value stored in localStorage
const defaultMd = activeUser.value
  ? store.findTuiValues().user
  : store.findTuiValues().md;


onMounted(() => {
  tuiOptions = {
    el: editor.value,
    height: undefined,
    hideModeSwitch: true,
    initialEditType: 'markdown',
    initialValue: defaultMd,
    placeholder: 'Start typing...',
    previewStyle: 'tab',
    toolbarItems: toolbarItems,
    usageStatistics: false,
    events: {
      change: () => {
        if (!activeUser.value) {
          // update user status
          updateUserActivity(true);
        }
        emit('update-tui-html-value', tuiEditor.getHTML());
        store.updateTuiValues({ user: tuiEditor.getMarkdown(), html: tuiEditor.getHTML()});
      },
    },
    customHTMLRenderer: {
      htmlInline: {
        mark: (node, { entering }) => handleHtmlInlineRenderer(node, entering, 'mark'),
        small: (node, { entering }) => handleHtmlInlineRenderer(node, entering, 'small'),
        span: (node, { entering }) => handleHtmlInlineRenderer(node, entering, 'span'),
        sup: (node, { entering }) => handleHtmlInlineRenderer(node, entering, 'sup'),
        u: (node, { entering }) => handleHtmlInlineRenderer(node, entering, 'u')
      }
    }
  }

  // customBlock: declared with $$customBlockName & closed with $$
  // customBtn.action === 'custom:customBlockName'
  const customBlockNames = findAllCustomActions();
  // set customRenderer foreach customBlock
  const customBlocks: CustomHTMLRenderer[] = [];
  customBlockNames.forEach(customBlockName => {
    customBlocks.push({ 
      [customBlockName]: (node: MdNode) => handleCustomBlockRenderer(node) 
    });
  });
  // insert customRenderer in tuiOptions
  customBlocks.forEach(customBlock => {
    const renderers = tuiOptions.customHTMLRenderer as CustomHTMLRenderer;
    Object.assign(renderers, customBlock)
  });


  setTuiEditor();
  if (tuiEditor.getMarkdown() !== "") {
    emit('update-tui-html-value', tuiEditor.getHTML());
    store.updateTuiValues({ html: tuiEditor.getHTML()})
  }
});

function handleCustomBlockRenderer(node: MdNode): HTMLToken[] {
  const nodeCopy = node as CustomBlockMdNode;
  const result = [
    {
      type: 'openTag',
      tagName: 'div',
      outerNewLine: true,
      attributes: { class: nodeCopy.info }
    },
    { type: 'html', content: node.literal ?? '' },
    { type: 'closeTag', tagName: 'div', outerNewLine: true }
  ];
  if (nodeCopy.info.includes('indent')) {
    result.splice(1, 0, { type: 'openTag', tagName: 'div', outerNewLine: true });
    result.splice(3, 0, { type: 'closeTag', tagName: 'div', outerNewLine: true });
    return result as HTMLToken[];
  }
  return result as HTMLToken[];
}

function handleHtmlInlineRenderer(
    node: HTMLMdNode, entering: boolean, tag: string
  ): HTMLToken {
  return entering
    ? { type: 'openTag', tagName: tag, attributes: node.attrs }
    : { type: 'closeTag', tagName: tag };
}

function setTuiEditor() {
  tuiEditor = new Editor(tuiOptions);
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
