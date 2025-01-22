import axiosInstance, { ApiResponse } from "../config";
import { CartInputType } from "@/api/cart/types";

const baseUrl = '/Order';

const addToCart = async (item: CartInputType[]): Promise<ApiResponse<CartInputType[]>> => {
    const response = await axiosInstance.post<ApiResponse<CartInputType[]>>(`${baseUrl}/AddOrder`, item)

    return response.data
}

export default { addToCart }