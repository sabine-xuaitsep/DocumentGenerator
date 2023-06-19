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

  if (isLargeScreen.value) {
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

<style scoped lang="scss">
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
