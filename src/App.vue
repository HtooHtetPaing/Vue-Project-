<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import Toaster from '@/components/ui/toast/Toaster.vue'
import { RouterView } from 'vue-router';
import Loader from './components/loader/loader.vue';
</script>

<template>
  <Toaster />
  <Loader/>
 
  <RouterView />
</template>