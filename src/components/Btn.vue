<script setup lang="ts">
const props = defineProps<{
  btnInfo: string,
  btnName: string
}>();
</script>

<template>
  <a class="myBtn" :href="`#${btnInfo}`">
    {{ btnName }}
  </a>
</template>
  
<style scoped lang="scss">
.myBtn {
  display: inline-block;
  background-color: #37CCBD;
  border-radius: 7px;
  box-shadow: 2px 3px 7px #0E332F;
  padding: 0.5rem 1rem;
  color: #0E332F;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;

  &:not(:visited) {
    color: #0E332F;
  }

  &:hover {
    background-color: #0E332F;
    box-shadow: 2px 3px 7px #37CCBD;
    color: #fefefe;
  }
}
</style>