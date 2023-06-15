<script setup lang="ts">
import {
  computed,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  type CSSProperties
} from 'vue';
import ToastUiEditor from '@/components/ToastUiEditor.vue';
import TuiCustomBtn from '@/components/TuiCustomBtn.vue';
import { myCustomBtns } from '@/components/tuiCustomBtns';
import store from '@/services/store';
import type Editor from 'node_modules/@toast-ui/editor/types';

// DOM el & refs
const appHeader = document.getElementById("appHeader") as HTMLElement;
const boxContainer = ref();
const fullScreenCommand = ref();
const mainContainer = ref();

// ToastUiEditor instance
let tuiEditor: Editor;

// reactive data
const boxStyle = reactive({
  height: '0px',
  width: '0px'
}) as CSSProperties;

const aColor = ref('#308FD9');
const bgColor = ref('#37CCBD');
const darkColor = ref('#0E332F');
const markColor = ref('#5EFFEF');
const lightColor = ref('#79d5ca31');

const availableHeight = ref(0);
const isLargeScreen = ref(window.innerWidth >= 992);
const isFullScreen = ref(false);
// TODO: if value doesn't finish with '\n\n' => add '\n'
// => to prevent erratic bug
const tuiMdValue = ref("<span class=\"large\">Large</span> <span class=\"medium\">Medium</span> Normal <small>Small</small>\n[WebDeveloperie](https://www.webdeveloperie.be/)\n<br>\n***\n<br>\n<u>underline</u> 1<sup>st</sup> <mark>marked</mark>\n<br>\n\n$$center\nCentered text\n$$\n\n$$indent1\nindent1\n$$\n\n$$indent2\nindent2\n$$\n\n$$indent3\nindent3\n$$\n\n$$indent4\nindent4\n$$\n\n$$indent5\nindent5\n$$\n\n$$indent6\nindent6\n$$\n\n$$boxCenter\nboxed & centered\n$$\n\n$$colorCenter\nbackground & centered\n$$\n\n$$boxColorCenter\nbox & background & centered\n$$\n\n<br><br>\n\n|  | Passé | Futur |\n| --- | :--- | :--- |\n| JeanQuiRit | Il aurait pu fuire mais il a préféré rire, c'est son choix, pourquoi le blâmer pour cela? | A l'avenir, il sait qu'il reproduira le même comportement, cela lui réussit, c'est certain. |\n| JulesQuiFuit | Il a fuit mais en riant, car il était certain de son choix, son ami allait périr, et lui pas. | Il regrette quand même son choix, son ami lui manquera. Il s'en fera d'autres, il ne s'en fait pas pour ça. |\n<br><br>\n\n|  | Passé | Futur |\n| :---: | :---: | :---: |\n| JeanQuiRit | 1.987563% | 0.7% |\n| JulesQuiFuit | 97.333% | 0.2598135% |\n| JeanQuiPleure | 1.987563% | 0.7% |\n| JulesQuiRage | 97.333% | 0.2598135% |\n\n");
const tuiHtmlValue = ref("Your text will appear here...");

// computed data
const boxContainerFlexDirection = computed(() =>
  isLargeScreen.value ? 'row' : 'column'
);

const fullScreenIcon = computed(() =>
  isFullScreen.value ? 'compress' : 'expand'
);

const fullScreenInfo = computed(() =>
  isFullScreen.value ? 'Exit full screen' : 'Toggle full screen'
);

const mainContainerPaddingTop = computed(() =>
  isFullScreen.value ? 16 : 0
);


// check if htmlValue & tuiMdValue stored in localStorage
// set localStorage if nothing stored
// assign value to ref if stored in localStorage
const htmlValue = store.findTuiHtmlValue();
const mdValue = store.findTuiMdValue();
if (!htmlValue) {
  store.setTuiHtmlValue(tuiHtmlValue.value);
} else {
  tuiHtmlValue.value = htmlValue;
}
if (!mdValue) {
  store.setTuiMdValue(tuiMdValue.value);
} else {
  tuiMdValue.value = mdValue;
}

onMounted(() => {
  setBoxStyle();
  window.addEventListener('resize', setBoxStyle);
});

onUnmounted(() => {
  window.removeEventListener('resize', setBoxStyle);
});

function calcAvailableHeight() {
  availableHeight.value = isFullScreen.value
  ? window.innerHeight - fullScreenCommand.value.offsetHeight - mainContainerPaddingTop.value
  : window.innerHeight - appHeader.offsetHeight - fullScreenCommand.value.offsetHeight;
}

function closeFullscreen() {
  document.exitFullscreen();
  setBoxStyle();
  isFullScreen.value = false;
}

function setBoxStyle() {
  calcAvailableHeight();
  isLargeScreen.value = window.innerWidth >= 992;

  if(isLargeScreen.value) {
    boxStyle.height = `${availableHeight.value}px`;
    boxStyle.width = `${boxContainer.value.offsetWidth / 2}px`;
  } else {
    // 16px === 1rem (margin between boxes)
    // => 16px / 2 = 8px
    boxStyle.height = `${availableHeight.value / 2 - 8}px`;
    boxStyle.width = `${boxContainer.value.offsetWidth}px`;
  }
}

function openFullscreen() {
  mainContainer.value.requestFullscreen();
  setBoxStyle();
  isFullScreen.value = true;
}

