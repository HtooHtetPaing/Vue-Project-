import { useMutation, UseMutationOptions, UseQueriesOptions, useQuery, useQueryClient } from "@tanstack/vue-query";
import cartServices from "./services";
import { ApiResponse } from "../config";
import { CartInputType } from "./types";

export const storeCart = {
    useMutation: (opt?: UseMutationOptions<any, Error, CartInputType[], any>) => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationKey: ['storeCart'],
            mutationFn: (item: CartInputType[]) => cartServices.addToCart(item),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['getAllProducts']});
            },
            ...opt
        })
    }
}