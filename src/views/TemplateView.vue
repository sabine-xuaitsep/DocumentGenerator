<script setup lang="ts">
import Btn from '@/components/Btn.vue';
</script>

<template>
  <main class="customBox mainMargin templateBox">
    <h2>Pick up your choice</h2>
    <ul>
      <li>
        <Btn
          btnInfo="letter"
          btnName="Letter"
        />
      </li>
      <li>
        <Btn
          btnInfo="table"
          btnName="Table"
        />
      </li>
      <li>
        <Btn
          btnInfo="unknown"
          btnName="Unknown"
        />
      </li>
      <li>
        <Btn
          btnInfo="yourModel"
          btnName="Your model"
        />
      </li>
    </ul>
  </main>
</template>

<style scoped lang="scss">
.templateBox {
  * {
    padding: .5rem 1rem;
    text-align: center;
  }

  ul {
    list-style-type: none;
  }
}
</style>