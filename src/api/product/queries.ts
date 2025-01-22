import { useMutation, UseQueriesOptions, useQuery, useQueryClient, type UseMutationOptions, type UseQueryOptions } from "@tanstack/vue-query"
import { ProductDeleteType, ProductType } from "./types"
import { ApiResponse } from "../config"
import productServices from "./services"

export const fetchProducts = {
    useQuery: (Error: any, opt?: UseQueriesOptions<ProductType[]>) =>
        useQuery<ProductType[], Error>({
            queryKey: ['getAllProducts'],
            queryFn: async () => {
                const response: ApiResponse<ProductType[]> = await productServices.getAllProducts();

                return response.data;
            },
            ...opt
        })
}

export const AddProduct = {
    useMutation: (opt?: UseMutationOptions<any, Error, ProductType, any>) => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationKey: ['addProduct'],
            mutationFn: (product: ProductType) => productServices.addProduct(product),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['getAllProducts']});
            },
            ...opt
        })
    }
}

export const UpdateProduct = {
    useMutation: (opt?: UseMutationOptions<any, Error, ProductType, any>) => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationKey: ['updateProduct'],
            mutationFn: (product: ProductType) => productServices.updateProduct(product),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['getAllProducts']});
            },
            ...opt
        })
    }
}

// export const DeleteProduct = {
//     useMutation: (opt?: UseMutationOptions<any, Error, ProductDeleteType, any>) => {
//         const queryClient = useQueryClient();
//         return useMutation({
//             mutationKey: ['deleteProduct'],
//             mutationFn: (productID: ProductDeleteType) => productServices.DeleteProduct(productID),
//             onSuccess: () => {
//                 console.log("Product deleted successfully");
//                 // queryClient.invalidateQueries({ queryKey: ['getAllProducts']});
//                 queryClient.refetchQueries({ queryKey: ['getAllProducts'] });
//             },
//             ...opt
//         })
//     }
// }
export const DeleteProduct = {
    useMutation: (opt?: UseMutationOptions<any, Error, ProductDeleteType, any>) => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationKey: ['deleteProduct'],
            mutationFn: (productID: ProductDeleteType) => productServices.DeleteProduct(productID),
            onSuccess: (deletedProduct) => {
                console.log('Product deleted successfully');
                queryClient.invalidateQueries({ queryKey: ['getAllProducts'] });
                // Alternatively, update cache directly:
                // queryClient.setQueryData(['getAllProducts'], (oldData: Product[] | undefined) => {
                //     if (!oldData) return [];
                //     return oldData.filter(product => product.id !== deletedProduct.id);
                // });
            },
            ...opt,
        });
    },
};