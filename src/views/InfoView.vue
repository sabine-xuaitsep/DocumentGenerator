<template>
  <main>
    <h2>Project info</h2>
    <p>
      Basically, you can <RouterLink to="/template">choose a template</RouterLink>, <RouterLink to="/">modify it</RouterLink> or create a document from scratch, and <RouterLink to="/print">create a PDF</RouterLink> using this document generator
    </p>
    <p class="tuiInfo">
      The editor is based on <a href="https://ui.toast.com/tui-editor" target="_blank">Toast UI Editor</a> and has been customized to provide more functionalities
    </p>
    <p>This application was developed by <a href="https://www.webdeveloperie.be/" target="_blank">WebDeveloperie</a> – SaBiNe PeSTiauX</p>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  background-color: #fefefe;
  height: 70vh;
  margin: 0 1rem;
  padding: 3rem 1rem;

  h2, p {
    padding: .5rem 1rem;
    line-height: 1.5em;;
    text-align: center;
  }

  .tuiInfo {
    display: none;
  }
}

@media screen and (min-width: 360px) {
  main .tuiInfo {
    display: block;
  }
}

@media screen and (min-width: 480px) {
  main {
    justify-content: center;
    padding: 0 3rem 3rem 3rem;
  }
}
</style>
