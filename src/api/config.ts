import axios from 'axios'

export type ApiResponse<T> = {
    message: string
    status: number
    data: T
}

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7027/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axiosInstance