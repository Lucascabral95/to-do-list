import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import { API_CONFIG } from '../constants/api.constants';
import { ApiError, Result } from '../types';

class ApiService {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL || '',
            timeout: API_CONFIG.TIMEOUT,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors(): void {
        this.client.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        this.client.interceptors.response.use(
            (response) => response,
            (error: AxiosError) => {
                const apiError = this.handleError(error);
                return Promise.reject(apiError);
            }
        );
    }

    private handleError(error: AxiosError): ApiError {
        if (error.response) {
            return {
                message: (error.response.data as any)?.message || error.message,
                code: (error.response.data as any)?.code,
                statusCode: error.response.status,
            };
        }

        if (error.request) {
            return {
                message: 'Error de red. Verificá tu conexión.',
                code: 'NETWORK_ERROR',
            };
        }

        return {
            message: error.message || 'Error desconocido',
            code: 'UNKNOWN_ERROR',
        };
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<Result<T, ApiError>> {
        try {
            const response = await this.client.get<T>(url, config);
            return [response.data, null];
        } catch (error) {
            return [null, error as ApiError];
        }
    }

    async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<Result<T, ApiError>> {
        try {
            const response = await this.client.post<T>(url, data, config);
            return [response.data, null];
        } catch (error) {
            return [null, error as ApiError];
        }
    }

    async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<Result<T, ApiError>> {
        try {
            const response = await this.client.put<T>(url, data, config);
            return [response.data, null];
        } catch (error) {
            return [null, error as ApiError];
        }
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<Result<T, ApiError>> {
        try {
            const response = await this.client.delete<T>(url, config);
            return [response.data, null];
        } catch (error) {
            return [null, error as ApiError];
        }
    }
}

export const apiService = new ApiService();
