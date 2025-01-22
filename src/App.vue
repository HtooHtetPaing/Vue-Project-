<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import Toaster from '@/components/ui/toast/Toaster.vue'
import { RouterView } from 'vue-router';
</script>

<template>
  <Toaster />
  <NavBar />
  <RouterView />
</template>