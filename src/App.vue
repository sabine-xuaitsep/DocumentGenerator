<script setup lang="ts">
import { provide, ref } from 'vue';
import { RouterView } from 'vue-router';
import AppHeader from '@/components/AppHeader.vue';
import store from '@/services/store';

// provide user status & user status mutation
const activeUser = ref(false);
function updateUserActivity(value: boolean) {
  activeUser.value = value;
}
provide('activeUser', activeUser);
provide('updateUserActivity', updateUserActivity);

// set localStorage (if nothing stored)
store.setTuiStore();
</script>

<template>
  <AppHeader />
  <RouterView />
</template>
