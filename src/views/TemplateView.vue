<script setup lang="ts">
import { inject } from 'vue';
import Btn from '@/components/Btn.vue';
import { useRouter } from 'vue-router';
import store from '@/services/store';

// refer to @services/store
const templates = [
  'default',
  'letter',
  'table',
];

// make router available
const router = useRouter();

// inject user status mutation
const updateUserActivity = 
    inject('updateUserActivity') as 
    (value: boolean) => void;


function setTemplate(name: string) {
  // update user status
  updateUserActivity(false);
  // set template
  store.setTemplate(name);
  // go to editor
  router.push('/');
}
</script>

<template>
  <main class="customBox mainMargin templateBox">
    <h2>Pick up your choice</h2>
    <ul>
      <li v-for="(template, i) in templates" :key="i">
        <Btn
          :btnInfo="template"
          :btnName="`${template.charAt(0).toUpperCase()}${template.slice(1)}`"
          @click.prevent="setTemplate(template)"
        />
      </li>
      <li>
        <Btn
          btnInfo="yourModel"
          btnName="Your model"
          @click.prevent="setTemplate('user')"
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