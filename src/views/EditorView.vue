<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, type CSSProperties } from 'vue';
import ToastUiEditor from '../components/ToastUiEditor.vue';

// DOM refs
const mainContainer = ref();

// reactive data
const boxStyle = reactive({
  height: '0px',
  width: '0px'
}) as CSSProperties;

const containerStyle = reactive({
  flexDirection: 'column'
}) as CSSProperties;

const availableHeight = ref(0);
const isLargeScreen = ref(window.innerWidth >= 992);
const tuiMdValue = ref("");
const tuiHtmlValue = ref("Your text will appear here...");

onMounted(() => {
  setBoxStyle();
  window.addEventListener("resize", setBoxStyle);
});

onUnmounted(() => {
  window.removeEventListener("resize", setBoxStyle);
});

function calcAvailableHeight() {
  const appHeader = document.getElementById("appHeader") as HTMLElement;
  availableHeight.value = window.innerHeight - appHeader.offsetHeight;
}

function setBoxStyle() {
  calcAvailableHeight();
  isLargeScreen.value = window.innerWidth >= 992;
  if(isLargeScreen.value) {
    boxStyle.height = `${availableHeight.value}px`;
    boxStyle.width = `${mainContainer.value.offsetWidth / 2}px`;
    containerStyle.flexDirection = 'row';
  } else {
    // 16px === 1rem (margin between boxes)
    // => 16px / 2 = 8px
    boxStyle.height = `${availableHeight.value / 2 - 8}px`;
    boxStyle.width = `${mainContainer.value.offsetWidth}px`;
    containerStyle.flexDirection = 'column';
  }
}
</script>

<template>
  <main 
    ref="mainContainer"
    :style="containerStyle"
  >
    <ToastUiEditor
      id="tuiEditorBox"
      :style="boxStyle"
      :tui-md-value="tuiMdValue"
      @update:tui-md-value="tuiMdValue = $event"
      @update:tui-html-value="tuiHtmlValue = $event"
    />
    <div
      class="viewerBox"
      :style="boxStyle"
      v-html="tuiHtmlValue"
    ></div>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  margin: 0 1rem;

  #tuiEditorBox {
    background-color: #fefefe;
    border-radius: 4px;
    margin: 0 0 1rem 0;
  }

  .viewerBox {
    display: block;
    background-color: #fefefe;
    overflow-wrap: break-word;
    overflow-y: scroll;
    padding: 1rem;
  }
}

@media screen and (min-width: 992px) {
  main #tuiEditorBox {
    margin: 0 1rem 0 0;
  }
}
</style>
