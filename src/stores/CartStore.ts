import { CartType, ProductType } from "@/api/product/types";
import { toast } from "@/components/ui/toast";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore('cart', () => {
    const cartItems = ref<CartType[]>([]);
    const cartTotal = ref(0);
    const cartCount = ref(0);

    const addToCart = (product: ProductType) => {
        if(product.stock === 0) {
            toast({
                title: 'Product is out of stock',
                variant: 'destructive',
                duration: 1000
            })
            return;
        }
        const isInCart = cartItems.value.find(x=> x.productID === product.productID);
        if(isInCart){
            if(isInCart.quantity >= product.stock) {
                toast({
                    title: 'Product is out of stock',
                    variant: 'destructive',
                    duration: 1000
                })
                return;
            };
            isInCart.quantity += 1;
        }
        else{
            cartItems.value.push({...product, quantity: 1});
        }
        cartCount.value += 1;
        cartTotal.value += product.sellingPrice;
        toast({
            title: 'Successfully added to cart',
            duration: 1000
        })
    }

    const removeFromCart = (product: CartType) => {
        cartItems.value = cartItems.value.filter(x => x.productID !== product.productID);
        cartTotal.value -= product.sellingPrice * product.quantity;
        cartCount.value -= product.quantity;
    }

    const decreaseItem = (product: CartType) => {
        if(product.quantity > 1){
            product.quantity -= 1;
            cartTotal.value -= product.sellingPrice;
            cartCount.value -= 1;
        }else{
            removeFromCart(product);
        }
    }

    const IncreaseItem = (product: CartType) => {
        if(product.quantity >= product.stock) {
            toast({
                title: 'Product is out of stock',
                variant: 'destructive',
                duration: 1000
            })
            return;
        }
        product.quantity += 1;
        cartTotal.value += product.sellingPrice;
        cartCount.value += 1;
        toast({
            title: 'Successfully added to cart',
            duration: 1000
        })
    }

    const decreaseItemInProduct = (product: ProductType) => {
        const item = cartItems.value.find(x=> x.productID === product.productID);
        if(item && item.quantity > 1){
            item.quantity -= 1;
        }else if(item){
            removeFromCart(item);
        }
    }

    return { cartItems, addToCart, removeFromCart, decreaseItem, IncreaseItem,decreaseItemInProduct, cartTotal, cartCount };

})