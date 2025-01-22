<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useCartStore } from '@/stores/CartStore';
import { ShoppingBagIcon, MinusIcon, PlusIcon } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { storeCart } from '@/api/cart/queries';
import { useLoaderStore } from '@/stores/loaderStore';
import { useQueryClient } from '@tanstack/vue-query';
import { toast } from '@/components/ui/toast';

const cartStore = useCartStore()
const { cartItems, cartTotal } = storeToRefs(cartStore)
const { loadingOn, loadingOff } = useLoaderStore()
const isOpen = ref(false)
const checkOut = ref(false)
const queryClient = useQueryClient();

const { mutate: store } = storeCart.useMutation({
    
    onMutate: loadingOn,
    onError: () => {
    },
    onSuccess: () => {
        console.log()
        toast({
            title: "Success.",
        })
    },
    onSettled: () => {
        loadingOff(),
        queryClient.invalidateQueries({
            queryKey: ['getAllProducts']
        })
    }
})

const isCheckOut = () => {
    isOpen.value = true
}

const storeToReport = () => {
    
        store(cartItems.value);
        
    
}

// watch(checkOut, () => {
//     storeToReport()
// })

</script>


<template>
    <div class="container mx-auto px-8 py-6 bg-gray-50 min-h-screen">
      <main class="w-full p-6">
        
  
        <!-- Empty Cart Message -->
        <div v-if="cartItems.length === 0" class="text-center mt-10">
          <h2 class="text-4xl text-red-500 font-bold">There's no item in the cart!</h2>
        </div>
  
        <!-- Cart Table -->
        <div v-else>
          <div class="overflow-x-auto shadow-lg rounded-md">
            <table class="table-auto w-full border-collapse bg-white">
              <!-- Table Header -->
              <thead>
                <tr class="bg-gradient-to-r from-green-400 to-green-500 text-white text-lg">
                  <th class="w-[100px] font-bold py-3 text-center">No.</th>
                  <th class="font-bold py-3 text-center">Code</th>
                  <th class="font-bold py-3 text-center">Name</th>
                  <th class="font-bold py-3 text-center">Quantity</th>
                  <th class="font-bold py-3 text-center">Price</th>
                  <th class="font-bold py-3 text-center">Actions</th>
                </tr>
              </thead>
  
              <!-- Table Body -->
              <tbody>
                <tr
                  v-for="(item, index) in cartItems"
                  :key="index"
                  class="text-gray-700 hover:bg-gray-100 transition duration-300"
                >
                  <td class="text-center py-3">{{ index + 1 }}</td>
                  <td class="text-center py-3">{{ item.productID }}</td>
                  <td class="text-center py-3">{{ item.productName }}</td>
                  <td class="text-center py-3">
                    <div class="flex justify-evenly items-center">
                      <span
                        class="rounded-full px-2 font-semibold text-red-500 cursor-pointer hover:bg-gray-200 transition select-none"
                        @click="cartStore.decreaseItem(item)"
                      >
                        <MinusIcon />
                      </span>
                      <span class="w-[30px] text-lg font-medium">{{ item.quantity }}</span>
                      <span
                        class="rounded-full px-2 font-semibold text-green-500 cursor-pointer hover:bg-gray-200 transition select-none"
                        @click="cartStore.IncreaseItem(item)"
                      >
                        <PlusIcon />
                      </span>
                    </div>
                  </td>
                  <td class="text-center py-3">$ {{ item.sellingPrice }}</td>
                  <td class="text-center py-3">
                    <button
                      class="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-md shadow"
                      @click="cartStore.removeFromCart(item)"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <!-- Total Price -->
          <div class="flex justify-end mt-6">
            <h1 class="text-2xl font-semibold text-blue-600">
              Total Price:
              <span class="text-gray-700">$ {{ cartTotal }}</span>
            </h1>
          </div>
  
          <!-- Checkout Button -->
          <div class="flex justify-end mt-4">
            <button
              class="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium px-6 py-2 rounded-md shadow hover:from-blue-600 hover:to-blue-700 transition duration-300"
              @click="storeToReport"
            >
              Checkout
            </button>
          </div>
        </div>
      </main>
  
      <!-- Alert Dialog -->
      <AlertDialog v-bind:open="isOpen">
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you wanna delete?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel @click="isOpen = false">Cancel</AlertDialogCancel>
            <AlertDialogAction @click="checkOut = true">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  </template>
  