<script setup lang="ts">
import { provide, ref } from 'vue';
import { RouterView } from 'vue-router';
import AppHeader from '@/components/AppHeader.vue';
import store from '@/services/store';

// user status
const activeUser = ref(false);

// doc color
const defaultColor = ref('teal');
const bgColor = ref('');
const darkColor = ref('');
const lightColor = ref('');
const markColor = ref('');

// colors definition
const colors = {
  neutral: {
    bgColor: '#CACBCF',
    darkColor: '#51545C',
    lightColor: '#F0F2F5',
    markColor: '#D7D9DB'
  },
  teal: {
    bgColor: '#37CCBD',
    darkColor: '#0E332F',
    lightColor: '#79d5ca31',
    markColor: '#5EFFEF'
  },
  pink: {
    bgColor: '#E890B3',
    darkColor: '#694151',
    lightColor: '#e890b323',
    markColor: '#FFB8D4'
  }
};

// set localStorage (if nothing stored)
store.setTuiStore();

// assign default color
updateDocColor(defaultColor.value);

// provide user status + mutation of doc color & user status 
provide('activeUser', activeUser);
provide('updateDocColor', updateDocColor);
provide('updateUserActivity', updateUserActivity);


function updateDocColor(color: string) {
  for (const [key, value] of Object.entries(colors)) {
    if (key === color) {
      bgColor.value = value.bgColor;
      darkColor.value = value.darkColor;
      lightColor.value = value.lightColor;
      markColor.value = value.markColor;
    }
  }
}

function updateUserActivity(value: boolean) {
  activeUser.value = value;
}
</script>

<template>
  <AppHeader />
  <RouterView />
</template>

<style>
.toastui-editor-custom-block-view {
  padding: 1rem 0 !important;
  /* color: #e890b323 */
}

a:not(:visited) {
  color: #308FD9;
}

hr {
  border: 1px solid v-bind(darkColor);
}

mark {
  background-color: v-bind(markColor);
}

span.large {
  font-size: 1.7rem;
}
span.medium {
  font-size: 1.3rem;
}

u {
  text-decoration: none;
  border-bottom: 1px solid;
}

div.center {
  text-align: center;
}

div.indent1,
div.indent2,
div.indent3,
div.indent4,
div.indent5,
div.indent6 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}
div.indent1 > div {
  grid-column: 2 / 13;
}
div.indent2 > div {
  grid-column: 3 / 13;
}
div.indent3 > div {
  grid-column: 4 / 13;
}
div.indent4 > div {
  grid-column: 5 / 13;
}
div.indent5 > div {
  grid-column: 6 / 13;
}
div.indent6 > div {
  grid-column: 7 / 13;
}

div.boxCenter {
  border: 1px solid v-bind(darkColor);
  padding: 1rem;
  text-align: center;
}
div.colorCenter {
  background-color: v-bind(bgColor);
  padding: 1rem;
  text-align: center;
}
div.boxColorCenter {
  background-color: v-bind(bgColor);
  border: 2px solid v-bind(darkColor);
  padding: 1rem;
  text-align: center;
}

table {
  border-collapse: collapse;
  width: 100%;
  line-height: 1.7rem;
}
thead {
  background-color: v-bind(bgColor);
  font-size: 1.1rem;
  line-height: 2.3rem;
}
tbody tr:first-child td {
  padding-top: 1rem;
}
tbody td, 
thead th {
  padding: .3em 1em .3em 1em;
}
tbody tr:nth-child(even) {
  background-color: v-bind(lightColor);
}
</style>