<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ToastUiEditor from '../components/ToastUiEditor.vue';

const mainContainer = ref();

const boxWidth = ref(0);
const editorHeight = ref("");
const tuiMdValue = ref("");
const tuiHtmlValue = ref("Your text will appear here...");

onMounted(() => {
  setBoxHeight();
  setBoxWidth();
});

function setBoxHeight() {
  // TODO: manage exact height?
  // it mysteriously takes the right height (available height) like this
  editorHeight.value = "";
}

function setBoxWidth() {
  boxWidth.value = window.innerWidth >= 992
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
      :editor-height="editorHeight"
      :tui-md-value="tuiMdValue"
      @update:tui-md-value="tuiMdValue = $event"
      @update:tui-html-value="tuiHtmlValue = $event"
    />
    <div 
      v-if="boxWidth > 0" 
      class="viewerBox" 
      :style="{ width: `${boxWidth}px` }"
      v-html="tuiHtmlValue"
    ></div>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  margin: 0 2rem 0 1rem;

  #tuiEditorBox {
    background-color: #fefefe;
    border-radius: 4px;
    margin: 0 0 1rem 0;
  }

  .viewerBox {
    background-color: #fefefe;
    height: 42.5vh;
    padding: 1rem;
  }
}

@media screen and (min-width: 992px) {
  main {
    flex-direction: row;
    margin: 0 1rem;

    #tuiEditorBox {
      margin: 0 1rem 0 0;
    }

    .viewerBox {
      height: 87vh;
    }
  }
}
</style>
