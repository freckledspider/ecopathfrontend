<template>
<the-navigation />
<main>
  <router-view />
</main>
</template>

<script>
import { RouterView } from 'vue-router';
import TheNavigation from './components/TheNavigation.vue'
import './styles.css';

export default {
  name: 'App',
  components: {
    TheNavigation,
    RouterView
  }
}
</script>