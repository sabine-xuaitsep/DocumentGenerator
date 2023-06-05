<script setup lang="ts">

</script>

<template>
  <main>
    <div class="demoBox">
      <span class="demoText">EditorBox</span>
    </div>
    <div class="demoBox">
      <span class="demoText">ViewerBox</span>
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(1, 1fr);

  .demoBox {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fefefe;
    height: 42.5vh;

    .demoText {
      font-size: 2rem;
    }
  }
}

@media screen and (min-width: 992px) {
  main {
    grid-template-columns: repeat(2, 1fr);

    .demoBox {
      height: 87vh;
    }
  }
}
</style>