function updateDocColor(color: string) {
  if (color === 'neutral') {
    aColor.value = 'grey';
    bgColor.value = 'grey';
    darkColor.value = 'grey';
    markColor.value = 'grey';
    lightColor.value = 'grey';
  }
  else if (color === 'teal') {
    aColor.value = '#308FD9';
    bgColor.value = '#37CCBD';
    darkColor.value = '#0E332F';
    markColor.value = '#5EFFEF';
    lightColor.value = '#79d5ca31';
  }
  else if (color === 'pink') {
    aColor.value = 'pink';
    bgColor.value = 'pink';
    darkColor.value = 'pink';
    markColor.value = 'pink';
    lightColor.value = 'pink';
  }
}

function updateTuiHtmlValue(data: string) {
  tuiHtmlValue.value = data;
  // update value in localStorage
  store.updateTuiHtmlValue(data);
}

function updateTuiMdValue(data: string) {
  tuiMdValue.value = data;
  // update value in localStorage
  store.updateTuiMdValue(data);
}
</script>

<template>
  <main 
    ref="mainContainer"
    :style="{ paddingTop: `${mainContainerPaddingTop}px` }"
  >
    <div
      id="boxContainer"
      ref="boxContainer"
      :style="{ flexDirection: boxContainerFlexDirection }"
    >
      <ToastUiEditor
        id="tuiEditorBox"
        :style="boxStyle"
        :tui-md-value="tuiMdValue"
        @update-tui-md-value="updateTuiMdValue($event)"
        @update-tui-html-value="updateTuiHtmlValue($event)"
        @tui-editor="tuiEditor = $event"
      />
      <TuiCustomBtn
        v-if="tuiEditor"
        v-for="(btn, i) in myCustomBtns" :key="i"
        :customBtn="btn"
        :tuiEditor="tuiEditor"
        @update-doc-color="updateDocColor($event)"
      />
      <div
        id="viewerBox"
        :style="boxStyle"
        v-html="tuiHtmlValue"
      ></div>
    </div>
    <div id="fullScreenCommand" ref="fullScreenCommand">
      <a
        :href="`#${fullScreenInfo.toLowerCase().replace(' ', '-')}`"
        :title="fullScreenInfo"
        @click.prevent="isFullScreen ? closeFullscreen() : openFullscreen()"
      >
        {{ fullScreenInfo }}
        <font-awesome-icon :icon="['fas', fullScreenIcon]" />
      </a>
    </div>
  </main>
</template>

<style lang="scss">
#boxContainer {
  display: flex;
  margin: 0 1rem;

  #tuiEditorBox {
    background-color: #fefefe;
    border-radius: 4px;
    margin: 0 0 1rem 0;
  }

  #viewerBox {
    background-color: #fefefe;
    overflow-wrap: break-word;
    overflow-y: scroll;
    padding: 1rem;

    .toastui-editor-custom-block-view {
      padding: 1rem 0;
    }

    a:not(:visited) {
      color: v-bind(aColor);
    }

    hr {
      border: 1px solid v-bind(darkColor);
    }

    mark {
      background-color: v-bind(markColor);
    }

    span.large {
      font-size: 1.7rem;
    }
    span.medium {
      font-size: 1.3rem;
    }

    u {
      text-decoration: none;
      border-bottom: 1px solid;
    }

    div.center {
      text-align: center;
    }

    div.indent1,
    div.indent2,
    div.indent3,
    div.indent4,
    div.indent5,
    div.indent6 {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
    }
    div.indent1 > div {
      grid-column: 2 / 13;
    }
    div.indent2 > div {
      grid-column: 3 / 13;
    }
    div.indent3 > div {
      grid-column: 4 / 13;
    }
    div.indent4 > div {
      grid-column: 5 / 13;
    }
    div.indent5 > div {
      grid-column: 6 / 13;
    }
    div.indent6 > div {
      grid-column: 7 / 13;
    }

    div.boxCenter {
      border: 1px solid v-bind(darkColor);
      padding: 1rem;
      text-align: center;
    }
    div.colorCenter {
      background-color: v-bind(bgColor);
      padding: 1rem;
      text-align: center;
    }
    div.boxColorCenter {
      background-color: v-bind(bgColor);
      border: 2px solid v-bind(darkColor);
      padding: 1rem;
      text-align: center;
    }

    table {
      border-collapse: collapse;
      width: 100%;
      line-height: 1.7rem;
    }
    thead {
      background-color: v-bind(bgColor);
      font-size: 1.1rem;
      line-height: 2.3rem;
    }
    table td {
      // min-width: 10rem;
    }
    tbody tr:first-child td {
      padding-top: 1rem;
    }
    tbody td, 
    thead th {
      padding: .3em 1em .3em 1em;
    }
    tbody tr:nth-child(even) {
      background-color: v-bind(lightColor);
    }
    // .table2 thead {
    //   border: 1px solid #111;
    // }
    // .table2 td {
    //   border-left: 1px solid #111;
    //   border-right: 1px solid #111;
    // }
    // .table2 tr:last-child td {
    //   border-bottom: 1px solid #111;
    // }
  }
}

#fullScreenCommand {
  text-align: right;

  a {
    display: inline-block;
    padding: 1rem 1.3rem;
    color: #fefefe;
    text-decoration: none;

    svg {
      padding-left: .3rem;
    }
  }
}

@media screen and (min-width: 992px) {
  #boxContainer #tuiEditorBox {
    margin: 0 1rem 0 0;
  }
}
</style>
