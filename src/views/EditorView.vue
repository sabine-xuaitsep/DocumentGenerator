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
const tuiHtml = ref("Your text will appear here...");

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
        @update-tui-html-value="tuiHtml = $event"
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
        v-html="tuiHtml"
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
