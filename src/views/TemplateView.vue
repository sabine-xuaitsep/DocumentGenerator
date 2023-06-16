<template>
  <main>
    <h2>Pick up your choice</h2>
    <ul>
      <li><a href="#">Letter</a></li>
      <li><a href="#">Table</a></li>
      <li><a href="#">Unknown</a></li>
      <li><a href="#">Your model</a></li>
    </ul>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fefefe;
  height: 70vh;
  margin: 0 1rem;

  * {
    padding: .5rem 1rem;
    text-align: center;
  }
}
</style>