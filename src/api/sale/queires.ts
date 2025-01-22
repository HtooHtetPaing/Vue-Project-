import { UseQueriesOptions, useQuery } from "@tanstack/vue-query";
import { SaleReportType } from "./types";
import { ApiResponse } from "../config";
import saleServices from "./services"

export const fetchSaleReport = {
    useQuery: (Error: any, opt?: UseQueriesOptions<SaleReportType[]>) =>
        useQuery<SaleReportType[], Error>({
            queryKey: ['getSaleReport'],
            queryFn: async () => {
                const response: ApiResponse<SaleReportType[]> = await saleServices.getSaleReport();

                console.log("🚀 ~ queryFn: ~ response.data:", response.data)
                return response.data;
            },
            ...opt
        })
}

export const fetchSalesReport = {
    useQuery: (Error: any, opt?: UseQueriesOptions<SaleReportType[]>) =>
        useQuery<SaleReportType[], Error>({
            queryKey: ['getSaleReport'],
            queryFn: async () => {
                const response: ApiResponse<SaleReportType[]> = await saleServices.getSaleReport();

                console.log("🚀 ~ queryFn: ~ response.data:", response.data)
                return response.data;
            },
            ...opt
        })
}