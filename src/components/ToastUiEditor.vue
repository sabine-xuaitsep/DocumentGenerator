<script setup lang="ts">
import { onMounted, ref } from 'vue';
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

// initial mdValue
// TODO: if value doesn't finish with '\n\n' => add '\n'
// => to prevent erratic bug
const initialTuiMd = ref("<span class=\"large\">Large</span> <span class=\"medium\">Medium</span> Normal <small>Small</small>\n[WebDeveloperie](https://www.webdeveloperie.be/)\n<br>\n***\n\n$$center\n 1<sup>st</sup> <u>underlined</u> text <mark>marked</mark>\n$$\n\n$$indent1\n<i>begin from indent1<i>\n$$\n\n$$indent6\n<b>to indent6<b>\n$$\n\n$$boxCenter\nboxed & centered\n$$\n\n$$colorCenter\nbackground & centered\n$$\n\n$$boxColorCenter\nbox & background & centered\n$$\n\n<br><br>\n\n|  | Passé | Futur |\n| --- | :--- | :--- |\n| JeanQuiRit | Il aurait pu fuire mais il a préféré rire, c'est son choix, pourquoi le blâmer pour cela? | A l'avenir, il sait qu'il reproduira le même comportement, cela lui réussit, c'est certain. |\n| JulesQuiFuit | Il a fuit mais en riant, car il était certain de son choix, son ami allait périr, et lui pas. | Il regrette quand même son choix, son ami lui manquera. Il s'en fera d'autres, il ne s'en fait pas. |\n\n<br><br>\n\n|  | Passé | Futur |\n| :---: | :---: | :---: |\n| JeanQuiRit | 1.987563% | 0.7% |\n| JulesQuiFuit | 97.333% | 0.2598135% |\n| JeanQuiPleure | 198.7563% | 70% |\n| JulesQuiRage | 9.333% | 25.98135% |\n\n");


// set localStorage.tuiValues (if nothing stored)
store.setTuiMdValue(initialTuiMd.value);

onMounted(() => {
  // find values stored in localStorage
  const tuiValues = store.findTuiValues();

  tuiOptions = {
    el: editor.value,
    height: undefined,
    hideModeSwitch: true,
    initialEditType: 'markdown',
    initialValue: tuiValues?.md ?? initialTuiMd.value,
    placeholder: 'Start typing...',
    previewStyle: 'tab',
    toolbarItems: toolbarItems,
    usageStatistics: false,
    events: {
      change: () => {
        emit('update-tui-html-value', tuiEditor.getHTML());
        store.updateTuiValues({ md: tuiEditor.getMarkdown(), html: tuiEditor.getHTML()});
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
