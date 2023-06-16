<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <header id="appHeader">
    <h1>Document Generator</h1>
    <nav>
      <RouterLink to="/">
        <font-awesome-icon :icon="['fas', 'pencil']" />
        <span class="menuInfo"> Editor</span>
      </RouterLink>
      <span class="navSeparator">|</span>
      <RouterLink to="/print">
        <font-awesome-icon :icon="['fas', 'print']" />
        <span class="menuInfo"> Print</span>
      </RouterLink>
      <span class="navSeparator">|</span>
      <RouterLink to="/info">
        <font-awesome-icon :icon="['fas', 'circle-info']" />
        <span class="menuInfo"> Info</span>
      </RouterLink>
    </nav>
  </header>
</template>

<style scoped lang="scss">
#appHeader {
  margin: 0 1rem;
  color: #fefefe;
  text-align: center;

  h1 {
    padding-top: 1rem;
    font-weight: 600;
  }
  
  nav {
    .navSeparator {
      color: #818181;
      font-weight: 900;
    }

    a {
      color: #818181;
      display: inline-block;
      padding: 1rem;
      text-decoration: none;

      span.menuInfo {
        display: none;
        padding-left: .3rem;
      }
    }

    a.router-link-exact-active {
      color: #fefefe;
    }

    a:hover {
      color: #fefefe;
    }
  }
}

@media screen and (min-width: 480px) {
  #appHeader nav a span.menuInfo {
    display: inline;
  }
}
</style>
