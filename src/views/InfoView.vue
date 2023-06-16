<template>
  <main class="customBox mainInfo mainMargin">
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
.mainInfo {
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
  .mainInfo .tuiInfo {
    display: block;
  }
}
</style>
