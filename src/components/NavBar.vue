<script setup lang="ts">
import { useCartStore } from '@/stores/CartStore';
import {RouterLink, useRoute} from 'vue-router'

const cartStore = useCartStore()

const isActiveLink = (routePath: string) => {
  const route = useRoute();
  return route.path === routePath;
}

</script>
<template>
  <nav class="bg-gradient-to-r from-blue-800 to-blue-600 shadow-lg">
    <div class="container mx-auto flex py-4 justify-between items-center">
      <!-- Logo -->
      <h1 class="text-white text-3xl font-extrabold tracking-wide">Retail Management Store</h1>

      <!-- Navigation Links -->
      <div class="flex gap-10 text-white font-medium">
        <!-- <RouterLink
          to="/"
          :class="[isActiveLink('/') ? 'border-b-2 border-white' : 'hover:border-b-2 hover:border-blue-300', 'pb-1']"
        >
          Home
        </RouterLink> -->
        <RouterLink
          to="/products"
          :class="[isActiveLink('/products') ? 'border-b-2 border-white' : 'hover:border-b-2 hover:border-blue-300', 'pb-1']"
        >
          Product
        </RouterLink>
        <RouterLink
          to="/cart"
          :class="[isActiveLink('/cart') ? 'border-b-2 border-white' : 'hover:border-b-2 hover:border-blue-300', 'pb-1']"
        >
          Cart
        </RouterLink>
        <RouterLink
          to="/records"
          :class="[isActiveLink('/records') ? 'border-b-2 border-white' : 'hover:border-b-2 hover:border-blue-300', 'pb-1']"
        >
          Record
        </RouterLink>
      </div>

      <!-- Cart Icon -->
      <div class="relative">
        <RouterLink to="/cart" class="px-4 py-2 bg-white rounded-full hover:bg-gray-100 flex items-center shadow-md">
          <i class="fa fa-cart-shopping text-blue-600"></i>
          <span
            class="text-white bg-red-500 absolute -top-2 -right-2 text-sm font-bold rounded-full px-2"
            v-if="cartStore.cartCount > 0"
          >
            {{ cartStore.cartCount }}
          </span>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
