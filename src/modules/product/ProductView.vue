<script setup>
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ref, reactive } from 'vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { Button } from '@/components/ui/button'
import { storeToRefs } from 'pinia'
import { useLoaderStore } from '@/stores/loaderStore'
import { useCartStore } from '@/stores/CartStore'
import { fetchProducts, DeleteProduct } from '@/api/product/queries'
import ProductDialog from '@/components/ProductDialog.vue'
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

const loaderStore = useLoaderStore()
const { isLoading } = storeToRefs(loaderStore)

const cartStore = useCartStore()

const { data, refetch  } = fetchProducts.useQuery("products")

const { mutate: deleteP } = DeleteProduct.useMutation({
  
  onSuccess: () => {
    isDelete.value = false
    refetch();
    toast({
            title: data.message,
            duration: 3000
        })
  }
})

const isDelete = ref(false)
const deleteProductId = ref("")


const isEdit = ref(false)
const isOpen = ref(false)
const updateProduct = ref({})

const openAddProductDialog = () => {
  isEdit.value = false
  isOpen.value = true
  updateProduct.value = {};
}

const openEditDialog = (product) => {
  isOpen.value = true
  isEdit.value = true;
  updateProduct.value = product;
}

const closeDialog = () => {
  isOpen.value = false;
  isEdit.value = false;
  updateProduct.value = null;
}
const openDeleteDialog = (id) => {
  isDelete.value = true;
  deleteProductId.value = id
}

</script>

<template>
  <div class="container mx-auto px-6 py-8 bg-gray-50 min-h-screen">
    <!-- Header -->
    <main class="w-full">
      <button
        class="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300 mt-6"
        @click="openAddProductDialog"
      >
        Add Product
      </button>

      <!-- Table -->
      <div class="mt-10 overflow-x-auto bg-white shadow-lg rounded-lg p-4">
        <table class="min-w-full table-auto border-collapse text-sm">
          <!-- Table Header -->
          <thead>
            <tr class="bg-gradient-to-r from-blue-600 to-blue-400 text-white text-lg">
              <th class="font-bold py-3 px-6 text-center">No.</th>
              <th class="font-bold py-3 px-6 text-center">Name</th>
              <th class="font-bold py-3 px-6 text-center">Stock</th>
              <th class="font-bold py-3 px-6 text-center">Price</th>
              <th class="font-bold py-3 px-6 text-center">Profit Per Item</th>
              <th class="font-bold py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>

          <!-- Table Body -->
          <tbody>
            <tr
              v-for="(product, index) in data"
              :key="index + 1"
              class="hover:bg-gray-100 transition duration-300 text-gray-700"
            >
              <td class="text-center py-3 px-6">{{ index + 1 }}</td>
              <td class="text-center py-3 px-6">{{ product.productName }}</td>
              <td class="text-center py-3 px-6">{{ product.stock }}</td>
              <td class="text-center py-3 px-6">$ {{ product.sellingPrice }}</td>
              <td class="text-center py-3 px-6">$ {{ product.profitPerItem }}</td>
              <td class="flex justify-center gap-4 py-3 px-6">
                <!-- Add to Cart Button -->
                <button
                  class="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md shadow"
                  @click="cartStore.addToCart(product)"
                >
                  Add to Cart
                </button>

                <!-- Edit & Delete Buttons -->
                <div class="flex gap-2">
                  <button
                    class="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-4 py-2 rounded-md shadow"
                    @click="openEditDialog(product)"
                  >
                    Edit
                  </button>
                  <button
                    class="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-md shadow"
                   @click="openDeleteDialog(product.productID)"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Loader -->
      <div v-if="isLoading" class="text-center mt-6">
        <PulseLoader class="text-blue-500" />
      </div>

      <!-- Dialog Component -->
      <ProductDialog :isOpen="isOpen" :isEdit="isEdit" :product="updateProduct" :close="closeDialog" />
      <AlertDialog v-bind:open="isDelete">
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this product?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. Are you sure you want to continue?.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel @click="isDelete = false" class="bg-gray-500 hover:bg-gray-600 hover:text-white text-white">Cancel</AlertDialogCancel>
                    <AlertDialogAction @click=" deleteP(deleteProductId)" class="bg-red-500 hover:bg-red-600 ">Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </main>
  </div>
</template>

