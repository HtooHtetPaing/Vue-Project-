import axiosInstance, { ApiResponse } from "../config";
import { SaleReportType } from "./types";

const baseUrl = '/Order'

const getSaleReport = async (): Promise<ApiResponse<SaleReportType[]>> => {
    const response = await axiosInstance.get<ApiResponse<SaleReportType[]>>(`${baseUrl}/GetAllOrder`)
    
    return response.data;
}

export default { getSaleReport }