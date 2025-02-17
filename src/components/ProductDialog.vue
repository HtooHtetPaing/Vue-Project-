<script setup lang="ts">
import { useToast } from './ui/toast'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from '@/components/ui/form'
import { useLoaderStore } from '@/stores/loaderStore'
import { toTypedSchema } from '@vee-validate/zod'
import { AddProduct, UpdateProduct } from '@/api/product/queries'
import { defineProps, onMounted, ref, watch } from 'vue'
import * as z from 'zod'
import { ProductType } from '@/api/product/types'
import { useForm } from 'vee-validate'
import Input from './ui/input/Input.vue'
import Button from './ui/button/Button.vue'
import { useQueryClient } from '@tanstack/vue-query'

const queryClient = useQueryClient();

const { toast } = useToast()
const { loadingOn, loadingOff } = useLoaderStore()

const props = defineProps<{
    isOpen: boolean,
    isEdit: boolean,
    product: ProductType,
    close: () => void
}>()

const formSchema = toTypedSchema(z.object({
    productName: z.string().min(2).max(50),
   sellingPrice: z.number().min(1),
    stock: z.number().min(1),
    profitPerItem: z.number().min(1),
}))

const { handleSubmit, setValues, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: {
    productName: '',
    sellingPrice: undefined,
    stock: undefined,
    profitPerItem: undefined,
  }
})

const { mutate: addProduct } = AddProduct.useMutation({
    onMutate: loadingOn,
    onError: (data) => {
        toast({
            title: data.message,
            variant: 'destructive',
            duration: 1000
        })
    },
    onSuccess: (data) => {
        console.log(data)
        toast({
            title: data.message,
            duration: 1000
        })
        closeDialog()
    },
    onSettled: () => {
        loadingOff(),
        queryClient.invalidateQueries({
            queryKey: ['getAllProducts']
        })
    }
})

const { mutate: updateProduct } = UpdateProduct.useMutation({
    onMutate: loadingOn,
    onError: (data) => {
        toast({
            title: data.message,
            variant: 'destructive',
            duration: 3000
        })
    },
    onSuccess:  async (data) => {
        toast({
            title: data.message,
            duration: 3000
        })
        queryClient.invalidateQueries({
            queryKey: ['getAllProducts']
        })
        closeDialog()
    },
    onSettled: () => {
        loadingOff()
    }
})

const onSubmit = handleSubmit((values) => {
  try {
    const payload = props.isEdit
      ? {
        productID: props?.product.productID,
        
        productName: values.productName,
        stock: values.stock,
       sellingPrice: values.sellingPrice,
        profitPerItem: values.profitPerItem,
      }
      : {
        
        productName: values.productName,
        stock: values.stock,
        sellingPrice: values.sellingPrice,
        profitPerItem: values.profitPerItem,
      };

    if (props.isEdit) {
        console.log(payload)
      updateProduct(payload as ProductType)

    }
    else {
        addProduct(payload as ProductType)
    }

  } catch (error) {
    console.error(error)
  } finally {
    close()
  }
})

const initializeForm = () => {
    if (props.isEdit) {
        setValues({
            productName: props.product.productName || '',
            stock: props.product.stock || undefined,
            sellingPrice: props.product.sellingPrice || undefined,
            profitPerItem: props.product.profitPerItem || undefined,
        })
    } else {
        // Reset form when not in edit mode
        resetForm()
    }
}

// Watch for changes in props
watch(
  [() => props.isEdit, () => props.product],
  () => {
    resetForm();
    initializeForm();
  }
);


const closeDialog = () => {
    props.close();
    resetForm();
}



</script>

<template>
        <Dialog v-model:open="props.isOpen">
            <DialogContent class="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle class="text-blue-500">{{ props.isEdit ? 'Update ' : 'Add ' }}Product Info</DialogTitle>
                </DialogHeader>

                <form id="dialogForm" @submit="onSubmit">
                   
                    <FormField v-slot="{ componentField }" name="productName">
                        <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                                <Input type="text" v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="sellingPrice">
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input type="number" v-bind="componentField" min="0" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="stock">
                        <FormItem>
                            <FormLabel>Stock</FormLabel>
                            <FormControl>
                                <Input type="number" v-bind="componentField" min="0" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="profitPerItem">
                        <FormItem>
                            <FormLabel>Profit Per Item</FormLabel>
                            <FormControl>
                                <Input type="number" v-bind="componentField" min="0" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                </form>

                <DialogFooter>

                        <Button @click="closeDialog" type="button" variant="secondary">
                            Close
                        </Button>
                    <Button type="submit" form="dialogForm" class="bg-green-500 hover:bg-green-600">
                        Save Product
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
</template>