<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ToastUiEditor from '../components/ToastUiEditor.vue';

// DOM refs
const mainContainer = ref();

// const value
const isLargeScreen = window.innerWidth >= 992;

// reactive data
const availableHeight = ref(0)
const boxWidth = ref(0);
const boxHeight = ref(0);
const tuiMdValue = ref("");
const tuiHtmlValue = ref("Your text will appear here...");

onMounted(() => {
  calcAvailableHeight();
  setBoxHeight();
  setBoxWidth();
});

function calcAvailableHeight() {
  const appHeader = document.getElementById("appHeader") as HTMLElement;
  availableHeight.value = window.innerHeight - appHeader.offsetHeight;
}

function setBoxHeight() {
  boxHeight.value = isLargeScreen
    ? availableHeight.value
    // 16px === 1rem (margin between boxes)
    // => 16px / 2 = 8px
    : availableHeight.value / 2 - 8;
}

function setBoxWidth() {
  boxWidth.value = isLargeScreen
    ? mainContainer.value.offsetWidth / 2
    : mainContainer.value.offsetWidth;
}
</script>

<template>
  <main ref="mainContainer">
    <ToastUiEditor
      v-if="boxWidth > 0"
      id="tuiEditorBox"
      :style="{ width: `${boxWidth}px` }"
      :editor-height="boxHeight"
      :tui-md-value="tuiMdValue"
      @update:tui-md-value="tuiMdValue = $event"
      @update:tui-html-value="tuiHtmlValue = $event"
    />
    <div 
      v-if="boxWidth > 0"
      class="viewerBox"
      :style="{ width: `${boxWidth}px`, height: `${boxHeight}px` }"
      v-html="tuiHtmlValue"
    ></div>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  margin: 0 1rem;

  #tuiEditorBox {
    background-color: #fefefe;
    border-radius: 4px;
    margin: 0 0 1rem 0;
  }

  .viewerBox {
    display: block;
    background-color: #fefefe;
    overflow: scroll;
    padding: 1rem;
  }
}

@media screen and (min-width: 992px) {
  main {
    flex-direction: row;

    #tuiEditorBox {
      margin: 0 1rem 0 0;
    }
  }
}
</style>
